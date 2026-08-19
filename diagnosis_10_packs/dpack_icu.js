// Diagnosis data pack — generated for the Diagnosis engine.
module.exports = { PACK: {
  "id": "icu",
  "title": "Shock Room",
  "domain": "ICU hemodynamic diagnosis",
  "role": "You are the intensivist reviewing a patient whose blood pressure is collapsing.",
  "system": {
    "parts": [
      [
        "Heart pump",
        "Cardiac output depends on heart rate and stroke volume. A failing ventricle produces low forward flow even when filling pressures are high."
      ],
      [
        "Circulating volume",
        "Blood loss or severe fluid loss empties the venous reservoir, lowering filling pressure and cardiac output while the body constricts vessels."
      ],
      [
        "Vascular tone",
        "Sepsis and some medications dilate resistance vessels. Early distributive shock can have low pressure despite a normal or high cardiac output."
      ],
      [
        "Lungs and venous circuit",
        "Pulmonary edema and a high central venous pressure support pump failure; clear lungs and a low central venous pressure favor volume loss or vasodilation."
      ],
      [
        "Perfusion markers",
        "Lactate, urine output, skin temperature, infection evidence, and hemoglobin show whether low pressure is causing organ hypoperfusion and why."
      ]
    ],
    "soWrong": "So the same low blood pressure can come from a weak pump, an empty tank, or vessels that are too dilated. The diagnosis comes from matching pressure to flow, filling, resistance, and the quieter evidence of where perfusion is failing."
  },
  "salient": [
    "cvp",
    "ci"
  ],
  "readings": {
    "map": {
      "name": "Mean arterial pressure",
      "purpose": "Average arterial pressure; around 65 mmHg is often used as a minimum initial perfusion target in shock. It falls in all four candidates and therefore announces danger without naming the cause.",
      "pin": {
        "x": 130,
        "y": 95
      },
      "zone": "arterial"
    },
    "cvp": {
      "name": "Central venous pressure",
      "purpose": "Pressure near the right atrium, normally about 2–8 mmHg. It is high when blood backs up behind a failing heart and low when volume is depleted or vessels are dilated.",
      "pin": {
        "x": 220,
        "y": 185
      },
      "zone": "venous"
    },
    "ci": {
      "name": "Cardiac index",
      "purpose": "Heart output adjusted for body size, normally about 2.5–4.0 L/min/m². Low values indicate inadequate pump flow; early distributive states can preserve or raise output.",
      "pin": {
        "x": 300,
        "y": 150
      },
      "zone": "heart"
    },
    "svr": {
      "name": "Systemic vascular resistance",
      "purpose": "Calculated resistance to forward blood flow, normally roughly 800–1,200 dyn·s/cm⁵. It rises with compensatory vasoconstriction and falls with distributive vasodilation.",
      "pin": {
        "x": 400,
        "y": 165
      },
      "zone": "arterial"
    },
    "lungs": {
      "name": "Lung ultrasound",
      "purpose": "B-lines indicate interstitial lung water. Diffuse B-lines support hydrostatic pulmonary edema from left-heart failure; clear lungs fit isolated blood loss or early vasodilation.",
      "pin": {
        "x": 305,
        "y": 75
      },
      "zone": "lungs"
    },
    "hgb": {
      "name": "Hemoglobin",
      "purpose": "Concentration of circulating red cells, normally about 12–16 g/dL in many adults. A falling value supports bleeding, although very early hemorrhage may precede dilution.",
      "pin": {
        "x": 95,
        "y": 285
      },
      "zone": "laboratory"
    },
    "temp": {
      "name": "Core temperature",
      "purpose": "Fever or hypothermia can support infection but is not required. A normal temperature after a sedative bolus argues against infection-driven vasodilation.",
      "pin": {
        "x": 405,
        "y": 265
      },
      "zone": "infection"
    },
    "lactate": {
      "name": "Serum lactate",
      "purpose": "A marker of metabolic stress and impaired oxygen use or delivery. A rising value supports persistent shock; a normal, clearing value makes a brief medication-related pressure dip more plausible.",
      "pin": {
        "x": 250,
        "y": 315
      },
      "zone": "perfusion"
    },
    "urine": {
      "name": "Urine output",
      "purpose": "Kidney perfusion normally produces at least about 0.5 mL/kg/h in many adults. Falling output supports sustained organ hypoperfusion.",
      "pin": {
        "x": 350,
        "y": 330
      },
      "zone": "perfusion"
    }
  },
  "hypotheses": {
    "cardiogenic": {
      "label": "Cardiogenic shock",
      "call": {
        "title": "Cardiogenic shock — support the failing pump.",
        "arg": "High filling pressure, low forward flow, and pulmonary congestion indicate pump failure. Activate cardiogenic-shock management and urgent cardiac evaluation."
      },
      "sig": {
        "map": "low",
        "cvp": "high",
        "ci": "low",
        "svr": "high",
        "lungs": "wet",
        "hgb": "normal",
        "temp": "normal",
        "lactate": "high",
        "urine": "low"
      }
    },
    "hypovolemic": {
      "label": "Hypovolemic shock",
      "call": {
        "title": "Hypovolemic shock — control loss and restore volume.",
        "arg": "Low filling pressure and low cardiac output with compensatory vasoconstriction indicate an empty circulation. Find and control the source while resuscitating."
      },
      "sig": {
        "map": "low",
        "cvp": "low",
        "ci": "low",
        "svr": "high",
        "lungs": "clear",
        "hgb": "low",
        "temp": "normal",
        "lactate": "high",
        "urine": "low"
      }
    },
    "septic": {
      "label": "Septic shock",
      "call": {
        "title": "Septic shock — treat infection and distributive shock.",
        "arg": "Low resistance with preserved or high flow, rising lactate, and infection evidence indicate septic vasodilation. Begin time-critical sepsis treatment and source control."
      },
      "sig": {
        "map": "low",
        "cvp": "low",
        "ci": "high",
        "svr": "low",
        "lungs": "clear",
        "hgb": "normal",
        "temp": "fever",
        "lactate": "high",
        "urine": "low"
      }
    },
    "medication": {
      "label": "Brief medication-related vasodilation",
      "call": {
        "title": "Transient medication effect — support and reassess.",
        "arg": "A recent vasodilating sedative can briefly lower pressure while flow remains preserved. The normal lactate and rapid recovery argue against established shock."
      },
      "sig": {
        "map": "low",
        "cvp": "low",
        "ci": "high",
        "svr": "low",
        "lungs": "clear",
        "hgb": "normal",
        "temp": "normal",
        "lactate": "normal",
        "urine": "normal"
      }
    }
  },
  "dismissal": "medication",
  "reassuring": {
    "lab": "Oxygen saturation",
    "val": "98% on supplemental oxygen",
    "note": "A normal saturation shows that oxygen is entering arterial blood. It does not prove that the circulation is delivering enough of that oxygen to organs."
  },
  "rounds": [
    {
      "answer": "cardiogenic",
      "alarm": "map",
      "poleA": {
        "lab": "Blood pressure",
        "val": "MAP 51 mmHg",
        "note": "Pressure is critically low even though the venous side is visibly congested."
      },
      "hook": "Minutes after a large anterior myocardial infarction, the patient becomes cold, confused, and oliguric. Oxygen saturation remains reassuring on the monitor.",
      "riddle": "The blood contains oxygen — <span class=\"q\">so why can the circulation not move it forward?</span>",
      "vals": {
        "map": "51 mmHg",
        "cvp": "18 mmHg",
        "ci": "1.45 L/min/m²",
        "svr": "1,620 dyn·s/cm⁵",
        "lungs": "diffuse bilateral B-lines",
        "hgb": "13.4 g/dL",
        "temp": "37.1°C",
        "lactate": "5.6 mmol/L, rising",
        "urine": "12 mL in the past hour"
      },
      "reasons": {
        "hypovolemic": "Blood loss can produce low pressure, low flow, high resistance, and poor urine output, but it should lower filling pressure and usually leave the lungs clear. CVP is 18 mmHg and both lungs show diffuse B-lines.",
        "septic": "Septic shock can cause hypotension and high lactate, but early septic flow is often preserved or high while resistance is low. Here cardiac index is 1.45 and SVR is high, with pulmonary congestion.",
        "medication": "A brief sedative effect can lower pressure with low resistance and preserved flow. It does not explain the high CVP, low cardiac index, wet lungs, and rising lactate."
      },
      "resolve": {
        "title": "Cardiogenic shock — the pump is failing despite a full venous reservoir.",
        "paras": [
          "The venous pressure is high because blood is backing up, while cardiac index is severely low because the injured ventricle cannot move it forward. Pulmonary B-lines, high resistance, rising lactate, and oliguria complete the pump-failure pattern.",
          "This is a naked single. A CVP of 18 mmHg is the only high filling-pressure signature among the four candidates. One loud reading identifies congestion before the low cardiac index and lung findings confirm the mechanism."
        ],
        "why": {
          "loud": "<b>Why the loud reading was enough</b>: only cardiogenic shock combines hypotension with markedly elevated central venous pressure.",
          "quiet": "<b>Why the saturation is not reassuring</b>: oxygenated blood still cannot reach tissues if cardiac output is inadequate."
        },
        "chain": [
          "Ventricular injury weakens contraction",
          "Blood backs up while forward flow falls",
          "Organs become underperfused despite adequate oxygen saturation"
        ],
        "take": "A high filling pressure with low output means the tank is full but the pump cannot empty it."
      }
    },
    {
      "answer": "hypovolemic",
      "alarm": "map",
      "poleA": {
        "lab": "Blood pressure",
        "val": "MAP 48 mmHg",
        "note": "The patient is hypotensive with low filling pressure and a small cardiac output."
      },
      "hook": "After abdominal surgery, the drain suddenly fills with blood and the pressure falls. The lungs remain clear and the oxygen saturation is still 98%.",
      "riddle": "Is this another weak pump — <span class=\"q\">or is there too little circulating volume for the pump to receive?</span>",
      "vals": {
        "map": "48 mmHg",
        "cvp": "2 mmHg",
        "ci": "1.55 L/min/m²",
        "svr": "1,710 dyn·s/cm⁵",
        "lungs": "A-lines; no diffuse B-lines",
        "hgb": "7.2 g/dL, down from 10.8",
        "temp": "36.7°C",
        "lactate": "4.8 mmol/L",
        "urine": "10 mL in the past hour"
      },
      "reasons": {
        "cardiogenic": "Cardiogenic shock also gives low output and high resistance, but blood should back up. CVP is only 2 mmHg and the lungs are clear rather than congested.",
        "septic": "Septic vasodilation can give low CVP, but it usually lowers SVR and may preserve or raise cardiac output early. Here CI is low, SVR is 1,710, and hemoglobin has fallen sharply.",
        "medication": "A medication-related vasodilatory dip would have low resistance with preserved output and should not lower hemoglobin from 10.8 to 7.2 g/dL."
      },
      "resolve": {
        "title": "Hypovolemic shock — the circulation is underfilled.",
        "paras": [
          "Low CVP and low cardiac index show that the heart is receiving too little blood, while high SVR shows compensatory vasoconstriction. The falling hemoglobin and bloody drain identify hemorrhage as the source. Control bleeding while restoring circulating volume.",
          "This is one clear line across the loud readings. Low CVP is shared with both vasodilatory candidates, and low cardiac index is shared with cardiogenic shock. Only the pair — low filling pressure plus low output — identifies hypovolemia."
        ],
        "why": {
          "loud": "<b>Why both loud readings are needed</b>: low filling pressure alone could be vasodilation, while low output alone could be pump failure.",
          "quiet": "<b>Why the quiet readings matter clinically</b>: clear lungs and a falling hemoglobin locate the missing volume outside the circulation."
        },
        "chain": [
          "Hemorrhage removes circulating blood",
          "Venous filling and stroke volume fall",
          "Output collapses while vessels constrict"
        ],
        "take": "Pair filling pressure with flow: an empty tank produces both low preload and low output."
      }
    },
    {
      "answer": "septic",
      "alarm": "map",
      "poleA": {
        "lab": "Blood pressure",
        "val": "MAP 50 mmHg",
        "note": "Pressure is low even though cardiac output is brisk and the extremities are warm."
      },
      "hook": "A patient with pyelonephritis becomes hypotensive after several hours of fever. The oxygen saturation remains normal and the heart is still ejecting a large minute volume.",
      "riddle": "If the heart is moving plenty of blood — <span class=\"q\">is the pressure dip transient, or are dilated infected vessels failing to perfuse organs?</span>",
      "vals": {
        "map": "50 mmHg",
        "cvp": "4 mmHg",
        "ci": "4.3 L/min/m²",
        "svr": "520 dyn·s/cm⁵",
        "lungs": "mostly clear",
        "hgb": "12.8 g/dL",
        "temp": "39.4°C",
        "lactate": "5.1 mmol/L, rising after fluids",
        "urine": "18 mL in the past 2 hours"
      },
      "reasons": {
        "medication": "A brief sedative effect shares the loud pattern of low filling pressure and preserved or high output. But this patient has 39.4°C fever, rising lactate despite fluids, oliguria, and a documented urinary infection.",
        "cardiogenic": "Pump failure would lower cardiac index and usually raise filling pressure, often with pulmonary congestion. Here CI is 4.3, CVP is 4, and the lungs are mostly clear.",
        "hypovolemic": "Volume loss can lower CVP, but severe hypovolemia lowers cardiac output and raises vascular resistance. Here output is high and SVR is only 520."
      },
      "resolve": {
        "title": "Septic shock — high flow is passing through a profoundly dilated circulation.",
        "paras": [
          "The heart is still producing a high cardiac index, but vascular resistance has collapsed. Fever, a documented infection, rising lactate, and oliguria show that this is sustained distributive shock rather than a short-lived medication effect.",
          "This is where the loud gauges tie. Septic shock and brief medication-related vasodilation both produce low CVP with a high cardiac index. The deeper question is whether organ hypoperfusion and infection persist after the trigger should have passed. The lactate, urine output, and fever answer yes."
        ],
        "why": {
          "loud": "<b>Why the loud gauges cannot decide</b>: both septic vasodilation and a transient drug effect can show low filling pressure with preserved or high flow.",
          "quiet": "<b>Why sepsis wins</b>: persistent lactate elevation, oliguria, fever, and an infection source show ongoing pathologic vasodilation and impaired perfusion."
        },
        "chain": [
          "Infection triggers systemic vasodilation",
          "Resistance and effective circulating volume fall",
          "Pressure and organ perfusion collapse despite high cardiac output"
        ],
        "take": "High output does not exclude shock; ask whether dilated vessels are delivering effective organ perfusion."
      }
    }
  ],
  "schematic": {
    "viewBox": "0 0 520 390",
    "svg": "\n<text x=\"260\" y=\"24\" class=\"eqlbl\" text-anchor=\"middle\" style=\"fill:#5a7f96\">CIRCULATION</text>\n<ellipse cx=\"270\" cy=\"180\" rx=\"58\" ry=\"74\" fill=\"#173e59\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<path d=\"M270,120 C238,143 238,183 270,205 C302,183 302,143 270,120 Z\" fill=\"none\" stroke=\"#efca72\" stroke-width=\"3\"/>\n<text x=\"270\" y=\"270\" class=\"lbl\" text-anchor=\"middle\">heart / cardiac output</text>\n<path d=\"M328,160 C390,110 444,115 465,165 C480,210 438,260 350,245\" fill=\"none\" stroke=\"#d46d6d\" stroke-width=\"8\"/>\n<path d=\"M212,205 C150,250 83,246 58,196 C38,155 82,105 190,120\" fill=\"none\" stroke=\"#70c9f2\" stroke-width=\"8\"/>\n<text x=\"420\" y=\"92\" class=\"lbl\" text-anchor=\"middle\">arterial resistance</text>\n<text x=\"105\" y=\"290\" class=\"lbl\" text-anchor=\"middle\">venous filling</text>\n<ellipse cx=\"285\" cy=\"68\" rx=\"42\" ry=\"20\" fill=\"#173e59\" stroke=\"#70c9f2\" stroke-width=\"2\"/>\n<text x=\"285\" y=\"73\" class=\"lbl\" text-anchor=\"middle\">lungs</text>\n<rect x=\"65\" y=\"310\" width=\"110\" height=\"45\" rx=\"10\" fill=\"rgba(112,201,242,.06)\" stroke=\"#385b70\"/>\n<text x=\"120\" y=\"338\" class=\"lbl\" text-anchor=\"middle\">labs / blood loss</text>\n<rect x=\"350\" y=\"300\" width=\"115\" height=\"55\" rx=\"10\" fill=\"rgba(112,201,242,.06)\" stroke=\"#385b70\"/>\n<text x=\"407\" y=\"326\" class=\"lbl\" text-anchor=\"middle\">infection &</text><text x=\"407\" y=\"343\" class=\"lbl\" text-anchor=\"middle\">organ perfusion</text>\n<line x1=\"220\" y1=\"185\" x2=\"185\" y2=\"205\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"300\" y1=\"150\" x2=\"325\" y2=\"140\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"130\" y1=\"95\" x2=\"185\" y2=\"120\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"400\" y1=\"165\" x2=\"440\" y2=\"165\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"305\" y1=\"75\" x2=\"305\" y2=\"105\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"95\" y1=\"285\" x2=\"105\" y2=\"310\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"405\" y1=\"265\" x2=\"405\" y2=\"300\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"250\" y1=\"315\" x2=\"250\" y2=\"255\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"350\" y1=\"330\" x2=\"330\" y2=\"260\" stroke=\"#efca72\" stroke-width=\"2\"/>"
  }
} };
