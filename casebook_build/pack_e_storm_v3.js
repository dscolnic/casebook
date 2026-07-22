// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "e_storm",
  "title": "The Halloway Landfall",
  "discipline": "Meteorology & Storm Forecasting",
  "venue": "the Halloway storm inquiry",
  "agent": {
    "name": "Investigator Cole Renard",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Meteorology Pioneers",
  "dossierName": "METEOROLOGY PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Halloway storm inquiry",
  "teaser": "A hurricane reaches Halloway with a surge warning weaker than the data on the forecast floor. Was the storm manipulated, did rapid intensification defeat every forecast, or did one forecaster manually soften a warning the observing system supported?",
  "overclaimTag": "weather deliberately manipulated offshore",
  "truthTag": "a forecaster manually downgraded a supported warning",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"Radar spiral approaching a coast beside an edited warning bulletin\"><path d=\"M45 104 H360\" stroke=\"#326891\" stroke-width=\"3\"/><path d=\"M250 26 C180 20,150 82,215 92 C278 102,315 48,274 35 C238 24,212 51,236 66\" fill=\"none\" stroke=\"#121212\" stroke-width=\"3\"/><rect x=\"430\" y=\"28\" width=\"150\" height=\"86\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M450 50 h110 M450 70 h90 M450 90 h110\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M492 64 l18 18 M510 64 l-18 18\" stroke=\"#B3261E\" stroke-width=\"3\"/></svg>",
  "overclaimTease": "The storm’s violence is not evidence of control from outside. Compare the radar trend, surge physics, and the exact edits between the technical draft and the public bulletin.",
  "DAYS_TOTAL": 3,
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "forecaster",
      "items": [
        {
          "id": "official",
          "label": "Delia Marsh — regional emergency-management chief"
        },
        {
          "id": "forecaster",
          "label": "Dr. Ivo Pell — lead hurricane forecaster"
        },
        {
          "id": "mayor",
          "label": "The resort-town mayor"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "forecastfloor",
      "items": [
        {
          "id": "office",
          "label": "The Emergency-Management Office"
        },
        {
          "id": "coast",
          "label": "The Coast & Tide Gauges"
        },
        {
          "id": "forecastfloor",
          "label": "The Hurricane Forecast Floor"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "downgraded",
      "items": [
        {
          "id": "weapon",
          "label": "An external intervention altered the storm before landfall"
        },
        {
          "id": "freak",
          "label": "Rapid intensification made the stronger warning unavailable"
        },
        {
          "id": "downgraded",
          "label": "A supported surge warning was manually reduced before release"
        }
      ]
    }
  },
  "READING_ORDER": [
    "spotter",
    "radar",
    "clerk"
  ],
  "CHARACTERS": {
    "spotter": {
      "name": "Storm Spotter Vane",
      "role": "Coastal observing volunteer",
      "face": "🌀",
      "badge": "V",
      "legend": "the tide line",
      "hint": "Surge and wind observations matched the stronger technical draft hours before the public bulletin was issued.",
      "reading": "atlas"
    },
    "radar": {
      "name": "The Radar Analyst",
      "role": "Hurricane radar analyst",
      "face": "📡",
      "badge": "R",
      "legend": "the forecast floor",
      "hint": "The radar loop and aircraft data showed an organizing eyewall and a rising surge threat, not an unknowable jump.",
      "reading": "bjerknes"
    },
    "clerk": {
      "name": "The Forecast Archive Clerk",
      "role": "Bulletin and revision clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the issue desk",
      "hint": "The final warning removed surge language during one forecaster’s authenticated edit session.",
      "reading": "rsimpson"
    }
  },
  "TOPICS": {
    "atlas": {
      "sci": "David Atlas (1924-2015)",
      "topic": "Radar meteorology & storm detection",
      "lede": "Atlas turned radar echoes into a moving record of storm structure instead of a screen full of unexplained clutter.",
      "no": 1,
      "profile": "David Atlas began his scientific career during the Second World War, when radar operators noticed that rain and storms cluttered screens designed to detect aircraft. He became one of the founders of radar meteorology, studying how transmitted microwave energy scatters from raindrops, ice, and other particles. The strength and structure of the return can reveal where precipitation is located and how it is organized.\n\nAtlas helped move radar from a qualitative picture to a measurement system. Reflectivity is related to the size and concentration of hydrometeors, though the relation between reflectivity and rainfall rate varies with drop-size distribution and storm type. Doppler radar later added radial velocity, allowing analysts to see winds toward or away from the instrument, rotation, convergence, and the organization of rain bands. Radar does not measure every surface hazard directly, but it supplies a continuous structural history that can be compared with aircraft, satellite, buoy, and tide-gauge data.\n\nFor tropical cyclones, eyewall shape, rain-band curvature, and velocity patterns help reveal whether the circulation is strengthening or reorganizing. An apparent forecast surprise must therefore be tested against what the observing system actually showed before landfall. A storm can intensify rapidly, yet the timing of that intensification is an empirical question rather than a slogan.\n\nAt Halloway, the radar archive displays a tightening eyewall and increasing low-level velocities well before the public warning was softened. Coastal observations then confirm the expected surge progression. Atlas’s lesson is that the storm left a movie, not one dramatic frame. That movie rejects weather manipulation, and it also prevents “no forecast could catch it” from becoming an excuse when the relevant trend was already visible.",
      "frame": "Vane runs the radar loop beside tide reports. “The coast did not meet a storm from nowhere. Watch what the eye was doing before the words changed.”",
      "q": [
        {
          "q": "What does weather-radar reflectivity primarily describe?",
          "o": [
            {
              "t": "The exact surface wind direction at nearly every point beneath the radar beam.",
              "v": "partial",
              "fb": "Doppler velocity estimates one component of motion; reflectivity is not exact surface wind."
            },
            {
              "t": "The ocean temperature several metres below the storm’s path at landfall in radar data.",
              "v": "wrong",
              "fb": "Subsurface ocean temperature requires different instruments."
            },
            {
              "t": "The returned microwave energy from precipitation particles within each sampled volume.",
              "v": "expert",
              "fb": "Reflectivity maps the strength of scattering from hydrometeors in the radar volume."
            },
            {
              "t": "The political urgency assigned to a warning by emergency officials at landfall in radar data.",
              "v": "danger",
              "fb": "Warning urgency is a human decision, not a radar observable."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "Atlas’s unedited radar archive on the forecast floor preserves the strengthening eyewall hours before the public language changed."
          }
        },
        {
          "q": "Why is a radar loop stronger evidence than one dramatic image?",
          "o": [
            {
              "t": "It is expected to deliver an exact landfall intensity without any uncertainty.",
              "v": "partial",
              "fb": "Radar improves awareness but does not eliminate forecast uncertainty."
            },
            {
              "t": "It removes the need for aircraft, satellite, buoy, and tide observations at landfall.",
              "v": "wrong",
              "fb": "Multiple observing systems remain necessary because each samples different quantities."
            },
            {
              "t": "It strongly suggests that any storm change was caused by deliberate intervention at landfall.",
              "v": "danger",
              "fb": "A trend documents natural evolution; it does not imply external control."
            },
            {
              "t": "It shows the storm’s structural trend and timing rather than a single selected moment.",
              "v": "expert",
              "fb": "A sequence reveals organization and acceleration that one frame can hide."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The loop shows strengthening before the deadline for the public bulletin, so the higher warning was scientifically available rather than defeated by a last-minute surprise."
          }
        },
        {
          "q": "Which record best challenges the claim that the coast was warned as strongly as the data allowed?",
          "o": [
            {
              "t": "A technical draft matching the radar trend followed by a weaker public revision.",
              "v": "expert",
              "fb": "The contrast between evidence-based draft and final bulletin directly tests the warning decision."
            },
            {
              "t": "A photograph of damaged buildings taken after the storm had passed.",
              "v": "partial",
              "fb": "Post-storm damage cannot show what language was available beforehand."
            },
            {
              "t": "A seasonal tourism forecast prepared before hurricane season began.",
              "v": "wrong",
              "fb": "A seasonal outlook does not determine one event’s operational warning."
            },
            {
              "t": "A single resident’s memory that the wind sounded unusually loud.",
              "v": "danger",
              "fb": "A recollection lacks the timestamped technical and publication trail."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The observation record supports the stronger draft; responsibility therefore lies with the person who altered the forecast product, not with the spotter or emergency chief who received it."
          }
        }
      ]
    },
    "bjerknes": {
      "sci": "Vilhelm Bjerknes (1862-1951)",
      "topic": "The equations of weather prediction",
      "lede": "Bjerknes proposed that a measured atmosphere could be advanced through equations, with uncertainty made explicit rather than hidden.",
      "no": 2,
      "profile": "Vilhelm Bjerknes sought to make weather prediction a problem of physics rather than proverb. A Norwegian physicist and meteorologist, he argued in the early twentieth century that the future atmosphere could be calculated if its present state were adequately observed and the governing equations of motion, thermodynamics, mass continuity, and moisture were solved forward in time. That program became the intellectual foundation of numerical weather prediction.\n\nThe task is difficult because the atmosphere is three-dimensional, rotating, stratified, moist, and only imperfectly sampled. Forecasting therefore combines equations with data assimilation: observations are blended into a physically consistent estimate of the current state. A model forecast is not one oracle number. Ensembles and alternative analyses reveal plausible ranges, and forecasters interpret those ranges alongside new observations.\n\nBjerknes also influenced the Bergen School, which described fronts and cyclones as organized dynamical systems. For a hurricane, pressure falls, wind structure, ocean heat, vertical shear, and inner-core organization constrain what intensification is plausible. Uncertainty remains, but the uncertainty itself can be communicated. A high-impact warning may be justified by a dangerous tail of the forecast distribution even when the central estimate is lower.\n\nThe Halloway forecast package contained an ensemble shift toward stronger landfall winds and a larger surge envelope. The lead forecaster’s internal discussion acknowledged that shift, then substituted the lower deterministic value in the public text. Bjerknes’s framework separates an honest forecast miss from selective use of the forecast. The equations did not promise certainty; they supplied a range whose dangerous portion was removed by hand.",
      "frame": "The analyst places the ensemble plume beneath the final bulletin. “A forecast is a range with consequences. Tell me which part vanished.”",
      "q": [
        {
          "q": "What was central to Bjerknes’s program for weather prediction?",
          "o": [
            {
              "t": "Predict storms from recurring calendar dates without measuring the atmosphere.",
              "v": "partial",
              "fb": "Calendar recurrence cannot represent the evolving atmospheric state."
            },
            {
              "t": "Observe the atmospheric state and solve physical equations forward in time.",
              "v": "expert",
              "fb": "Bjerknes framed forecasting as an initial-value problem governed by physics."
            },
            {
              "t": "Treat nearly every forecast as a direct extrapolation of yesterday’s local weather.",
              "v": "wrong",
              "fb": "Persistence can help briefly, but it is not the physical forecasting program."
            },
            {
              "t": "Replace observations with public reports once a storm enters coastal waters.",
              "v": "danger",
              "fb": "Public reports supplement rather than replace instrumental observations."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Bjerknes’s ensemble evidence already included the dangerous landfall range; the final warning became weaker through selection, not through missing science."
          }
        },
        {
          "q": "Why can an ensemble justify a strong warning before its worst member becomes certain?",
          "o": [
            {
              "t": "The most extreme member is automatically the correct forecast for nearly every event.",
              "v": "partial",
              "fb": "The extreme member is one scenario and must be weighed, not chosen automatically."
            },
            {
              "t": "Ensembles remove the need for a forecaster to explain uncertainty to the public.",
              "v": "wrong",
              "fb": "Ensembles create information that still requires interpretation and communication."
            },
            {
              "t": "High-impact outcomes may be plausible enough that their consequences warrant communication.",
              "v": "expert",
              "fb": "Risk communication considers probability together with consequence, not certainty alone."
            },
            {
              "t": "A warning is valid mainly when nearly every model member predicts the same intensity.",
              "v": "danger",
              "fb": "Complete model agreement is rare and is not required for protective action."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The decisive divergence occurs at the forecast workstation where the ensemble surge range was replaced by one lower deterministic value."
          }
        },
        {
          "q": "Which action most clearly turns forecast uncertainty into misconduct?",
          "o": [
            {
              "t": "Updating a warning when new aircraft data materially changes the storm analysis before coastal landfall.",
              "v": "partial",
              "fb": "A documented update based on new evidence is normal forecasting practice."
            },
            {
              "t": "Describing confidence limits and explaining why several outcomes remain possible before coastal landfall.",
              "v": "wrong",
              "fb": "Transparent uncertainty is the opposite of concealing the scientific range."
            },
            {
              "t": "Issuing a cautious range that includes both the central forecast and dangerous tail before coastal landfall.",
              "v": "danger",
              "fb": "A range communicates uncertainty rather than erasing it."
            },
            {
              "t": "Deleting the supported high-impact range while presenting the lower estimate as the definitive science.",
              "v": "expert",
              "fb": "Selective omission misrepresents what the forecast system actually supported."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "Authentication logs tie the selective rewrite to the lead forecaster’s account after the analyst objected, while the emergency chief received only the altered product."
          }
        }
      ]
    },
    "rsimpson": {
      "sci": "Robert Simpson (1912-2014)",
      "topic": "Hurricane classification & coastal hazard",
      "lede": "Simpson helped create the famous hurricane scale and spent years warning that wind category is not the whole storm.",
      "no": 3,
      "profile": "Robert Simpson flew into hurricanes, directed the United States National Hurricane Research Project, and later led the National Hurricane Center. With engineer Herbert Saffir, he helped create the Saffir–Simpson scale, which classifies hurricanes by sustained wind speed. The scale gave officials and the public a common language for wind damage, but Simpson repeatedly emphasized that a category is not a complete description of hazard.\n\nStorm surge depends on more than the peak wind at the centre. The size of the wind field, forward speed, angle of approach, coastal bathymetry, tide, and shoreline shape can raise or lower water dramatically. Rainfall and tornado risk also sit outside the category number. Two storms with the same category can therefore produce very different consequences, and a lower-category storm can generate catastrophic surge.\n\nOperational forecasting must translate several hazard products rather than allow one familiar number to dominate. Surge models, tide gauges, radar, aircraft reconnaissance, and local topography all contribute. Simpson’s scale is valuable when used for what it measures and misleading when treated as a verdict on every coastal threat.\n\nThe Halloway revision retained the wind category but removed explicit surge language and the evacuation-zone recommendation. That choice made the bulletin sound scientifically conservative while discarding the hazard most strongly supported by the coast’s geometry and the model envelope. Simpson’s own work supplies the discriminator: if the final warning changed because the category did not rise, while the surge forecast did, then the edit was not a neutral restatement. It substituted one metric for the multi-hazard analysis.",
      "frame": "The clerk highlights a category number and a deleted surge paragraph. “One stayed the same. One grew worse. Which did the public need?”",
      "q": [
        {
          "q": "What does the Saffir–Simpson scale classify?",
          "o": [
            {
              "t": "Hurricanes by sustained wind speed, not by every associated hazard.",
              "v": "expert",
              "fb": "The scale is a wind classification and cannot stand in for surge or rainfall products."
            },
            {
              "t": "Storm surge height from the local tide and coastal bathymetry.",
              "v": "partial",
              "fb": "Surge is modelled separately from wind category."
            },
            {
              "t": "Total rainfall and river flooding expected over the whole track.",
              "v": "wrong",
              "fb": "Rainfall varies with motion and moisture and is not encoded in the category."
            },
            {
              "t": "The probability that a forecast will verify at the named category.",
              "v": "danger",
              "fb": "Forecast confidence is also separate from the wind classification."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Simpson’s distinction shows why holding the wind category steady did not justify deleting the independently rising surge warning."
          }
        },
        {
          "q": "How can a lower-category hurricane still produce catastrophic surge?",
          "o": [
            {
              "t": "The category number secretly includes surge but forecasters sometimes read it backward.",
              "v": "partial",
              "fb": "The current scale does not encode a hidden surge number."
            },
            {
              "t": "A broad wind field, slow motion, approach angle, and shallow coast can pile up great water.",
              "v": "expert",
              "fb": "Surge responds to wind-field geometry and coastal conditions, not category alone."
            },
            {
              "t": "Surge occurs mainly when a storm weakens rapidly immediately before landfall.",
              "v": "wrong",
              "fb": "Weakening can coexist with surge, but it is not a required mechanism."
            },
            {
              "t": "Any surge above the tide strongly suggests the storm was artificially intensified offshore.",
              "v": "danger",
              "fb": "Natural storms routinely drive surge without external manipulation."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "Tide gauges and surge modelling at the issue desk support the removed evacuation zone even though the wind category remained unchanged."
          }
        },
        {
          "q": "Which publication change would Simpson’s framework treat as most misleading?",
          "o": [
            {
              "t": "Adding a rainfall section because slow motion increased inland-flood risk.",
              "v": "partial",
              "fb": "Adding a distinct hazard product improves rather than distorts the warning."
            },
            {
              "t": "Explaining that two storms in one category may have different coastal effects.",
              "v": "wrong",
              "fb": "The statement correctly limits what category can communicate."
            },
            {
              "t": "Keeping the category while removing a separately supported surge warning.",
              "v": "expert",
              "fb": "That edit lets a wind label erase a different and well-supported hazard."
            },
            {
              "t": "Updating the surge map after new tide and track information arrives.",
              "v": "danger",
              "fb": "Evidence-based updates are normal when their rationale is preserved."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The revision history shows the lead forecaster removed surge language personally; neither the mayor nor emergency chief had access to alter the scientific bulletin."
          }
        }
      ]
    }
  },
  "story": [
    "<b>Halloway’s coast receives a familiar category number and an unfamiliar wall of water.</b>",
    "Storm Spotter Vane has the observing chronology. The Radar Analyst can reconstruct the forecast range. The Forecast Archive Clerk holds every saved revision of the bulletin.",
    "Weather manipulation, unforeseeable intensification, and a deliberate downgrade all sound plausible until the technical draft is compared with what the public was actually sent.",
    "The case turns on who changed the warning, where that edit occurred, and whether the science supported stronger language before landfall."
  ],
  "endings": {
    "overclaimWhat": "weapon",
    "dismissalWhat": "freak",
    "win": {
      "expertTitle": "The Warning That Was Edited",
      "expert": [
        "You connect Dr. Ivo Pell — the lead hurricane forecaster, the Hurricane Forecast Floor, and a supported surge warning manually reduced before release. The full clue chain links the initiating condition, the physical mechanism, and the decisive record without relying on candidate order.",
        "The two alternative explanations each fit part of the scene, but neither survives the combined timing, material, and documentary evidence."
      ],
      "soundTitle": "The Revision Trail",
      "sound": [
        "Your accusation identifies Dr. Ivo Pell — the lead hurricane forecaster, the Hurricane Forecast Floor, and a supported surge warning manually reduced before release.",
        "A few missed clues leave gaps in the reconstruction, yet the evidence you recovered is sufficient to distinguish the true sequence from both traps."
      ],
      "namedTitle": "Correct Edit, Incomplete File",
      "named": [
        "You reach the correct three-part verdict with a thin evidentiary file.",
        "The result is right, although the unrecovered clues would be needed to defend the causal chain under sustained challenge."
      ]
    },
    "overclaim": {
      "title": "No Hand Controlled the Storm",
      "body": [
        "The radar, aircraft, and tide records show a natural hurricane evolving through known processes.",
        "No source, energy input, or control mechanism supports external weather manipulation."
      ]
    },
    "dismissal": {
      "title": "Uncertainty Was Not Ignorance",
      "body": [
        "Rapid intensification was possible, but the dangerous range and surge signal were visible before publication.",
        "The issue was not that prediction became impossible; it was that supported uncertainty was selectively removed."
      ]
    },
    "wrongNames": {
      "title": "Right Mechanism, Wrong Attribution",
      "body": [
        "You recognize the governing mechanism but assign it to the wrong actor or move its decisive evidence away from the location where the records and physical traces converge."
      ]
    }
  }
}
};
