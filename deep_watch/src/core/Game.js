import * as THREE from 'three';
import { EventBus } from './EventBus.js';
import { GameLoop } from './GameLoop.js';
import { SettingsManager } from './SettingsManager.js';
import { SaveManager } from './SaveManager.js';
import { SubmarineState } from '../simulation/SubmarineState.js';
import { MaterialFactory } from '../graphics/MaterialFactory.js';
import { CollisionSystem } from '../world/CollisionSystem.js';
import { LightingSystem } from '../world/LightingSystem.js';
import { SubmarineWorld, LAYOUT } from '../world/SubmarineWorld.js';
import { CompartmentManager } from '../world/CompartmentManager.js';
import { AudioEnvironment } from '../world/AudioEnvironment.js';
import { PlayerController } from '../player/PlayerController.js';
import { InteractionSystem } from '../player/InteractionSystem.js';
import { EquipmentInventory } from '../player/EquipmentInventory.js';
import { InstrumentManager } from '../instruments/InstrumentManager.js';
import { StationManager } from '../stations/StationManager.js';
import { MissionManager } from '../missions/MissionManager.js';
import { HUD } from '../ui/HUD.js';
import { Notebook } from '../ui/Notebook.js';
import { SettingsMenu } from '../ui/SettingsMenu.js';

/**
 * Game — top-level orchestrator. Owns the renderer, scene, camera, and every
 * subsystem, and runs the mode state machine (menu → playing → paused/station/
 * notebook). Keeps no gameplay logic itself; it wires systems via the EventBus.
 */
export class Game {
  constructor() {
    this.bus = new EventBus();
    this.settings = new SettingsManager(this.bus);
    this.save = new SaveManager(this.bus);
    this.state = new SubmarineState();
    this.mode = 'menu';
  }

  async init() {
    this._initRenderer();
    this._initWorld();
    this._initPlayerAndSystems();
    this._initUI();
    this._wireInteractions();
    this._wireModeControl();
    this._initLoop();

    // Expose a tiny debug/test handle (used by Playwright smoke tests).
    window.__DEEPWATCH__ = {
      bus: this.bus,
      state: this.state,
      save: this.save,
      settings: this.settings,
      startMission: (id) => this.startGame(id),
      getMode: () => this.mode,
      inventory: this.inventory,
      player: this.player,
      layout: LAYOUT,
    };

    document.getElementById('loading').hidden = true;
    this.bus.emit('game:ready');
  }

  _initRenderer() {
    this.canvas = document.getElementById('game-canvas');
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, powerPreference: 'high-performance' });
    this.renderer.shadowMap.enabled = this.settings.graphics.shadowsEnabled;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this._applyPixelRatio();

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x04080a);
    this.scene.fog = new THREE.FogExp2(0x04080a, 0.012);

    this.camera = new THREE.PerspectiveCamera(this.settings.get('fov'), window.innerWidth / window.innerHeight, 0.05, 200);
    this.scene.add(this.camera); // camera holds the viewmodel + flashlight

    window.addEventListener('resize', () => this._onResize());
    this.bus.on('settings:changed', ({ key }) => {
      if (key === 'graphicsPreset') { this._applyPixelRatio(); this.renderer.shadowMap.enabled = this.settings.graphics.shadowsEnabled; }
    });
  }

  _applyPixelRatio() {
    const cap = this.settings.graphics.pixelRatioCap;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, cap));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  _onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  _initWorld() {
    this.materials = new MaterialFactory();
    this.collision = new CollisionSystem();
    this.lighting = new LightingSystem(this.scene, this.bus, this.settings);
    this.world = new SubmarineWorld({
      scene: this.scene, materials: this.materials, collision: this.collision,
      lighting: this.lighting, eventBus: this.bus, settings: this.settings,
    });
    const { layout, interactables } = this.world.build();
    this.layout = layout;
    this._worldInteractables = interactables;
    this.lighting.setState('normal');
    this.compartments = new CompartmentManager(this.bus, layout);
    this.audio = new AudioEnvironment({ settings: this.settings, state: this.state, eventBus: this.bus });
  }

  _initPlayerAndSystems() {
    this.player = new PlayerController({
      camera: this.camera, domElement: this.canvas, collision: this.collision,
      settings: this.settings, eventBus: this.bus,
    });
    this.player.attach();

    this.interaction = new InteractionSystem({ camera: this.camera, eventBus: this.bus });
    this.interaction.registerAll(this._worldInteractables);

    this.inventory = new EquipmentInventory(this.bus, this.save);
    this.notebook = new Notebook({ eventBus: this.bus, save: this.save });
    this.instruments = new InstrumentManager({
      camera: this.camera, scene: this.scene, eventBus: this.bus, inventory: this.inventory,
      state: this.state, compartmentManager: this.compartments, notebook: this.notebook,
    });
    this.stations = new StationManager({ eventBus: this.bus, state: this.state, save: this.save });
    this.missions = new MissionManager({
      eventBus: this.bus, state: this.state, save: this.save, compartmentManager: this.compartments,
    });
  }

  _initUI() {
    this.hud = new HUD({ eventBus: this.bus, state: this.state });
    this.settingsMenu = new SettingsMenu({ settings: this.settings, container: document.getElementById('settings-container') });
  }

  _wireInteractions() {
    // Instrument pickup: carry it, remove from world.
    this.bus.on('interact:instrument', (rec) => {
      if (this.inventory.has(rec.id)) return;
      this.inventory.add(rec.id, rec.data.name);
      rec.object.parent?.remove(rec.object);
      this.interaction.unregister(rec);
      this.bus.emit('hud:toast', { concept: 'Instrument', text: `${rec.data.name} in hand. Press F to use it; [ and ] cycle tools.` });
    });
    // Hatch: toggle open/closed.
    this.bus.on('interact:hatch', (rec) => {
      this.world.setHatch(rec.id, !rec.data.open);
    });
    // Locker: feedback (missions count these).
    this.bus.on('interact:locker', () => {
      this.bus.emit('hud:toast', { concept: 'Damage-Control Locker', text: 'Locker open — breathing gear, patches, wedges, and a portable pump are stowed here.' });
    });
    // Deck plate: a physical inspection point.
    this.bus.on('interact:deckplate', (rec) => {
      this.bus.emit('hud:toast', { concept: 'Bilge Access', text: 'Deck plate lifted — the bilge below is accessible for inspection.' });
    });
  }

  _wireModeControl() {
    // Station open/close gates movement + pointer lock.
    this.bus.on('station:opened', () => this._enterOverlay('station'));
    this.bus.on('station:closed', () => this._exitOverlay());
    this.bus.on('notebook:toggled', (open) => {
      if (open && this.mode === 'playing') this._enterOverlay('notebook');
      else if (!open && this.mode === 'notebook') this._exitOverlay();
    });

    // Pointer lock lost while playing (user pressed Esc / clicked away) → pause.
    this.bus.on('player:pointerLock', (locked) => {
      if (!locked && this.mode === 'playing') this.pause();
    });

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        if (this.mode === 'station') this.stations.close();
        else if (this.mode === 'notebook') this.notebook.toggle(false);
        else if (this.mode === 'paused') this.resume();
        // (playing → Escape also releases pointer lock, handled above)
      }
      if (e.code === 'BracketLeft') this.inventory.cycle(-1);
      if (e.code === 'BracketRight') this.inventory.cycle(1);
    });
    this.canvas.addEventListener('wheel', (e) => {
      if (this.mode === 'playing') this.inventory.cycle(e.deltaY > 0 ? 1 : -1);
    }, { passive: true });

    // Start screen / pause menu buttons.
    document.getElementById('btn-start').addEventListener('click', () => this.startGame());
    document.getElementById('btn-continue').addEventListener('click', () => this.startGame());
    document.getElementById('btn-settings').addEventListener('click', () => { this.settingsMenu.render(); this._openPauseFromMenu(); });
    document.getElementById('btn-resume').addEventListener('click', () => this.resume());
    document.getElementById('btn-restart').addEventListener('click', () => { this.missions.restart(); this.resume(); });
    document.getElementById('btn-to-campaign').addEventListener('click', () => this.returnToCampaign());
    document.getElementById('btn-reset-progress').addEventListener('click', () => {
      if (confirm('Reset all Deep Watch progress? (This does not touch your RECKON course progress.)')) {
        this.save.reset();
        this.bus.emit('hud:toast', { concept: 'Progress reset', text: 'Deep Watch progress cleared.' });
      }
    });

    // Mission complete → simple debrief toast + return to campaign.
    this.bus.on('mission:complete', ({ title, score }) => {
      this.bus.emit('hud:toast', { concept: 'Mission Complete', text: `${title} complete. Score ${score}. Returning to campaign…` });
      setTimeout(() => this.returnToCampaign(), 4200);
    });

    if (this.save.hasProgress()) document.getElementById('btn-continue').hidden = false;
  }

  _enterOverlay(mode) {
    this.mode = mode;
    this.player.setEnabled(false);
    this.interaction.setEnabled(false);
    this.player.exitLock();
  }

  _exitOverlay() {
    this.mode = 'playing';
    this.player.setEnabled(true);
    this.interaction.setEnabled(true);
    this.player.requestLock();
  }

  _openPauseFromMenu() {
    document.getElementById('pause-menu').hidden = false;
  }

  startGame(missionId = 'mission_01_walkdown') {
    document.getElementById('start-screen').hidden = true;
    document.getElementById('pause-menu').hidden = true;
    this.hud.show(true);
    this.mode = 'playing';

    // Place the player in the control room's clear aft passage (centerline, near
    // the aft hatch), facing forward (yaw 180° looks down -Z toward the bow).
    const control = this.layout.find((c) => c.id === 'control_room') || this.layout[3];
    this.player.setPose(0, control.zEnd - 0.7, 180);
    this.compartments.update(this.player.position.z);

    this.player.setEnabled(true);
    this.interaction.setEnabled(true);
    this.player.requestLock();
    this.audio.start();

    this.missions.start(missionId);
    this.bus.emit('game:started', { missionId });
  }

  pause() {
    if (this.mode !== 'playing') return;
    this.mode = 'paused';
    this.player.setEnabled(false);
    this.interaction.setEnabled(false);
    this.settingsMenu.render();
    document.getElementById('pause-menu').hidden = false;
    this.audio.setMuted(true);
  }

  resume() {
    document.getElementById('pause-menu').hidden = true;
    document.getElementById('start-screen').hidden = true;
    this.mode = 'playing';
    this.player.setEnabled(true);
    this.interaction.setEnabled(true);
    this.player.requestLock();
    this.audio.setMuted(false);
  }

  returnToCampaign() {
    this.missions.stop();
    this.mode = 'menu';
    this.player.setEnabled(false);
    this.interaction.setEnabled(false);
    this.player.exitLock();
    document.getElementById('pause-menu').hidden = true;
    this.hud.show(false);
    document.getElementById('start-screen').hidden = false;
    if (this.save.hasProgress()) document.getElementById('btn-continue').hidden = false;
  }

  _initLoop() {
    this.loop = new GameLoop({
      fixedStep: 1 / 30,
      fixedUpdate: (dt) => this._fixedUpdate(dt),
      update: (dt, t) => this._update(dt, t),
    });
    this.loop.start();
  }

  _fixedUpdate(dt) {
    if (this.mode === 'playing') {
      this._easeControls(dt);
      this.state.integrate(dt);
    }
  }

  /** Ease actual depth/heading/rate toward ordered values (control authority). */
  _easeControls(dt) {
    const s = this.state;
    const authority = 0.3 + Math.min(1, s.speed / 6) * 0.7; // low speed → sluggish
    const dDepth = s.orderedDepth - s.depth;
    s.verticalRate = dDepth * 0.5 * authority;
    s.depth += s.verticalRate * (dt / 60) * 60 * 0.02;
    let dh = ((s.orderedHeading - s.heading + 540) % 360) - 180;
    s.heading = (s.heading + dh * 0.02 * authority + 360) % 360;
    s.lastTrustedFix.ageMin += dt / 60;
  }

  _update(dt, t) {
    const playing = this.mode === 'playing';
    if (playing) {
      this.player.update(dt);
      this.interaction.update();
      this.compartments.update(this.player.position.z);
    }
    this.instruments.update(dt, playing && this.player.velocity.lengthSq() > 0.5);
    this.lighting.update(t);
    this.audio.update();
    this.hud.updateStatus();
    this.renderer.render(this.scene, this.camera);
  }
}
