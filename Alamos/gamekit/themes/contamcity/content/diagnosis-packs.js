// diagnosis-packs.js — six Protocol activities re-authored as Diagnosis.
//
// The design book defines four formats and Diagnosis is not one of them; it
// folds diagnostic work into Protocol ("a diagnostic or classification unit may
// use Protocol"). Protocol is a good matching exercise and a poor *differential*
// one: it hands the player four situations already paired one-to-one with four
// answers, so nothing has to be ruled out.
//
// These six keep the book's science and its correct conclusion, and change the
// task to the one Diagnosis exists to teach:
//
//   > The loud reading gets your attention. The right explanation fits the
//   > whole panel.
//
// So each pack carries the complete panel — the alarm *and* the quiet readings —
// five candidate explanations including one benign dismissal, and a figure,
// because a panel that has to be reasoned across cannot be read as prose.
//
// One per area of study, chosen where the underlying science genuinely is
// differential reasoning from instruments:
//
//   4.2  IDENT   is the peak real, or is it the blank?
//   5.2  QUANT   the number is outside the calibrated range
//   7.2  ENERGY  stored heat or a continuing reaction
//   9.2  WATER   what the titration curve knows that pH does not
//   12.1 TREAT   removed, or moved
//   13.2 GASES   made in the air, not released from the yard
//
// Science Tank was deliberately left alone: it teaches portfolio reasoning
// under a budget, which is not diagnosis and would be lost in the conversion.
//
// Each pack replaces the `game` object of its activity. Everything outside the
// game — the mission, the scene, the takeaway — still comes from the book.

export const DIAGNOSIS_PACKS = {

  // ——————————————————————————————————————————————— IDENT · Mission 4
  '4.2': {
    headline: 'A target compound is reported in the river sample at 3.1 minutes — and the laboratory blank has a peak in the same place.',
    play: 'One explanation has to fit the sample, the blank and the second-method result together. Which is it?',
    figure: {
      kind: 'peaks',
      xLabel: 'Retention time (minutes)', yLabel: 'Detector response',
      xMax: 10,
      caption: 'Chromatograms of the river sample and the method blank, run in the same sequence.',
      traces: [
        { name: 'River sample', peaks: [
          { at: 3.1, height: 62, width: 0.22 },
          { at: 5.4, height: 88, width: 0.30 },
          { at: 7.9, height: 34, width: 0.20 },
        ] },
        { name: 'Method blank', peaks: [
          { at: 3.1, height: 55, width: 0.22 },
        ] },
      ],
      peaks: [
        { at: 3.1, height: 62, label: 'also in blank', status: 'alarm' },
        { at: 5.4, height: 88, label: 'broad — two compounds?', status: 'high' },
        { at: 7.9, height: 34, label: 'sample only', status: 'normal' },
      ],
    },
    readings: [
      { zone: 'Sample', label: 'Peak at 3.1 min', value: '62 units', status: 'alarm',
        note: 'Retention time matches the reference standard.' },
      { zone: 'Blank', label: 'Peak at 3.1 min', value: '55 units', status: 'alarm',
        note: 'The blank should be empty. It is not.' },
      { zone: 'Sample', label: 'Peak at 5.4 min', value: '88 units, broad', status: 'high',
        note: 'Width is nearly double the standard — likely two compounds.' },
      { zone: 'Sample', label: 'Peak at 7.9 min', value: '34 units', status: 'normal',
        note: 'Absent from the blank. Spectrum matches its standard.' },
      { zone: 'Spectrometer', label: 'Spectrum at 3.1 min', value: 'does not match standard', status: 'high' },
      { zone: 'Instrument', label: 'Calibration check', value: 'within limits', status: 'normal',
        note: 'The instrument itself is behaving.' },
    ],
    choices: [
      { label: 'The 3.1-minute peak is laboratory contamination',
        mechanism: 'The blank carries the same peak at nearly the same size, so it entered during preparation — not from the river.' },
      { label: 'The river contains the target compound at 62 units',
        mechanism: 'Take the retention-time match at face value and report the sample result.' },
      { label: 'The detector is drifting',
        mechanism: 'A gain or baseline drift would inflate every peak in the run.' },
      { label: 'The 5.4-minute peak is the target, misassigned',
        mechanism: 'The broad peak is the largest, so it is the compound of interest.' },
      { label: 'Nothing is wrong; chromatograms always show small peaks',
        mechanism: 'Minor features are normal instrument noise and can be ignored.' },
    ],
    correctChoice: 'The 3.1-minute peak is laboratory contamination',
    why: 'A blank exists to answer exactly one question: did this signal come from the sample? Here it did not — the blank carries the same peak at nearly the same height, so the 3.1-minute response is contamination introduced during preparation. Retention time alone never confirms identity, and the spectrum at 3.1 minutes does not match the standard either. The one peak that survives every check is at 7.9 minutes: absent from the blank, with a matching spectrum.',
    rebuttals: [
      'Reporting 62 units treats a retention-time match as an identification. It is a screening match at best, and the blank has already shown where this peak came from.',
      'Detector drift would raise the whole baseline and every peak with it. The 7.9-minute peak is unaffected and the calibration check is within limits, so the instrument is not the problem.',
      'Size is not identity. The 5.4-minute peak is broad enough to be two co-eluting compounds, which makes it the least trustworthy peak to quantify, not the most.',
      'Dismissing the blank peak as noise discards the only control in the run. A blank peak at 89% of the sample peak is not noise; it is the answer.',
    ],
  },

  // ——————————————————————————————————————————————— QUANT · Mission 5
  '5.2': {
    headline: 'The river sample reads 1.34 absorbance. The highest calibration standard reads 0.98.',
    play: 'The instrument returned a number. Which explanation fits the calibration, the blank and the spike together?',
    figure: {
      kind: 'line',
      xLabel: 'Concentration of standard (mg/L)', yLabel: 'Absorbance',
      caption: 'Today’s calibration curve, with the sample’s absorbance drawn across it.',
      limit: { at: 0.98, label: 'top standard' },
      series: [
        { name: 'Standards', points: [[0, 0.01], [2, 0.20], [4, 0.40], [6, 0.60], [8, 0.79], [10, 0.98]] },
        { name: 'This sample', points: [[0, 1.34], [10, 1.34]] },
      ],
    },
    readings: [
      { zone: 'Sample', label: 'Absorbance', value: '1.34', status: 'alarm',
        note: 'Above every standard on the curve.' },
      { zone: 'Calibration', label: 'Highest standard', value: '0.98 at 10 mg/L', status: 'normal' },
      { zone: 'Calibration', label: 'Curve linearity', value: 'r² = 0.999 to 10 mg/L', status: 'normal',
        note: 'The curve is excellent — within the range it covers.' },
      { zone: 'Blank', label: 'Calibration blank', value: '0.01 absorbance', status: 'normal',
        note: 'Clean. No contamination baseline.' },
      { zone: 'QC', label: 'Matrix spike recovery', value: '97%', status: 'normal',
        note: 'The river matrix is not suppressing the signal.' },
      { zone: 'QC', label: 'Replicate scatter', value: '±1.5%', status: 'normal',
        note: 'Precision is fine. The result is repeatable.' },
    ],
    choices: [
      { label: 'The result is outside the calibrated range',
        mechanism: 'Above the top standard the instrument response is unverified, so converting 1.34 to a concentration extrapolates a relationship nobody measured.' },
      { label: 'Matrix interference is inflating the reading',
        mechanism: 'Something in the river water adds absorbance the analyte did not produce.' },
      { label: 'The blank is contaminated',
        mechanism: 'A dirty baseline lifts every reading in the batch.' },
      { label: 'The measurement is imprecise and should be repeated',
        mechanism: 'Scattered replicates mean the number cannot be trusted as it stands.' },
      { label: 'The reading is fine; report 13.7 mg/L by extending the line',
        mechanism: 'The curve is linear with r² = 0.999, so it can be extended past the last standard.' },
    ],
    correctChoice: 'The result is outside the calibrated range',
    why: 'Every quality control on this panel is clean: the blank is at 0.01, spike recovery is 97%, replicates agree to 1.5%, and the curve is linear across the range it actually covers. Nothing is wrong with the measurement — the problem is that 1.34 lies beyond the last point anyone verified. Detectors saturate, and linearity is a property of a measured interval, not a promise about everything above it. Dilute the sample into the calibrated range and re-run it.',
    rebuttals: [
      'Matrix interference would show as poor spike recovery. Recovery is 97%, so the river matrix is behaving.',
      'A contaminated blank would read high. This one reads 0.01, and it would in any case lift the standards along with the sample.',
      'Imprecision would show as replicate scatter. These agree to ±1.5%; the result is repeatable, it is simply repeatable and unverified.',
      'Extending the line past the last standard is the specific mistake this panel is built around. r² = 0.999 describes the fit between 0 and 10 mg/L and says nothing about 13.7.',
    ],
  },

  // ——————————————————————————————————————————————— ENERGY · Mission 7
  '7.2': {
    headline: 'Ninety minutes after cooling was shut off, the west bay is still climbing — and it has crossed the confined-entry limit.',
    play: 'Fire Command needs to know whether this is heat left over from the fire or a reaction still running. Which explanation fits every zone?',
    figure: {
      kind: 'line',
      xLabel: 'Minutes since cooling stopped', yLabel: 'Temperature (°C)',
      caption: 'Bulk temperature in the two storage bays after external cooling was withdrawn.',
      limit: { at: 85, label: 'entry limit' },
      series: [
        { name: 'West bay', points: [[0, 61], [15, 66], [30, 72], [45, 78], [60, 84], [75, 90], [90, 96]] },
        { name: 'East bay', points: [[0, 58], [15, 54], [30, 50], [45, 47], [60, 44], [75, 42], [90, 40]] },
        { name: 'Ambient', points: [[0, 24], [15, 24], [30, 23], [45, 23], [60, 23], [75, 22], [90, 22]] },
      ],
      marks: [{ x: 0, label: 'cooling stopped' }],
    },
    readings: [
      { zone: 'West bay', label: 'Bulk temperature', value: '96 °C, rising 0.4 °C/min', status: 'alarm',
        note: 'Rising steadily with no external heat applied.' },
      { zone: 'East bay', label: 'Bulk temperature', value: '40 °C, falling', status: 'normal',
        note: 'Cooling toward ambient, as stored heat does.' },
      { zone: 'West bay', label: 'Off-gas', value: 'detectable and increasing', status: 'high',
        note: 'A gas is being produced, not merely warmed.' },
      { zone: 'West bay', label: 'Hot spot position', value: 'stationary at the drum stack', status: 'high',
        note: 'It has not moved with fluid circulation.' },
      { zone: 'Ambient', label: 'Air temperature', value: '22 °C', status: 'normal' },
      { zone: 'Instruments', label: 'Sensor calibration', value: 'all four share one reference', status: 'high',
        note: 'A shared reference is a shared failure mode — but it would move both bays together.' },
    ],
    choices: [
      { label: 'An exothermic reaction is still running in the west bay',
        mechanism: 'Temperature rises after the heat source is removed, off-gas is increasing, and the hot spot is fixed at the material — heat is being generated, not stored.' },
      { label: 'Stored heat from the fire is still dissipating',
        mechanism: 'A large thermal mass takes hours to give up the heat it absorbed.' },
      { label: 'The temperature sensors are miscalibrated',
        mechanism: 'All four share one calibration reference, so one bad reference would corrupt every reading.' },
      { label: 'Hot fluid circulation is carrying heat into the west bay',
        mechanism: 'Convection moves a hot region around the bay and can make one sensor read high.' },
      { label: 'Nothing unusual; bays always differ after a fire',
        mechanism: 'Two bays exposed to the same fire will cool at different rates.' },
    ],
    correctChoice: 'An exothermic reaction is still running in the west bay',
    why: 'Stored heat can only leave. Once the external source is gone, a hot mass falls toward ambient — which is exactly what the east bay does. The west bay does the opposite, and it does so while producing off-gas from a hot spot that has not moved. Heat that increases with no source is heat being made. The distinction matters because cooling has to out-run generation, not merely carry away a fixed quantity, and the entry limit has already been crossed.',
    rebuttals: [
      'Stored heat is the explanation the east bay fits, and it is why the east bay is the control. A stored-heat curve cannot rise after the source is withdrawn.',
      'The shared calibration reference is a real common-mode risk and worth fixing, but it would push both bays the same way. West rises while east falls, so the divergence is physical rather than instrumental.',
      'Circulation moves a hot region around. This hot spot is stationary at the drum stack, and convection cannot add energy to a closed bay in any case.',
      'Two bays cooling at different rates is ordinary. One bay heating while the other cools is not, and treating it as ordinary is how a crew gets sent into a confined space.',
    ],
  },

  // ——————————————————————————————————————————————— WATER · Mission 9
  '9.2': {
    headline: 'The intake reads pH 4.6. Dosing for a strong acid at that pH overshoots badly on the trial batch.',
    play: 'The titration curve is on screen. Which explanation accounts for the plateau, the equivalence point and the dose the trial actually needed?',
    figure: {
      kind: 'line',
      xLabel: 'Base added (mL)', yLabel: 'pH',
      caption: 'Titration of the intake water with standard base. The dashed line marks neutral pH.',
      limit: { at: 7.0, label: 'pH 7' },
      series: [
        { name: 'Intake water', points: [
          [0, 3.4], [4, 4.1], [8, 4.5], [12, 4.7], [16, 4.9], [20, 5.2], [23, 5.9],
          [25, 8.4], [27, 10.1], [32, 10.8], [40, 11.2]] },
        { name: 'Strong acid, same pH', points: [
          [0, 4.6], [2, 4.9], [4, 5.4], [5, 8.9], [6, 10.4], [10, 11.0], [20, 11.3], [40, 11.6]] },
      ],
    },
    readings: [
      { zone: 'Intake', label: 'pH', value: '4.6', status: 'alarm',
        note: 'The headline number, and the one that misled the dose.' },
      { zone: 'Titration', label: 'Plateau from 4 to 20 mL', value: 'pH moves 4.1 → 5.2', status: 'high',
        note: 'Sixteen millilitres of base for one pH unit.' },
      { zone: 'Titration', label: 'Equivalence point', value: 'pH 8.4', status: 'high',
        note: 'Above 7, not at it.' },
      { zone: 'Titration', label: 'Base to equivalence', value: '25 mL', status: 'alarm',
        note: 'Five times what the strong-acid reference needed.' },
      { zone: 'Reference', label: 'Strong acid at the same pH', value: '5 mL to equivalence', status: 'normal' },
      { zone: 'Bench', label: 'Electrode calibration', value: 'pH 4 and 7 buffers within 0.02', status: 'normal',
        note: 'The pH reading itself is trustworthy.' },
    ],
    choices: [
      { label: 'The water contains a weak acid and its buffer system',
        mechanism: 'A long plateau, an equivalence point above pH 7 and five times the expected base demand are what a weak acid does — pH shows the free H⁺, not the reservoir behind it.' },
      { label: 'The intake is a strong acid at pH 4.6',
        mechanism: 'Read the pH, calculate the free hydrogen ion, and dose to match it.' },
      { label: 'The pH electrode is out of calibration',
        mechanism: 'A drifting electrode would explain why the dose calculated from pH was wrong.' },
      { label: 'The base used for dosing is more concentrated than labelled',
        mechanism: 'An over-strength reagent would overshoot regardless of the water chemistry.' },
      { label: 'Nothing unusual; treatment always needs a safety factor',
        mechanism: 'Operators routinely add extra base to be sure of neutralising.' },
    ],
    correctChoice: 'The water contains a weak acid and its buffer system',
    why: 'pH measures the hydrogen ion that is free right now. A weak acid keeps most of its acidity in reserve, undissociated, and releases it as base is added — which is what the sixteen-millilitre plateau is. The equivalence point above pH 7 confirms it: the conjugate base left at the end is itself basic. That is why the water needed five times the base a strong acid at the same pH would, and why a dose calculated from pH alone first under-treats and then, once the buffer is exhausted, overshoots into strongly basic conditions.',
    rebuttals: [
      'A strong acid at pH 4.6 is the reference curve on the same axes, and it reaches equivalence at 5 mL with a sharp rise and no plateau. The intake does neither.',
      'The electrode was calibrated against pH 4 and 7 buffers to within 0.02. The pH reading is correct — it is simply answering a different question from the one the dose needed.',
      'An over-strength base would overshoot, but it would also shorten the titration. This titration took five times *more* base than expected, not less.',
      'A safety factor is a policy, not a mechanism, and it cannot explain a plateau, an equivalence point at 8.4, or a five-fold demand. Adding margin on top of a misread curve is how the overshoot happened.',
    ],
  },

  // ——————————————————————————————————————————————— TREAT · Mission 12
  '12.1': {
    headline: 'Treated water is down to 6 kg of the 100 kg that went in. The plant is being described as 94% effective.',
    play: 'Read the mass balance across every stream, not just the one the city is asking about.',
    figure: {
      kind: 'bars',
      yLabel: 'Contaminant mass (kg)',
      caption: 'Mass balance across the pilot treatment train for one campaign.',
      bars: [
        { name: 'Influent', value: 100, display: '100 kg', status: 'normal' },
        { name: 'Treated water', value: 6, display: '6 kg', status: 'normal' },
        { name: 'Sludge', value: 71, display: '71 kg', status: 'high' },
        { name: 'Off-gas', value: 3, display: '3 kg', status: 'normal' },
        { name: 'Unaccounted', value: 20, display: '20 kg', status: 'alarm' },
      ],
    },
    readings: [
      { zone: 'Water', label: 'Contaminant out', value: '6 kg of 100 kg', status: 'normal',
        note: 'The number the city is being quoted.' },
      { zone: 'Sludge', label: 'Contaminant in solids', value: '71 kg', status: 'high',
        note: 'Now a waste stream that needs a destination.' },
      { zone: 'Off-gas', label: 'Volatilised', value: '3 kg', status: 'normal' },
      { zone: 'Balance', label: 'Unaccounted mass', value: '20 kg', status: 'alarm',
        note: 'Not measured in any stream that was sampled.' },
      { zone: 'Byproduct bench', label: 'Transformation product', value: 'detected, no validated standard', status: 'high',
        note: 'Present, but not quantifiable yet — so it falls outside the balance.' },
      { zone: 'Plant', label: 'Flow and residence time', value: 'at design values', status: 'normal',
        note: 'The unit is operating as specified.' },
    ],
    choices: [
      { label: 'The contaminant was moved, not destroyed',
        mechanism: 'Only 3 kg left as gas. 71 kg is in sludge and 20 kg is unaccounted for — most likely as the transformation product the bench can see but cannot yet quantify.' },
      { label: 'The treatment destroyed 94% of the contaminant',
        mechanism: 'Influent minus effluent is the removal efficiency.' },
      { label: 'The plant is running outside its design conditions',
        mechanism: 'Off-spec flow or residence time would explain an unexpected result.' },
      { label: 'The influent measurement was too high',
        mechanism: 'An overstated input would create an apparent gap at the end.' },
      { label: 'The 20 kg gap is normal measurement uncertainty',
        mechanism: 'No mass balance closes exactly; a small shortfall is expected.' },
    ],
    correctChoice: 'The contaminant was moved, not destroyed',
    why: 'Removal from water and destruction are different claims, and this balance only supports the first. Seventy-one kilograms are in sludge — a solid that now needs a destination, and that will release the contaminant again if it meets acidic water. A further twenty are unaccounted for, and the byproduct bench has already seen a transformation product it cannot yet quantify, which is the most likely home for them. A treatment is judged on its complete chemical consequences, not on the one stream the public is asking about.',
    rebuttals: [
      'Ninety-four per cent is a true statement about the water and a false one about the contaminant. Destruction would show as loss to a measured, benign product — not as 71 kg of solids.',
      'Flow and residence time are at design values, so the plant is doing exactly what it was built to do. That is the point: this is the designed outcome, not a malfunction.',
      'An overstated influent would open a gap, but it cannot put 71 kg into the sludge. The solids were weighed and analysed independently.',
      'Twenty per cent is not measurement uncertainty. Calling it that is how a transformation product leaves a plant unmeasured and turns up downstream.',
    ],
  },

  // ——————————————————————————————————————————————— GASES · Mission 13
  '13.2': {
    headline: 'The yard was sealed at 06:00 and primary vapour has fallen all day — but the neighbourhood monitor peaked at 15:00.',
    play: 'The source is controlled and exposure went up. Which explanation fits the whole day, at both monitors?',
    figure: {
      kind: 'line',
      xLabel: 'Hour of day', yLabel: 'Concentration (ppb)',
      caption: 'Primary vapour at the yard fence and secondary product at the neighbourhood monitor, the day after the source was sealed.',
      marks: [{ x: 6, label: 'source sealed' }, { x: 13, label: 'peak sunlight' }],
      series: [
        { name: 'Primary vapour', points: [[0, 42], [4, 40], [6, 38], [9, 27], [12, 18], [15, 11], [18, 7], [21, 5], [24, 4]] },
        { name: 'Secondary product', points: [[0, 3], [4, 3], [6, 4], [9, 12], [12, 26], [15, 34], [18, 21], [21, 9], [24, 5]] },
        { name: 'Inert tracer', points: [[0, 10], [4, 10], [6, 10], [9, 10], [12, 10], [15, 10], [18, 10], [21, 10], [24, 10]] },
      ],
    },
    readings: [
      { zone: 'Neighbourhood', label: 'Secondary product', value: '34 ppb at 15:00', status: 'alarm',
        note: 'Highest reading of the day, nine hours after the source was sealed.' },
      { zone: 'Yard fence', label: 'Primary vapour', value: '11 ppb and falling', status: 'normal',
        note: 'Down from 42 ppb. The source control is working.' },
      { zone: 'Neighbourhood', label: 'Overnight behaviour', value: 'persists, then falls after sunrise', status: 'high' },
      { zone: 'Sky', label: 'Solar radiation', value: 'clear; peak at 13:00', status: 'normal' },
      { zone: 'All monitors', label: 'Inert tracer', value: '10 ppb, flat all day', status: 'normal',
        note: 'A shared artefact would move this. It has not.' },
      { zone: 'All monitors', label: 'Inlet material', value: 'identical across the network', status: 'high',
        note: 'A common-mode risk worth noting — but the tracer rules it out today.' },
    ],
    choices: [
      { label: 'Sunlight is converting the remaining vapour into a secondary product',
        mechanism: 'The product rises as the primary falls, peaks two hours after peak sun, and appears downwind rather than at the fence.' },
      { label: 'A second, uncontrolled release has started',
        mechanism: 'A new source would explain rising concentrations in the neighbourhood.' },
      { label: 'The monitors share an inlet artefact',
        mechanism: 'Identical inlet material across the network can generate the same false signal everywhere.' },
      { label: 'The wind reversed and carried the plume back over the neighbourhood',
        mechanism: 'A wind shift moves the corridor without changing the chemistry.' },
      { label: 'Exposure is over; the source is sealed and the primary vapour is falling',
        mechanism: 'Once the release stops, the hazard decays with it.' },
    ],
    correctChoice: 'Sunlight is converting the remaining vapour into a secondary product',
    why: 'The two traces are mirror images with sunlight between them: the product climbs while the primary falls, peaks about two hours after solar maximum, decays overnight and drops again after sunrise. That is formation in the atmosphere, not release from the ground — which is why it is highest downwind rather than at the fence. Controlling a source ends the release; it does not end the chemistry, and the exposure that matters to the neighbourhood arrived after the yard was already sealed.',
    rebuttals: [
      'A second release would raise the primary vapour at the fence. It fell all day, from 42 ppb to 11.',
      'A shared inlet artefact is a genuine common-mode risk and the reason the inert tracer is on the network. The tracer held flat at 10 ppb all day, so the instruments are reporting real air.',
      'A wind reversal moves material, it does not create it. It cannot explain why the downwind compound is one the yard never released, or why it tracks the sun.',
      'This is the conclusion the panel is built to refute. The source is sealed, the primary is falling, and today’s highest exposure still happened at 15:00 — nine hours later.',
    ],
  },
};
