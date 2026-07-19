// Diagnosis data pack — clean non-overlapping schematic edition.
module.exports = { PACK: {
  "id": "telescope",
  "title": "Image Quality",
  "domain": "Astronomical observatory operations",
  "role": "You are the night astronomer diagnosing an image-quality anomaly.",
  "intro": {
    "title": "How this system works",
    "lead": "An astronomical image depends on the atmosphere, telescope optics, tracking, and detector response. Starlight can be dimmed by cloud, blurred by seeing or focus, stretched by guiding error, or numerically altered by detector gain. The same poor image can therefore come from several layers of the observing system.",
    "cards": [
      {
        "title": "How an image forms",
        "body": "The telescope collects and focuses light onto a detector while the mount tracks Earth’s rotation and the guider corrects small pointing errors."
      },
      {
        "title": "How image quality changes",
        "body": "Focus errors broaden stars radially, tracking errors elongate them directionally, cloud reduces throughput, and atmospheric seeing broadens all sources."
      },
      {
        "title": "What the instruments measure",
        "body": "Stellar flux, point-spread width and shape, focus metrics, guide residuals, transparency monitors, sky brightness, and detector calibration channels isolate the layer at fault."
      },
      {
        "title": "Why one image can mislead",
        "body": "A detector-gain change can make stars appear dim without changing the sky. Thin cloud can produce the same headline flux loss, so independent cameras and calibration data matter."
      }
    ],
    "takeaway": "The loud reading gets your attention, but the right explanation is the one that fits the whole panel."
  },
  "system": {
    "parts": [
      [
        "Atmosphere",
        "Cloud, transparency, seeing, and sky brightness alter light before it reaches the telescope."
      ],
      [
        "Optics and focus",
        "Mirrors and focus position determine how sharply light is concentrated."
      ],
      [
        "Mount and guider",
        "Track the sky and correct pointing motion during an exposure."
      ],
      [
        "Detector",
        "Converts photons into digital counts with calibrated gain and bias."
      ],
      [
        "Calibration systems",
        "All-sky monitors, focus sensors, guide logs, overscan, and secondary cameras cross-check the science image."
      ]
    ],
    "soWrong": "Dim or broad stars do not identify one cause. Throughput, focus, motion, detector response, and atmosphere must be compared."
  },
  "salient": [
    "flux",
    "psf"
  ],
  "readings": {
    "flux": {
      "name": "Standard-star flux",
      "purpose": "Compares measured counts with the star’s expected brightness. Flux can fall because of cloud, defocus losses, or detector gain.",
      "pin": {
        "x": 490,
        "y": 160
      },
      "zone": "detector"
    },
    "psf": {
      "name": "Point-spread width",
      "purpose": "Measures the size of stellar images. Broad images can come from focus, tracking, or atmospheric seeing.",
      "pin": {
        "x": 490,
        "y": 105
      },
      "zone": "image"
    },
    "trans": {
      "name": "Transparency monitor",
      "purpose": "An independent photometer measures atmospheric extinction. Reduced transparency supports cloud rather than detector or focus problems.",
      "pin": {
        "x": 30,
        "y": 105
      },
      "zone": "atmosphere"
    },
    "focus": {
      "name": "Wavefront / focus metric",
      "purpose": "Measures optical defocus independently of stellar brightness. A large focus term identifies optical spacing rather than guiding.",
      "pin": {
        "x": 235,
        "y": 35
      },
      "zone": "optics"
    },
    "guide": {
      "name": "Guide-camera RMS",
      "purpose": "Measures tracking residuals during the exposure. High directional RMS supports mount or guider error.",
      "pin": {
        "x": 165,
        "y": 355
      },
      "zone": "mount"
    },
    "shape": {
      "name": "PSF ellipticity and angle",
      "purpose": "Separates round broadening from directional smearing. Tracking errors align elongation with mount motion.",
      "pin": {
        "x": 490,
        "y": 215
      },
      "zone": "image"
    },
    "camera2": {
      "name": "Secondary-camera comparison",
      "purpose": "A second instrument observing the same field helps distinguish atmosphere-wide effects from one telescope or detector channel.",
      "pin": {
        "x": 450,
        "y": 35
      },
      "zone": "comparison"
    },
    "sky": {
      "name": "Sky brightness / seeing monitor",
      "purpose": "Measures moonlight and atmospheric image motion. Poor seeing broadens stars without focus or guide errors.",
      "pin": {
        "x": 30,
        "y": 175
      },
      "zone": "atmosphere"
    },
    "color": {
      "name": "Attenuation versus wavelength",
      "purpose": "Compares flux loss in several filters. Thin gray cloud and detector gain can be nearly color-neutral, while aerosol extinction is more wavelength-dependent.",
      "pin": {
        "x": 490,
        "y": 270
      },
      "zone": "photometry"
    },
    "encoder": {
      "name": "Mount encoder-versus-guide residual",
      "purpose": "Compares physical mount motion with guide-camera error. A real tracking fault affects both; wind shake can disturb guiding while encoder motion remains consistent with commands.",
      "pin": {
        "x": 235,
        "y": 355
      },
      "zone": "mount"
    }
  },
  "hypotheses": {
    "tracking": {
      "label": "Tracking / guiding error",
      "choice": "Mount motion stretches stellar images in a common direction while atmospheric and detector measurements remain normal.",
      "call": {
        "title": "Recover guiding.",
        "arg": "The telescope is moving during exposures; correct the guide or mount problem."
      },
      "sig": {
        "flux": "normal",
        "psf": "broad",
        "trans": "normal",
        "focus": "normal",
        "guide": "high",
        "shape": "elongated",
        "camera2": "same-telescope",
        "sky": "normal",
        "color": "gray",
        "encoder": "mismatch"
      }
    },
    "aerosol": {
      "label": "Uniform aerosol extinction",
      "choice": "Aerosols dim both cameras with low transparency but usually produce wavelength-dependent attenuation rather than gray patchy cloud loss.",
      "call": {
        "title": "Aerosol extinction",
        "arg": "Correct or pause observations according to the photometric standard."
      },
      "sig": {
        "flux": "down",
        "psf": "normal",
        "trans": "low",
        "focus": "normal",
        "guide": "normal",
        "shape": "round",
        "camera2": "both-dim",
        "sky": "normal",
        "color": "chromatic",
        "encoder": "agree"
      }
    },
    "seeing": {
      "label": "Wind-driven poor-image interval",
      "choice": "A transient period of atmospheric image motion and wind shake broadens or elongates stars while the telescope’s physical encoder remains consistent with commanded motion.",
      "call": {
        "title": "Continue within seeing limits.",
        "arg": "The atmosphere is temporarily softening images but the observatory systems are functioning."
      },
      "sig": {
        "flux": "normal",
        "psf": "broad",
        "trans": "normal",
        "focus": "normal",
        "guide": "high",
        "shape": "elongated",
        "camera2": "same-telescope",
        "sky": "poor",
        "color": "gray",
        "encoder": "agree"
      }
    },
    "mirrorthermal": {
      "label": "Mirror thermal focus shift",
      "choice": "Mirror temperature changes optical focus and broadens images, but total standard-star flux can remain near normal and the measured offset follows the thermal model.",
      "call": {
        "title": "Mirror thermal focus shift",
        "arg": "Apply the thermal focus model and allow the mirror to equilibrate."
      },
      "sig": {
        "flux": "normal",
        "psf": "broad",
        "trans": "normal",
        "focus": "bad",
        "guide": "normal",
        "shape": "round",
        "camera2": "same-telescope",
        "sky": "normal",
        "color": "gray",
        "encoder": "agree"
      }
    },
    "focusdrift": {
      "label": "Telescope focus drift",
      "choice": "Thermal or mechanical focus motion broadens stars and reduces aperture flux while transparency and guiding remain normal.",
      "call": {
        "title": "Refocus the telescope.",
        "arg": "The optical focal surface has moved; restore focus and verify across the field."
      },
      "sig": {
        "flux": "down",
        "psf": "broad",
        "trans": "normal",
        "focus": "bad",
        "guide": "normal",
        "shape": "round",
        "camera2": "same-telescope",
        "sky": "normal",
        "color": "gray",
        "encoder": "agree"
      }
    },
    "encoderbias": {
      "label": "Mount-encoder comparison bias",
      "choice": "The encoder-versus-guide comparison reports a mismatch, but guide RMS, PSF shape, and independent mount telemetry remain normal.",
      "call": {
        "title": "Mount-encoder comparison bias",
        "arg": "Verify the comparison channel before declaring tracking loss."
      },
      "sig": {
        "flux": "down",
        "psf": "normal",
        "trans": "normal",
        "focus": "normal",
        "guide": "normal",
        "shape": "round",
        "camera2": "other-normal",
        "sky": "normal",
        "color": "gray",
        "encoder": "mismatch"
      }
    },
    "cloud": {
      "label": "Thin cloud extinction",
      "choice": "Cloud reduces stellar throughput across instruments while focus, guiding, and detector calibration remain normal.",
      "call": {
        "title": "Pause or recalibrate for transparency.",
        "arg": "The atmosphere is attenuating the field; wait for stable conditions or apply the observing plan."
      },
      "sig": {
        "flux": "down",
        "psf": "normal",
        "trans": "low",
        "focus": "normal",
        "guide": "normal",
        "shape": "round",
        "camera2": "both-dim",
        "sky": "normal",
        "color": "gray",
        "encoder": "agree"
      }
    }
  },
  "dismissal": "seeing",
  "reassuring": {
    "lab": "Telescope status",
    "val": "TRACKING ENABLED — no hard fault",
    "note": "The control system can remain enabled while focus, guiding, atmosphere, or detector calibration degrades the data."
  },
  "rounds": [
    {
      "answer": "focusdrift",
      "alarm": "psf",
      "poleA": {
        "lab": "Image concentration",
        "val": "FWHM 0.82″ → 2.35″; flux −18%",
        "note": "Stars broaden and lose aperture counts together."
      },
      "hook": "As the dome cools after midnight, stellar images broaden across the field even though guide corrections remain quiet.",
      "riddle": "Broad stars can come from motion or atmosphere. <span class=\"q\">Why is the light spreading symmetrically out of the photometric aperture?</span>",
      "vals": {
        "flux": {
          "observed": "Standard stars −18% vs catalog",
          "reference": "Photometric repeatability ±3%"
        },
        "psf": {
          "observed": "0.82″ → 2.35″ FWHM",
          "reference": "Typical 0.7–1.2″"
        },
        "trans": {
          "observed": "0.02 mag extinction change",
          "reference": "Photometric threshold <0.05 mag"
        },
        "focus": {
          "observed": "+1.6 waves defocus; focus position −420 µm",
          "reference": "Normal defocus <0.25 wave"
        },
        "guide": {
          "observed": "0.16″ RMS",
          "reference": "Normal <0.30″ RMS"
        },
        "shape": {
          "observed": "Ellipticity 0.05; no preferred angle",
          "reference": "Normal <0.10"
        },
        "camera2": {
          "observed": "Same telescope auxiliary camera also broad",
          "reference": "Comparison telescope 0.91″"
        },
        "sky": {
          "observed": "Seeing monitor 0.88″",
          "reference": "Typical 0.7–1.2″"
        },
        "color": {
          "observed": "Loss gray to 1.5%",
          "reference": "Normal calibration residual <2%"
        },
        "encoder": {
          "observed": "0.08 arcsec mismatch",
          "reference": "Normal <0.15 arcsec"
        }
      },
      "reasons": {
        "tracking": "Tracking error can broaden images, but guide RMS is 0.16″ and stars remain round rather than directionally elongated.",
        "cloud": "Cloud can reduce flux, but transparency is stable and cloud does not produce a +1.6-wave focus term.",
        "seeing": "Wind-driven image motion can broaden stars, but it predicts high guide residuals and poor environmental monitoring rather than a large independent focus term.",
        "mirrorthermal": "It shares a bad focus metric and broad round images, but it does not produce the measured flux loss and fails the active focus-position comparison.",
        "aerosol": "Aerosol extinction does not create a large optical defocus term.",
        "encoderbias": "It explains neither broad round images nor a real focus term."
      },
      "resolve": {
        "title": "Telescope focus drift",
        "paras": [
          "The telescope focus has shifted by 420 µm, producing a large wavefront defocus term. Light is spread into a round 2.35″ PSF, so fixed apertures recover fewer counts.",
          "Flux loss is shared with cloud and detector drift; broad PSF is shared with tracking and seeing. Only the pair—flux down and PSF broad—isolates focus before the wavefront and shape measurements confirm it."
        ],
        "why": {
          "loud": "<b>Why the headline pair works:</b> the image is both dimmer in a fixed aperture and physically broader.",
          "quiet": "<b>Why the quiet readings confirm it:</b> round PSFs, quiet guiding, normal seeing, and a direct focus term identify the optics."
        },
        "chain": [
          "Telescope structure cools",
          "Focal surface shifts",
          "Stars broaden and aperture flux falls"
        ],
        "take": "Use image shape and independent wavefront information to separate focus from atmosphere and motion."
      },
      "logic": [
        [
          "Flux down",
          "Cloud, detector gain, or focus loss remain"
        ],
        [
          "PSF broad",
          "Focus or atmospheric/mount broadening remain"
        ],
        [
          "Bad focus metric",
          "Focus drift or mirror thermal shift remain"
        ],
        [
          "Flux loss + active focus offset",
          "Focus drift remains"
        ]
      ]
    },
    {
      "answer": "cloud",
      "alarm": "trans",
      "poleA": {
        "lab": "Atmospheric throughput",
        "val": "Extinction +0.29 mag; image width 0.94″",
        "note": "The field dims across instruments while image sharpness remains normal."
      },
      "hook": "A science sequence loses nearly a quarter of its counts while the stellar profiles remain sharp.",
      "riddle": "The image remains sharp while photons disappear across instruments. <span class=\"q\">Did the loss occur before the telescope, and is it gray or wavelength-dependent?</span>",
      "vals": {
        "flux": {
          "observed": "Standard stars −22 to −26%",
          "reference": "Photometric repeatability ±3%"
        },
        "psf": {
          "observed": "0.90–0.98″ FWHM",
          "reference": "Typical 0.7–1.2″"
        },
        "trans": {
          "observed": "0.29 mag extinction increase",
          "reference": "Photometric threshold <0.05 mag"
        },
        "focus": {
          "observed": "0.08 wave defocus",
          "reference": "Normal <0.25 wave"
        },
        "guide": {
          "observed": "0.14″ RMS",
          "reference": "Normal <0.30″ RMS"
        },
        "shape": {
          "observed": "Ellipticity 0.06",
          "reference": "Normal <0.10"
        },
        "camera2": {
          "observed": "Independent camera −23% on same stars",
          "reference": "Agreement target ±4%"
        },
        "sky": {
          "observed": "Seeing 0.78 arcsec; no bright-sky change",
          "reference": "Normal 0.6–1.0 arcsec"
        },
        "color": {
          "observed": "Loss gray to 1.2%",
          "reference": "Aerosol usually color-dependent"
        },
        "encoder": {
          "observed": "0.07 arcsec mismatch",
          "reference": "Normal <0.15 arcsec"
        }
      },
      "reasons": {
        "focusdrift": "Focus drift would broaden the PSF and produce a wavefront term; both remain normal.",
        "tracking": "Tracking error would raise guide residuals and elongate the PSF rather than dim two cameras equally.",
        "seeing": "A wind-driven interval broadens or elongates images; the stars here remain sharp while throughput falls across instruments.",
        "mirrorthermal": "A thermal focus shift broadens images; the PSF remains normal.",
        "aerosol": "It shares low transparency and both-camera dimming, but the attenuation would be chromatic rather than gray.",
        "encoderbias": "It shares gray dimming and an encoder mismatch, but transparency and the second camera identify an atmospheric loss."
      },
      "resolve": {
        "title": "Thin cloud extinction",
        "paras": [
          "Thin cloud adds about 0.29 mag of extinction. Two independent cameras see the same stellar dimming while focus, guiding, gain, and PSF width remain stable.",
          "Low transparency alone still fits aerosol extinction, and gray attenuation alone still fits detector gain drift. Their intersection identifies thin cloud without relying on one decisive monitor."
        ],
        "why": {
          "loud": "<b>Why the loud readings tie:</b> atmosphere and detector electronics can both reduce measured counts without changing PSF width.",
          "quiet": "<b>Why the tie breaks:</b> a second camera and all-sky monitor confirm that fewer photons reach the observatory."
        },
        "chain": [
          "Thin cloud crosses the line of sight",
          "Atmospheric transmission falls",
          "Multiple instruments measure lower stellar flux"
        ],
        "take": "Use an independent optical path to distinguish atmospheric throughput from detector calibration."
      },
      "logic": [
        [
          "Flux down + PSF normal",
          "Cloud, aerosol, or detector gain drift remain"
        ],
        [
          "Transparency low",
          "Cloud or aerosol remain"
        ],
        [
          "Gray attenuation",
          "Cloud or gain drift remain"
        ],
        [
          "Low transparency + gray attenuation",
          "Thin cloud remains"
        ]
      ]
    },
    {
      "answer": "focusdrift",
      "alarm": "guide",
      "experimental": false,
      "compound": [
        "focusdrift",
        "tracking"
      ],
      "observed": {
        "flux": "down",
        "psf": "broad",
        "trans": "normal",
        "focus": "bad",
        "guide": "high",
        "shape": "elongated",
        "camera2": "same-telescope",
        "sky": "normal",
        "color": "gray",
        "encoder": "mismatch"
      },
      "poleA": {
        "lab": "Two image defects",
        "val": "Defocus +1.3 waves; guide RMS 1.05″",
        "note": "The PSF contains both symmetric broadening and directional motion."
      },
      "hook": "After a mechanism reset, stars become large and elongated. Wavefront data and guide logs each show an independent failure.",
      "riddle": "No one image-quality fault explains both components. <span class=\"q\">Which two causes are present?</span>",
      "vals": {
        "flux": {
          "observed": "Standard stars −21% vs catalog",
          "reference": "Photometric repeatability ±3%"
        },
        "psf": {
          "observed": "2.8″ × 1.7″ FWHM",
          "reference": "Typical 0.7–1.2″"
        },
        "trans": {
          "observed": "0.01 mag extinction change",
          "reference": "Photometric threshold <0.05 mag"
        },
        "focus": {
          "observed": "+1.3 waves defocus; position −350 µm",
          "reference": "Normal defocus <0.25 wave"
        },
        "guide": {
          "observed": "1.05″ RMS; dominant RA oscillation",
          "reference": "Normal <0.30″ RMS"
        },
        "shape": {
          "observed": "Ellipticity 0.39 at position angle 92°",
          "reference": "Normal <0.10"
        },
        "camera2": {
          "observed": "Both cameras on telescope show same defect",
          "reference": "Independent telescope 0.86″"
        },
        "sky": {
          "observed": "Seeing monitor 0.84″",
          "reference": "Typical 0.7–1.2″"
        },
        "color": {
          "observed": "Loss gray to 1.4%",
          "reference": "Normal calibration residual <2%"
        },
        "encoder": {
          "observed": "0.82 arcsec mismatch",
          "reference": "Normal <0.15 arcsec"
        }
      },
      "reasons": {
        "focusdrift": "Focus drift explains the large symmetric core and direct wavefront term, but not the 1.05″ directional guide oscillation and aligned elongation.",
        "tracking": "Tracking error explains the elongated shape and guide residuals, but not the +1.3-wave defocus and 350 µm focal shift.",
        "cloud": "Transparency is stable, the independent telescope is sharp, and cloud cannot create focus and guide errors.",
        "seeing": "Wind-driven motion can explain the directional guide signature, but it cannot produce the independent wavefront defocus and lost aperture flux.",
        "mirrorthermal": "It explains a focus term but not the flux-loss pattern, guide residual, or encoder mismatch.",
        "aerosol": "It explains dimming but transparency is normal and it cannot create focus or mount errors.",
        "encoderbias": "It explains encoder mismatch alone, not high guide RMS, elongated stars, or the independent focus error."
      },
      "resolve": {
        "title": "Telescope focus drift + tracking error",
        "paras": [
          "The telescope is simultaneously out of focus and oscillating in right ascension. Defocus broadens the image symmetrically, while guiding stretches it along a common angle.",
          "The hard case requires two intersections. Focus error plus lost encircled flux rejects a benign thermal focus shift; guide residual plus encoder mismatch rejects wind shake. Only the focus and tracking faults together reproduce both PSF components."
        ],
        "why": {
          "loud": "<b>Why one cause fails:</b> radial broadening and directional smearing are different optical signatures.",
          "quiet": "<b>Why the pair is forced:</b> the wavefront sensor and guide camera independently measure each failure."
        },
        "chain": [
          "Focus mechanism shifts",
          "Guide loop oscillates",
          "Stars become both broad and elongated"
        ],
        "take": "Decompose a complex symptom into independent geometric components before choosing causes."
      },
      "logic": [
        [
          "Bad focus metric + reduced encircled flux",
          "Requires focus drift; mirror thermal shift or atmospheric loss imitates only one"
        ],
        [
          "High guide RMS + encoder mismatch",
          "Requires tracking-control error; wind shake or feedback bias imitates only one"
        ],
        [
          "Transparency and gain normal",
          "Rejects atmosphere and detector"
        ],
        [
          "Two independent optical-motion chains",
          "Focus drift and tracking error are simultaneous"
        ]
      ]
    }
  ],
  "schematic": {
    "viewBox": "0 0 520 390",
    "svg": "<defs><linearGradient id=\"cleanBg\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#0e2231\"/><stop offset=\"1\" stop-color=\"#061019\"/></linearGradient><marker id=\"cleanArrow\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto\"><path d=\"M0 0 L10 5 L0 10 z\" fill=\"#69c9ef\"/></marker><style>.clean-border{fill:url(#cleanBg);stroke:#426273;stroke-width:2}.component{fill:#1b3a4d;stroke:#90b3c4;stroke-width:1.7}.component2{fill:#244c61;stroke:#90b3c4;stroke-width:1.7}.flow{fill:none;stroke:#69c9ef;stroke-width:3;marker-end:url(#cleanArrow)}.flow2{fill:none;stroke:#e0b85f;stroke-width:3;marker-end:url(#cleanArrow)}.leader{fill:none;stroke:#7f9bab;stroke-width:1.25;stroke-linecap:round;stroke-linejoin:round;opacity:.78}.anchor{fill:#9ab8c8}.slabel{fill:#eaf6fb;font:700 10.5px Inter,system-ui,sans-serif}.labelbg{fill:#081923;stroke:#355769;stroke-width:1;opacity:.94}</style></defs><rect x=\"12\" y=\"12\" width=\"496\" height=\"366\" rx=\"24\" class=\"clean-border\"/><path d=\"M 30 105 L 58 105 L 58 118 L 95 118\" class=\"leader\"/><circle cx=\"95\" cy=\"118\" r=\"2.4\" class=\"anchor\"/><path d=\"M 30 175 L 58 175 L 58 180 L 95 180\" class=\"leader\"/><circle cx=\"95\" cy=\"180\" r=\"2.4\" class=\"anchor\"/><path d=\"M 235 35 L 235 68 L 245 68 L 245 135\" class=\"leader\"/><circle cx=\"245\" cy=\"135\" r=\"2.4\" class=\"anchor\"/><path d=\"M 450 35 L 450 68 L 435 68 L 435 100\" class=\"leader\"/><circle cx=\"435\" cy=\"100\" r=\"2.4\" class=\"anchor\"/><path d=\"M 490 105 L 462 105 L 462 160 L 360 160\" class=\"leader\"/><circle cx=\"360\" cy=\"160\" r=\"2.4\" class=\"anchor\"/><path d=\"M 490 160 L 462 160 L 462 195 L 390 195\" class=\"leader\"/><circle cx=\"390\" cy=\"195\" r=\"2.4\" class=\"anchor\"/><path d=\"M 490 215 L 462 215 L 462 225 L 360 225\" class=\"leader\"/><circle cx=\"360\" cy=\"225\" r=\"2.4\" class=\"anchor\"/><path d=\"M 490 270 L 462 270 L 462 245 L 400 245\" class=\"leader\"/><circle cx=\"400\" cy=\"245\" r=\"2.4\" class=\"anchor\"/><path d=\"M 165 355 L 165 327 L 180 327 L 180 270\" class=\"leader\"/><circle cx=\"180\" cy=\"270\" r=\"2.4\" class=\"anchor\"/><path d=\"M 235 355 L 235 327 L 220 327 L 220 290\" class=\"leader\"/><circle cx=\"220\" cy=\"290\" r=\"2.4\" class=\"anchor\"/><circle cx=\"95\" cy=\"145\" r=\"55\" class=\"component2\"/><g fill=\"#eaf6fb\"><circle cx=\"78\" cy=\"132\" r=\"7\"/><circle cx=\"108\" cy=\"153\" r=\"10\"/><circle cx=\"88\" cy=\"174\" r=\"5\"/></g><path d=\"M150 145 H207\" class=\"flow\"/><circle cx=\"245\" cy=\"145\" r=\"49\" class=\"component\"/><circle cx=\"245\" cy=\"145\" r=\"22\" fill=\"#0b1b25\" stroke=\"#9bbaca\" stroke-width=\"2\"/><path d=\"M294 145 H315\" class=\"flow\"/><rect x=\"315\" y=\"112\" width=\"105\" height=\"150\" rx=\"14\" class=\"component2\"/><circle cx=\"380\" cy=\"185\" r=\"20\" fill=\"none\" stroke=\"#e2b75a\" stroke-width=\"4\"/><ellipse cx=\"380\" cy=\"185\" rx=\"31\" ry=\"15\" fill=\"none\" stroke=\"#a8d5ea\" stroke-width=\"3\"/><rect x=\"427\" y=\"70\" width=\"48\" height=\"70\" rx=\"10\" class=\"component\"/><rect x=\"145\" y=\"242\" width=\"92\" height=\"66\" rx=\"11\" class=\"component\"/><path d=\"M210 242 L245 194\" class=\"flow\"/><g><rect x=\"54.0\" y=\"206.5\" width=\"82\" height=\"23\" rx=\"11.5\" class=\"labelbg\"/><text x=\"95\" y=\"221.7\" text-anchor=\"middle\" class=\"slabel\">atmosphere</text></g><g><rect x=\"202.0\" y=\"72.5\" width=\"86\" height=\"23\" rx=\"11.5\" class=\"labelbg\"/><text x=\"245\" y=\"87.7\" text-anchor=\"middle\" class=\"slabel\">telescope optics</text></g><g><rect x=\"329.0\" y=\"274.5\" width=\"72\" height=\"23\" rx=\"11.5\" class=\"labelbg\"/><text x=\"365\" y=\"289.7\" text-anchor=\"middle\" class=\"slabel\">detector</text></g><g><rect x=\"147.0\" y=\"313.5\" width=\"88\" height=\"23\" rx=\"11.5\" class=\"labelbg\"/><text x=\"191\" y=\"328.7\" text-anchor=\"middle\" class=\"slabel\">mount + guider</text></g><g><rect x=\"425.0\" y=\"93.5\" width=\"52\" height=\"23\" rx=\"11.5\" class=\"labelbg\"/><text x=\"451\" y=\"108.7\" text-anchor=\"middle\" class=\"slabel\">camera 2</text></g>"
  }
} };
