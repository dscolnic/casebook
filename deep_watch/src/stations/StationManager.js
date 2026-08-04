import { SonarConsole } from './SonarConsole.js';
import { NavigationTable } from './NavigationTable.js';
import { ControlRoomPanel } from './ControlRoomPanel.js';
import { EngineeringPanel } from './EngineeringPanel.js';
import { ElectricalSwitchboard } from './ElectricalSwitchboard.js';
import { RadioConsole } from './RadioConsole.js';
import { DamageControlBoard } from './DamageControlBoard.js';
import { EquipmentLockerPanel } from './EquipmentLockerPanel.js';
import { StudyDesk } from './StudyDesk.js';
import { PassageChart } from './PassageChart.js';

/**
 * StationManager — opens the correct console overlay when the player mans a
 * station (or opens a damage-control locker), owns its lifecycle, and closes it
 * on Esc / "step back". While a station is open, player movement is disabled and
 * the pointer is unlocked so the DOM console is usable.
 */
const STATIONS = {
  sonar: { title: 'Sonar Room', klass: SonarConsole },
  navigation: { title: 'Navigation Table', klass: NavigationTable },
  control: { title: 'Ship Control', klass: ControlRoomPanel },
  engineering: { title: 'Machinery Control', klass: EngineeringPanel },
  electrical: { title: 'Electrical Switchboard', klass: ElectricalSwitchboard },
  radio: { title: 'Radio & Communications', klass: RadioConsole },
  dc_board: { title: 'Damage-Control Plotting Board', klass: DamageControlBoard },
  dc_locker: { title: 'Damage-Control Locker', klass: EquipmentLockerPanel },
  study_desk: { title: 'Qualification Card', klass: StudyDesk },
  passage_chart: { title: 'Passage Plot', klass: PassageChart },
};

export class StationManager {
  constructor({ eventBus, state, save, notebook, instruments, flooding, inventory, sonar, nav, crew, voyage }) {
    this.bus = eventBus;
    this.ctx = { bus: eventBus, state, save, notebook, instruments, flooding, inventory, sonar, nav, crew, voyage };
    this.overlay = document.getElementById('station-overlay');
    this.titleEl = document.getElementById('station-title');
    this.bodyEl = document.getElementById('station-body');
    this.active = null;
    this.activeId = null;

    this.bus.on('interact:station', (rec) => this.open(rec.data.station, rec.data));
    this.bus.on('interact:locker', (rec) => this.open('dc_locker', rec.data));
    document.getElementById('btn-close-station')?.addEventListener('click', () => this.close());
  }

  open(stationId, data = {}) {
    const def = STATIONS[stationId];
    if (!def || this.active) return;
    this.active = new def.klass({ ...this.ctx, data });
    this.activeId = stationId;
    this.titleEl.textContent = data.label || def.title;
    this.bodyEl.innerHTML = '';
    this.overlay.hidden = false;
    this.active.render(this.bodyEl);
    this.bus.emit('station:opened', { stationId, data });
  }

  close() {
    if (!this.active) return;
    const id = this.activeId;
    this.active.dispose?.();
    this.active = null;
    this.activeId = null;
    this.overlay.hidden = true;
    this.bodyEl.innerHTML = '';
    this.bus.emit('station:closed', { stationId: id });
  }

  get isOpen() { return !!this.active; }
}
