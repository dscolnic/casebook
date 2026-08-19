"""Reproduction of the Duke SPACE D, measured off the screenshot."""
import glob
import math
import os

import numpy as np

W, H = 966, 914
NAVY = "#21274C"
BASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "")

# ---- the letterform ------------------------------------------------------
LX, TY, BYY, RXX = 54.0, 55.0, 805.0, 787.0
SHOULDER = 470.0        # top and bottom edges run straight to here
STROKE = 21.0           # keyline weight
GAP = 37.0              # white channel between keyline and counter
K = 0.48                # bowl is slightly flatter than an ellipse


def d_path(inset):
    x0, y0, y1 = LX + inset, TY + inset, BYY - inset
    x1, sh = RXX - inset, SHOULDER - inset * 0.3
    ym = (y0 + y1) / 2.0
    rx, ry = x1 - sh, (y1 - y0) / 2.0
    return ("M%.1f %.1f L%.1f %.1f C%.1f %.1f %.1f %.1f %.1f %.1f "
            "C%.1f %.1f %.1f %.1f %.1f %.1f L%.1f %.1f Z") % (
        x0, y0, sh, y0,
        sh + rx * K, y0, x1, ym - ry * K, x1, ym,
        x1, ym + ry * K, sh + rx * K, y1, sh, y1,
        x0, y1)


PLANET = (313.0, 571.0, 118.0)     # the dark disc, fitted row by row

# ---- the marks, lifted from the screenshot -------------------------------
STARS = [(159.0, 255.0, 30.0), (194.0, 193.0, 24.0), (305.0, 170.0, 21.5),
         (538.0, 285.0, 19.5), (417.0, 180.0, 18.5), (521.0, 222.0, 15.5),
         (274.0, 687.0, 13.5), (609.0, 293.0, 12.5), (669.0, 546.0, 12.0),
         (673.0, 386.0, 9.5), (221.0, 584.0, 5.5)]

from matplotlib.path import Path as MPath


def counter_poly(inset, n=80):
    """The counter as a polyline, for testing what falls inside it."""
    x0, y0, y1 = LX + inset, TY + inset, BYY - inset
    x1, sh = RXX - inset, SHOULDER - inset * 0.3
    ym = (y0 + y1) / 2.0
    rx, ry = x1 - sh, (y1 - y0) / 2.0

    def bez(p0, p1, p2, p3):
        return [(( (1-t)**3*p0[0] + 3*(1-t)**2*t*p1[0] + 3*(1-t)*t*t*p2[0] + t**3*p3[0]),
                 ( (1-t)**3*p0[1] + 3*(1-t)**2*t*p1[1] + 3*(1-t)*t*t*p2[1] + t**3*p3[1]))
                for t in (i / n for i in range(1, n + 1))]

    pts = [(x0, y0), (sh, y0)]
    pts += bez((sh, y0), (sh + rx*K, y0), (x1, ym - ry*K), (x1, ym))
    pts += bez((x1, ym), (x1, ym + ry*K), (sh + rx*K, y1), (sh, y1))
    pts += [(x0, y1), (x0, y0)]
    return MPath(pts)


COUNTER = counter_poly(STROKE + GAP + 3.0)

dots = [tuple(r) for r in np.load(BASE + "ref_dots.npy")]
dots = [(d[0], d[1], min(d[2], 44.0)) for d in dots]
dots = [d for d in dots if COUNTER.contains_point((d[0], d[1]))]
dots = [d for d in dots
        if all(math.hypot(d[0] - s[0], d[1] - s[1]) > s[2] * 0.9 for s in STARS)]
on_planet = [d for d in dots
             if math.hypot(d[0] - PLANET[0], d[1] - PLANET[1]) < PLANET[2] - 1]
off_planet = [d for d in dots if d not in on_planet]


def star(cx, cy, r, waist=0.30):
    """A diamond with its four sides drawn slightly in."""
    w = r * waist
    return ("M%.1f %.1f Q%.1f %.1f %.1f %.1f Q%.1f %.1f %.1f %.1f "
            "Q%.1f %.1f %.1f %.1f Q%.1f %.1f %.1f %.1f Z") % (
        cx, cy - r, cx + w, cy - w, cx + r, cy,
        cx + w, cy + w, cx, cy + r,
        cx - w, cy + w, cx - r, cy,
        cx - w, cy - w, cx, cy - r)


circle = lambda d: '<circle cx="%.1f" cy="%.1f" r="%.1f"/>' % d

svg = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d">' % (W, H),
       '<rect width="%d" height="%d" fill="#fff"/>' % (W, H),
       '<path d="%s" fill="none" stroke="%s" stroke-width="%.1f"/>'
       % (d_path(STROKE / 2), NAVY, STROKE),
       '<path d="%s" fill="%s"/>' % (d_path(STROKE + GAP), NAVY),
       '<g fill="#fff">']
svg += [circle(d) for d in off_planet]
svg += ['<path d="%s"/>' % star(*s) for s in STARS]
svg += ['</g>', circle(PLANET).replace('/>', ' fill="%s"/>' % NAVY),
        '<g fill="#fff">']
svg += [circle(d) for d in on_planet]
svg += ['</g></svg>']
open(BASE + "space_repro.svg", "w").write("\n".join(svg))
print("dots:", len(off_planet), "+", len(on_planet), "on planet; stars:", len(STARS))
