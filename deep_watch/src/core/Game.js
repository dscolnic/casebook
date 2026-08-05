import * as THREE from 'three';
import { EventBus } from './EventBus.js';
import { GameLoop } from './GameLoop.js';
import { SettingsManager } from './SettingsManager.js';
import { SaveManager } from './SaveManager.js';
import { SubmarineState } from '../simulation/SubmarineState.js';
import { MaterialFactory } from '../graphics/MaterialFactory.js';
import { CollisionSystem } from '../world/CollisionSystem.js';
import { LightingSystem } from '../world/LightingSystem.js';
import { SubmarineWorld, LAYOUT, HALF_W } from '../world/SubmarineWorld.js';
import { CompartmentManager } from '../world/CompartmentManager.js';
import { HintBeacon } from '../world/HintBeacon.js';
import { WallDisplays } from '../world/WallDisplays.js';
import { AudioEnvironment } from '../world/AudioEnvironment.js';
import { PlayerController } from '../player/PlayerController.js';
import { InteractionSystem } from '../player/InteractionSystem.js';
import { EquipmentInventory } from '../player/EquipmentInventory.js';
import { InstrumentManager } from '../instruments/InstrumentManager.js';
import { StationManager } from '../stations/StationManager.js';
import { MissionManager } from '../missions/MissionManager.js';
import { FloodingSystem } from '../simulation/FloodingSystem.js';
import { DamageControl } from '../simulation/DamageControl.js';
import { SonarSystem } from '../simulation/SonarSystem.js';
import { NavigationSystem } from '../simulation/NavigationSystem.js';
import { CrewClock } from '../simulation/CrewClock.js';
import { AtmosphereSystem } from '../simulation/AtmosphereSystem.js';
import { FireSystem } from '../simulation/FireSystem.js';
import { FireControl } from '../simulation/FireControl.js';
import { VoyageSystem, TOTAL_NM, PLANNED_SPEED_KN } from '../simulation/VoyageSystem.js';
import { QUAL_QUESTIONS, questionsAvailable, PER_DAY } from '../content/qualQuestions.js';
import { PlayerBody } from '../player/PlayerBody.js';
import { HUD } from '../ui/HUD.js';
import { Notebook } from '../ui/Notebook.js';
import { Debrief } from '../ui/Debrief.js';
import { SettingsMenu } from '../ui/SettingsMenu.js';
import { ScienceCodex } from '../ui/ScienceCodex.js';
import { SCIENCE_NOTES, resolveScienceKey, scienceIndex } from '../content/scienceNotes.js';

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
      // Systems the mission tests drive directly (headless pointer-lock makes
      // walking the boat by hand unreliable, so tests act through these).
      flooding: this.flooding,
      sonar: this.sonar,
      nav: this.nav,
      crew: this.crew,
      voyage: this.voyage,
      atmosphere: this.atmosphere,
      fire: this.fire,
      fireControl: this.fireControl,
      body: this.body,
      // Content the tests need to assert against. Exposed here rather than
      // imported by path, because tests run against the built bundle where the
      // source paths no longer exist.
      content: { QUAL_QUESTIONS, questionsAvailable, PER_DAY, TOTAL_NM, PLANNED_SPEED_KN,
        SCIENCE_NOTES, resolveScienceKey, scienceIndex },
      science: this.science,
      loop: this.loop,
      /** Every interactable in the boat, for coverage tests. */
      interactables: () => this._worldInteractables.map((r) => ({ type: r.type, id: r.id })),
      dc: this.damageControl,
      instruments: this.instruments,
      notebook: this.notebook,
      stations: this.stations,
      missions: this.missions,
      hintBeacon: this.hintBeacon,
      world: this.world,
      displays: this.displays,
      compartments: this.compartments,
      /** Put the player in a compartment as if they had walked there. */
      goTo: (compartmentId) => {
        const c = LAYOUT.find((x) => x.id === compartmentId);
        if (!c) return false;
        this.player.setPose(0, c.zMid, 0);
        this.compartments.update(c.zMid);
        return true;
      },
      /** Fast-forward the simulation by N seconds of watch time (same fixed step). */
      advance: (seconds) => {
        const step = 1 / 30;
        for (let t = 0; t < seconds; t += step) {
          this.flooding.update(step);
          this.sonar.update(step);
          this.nav.update(step);
          this.crew.update(step);
          this.voyage.update(step);
          this.atmosphere.update(step);
          this.fire.update(step);
          this.fireControl.update(step);
          this.state.integrate(step);
        }
      },
      /** Fire an interactable by id, as if the player had looked at it and pressed E. */
      interact: (id) => {
        const rec = this._worldInteractables.find((r) => r.id === id);
        if (!rec) return false;
        this.bus.emit('interact', rec);
        this.bus.emit(`interact:${rec.type}`, rec);
        return true;
      },
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
    const { layout, interactables } = this.world.build(this.state);
    this.layout = layout;
    this._worldInteractables = interactables;
    this.lighting.setState('normal');
    this.compartments = new CompartmentManager(this.bus, layout);
    this.audio = new AudioEnvironment({ settings: this.settings, state: this.state, eventBus: this.bus });
    this.flooding = new FloodingSystem({ state: this.state, eventBus: this.bus, layout });
    this.sonar = new SonarSystem({ state: this.state, eventBus: this.bus });
    this.nav = new NavigationSystem({ state: this.state, eventBus: this.bus });
    this.crew = new CrewClock({ state: this.state, eventBus: this.bus, save: this.save });
    // Air first, then fire: a fire is an atmosphere casualty as much as a heat one,
    // and it pushes its products straight into the compartment it is burning in.
    this.atmosphere = new AtmosphereSystem({ state: this.state, eventBus: this.bus, layout });
    this.fire = new FireSystem({ state: this.state, eventBus: this.bus, layout, atmosphere: this.atmosphere });
    this.voyage = new VoyageSystem({ state: this.state, eventBus: this.bus });

    // Large live mimic panels on the bulkheads, so a compartment tells you what
    // it is doing as you walk in rather than waiting to be clicked.
    this.displays = new WallDisplays({
      scene: this.scene, materials: this.materials, layout,
      state: this.state, flooding: this.flooding, halfWidth: HALF_W,
      collision: this.collision, voyage: this.voyage,
    });
    this.displays.build(this.world.root);
    this._shareDisplayFeeds();
    // Every wall panel is also something you can ask about: E on a screen opens
    // the physics behind what it is showing.
    this._worldInteractables.push(...this.displays.interactableRecords());
  }

  /** Put each compartment's feed onto the station consoles standing in it. */
  _shareDisplayFeeds() {
    for (const rec of this._worldInteractables) {
      if (rec.type !== 'station') continue;
      const screen = rec.object.userData?.screenMesh;
      const comp = rec.data?.compartment
        || this.layout.find((c) => rec.object.position.z >= c.zStart && rec.object.position.z < c.zEnd)?.id;
      const texture = this.displays.textureFor(comp);
      if (!screen || !texture) continue;
      screen.material = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false, fog: false });
    }
  }

  _initPlayerAndSystems() {
    this.player = new PlayerController({
      camera: this.camera, domElement: this.canvas, collision: this.collision,
      settings: this.settings, eventBus: this.bus,
    });
    this.player.attach();
    // The watchstander you are playing, visible when the camera drops back.
    this.body = new PlayerBody(this.scene);
    this.bus.on('player:viewChanged', (v) => this.body.setVisible(v === 'third'));

    this.interaction = new InteractionSystem({
      camera: this.camera, eventBus: this.bus,
      // In third person the camera is behind the player; reach is measured from
      // where the watchstander is actually standing.
      originProvider: () => (this.player.view === 'third' ? this.player.position : null),
    });
    this.interaction.registerAll(this._worldInteractables);

    this.inventory = new EquipmentInventory(this.bus, this.save);
    this.notebook = new Notebook({ eventBus: this.bus, save: this.save });
    this.instruments = new InstrumentManager({
      camera: this.camera, scene: this.scene, eventBus: this.bus, inventory: this.inventory,
      state: this.state, compartmentManager: this.compartments, notebook: this.notebook,
      player: this.player, flooding: this.flooding, world: this.world, layout: this.layout,
    });
    this.damageControl = new DamageControl({
      eventBus: this.bus, state: this.state, flooding: this.flooding, inventory: this.inventory,
      world: this.world, compartmentManager: this.compartments, instruments: this.instruments,
    });
    this.fireControl = new FireControl({
      eventBus: this.bus, state: this.state, fire: this.fire, atmosphere: this.atmosphere,
      inventory: this.inventory, world: this.world, compartmentManager: this.compartments,
    });
    this.stations = new StationManager({
      eventBus: this.bus, state: this.state, save: this.save, notebook: this.notebook,
      instruments: this.instruments, flooding: this.flooding, inventory: this.inventory,
      sonar: this.sonar, nav: this.nav, crew: this.crew, voyage: this.voyage,
      atmosphere: this.atmosphere, fire: this.fire,
    });
    this.missions = new MissionManager({
      eventBus: this.bus, state: this.state, save: this.save, compartmentManager: this.compartments,
      inventory: this.inventory, instruments: this.instruments, flooding: this.flooding,
      damageControl: this.damageControl, world: this.world, notebook: this.notebook,
      sonar: this.sonar, nav: this.nav, crew: this.crew, voyage: this.voyage,
      atmosphere: this.atmosphere, fire: this.fire, fireControl: this.fireControl,
    });
  }

  _initUI() {
    this.hud = new HUD({ eventBus: this.bus, state: this.state, flooding: this.flooding,
      crew: this.crew, voyage: this.voyage });
    // The science codex: every object, screen and console has an entry, and the
    // simulation is frozen while it is open (mode 'science' is not stepped).
    this.science = new ScienceCodex({ eventBus: this.bus, save: this.save });
    this.debrief = new Debrief({ eventBus: this.bus, notebook: this.notebook });
    this.hintBeacon = new HintBeacon({
      scene: this.scene, lighting: this.lighting, layout: this.layout, eventBus: this.bus,
    });
    this.bus.on('mission:hint', (h) => this._showHintTarget(h));
    // A beacon is for the objective you are on; clear it when that changes.
    this.bus.on('mission:stageStarted', () => this.hintBeacon.hide());
    this.settingsMenu = new SettingsMenu({ settings: this.settings, container: document.getElementById('settings-container') });
    this._populateMissionPicker();
  }

  /**
   * Turn a stage's `target` into a lit place. A target may name an interactable
   * (`{ interactable: 'handset_fwd' }`), a compartment (`{ compartment: 'sonar_room' }`),
   * or both; an interactable wins because it is the more specific answer to
   * "where do I go". Nothing here reveals anything the objective has not said.
   */
  _showHintTarget(hint) {
    const t = hint?.target;
    if (!t) { this.hintBeacon.hide(); return; }

    let position = null;
    let compartmentId = t.compartment || null;

    if (t.interactable) {
      const rec = this._worldInteractables.find((r) => r.id === t.interactable);
      if (rec) {
        position = new THREE.Box3().setFromObject(rec.object).getCenter(new THREE.Vector3());
        compartmentId = compartmentId
          || rec.data?.compartment
          || this.compartments.compartmentAtZ(position.z)?.id;
      }
    }
    if (!position && compartmentId) {
      const c = this.layout.find((x) => x.id === compartmentId);
      if (c) position = new THREE.Vector3(0, 0, c.zMid);
    }
    if (!position) { this.hintBeacon.hide(); return; }

    this.hintBeacon.show(position, compartmentId);

    // Tell the player which way, in words as well as light.
    const here = this.compartments.current;
    const there = this.layout.find((c) => c.id === compartmentId);
    if (there) {
      const where = !here || here.id === there.id
        ? `Here, in ${there.name} — look for the marked spot.`
        : `${there.zMid < here.zMid ? 'Forward' : 'Aft'} of you, in ${there.name}. Follow the marks.`;
      this.bus.emit('mission:hintLocation', { where, compartment: there.id });
    }
  }

  _populateMissionPicker() {
    const sel = document.getElementById('mission-select');
    if (!sel) return;
    sel.innerHTML = this.missions.list()
      .map((m) => `<option value="${m.id}">Unit ${m.unit} — ${m.title}</option>`).join('');
    sel.value = 'mission_04_flooding';
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
    // Turning in.
    this.bus.on('interact:bunk', () => this.crew.sleep());
    // A wall panel cannot be operated, but it can be explained.
    this.bus.on('interact:display', (rec) => this.science.show(`display:${rec.data.display}`));

    // Lockers open a stowage panel (StationManager) and deck plates, valves,
    // panels, the rupture, the sump and the 7MC are all handled by DamageControl.
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

    // The science codex sits on top of whatever it was opened from, and the world
    // is frozen behind it: reading how the sounding tape works should not cost you
    // a compartment.
    this.bus.on('science:opened', () => {
      if (this.mode === 'science') return;
      this._preScience = this.mode;
      this._enterOverlay('science');
    });
    this.bus.on('science:closed', () => {
      if (this.mode !== 'science') return;
      if (this._preScience === 'station' && this.stations.isOpen) this.mode = 'station';
      else if (this._preScience === 'paused' || this._preScience === 'menu') this.mode = this._preScience;
      else this._exitOverlay();
    });

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        if (this.mode === 'science') this.science.hide();
        else if (this.mode === 'station') this.stations.close();
        else if (this.mode === 'notebook') this.notebook.toggle(false);
        else if (this.mode === 'paused') this.resume();
        // (playing → Escape also releases pointer lock, handled above)
      }
      if (e.code === 'BracketLeft') this.inventory.cycle(-1);
      if (e.code === 'BracketRight') this.inventory.cycle(1);
      if (e.code === 'KeyH' && this.mode === 'playing') this.missions.hint();
      // Any mode except the start screen — a player who has just opened a console
      // and wants to see themselves should not have to guess that V is gated.
      if (e.code === 'KeyV' && this.mode !== 'menu') this.player.toggleView();
      if (e.code === 'KeyG' && this.mode !== 'menu') this._toggleScience();
      if (e.code === 'KeyK' && this.mode === 'playing') this._skipObjective();
      if (e.code === 'Space' && this.mode === 'playing') this.hud.dismissToast();
    });
    this.canvas.addEventListener('wheel', (e) => {
      if (this.mode === 'playing') this.inventory.cycle(e.deltaY > 0 ? 1 : -1);
    }, { passive: true });

    // Start screen / pause menu buttons.
    const picked = () => document.getElementById('mission-select')?.value || 'mission_01_walkdown';
    document.getElementById('btn-start').addEventListener('click', () => this.startGame(picked()));
    document.getElementById('btn-continue').addEventListener('click', () => this.startGame(picked()));
    document.getElementById('btn-debrief-continue')?.addEventListener('click', () => {
      this.debrief.hide();
      this.returnToCampaign();
    });
    document.getElementById('btn-settings').addEventListener('click', () => { this.settingsMenu.render(); this._openPauseFromMenu(); });
    document.getElementById('btn-resume').addEventListener('click', () => this.resume());
    document.getElementById('btn-skip-objective')?.addEventListener('click', () => {
      this._skipObjective();
      this.resume();
    });
    document.getElementById('btn-restart').addEventListener('click', () => { this.missions.restart(); this.resume(); });
    document.getElementById('btn-to-campaign').addEventListener('click', () => this.returnToCampaign());
    document.getElementById('btn-reset-progress').addEventListener('click', () => {
      if (confirm('Reset all Deep Watch progress? (This does not touch your RECKON course progress.)')) {
        this.save.reset();
        this.bus.emit('hud:toast', { concept: 'Progress reset', text: 'Deep Watch progress cleared.' });
      }
    });

    // Mission complete → after-action debrief.
    this.bus.on('mission:complete', (result) => {
      this.mode = 'debrief';
      this.player.setEnabled(false);
      this.interaction.setEnabled(false);
      this.player.exitLock();
      this.hud.show(false);
      this.debrief.show(result);
    });

    if (this.save.hasProgress()) document.getElementById('btn-continue').hidden = false;
  }

  /**
   * G — "why does this work". What it opens depends on where you are:
   * the console you are manning, the thing under the crosshair, or the index.
   */
  _toggleScience() {
    if (this.mode === 'science') { this.science.hide(); return; }
    if (this.mode === 'station' && this.stations.activeId) {
      const key = resolveScienceKey('station', this.stations.activeId);
      if (key && this.science.show(key)) return;
    }
    if (this.science.showLookedAt()) return;
    this.science.showIndex();
  }

  /** Step over the current objective (pause menu, or K while playing). */
  _skipObjective() {
    if (!this.missions.skipObjective()) {
      this.bus.emit('hud:toast', { concept: 'Nothing to skip', text: 'No mission objective is active.' });
    }
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
    this.debrief?.hide();
    this.hud.show(true);
    this.mode = 'playing';

    // Start the player where the mission says the watch is standing, on the
    // centreline near the aft end of that compartment, facing the bow. With the
    // movement math, yaw 0 looks down -Z (toward the bow).
    const def = this.missions.get(missionId);
    const startId = def?.startLocation || 'control_room';
    const room = this.layout.find((c) => c.id === startId) || this.layout[3];
    this.player.setPose(0, room.zEnd - 0.7, 0);
    this.compartments.currentId = null;
    this.compartments.update(this.player.position.z);

    this.player.setEnabled(true);
    this.interaction.setEnabled(true);
    this.player.requestLock();
    this.audio.start();

    this.missions.start(missionId);
    this.bus.emit('game:started', { missionId });

    // Say the view key out loud once. Nobody discovers a keybind by accident.
    if (!this._saidView) {
      this._saidView = true;
      setTimeout(() => this.bus.emit('hud:toast', {
        concept: 'Controls',
        text: 'Press V to drop the camera back and see the watchstander. G explains the science behind whatever you are looking at. H gives a hint and lights up where to go; N is your notebook.',
      }), 1500);
    }
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

  /**
   * Fixed-step physics. Subsystems write their own quantities into SubmarineState
   * first; `integrate()` then applies the cross-system couplings. Stations stay
   * "live" while open (a casualty does not pause because you are reading a gauge),
   * but the world is frozen while genuinely paused.
   */
  _fixedUpdate(dt) {
    if (this.mode === 'playing' || this.mode === 'station' || this.mode === 'notebook') {
      this.flooding.update(dt);
      this.sonar.update(dt);
      this.nav.update(dt);
      this.crew.update(dt);
      this.voyage.update(dt);
      this.atmosphere.update(dt);
      this.fire.update(dt);
      this.fireControl.update(dt);
      this.state.integrate(dt);
    }
  }

  _update(dt, t) {
    const playing = this.mode === 'playing';
    if (playing) {
      this.player.update(dt);
      this.interaction.update();
      this.compartments.update(this.player.position.z);
    }
    this.body.setVisible(this.player.view === 'third' && this.player._bodyVisible !== false);
    this.body.update(dt, this.player.position, this.player.yaw,
      Math.hypot(this.player.velocity.x, this.player.velocity.z), this.player._eye);
    this.instruments.update(dt, playing && this.player.velocity.lengthSq() > 0.5);
    this.world.update(dt, t);
    this.displays.update(dt, this.compartments.currentId);
    this.hintBeacon.update(dt, t, this.player.position);
    this.lighting.update(t);
    this.audio.update();
    this.hud.updateStatus();
    this.renderer.render(this.scene, this.camera);
  }
}
