"""Duke SPACE D: measured letterform, with a designed particle field.

The field morphs by distance from the planet: round dots near in, diamonds
further out, four-pointed stars at the edge, thinning as it goes.
"""
import math
import os

import numpy as np
from matplotlib.path import Path as MPath

W, H = 966, 914
NAVY = "#21274C"
BASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "")

# ---- letterform, measured off the reference ------------------------------
LX, TY, BYY, RXX = 54.0, 55.0, 805.0, 787.0
SHOULDER, STROKE, GAP, K = 470.0, 21.0, 37.0, 0.48
PLANET = (313.0, 571.0, 118.0)


def d_geom(inset):
    x0, y0, y1 = LX + inset, TY + inset, BYY - inset
    x1, sh = RXX - inset, SHOULDER - inset * 0.3
    ym = (y0 + y1) / 2.0
    return x0, y0, y1, x1, sh, ym, x1 - sh, (y1 - y0) / 2.0


def d_path(inset):
    x0, y0, y1, x1, sh, ym, rx, ry = d_geom(inset)
    return ("M%.1f %.1f L%.1f %.1f C%.1f %.1f %.1f %.1f %.1f %.1f "
            "C%.1f %.1f %.1f %.1f %.1f %.1f L%.1f %.1f Z") % (
        x0, y0, sh, y0, sh + rx * K, y0, x1, ym - ry * K, x1, ym,
        x1, ym + ry * K, sh + rx * K, y1, sh, y1, x0, y1)


def d_poly(inset, n=90):
    x0, y0, y1, x1, sh, ym, rx, ry = d_geom(inset)

    def bez(p0, p1, p2, p3):
        return [tuple((1-t)**3*np.array(p0) + 3*(1-t)**2*t*np.array(p1)
                      + 3*(1-t)*t*t*np.array(p2) + t**3*np.array(p3))
                for t in (i / n for i in range(1, n + 1))]

    pts = [(x0, y0), (sh, y0)]
    pts += bez((sh, y0), (sh + rx*K, y0), (x1, ym - ry*K), (x1, ym))
    pts += bez((x1, ym), (x1, ym + ry*K), (sh + rx*K, y1), (sh, y1))
    pts += [(x0, y1), (x0, y0)]
    return MPath(pts)


COUNTER = d_poly(STROKE + GAP + 6.0)

# ---- the field -----------------------------------------------------------
FC = (PLANET[0], PLANET[1])          # everything orbits the planet
R_IN, R_OUT = 138.0, 470.0
A_FROM, A_TO = 224.0, -94.0          # sweeps from lower left round to bottom
SIZE_IN, SIZE_OUT = 34.0, 6.5        # particle radius, inner to outer
PACK_IN, PACK_OUT = 1.75, 9.5         # centre spacing in particle radii;
                                     # under 2 the first ring overlaps into a
                                     # solid collar, which is what gives the
                                     # planet its edge; then it opens out fast
# superellipse power against distance: round for the first stretch, through a
# true diamond at 1.0, then concave into stars at the rim
EXP_T = [0.0, 0.26, 0.62, 1.0]
EXP_N = [2.0, 1.95, 1.00, 0.60]


def lerp(a, b, t):
    return a + (b - a) * t


def particle(cx, cy, s, n, steps=64):
    """A superellipse: n=2 is a circle, n=1 a diamond, n<1 a four-pointed star."""
    if n > 1.88:
        return '<circle cx="%.1f" cy="%.1f" r="%.1f"/>' % (cx, cy, s)
    pts = []
    for i in range(steps):
        a = 2 * math.pi * i / steps
        ca, sa = math.cos(a), math.sin(a)
        pts.append((cx + math.copysign(abs(ca) ** (2 / n), ca) * s,
                    cy + math.copysign(abs(sa) ** (2 / n), sa) * s))
    return '<path d="M%s Z"/>' % " L".join("%.1f %.1f" % p for p in pts)


field, r = [], R_IN
while r < R_OUT:
    t = (r - R_IN) / (R_OUT - R_IN)
    s = SIZE_IN * (SIZE_OUT / SIZE_IN) ** t
    n = float(np.interp(t, EXP_T, EXP_N))
    pack = lerp(PACK_IN, PACK_OUT, t ** 1.5)   # holds tight, then opens out
    th = A_FROM
    while th > A_TO:
        a = math.radians(th)
        x, y = FC[0] + r * math.cos(a), FC[1] - r * math.sin(a)
        # no clearance test: the collar is meant to run under the planet, which
        # is painted over it, so the planet's own edge cuts them clean
        if COUNTER.contains_point((x, y)):
            field.append((x, y, s, n))
        th -= math.degrees(pack * s / r)
    r += pack * s

# ---- assemble ------------------------------------------------------------
svg = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d">' % (W, H),
       '<rect width="%d" height="%d" fill="#fff"/>' % (W, H),
       '<path d="%s" fill="none" stroke="%s" stroke-width="%.1f"/>'
       % (d_path(STROKE / 2), NAVY, STROKE),
       '<path d="%s" fill="%s"/>' % (d_path(STROKE + GAP), NAVY),
       '<g fill="#fff">']
svg += [particle(*p) for p in field]
svg += ['</g>',
        '<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s"/>' % (*PLANET, NAVY),
        '</svg>']
open(BASE + "space_field.svg", "w").write("\n".join(svg))
rounds = sum(1 for p in field if p[3] > 1.88)
print("particles:", len(field), "| circles:", rounds,
      "| diamonds/stars:", len(field) - rounds)
