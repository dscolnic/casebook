// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "e_quake",
  "title": "Nine Seconds to Cordera",
  "discipline": "Seismology & Earthquake Science",
  "venue": "the Cordera seismic-source inquiry",
  "agent": {
    "name": "Investigator Mara Solveig",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Seismology Pioneers",
  "dossierName": "SEISMOLOGY PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Cordera seismic-source inquiry",
  "teaser": "A sharp dawn shock rattles Cordera without the fault sequence expected by the warning centre. Was the source a clandestine blast, an ordinary earthquake whose sensors failed, or a rare tectonic event too abrupt for useful warning?",
  "overclaimTag": "a clandestine underground detonation",
  "truthTag": "a shallow explosive source disguised as an earthquake",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"Seismic stations around a shallow quarry source\"><path d=\"M20 104 C140 80,260 112,380 88 S540 102,640 76\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M300 86 l-14-24 18 4 -4-28 24 30 -18-3 8 25z\" fill=\"#B3261E\"/><g stroke=\"#326891\" stroke-width=\"2\"><path d=\"M90 96 q16-24 32 0\"/><path d=\"M470 91 q16-24 32 0\"/><path d=\"M560 84 q16-24 32 0\"/></g><path d=\"M302 82 C240 62,180 68,120 88 M306 82 C380 58,450 65,520 82\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"2\"/></svg>",
  "overclaimTease": "A dramatic source can be real, but it must leave the geometry of a pressure pulse: shallow depth, outward first motions, compact timing, and an industrial record at the source.",
  "DAYS_TOTAL": 3,
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "blaster",
      "items": [
        {
          "id": "blaster",
          "label": "Kestrel Quarry’s blasting contractor"
        },
        {
          "id": "director",
          "label": "Roan Vesk — seismic-network director"
        },
        {
          "id": "seismologist",
          "label": "The state seismologist"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "fault",
      "items": [
        {
          "id": "office",
          "label": "The Network Budget Office"
        },
        {
          "id": "fault",
          "label": "The Quarry Bench & Sensor Sites"
        },
        {
          "id": "warncenter",
          "label": "The Alert Operations Centre"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "blast",
      "items": [
        {
          "id": "silenced",
          "label": "An ordinary earthquake went unalerted after the sensor network was cut"
        },
        {
          "id": "freak",
          "label": "A rare tectonic rupture gave too little time for useful warning"
        },
        {
          "id": "blast",
          "label": "A shallow underground detonation produced the recorded shock"
        }
      ]
    }
  },
  "READING_ORDER": [
    "fieldtech",
    "dutyofficer",
    "clerk"
  ],
  "CHARACTERS": {
    "fieldtech": {
      "name": "Field Tech Odile",
      "role": "Seismic field technician",
      "face": "📡",
      "badge": "O",
      "legend": "the source stations",
      "hint": "Nearby instruments were live and recorded a compact, shallow pulse centred on an active quarry bench.",
      "reading": "byerly"
    },
    "dutyofficer": {
      "name": "The Duty Officer",
      "role": "Alert-centre duty officer",
      "face": "🚨",
      "badge": "D",
      "legend": "the alert centre",
      "hint": "Automatic processing withheld an earthquake alert because the depth and phase pattern failed the tectonic checks.",
      "reading": "gutenberg"
    },
    "clerk": {
      "name": "The Source Records Clerk",
      "role": "Permits and waveform clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the evidence room",
      "hint": "Explosive deliveries, a missing blast notice, and the waveform source time converge within seconds.",
      "reading": "aki"
    }
  },
  "TOPICS": {
    "byerly": {
      "sci": "Perry Byerly (1897-1978)",
      "topic": "First motions & fault planes",
      "lede": "Byerly learned to read the first push or pull at many stations as a geometric signature of the source.",
      "no": 1,
      "profile": "Perry Byerly built his seismological career at Berkeley, turning the first wiggles on a seismogram into information about how the ground moved at the source. When a P wave reaches a station, its first motion may push the ground away from the source, a compression, or pull it toward the source, a dilation. Plot those signs around an earthquake and a fault’s double-couple pattern emerges in opposing quadrants.\n\nThat geometry matters because different sources radiate differently. A slipping fault does not simply expand in all directions; one pair of quadrants begins in compression and the other in dilation. An idealized explosion is closer to an isotropic pressure source and sends initial compressions outward around the source. Real geology complicates amplitudes and paths, but a distributed polarity pattern remains a powerful discriminator when stations surround the event.\n\nByerly used such observations to infer fault planes before modern digital inversion. The method demands careful station timing, known instrument orientation, and enough azimuthal coverage to avoid mistaking a sparse pattern for certainty. It is a source test, not a judgment based on how frightening the shaking felt.\n\nCordera’s closest stations were operating, correctly oriented, and spread around the source. Their first motions point outward rather than dividing into the compression-and-dilation quadrants expected from fault slip. Byerly’s test therefore makes the sensational possibility scientifically examinable. It also challenges the network-neglect story: the decisive instruments did not go dark. They recorded a source whose mechanism was unlike the earthquakes the alert algorithm was designed to announce.",
      "frame": "Odile pins red and blue polarity marks around a map. “A fault divides the compass. A pressure source pushes. Show me you can see the difference.”",
      "q": [
        {
          "q": "What pattern does a typical slipping fault produce in P-wave first motions?",
          "o": [
            {
              "t": "Mainly compressions at nearly every station, independent of azimuth.",
              "v": "partial",
              "fb": "All-around compression is more characteristic of an isotropic pressure source."
            },
            {
              "t": "Alternating compression and dilation quadrants around the source.",
              "v": "expert",
              "fb": "A double-couple fault source divides the surrounding stations into opposing polarity quadrants."
            },
            {
              "t": "Identical horizontal amplitudes with no polarity information.",
              "v": "wrong",
              "fb": "Amplitude equality would not replace the polarity geometry used in a focal mechanism."
            },
            {
              "t": "A complete absence of P waves until surface waves arrive.",
              "v": "danger",
              "fb": "Faults radiate P waves promptly; surface waves are not the first source evidence."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Byerly’s polarity plot shows outward initial compression at stations around the source, the pattern expected from a compact pressure pulse rather than ordinary fault slip."
          }
        },
        {
          "q": "Why must first-motion stations surround the source?",
          "o": [
            {
              "t": "Distance alone determines whether a seismogram came from an earthquake or an explosion.",
              "v": "partial",
              "fb": "Distance helps locate events but does not by itself determine the mechanism."
            },
            {
              "t": "One nearby station can identify the full source geometry without knowing its orientation in gauge data.",
              "v": "wrong",
              "fb": "A single oriented trace cannot map the surrounding compression and dilation field."
            },
            {
              "t": "Azimuthal coverage reveals whether polarities form quadrants or point outward everywhere.",
              "v": "expert",
              "fb": "The spatial polarity pattern, not one trace, distinguishes source geometries."
            },
            {
              "t": "Stations would need to be arranged in a straight line so travel times can be averaged.",
              "v": "danger",
              "fb": "A line of stations leaves major directional ambiguities rather than resolving them."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The clearest polarity coverage surrounds the active quarry bench, not the mapped Cordera fault or the budget office."
          }
        },
        {
          "q": "Which finding would most weaken the claim that dead sensors hid an earthquake?",
          "o": [
            {
              "t": "A distant citizen reported feeling one hard jolt before breakfast in the network.",
              "v": "partial",
              "fb": "A felt report lacks the mechanism and coverage contained in the instrumental record."
            },
            {
              "t": "The alert centre had requested more maintenance funding the previous year in the network.",
              "v": "wrong",
              "fb": "Funding pressure can be real without explaining the specific event."
            },
            {
              "t": "One remote station briefly lost telemetry during unrelated weather in the network in station data.",
              "v": "danger",
              "fb": "A remote telemetry gap is immaterial when the surrounding source stations recorded cleanly."
            },
            {
              "t": "Multiple nearby stations recorded clean, correctly timed first arrivals from the event.",
              "v": "expert",
              "fb": "A functioning local array directly contradicts the idea that the source passed through an empty network."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "Maintenance logs and waveform headers show the local array was live; the network director did not silence the instruments that classified the source."
          }
        }
      ]
    },
    "gutenberg": {
      "sci": "Beno Gutenberg (1889-1960)",
      "topic": "Travel times, depth & seismic phases",
      "lede": "Gutenberg used the arrival of seismic phases to place events in depth as well as on a map.",
      "no": 2,
      "profile": "Beno Gutenberg helped build modern seismology by using earthquake travel times to map the planet’s hidden layers. Working first in Germany and later at the California Institute of Technology, he identified the depth of the core-mantle boundary and, with Charles Richter, developed a practical magnitude scale for southern California earthquakes. His career linked the arrival of seismic phases to both Earth structure and source location.\n\nLocating an event requires comparing P- and S-wave arrival times at several stations. The differences constrain distance; the network geometry constrains latitude, longitude, and depth. Depth is especially useful when human activity is suspected. Tectonic earthquakes occupy faults through the crust and sometimes far deeper, while quarry blasts and most underground industrial explosions are very shallow. A shallow source is not proof of an explosion, because natural events can occur near the surface, but it changes the balance of evidence.\n\nGutenberg also distinguished body waves travelling through Earth from surface waves moving along it. Explosions often produce relatively strong compressional energy and weaker shear radiation than comparably sized fault ruptures. These ratios vary with geology and coupling, so they are used with polarity and contextual records rather than alone.\n\nThe Cordera solution places the source only a few hundred metres beneath the quarry property, well away from the hypocentral depth of the mapped fault segment. Its compact P arrival and weak shear energy agree with the first-motion evidence. The warning centre did not miss a normal deep rupture; its filters encountered a shallow source with a different phase balance. Gutenberg’s method turns “secret blast” from rumor into a location-and-depth claim that can be checked against the industrial site.",
      "frame": "The duty officer aligns P and S arrivals beneath the alert log. “Before blaming the network, locate what it heard and tell me whether the source belongs on a fault.”",
      "q": [
        {
          "q": "How do several stations constrain an earthquake’s depth?",
          "o": [
            {
              "t": "Their P- and S-arrival differences are combined with network geometry in a location solution.",
              "v": "expert",
              "fb": "Arrival times across a network determine the hypocentre, including depth."
            },
            {
              "t": "The strongest shaking report is assigned as the source depth below that observer’s location.",
              "v": "partial",
              "fb": "Felt intensity varies with buildings and soils and cannot define hypocentral depth."
            },
            {
              "t": "Depth equals the distance to the station recording the largest surface-wave amplitude.",
              "v": "wrong",
              "fb": "Surface-wave amplitude is not a direct ruler for source depth."
            },
            {
              "t": "A magnitude number automatically supplies an exact depth without travel times.",
              "v": "danger",
              "fb": "Magnitude and depth are separate parameters inferred from different observations."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "Gutenberg’s travel-time solution places the source beneath the quarry property at industrial depth, not on the deeper mapped fault plane."
          }
        },
        {
          "q": "Why does a very shallow source matter in an explosion inquiry?",
          "o": [
            {
              "t": "nearly every shallow seismic event is artificial and nearly every deep event is natural.",
              "v": "partial",
              "fb": "Natural shallow earthquakes exist, so depth alone cannot close the case."
            },
            {
              "t": "Most industrial blasts occur near the surface, while tectonic depth must be independently justified.",
              "v": "expert",
              "fb": "Shallow depth is a discriminator, though it must be combined with other source evidence."
            },
            {
              "t": "Shallow events does not generate P waves strong enough to be detected regionally at the source.",
              "v": "wrong",
              "fb": "Shallow blasts can radiate strong compressional waves over regional distances."
            },
            {
              "t": "Depth matters mainly for damage estimates and says nothing about source type at the source.",
              "v": "danger",
              "fb": "Depth informs both source interpretation and expected ground motion."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The unusually shallow hypocentre and strong compressional phase support an industrial detonation while weakening both a deep tectonic rupture and a sensor-outage explanation."
          }
        },
        {
          "q": "What phase balance would be more consistent with a compact pressure source?",
          "o": [
            {
              "t": "A dominant shear field with the full double-couple polarity pattern of a fault.",
              "v": "partial",
              "fb": "Strong shear and double-couple polarity would favour tectonic slip instead."
            },
            {
              "t": "No body waves at all, mainly long-period tides measured after the shaking.",
              "v": "wrong",
              "fb": "Both earthquakes and explosions generate body waves before tidal effects matter."
            },
            {
              "t": "Relatively strong compressional energy compared with the shear radiation of fault slip.",
              "v": "expert",
              "fb": "Explosive sources commonly emphasize P energy relative to shear, though ratios need context."
            },
            {
              "t": "Equal energy in nearly every phase regardless of geology, depth, or source coupling.",
              "v": "danger",
              "fb": "Phase ratios vary; perfect equality is not a realistic diagnostic rule."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The automated system classified the strong-P, shallow event as nontectonic before the duty officer reviewed it, so the absence of a public quake alert was procedural rather than concealment."
          }
        }
      ]
    },
    "aki": {
      "sci": "Keiiti Aki (1930-2005)",
      "topic": "Seismic moment & source spectra",
      "lede": "Aki treated each waveform as a spectrum carrying the size, duration, and mechanism of its source.",
      "no": 3,
      "profile": "Keiiti Aki was a Japanese-American seismologist who helped transform earthquake records into quantitative pictures of the source. He advanced the use of seismic moment, a measure tied to fault area, average slip, and rock rigidity, and developed methods for analysing spectra and wave scattering. Rather than treating a seismogram as one magnitude number, Aki asked how energy was distributed across frequency and what that distribution revealed about rupture dimensions and duration.\n\nA fault rupture usually grows across an area over a finite time. Its spectrum carries a corner frequency related to source size, while the radiation pattern reflects shear motion. A contained explosion is more compact and impulsive. Spectral ratios, moment estimates, and waveform similarity can therefore test whether an event resembles nearby earthquakes or a family of known blasts. No single spectral rule is universal: depth, geology, and instrument response must be modelled.\n\nAki also emphasized the value of repeated events. If quarry blasts occur from the same bench under similar loading, their waveforms can correlate strongly even when their reported times differ. Matching an unknown event to that template can be more persuasive than arguing from magnitude alone.\n\nCordera’s dawn pulse closely matches two permitted Kestrel shots in waveform shape and corner frequency, but its explosive yield and timestamp are absent from the submitted notice. Delivery records show material issued to the contractor, and the loading sheet was altered after the event. Aki’s comparison links mechanism, place, and operational custody. It rejects the idea that a rare earthquake merely happened to imitate the quarry’s own seismic fingerprint.",
      "frame": "The clerk overlays three waveforms until two disappear beneath the third. “One of these was permitted. One was not. Tell me what makes them family.”",
      "q": [
        {
          "q": "What does seismic moment describe for a fault source?",
          "o": [
            {
              "t": "The exact clock time at which the first station transmits an alert.",
              "v": "partial",
              "fb": "Alert time is an operational timestamp, not a source-strength measure."
            },
            {
              "t": "The number of buildings damaged within one kilometre of the epicentre.",
              "v": "wrong",
              "fb": "Damage depends on exposure and shaking, not directly on seismic moment alone."
            },
            {
              "t": "The explosive mass required for nearly every event with the same local magnitude.",
              "v": "danger",
              "fb": "Explosive yield and fault moment cannot be interchanged by one universal conversion."
            },
            {
              "t": "A quantity related to rock rigidity, slipped area, and average displacement.",
              "v": "expert",
              "fb": "Seismic moment represents the physical scale of faulting rather than its felt consequences."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Aki’s spectral comparison matches the Cordera pulse to prior quarry shots, including their compact duration, rather than to local fault earthquakes."
          }
        },
        {
          "q": "Why are waveform templates from earlier quarry blasts valuable?",
          "o": [
            {
              "t": "Events from the same source and mechanism can retain a distinctive correlated shape.",
              "v": "expert",
              "fb": "Correlation adds a source fingerprint when location and propagation paths are similar."
            },
            {
              "t": "Any two events with equal magnitude would need to produce identical seismograms everywhere.",
              "v": "partial",
              "fb": "Equal magnitude does not guarantee identical mechanism, path, or waveform."
            },
            {
              "t": "A template strongly suggests intent even if the source location and records disagree.",
              "v": "wrong",
              "fb": "Templates identify similarity; documentary evidence is still needed for responsibility."
            },
            {
              "t": "Past blasts erase the need to examine polarity, depth, or instrument response.",
              "v": "danger",
              "fb": "A robust conclusion combines waveform comparison with independent discriminators."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The strongest waveform match comes from earlier permitted shots on the same quarry bench, placing the decisive comparison at the industrial source site."
          }
        },
        {
          "q": "Which record most directly connects the unreported source to a responsible party?",
          "o": [
            {
              "t": "A network budget request written months before the event by the director.",
              "v": "partial",
              "fb": "Budget pressure does not explain an intact array recording a quarry-like source."
            },
            {
              "t": "Explosive issue sheets and an altered loading log held by the quarry contractor.",
              "v": "expert",
              "fb": "Custody and loading records connect the source material and timing to the contractor."
            },
            {
              "t": "A building-code map showing that Cordera lies in a region of moderate hazard.",
              "v": "wrong",
              "fb": "Regional hazard supports possible earthquakes but not this event’s operational chain."
            },
            {
              "t": "A newspaper photograph of dust rising after residents felt the shock.",
              "v": "danger",
              "fb": "A photograph is contextual, while issue and loading records establish control."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The contractor controlled the issued explosives and altered the only loading sheet covering the source time, completing the attribution without naming a network official."
          }
        }
      ]
    }
  },
  "story": [
    "<b>Cordera’s nine seconds of shaking begin a louder argument than the event itself.</b>",
    "Field Tech Odile has the polarity map. The Duty Officer holds the depth and phase classification. The Source Records Clerk can compare the pulse with earlier industrial shots.",
    "A silenced warning network, an improbable natural rupture, and a clandestine detonation each survive until source geometry and custody are read together.",
    "The accusation must identify who controlled the source, where it originated, and why the alert system treated it differently from an earthquake."
  ],
  "endings": {
    "overclaimWhat": "silenced",
    "dismissalWhat": "freak",
    "win": {
      "expertTitle": "The Unreported Shot",
      "expert": [
        "You connect Kestrel Quarry’s blasting contractor, the Quarry Bench & Sensor Sites, and a shallow underground detonation producing the recorded shock. The full clue chain links the initiating condition, the physical mechanism, and the decisive record without relying on candidate order.",
        "The two alternative explanations each fit part of the scene, but neither survives the combined timing, material, and documentary evidence."
      ],
      "soundTitle": "The Source Geometry Converges",
      "sound": [
        "Your accusation identifies Kestrel Quarry’s blasting contractor, the Quarry Bench & Sensor Sites, and a shallow underground detonation producing the recorded shock.",
        "A few missed clues leave gaps in the reconstruction, yet the evidence you recovered is sufficient to distinguish the true sequence from both traps."
      ],
      "namedTitle": "Correct Source, Sparse Chain",
      "named": [
        "You reach the correct three-part verdict with a thin evidentiary file.",
        "The result is right, although the unrecovered clues would be needed to defend the causal chain under sustained challenge."
      ]
    },
    "overclaim": {
      "title": "The Network Was Listening",
      "body": [
        "The intact local array recorded and classified the event; there is no missing sensor interval capable of hiding a normal earthquake.",
        "Budget disputes explain institutional tension, not the outward polarities, shallow depth, or quarry waveform match."
      ]
    },
    "dismissal": {
      "title": "A Fault Did Not Make This Pattern",
      "body": [
        "A rare tectonic rupture would still need a double-couple radiation pattern and a source on a plausible fault.",
        "The industrial depth, strong compressional energy, and altered explosive log reject the act-of-nature account."
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
