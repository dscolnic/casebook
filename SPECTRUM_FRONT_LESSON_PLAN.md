# SPECTRUM FRONT — Lesson Plan

*What the player should learn in each level, and with which instruments.*
Companion to `battlefield_spectrum_fps.html`. This is the pedagogical spine: every mission is
built so the learning is **load-bearing** — you cannot complete it without doing the sensor work
and answering evidence-grounded decisions.

---

## The four instruments — each answers one question

| Instrument | Key | The question it answers | What it teaches |
|---|---|---|---|
| **Spectrum Analyzer** | `2` | *What is on the air, and where?* | Center frequency, span, received **power (dBm)**, the **noise floor**, **bandwidth** (width ≠ height), and **duty cycle / pattern** (continuous vs burst vs periodic). |
| **Directional Antenna** | `3` | *Which direction is it?* | Taking a **bearing**, **triangulation** from separated positions, and recognizing **multipath** (reflections faking a direction). |
| **Near-Field Probe** | `4` | *Real signal, or leakage?* | Up close, separates an **intended modulated carrier** from **unintended electronic noise** (switching supplies, motor controllers, LED drivers). |
| **Network Tablet** | `5` | *How healthy is OUR link?* | Friendly, **authorized** network only — link quality, packet loss, latency, **acknowledgements** (request–response), and your own **network centrality / signature**. |

**Defensive weapon** (`1`) exists for proportional force in the final mission — it is deliberately *not* how most problems are solved.

---

## Level-by-level lessons

### Mission 1 — “The Room Is Alive” · Forward Operating Base
**Instruments:** Spectrum Analyzer → Near-Field Probe
**Scenario:** A new ops center hums with signals; one is frying the staff’s screens. Find the culprit — it is *not* a radio.

**Core lessons**
- Read a spectrum: **center frequency, span, power, noise floor**.
- A signal only counts if it rises clearly **above the noise floor**.
- **Bandwidth is width, not height** — a tall narrow peak is one channel; a wide lumpy rise is broadband noise.
- **Continuous vs burst** timing is a fingerprint.
- **Intended vs unintended emission:** clean carriers are meant to be there; broadband hash and harmonic combs are electronics *leaking*.

**Which instrument does what**
- *Analyzer* — survey the band, compare peak shapes, spot the always-on broadband source.
- *Probe* — confirm at close range that the source has **no modulation** (noise, not a transmitter).

**Decision points (the assessment)**
1. *Which source is the interference?* → the broadband, always-on, harmonic source — **not** the loudest narrow peak.
2. *Transmitter or faulty electronics?* → faulty electronics (a damaged LED power controller); an unintended emission.

**Misconception to dispel:** “The loudest peak is the problem.” (Loud ≠ interfering; shape matters.)

---

### Mission 2 — “What Is the Device Doing?” · Industrial Yard
**Instruments:** Spectrum Analyzer → Network Tablet
**Scenario:** A remote pump transmits irregularly. Is it working, reconnecting, or failing?

**Core lessons**
- **State inference from behavior** — you diagnose a device’s *state*, not just its presence.
- **Periodicity & request–response timing:** steady periodic reports look healthy; ragged short bursts with silence mean it is *trying to connect*.
- **Correlation vs causation** and stating your **confidence**.

**Which instrument does what**
- *Analyzer* — sample the pump over time to capture its burst/silence timing.
- *Tablet* — check whether a link is actually **established** (are there acknowledgements?).

**Decision points**
1. *Read the timing* → repeated short bursts = **reconnecting**, not streaming, not physically failing.
2. *What does the tablet add?* → no established link + **zero acks** confirms “reconnecting,” not jamming.

**Misconception to dispel:** “Erratic output means the device is dying / must be destroyed.” (A comms pattern tells you link state, not hardware health.)

---

### Mission 3 — “Find the Emitter” · Damaged Residential Block & Market
**Instruments:** Spectrum Analyzer → Directional Antenna → Near-Field Probe
**Scenario:** An unknown ~434 MHz beacon appears after civilians evacuate. Locate and classify it.

**Core lessons**
- **A bearing is a line, not a point** — you need **three bearings from separated positions** to triangulate.
- **Multipath:** urban reflections can produce a *stronger, wrong* direction; reposition before trusting a bearing.
- **Localization uncertainty:** crossing lines define a *region*, then you confirm by inspection.
- **Unknown ≠ hostile** — classify before you act.

**Which instrument does what**
- *Analyzer* — pin the exact frequency to listen on (you cannot bear a signal you cannot identify).
- *Directional Antenna* — rotate to the peak at three separate spots; watch for the reflected outlier.
- *Probe* — at the crossing point, inspect the device to classify it.

**Decision points**
1. *Trust the bearing?* → discard the reflected outlier taken beside a metal wall; keep the two consistent bearings.
2. *Classify before acting* → a forgotten **civilian environmental monitor** — leave it.

**Misconception to dispel:** “One strong bearing points at the source,” and “unknown means hostile.”

---

### Mission 4 — “Interference at the Aid Station” · Medical Aid Station
**Instruments:** Spectrum Analyzer → Network Tablet
**Scenario:** Patient telemetry drops whenever the logistics team keys up nearby. Diagnose and fix it.

**Core lessons**
- **Interference diagnosis:** tell apart weak coverage, **adjacent-channel overload / receiver overload**, and plain **equipment failure** — and none of these is “jamming.”
- **Controlled testing:** reproduce the fault on demand (it fails *only* when the neighbor is hot).
- **Verify after repair:** a fix is not done until you *measure* restored service.

**Which instrument does what**
- *Analyzer* — capture the medical link while degraded; compare its **occupied bandwidth / channel spacing** to the loud logistics link.
- *Tablet* — after retuning, confirm the medical node is healthy again.

**Decision points**
1. *Name the failure mode* → **adjacent-channel overload** (fails only near the loud neighbor; hardware fine alone).
2. *Prove the repair* → **verify on the tablet**, don’t assume; don’t just crank up power.

**Misconception to dispel:** “It’s broken hardware” or “it’s enemy jamming.” (It is self-inflicted, adjacent-channel interference.)

---

### Mission 5 — “What Are We Revealing?” · Communications Ridge & FOB
**Instruments:** Network Tablet (primary)
**Scenario:** A passive observer has located the command post. Reduce your signature without dropping the link.

**Core lessons**
- **Electromagnetic signature & metadata:** everything you transmit is observable.
- **Network centrality:** the **highest-power, highest-traffic** node advertises your command post.
- **Power discipline:** transmit only as loud as you must.
- **Functionality vs observability:** keep the link working while being seen as little as possible — the two trade off.

**Which instrument does what**
- *Tablet* — examine your own traffic “as the enemy would,” identify the most conspicuous node (power × centrality), and confirm the link survives after you turn it down.

**Decision points**
1. *Spot the giveaway* → the high-power, high-traffic **relay beacon** (not the nearest node, not a quiet sensor).
2. *What did cutting power achieve?* → **same function, smaller signature.**

**Misconception to dispel:** “Be safe — shut the whole network down,” or “overpower the observer with more transmit power.”

---

### Mission 6 — “Detection Is Not Control” · Enemy OP & Utility Compound
**Instruments:** Spectrum Analyzer → Near-Field Probe
**Scenario:** Four devices emit. Leadership asks which can be controlled.

**Core lessons — the full chain**
`detect → identify → locate → decode → address → authenticate → authorize → control → acknowledge`
- **Emitting is transmitting, not receiving.** Detection proves energy is present; it does **not** prove a device has a receiver or accepts your authority.
- Only an **authenticated** device with a **receiver** that accepts authorization can be commanded.

**Which instrument does what**
- *Analyzer* — detect and identify all four devices.
- *Probe* — inspect each for **receive activity**; the transmit-only beacon shows none, the authorized rover shows two-way authenticated traffic.

**Decision points**
1. *Which can be controlled?* → only the **authenticated rover**; the **transmit-only beacon** has no receiver.
2. *The claim from leadership* → reject “every emitter we detect can be controlled.”

**Misconception to dispel:** “If it emits, we can command it.”

---

### Mission 7 — “Spectrum Front” (Final) · Entire Battlefield
**Instruments:** all four + the defensive weapon
**Scenario:** A coordinated assault and a comms crisis at once. Triage, preserve critical services, locate a moving emitter, avoid unnecessary force.

**Core lessons (synthesis)**
- **Triage under pressure:** protect critical services (medical uptime) **before** chasing threats.
- **Moving-emitter localization:** a moving source needs *repeated* bearings; a single fix goes stale.
- **Interference vs failure vs jamming:** distinguish real interference from ordinary equipment failure and from claimed “jamming.”
- **Friendly-signature discipline** under fire.
- **Proportional force:** engage only valid armed threats — never civilian or friendly equipment.

**Which instrument does what**
- *Tablet / repair* — restore medical telemetry first.
- *Directional Antenna* — track the **moving** hostile command transmitter (re-bear as it moves).
- *Tablet + relay* — cut the relay beacon power to shrink your signature.
- *Weapon* — armed hostiles/drones only, after identification.

**Decision points**
1. *Triage the crisis* → restore **medical telemetry first**.
2. *Interference or jamming?* → **not jamming** — adjacent-channel interference plus a narrow hostile command link.

**Misconception to dispel:** “It’s full-spectrum jamming — use overwhelming force,” and “everything emitting is hostile.”

---

## Concept → where it is taught

| Concept | Introduced | Reinforced |
|---|---|---|
| Frequency, span, power, noise floor | M1 | every mission |
| Bandwidth (width ≠ peak height) | M1 | M4 |
| Continuous / burst / periodic (duty cycle) | M1 | M2 |
| Intended vs unintended emission | M1 | M6 |
| State inference & periodicity | M2 | M7 |
| Request–response / acknowledgements | M2 | M4, M5 |
| Bearing & triangulation | M3 | M7 |
| Multipath | M3 | — |
| Unknown ≠ hostile | M3 | M6, M7 |
| Interference types / adjacent-channel overload | M4 | M7 |
| Verify after repair | M4 | M7 |
| EM signature, centrality, power discipline | M5 | M7 |
| Detection ≠ control (the 9-step chain) | M6 | M7 |
| Triage & proportional force | M7 | — |

---

## Teaching mechanics in-game (how the lessons are delivered)
- **Guided bar** names the next action and the concept behind it (default mode).
- **Live “signal read”** explains, in plain English, what any source you point at actually is.
- **Field decisions** — two evidence-grounded questions per mission with right/wrong explanations (press `G`).
- **Lesson cards** pop the first time each idea appears; the **Concept Codex** (`K`) is the full reference, anytime.
- **After-action report** ties the outcome to what actually happened, not a generic “correct.”

*No disconnected quiz screens: every question references the player’s own measurements.*
