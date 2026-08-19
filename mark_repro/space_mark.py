"""A pared-back D for Duke SPACE: keyline, solid counter, one spiral arm, a few stars."""
import math
import os

W, H = 966, 914
NAVY = "#21274C"
BASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "")

# ---- the D ---------------------------------------------------------------
# Outer keyline and the solid counter are the same letterform at two insets.
LX, TY, BYY, RXX = 54.0, 55.0, 805.0, 788.0
SHOULDER = 482.0          # where the top and bottom edges give way to the bowl
STROKE = 15.0
GAP = 30.0                # white channel between keyline and counter
K = 0.62                  # bezier constant; >0.5523 fattens the bowl


def d_path(inset):
    """The D letterform, pulled in by `inset` on every side."""
    x0, y0, y1 = LX + inset, TY + inset, BYY - inset
    x1, sh = RXX - inset, SHOULDER - inset * 0.35
    ym = (y0 + y1) / 2.0
    rx, ry = x1 - sh, (y1 - y0) / 2.0
    return ("M%.1f %.1f L%.1f %.1f "
            "C%.1f %.1f %.1f %.1f %.1f %.1f "
            "C%.1f %.1f %.1f %.1f %.1f %.1f "
            "L%.1f %.1f Z") % (
        x0, y0, sh, y0,
        sh + rx * K, y0, x1, ym - ry * K, x1, ym,
        x1, ym + ry * K, sh + rx * K, y1, sh, y1,
        x0, y1)


# ---- the black hole -----------------------------------------------------
# A dark core with a bright ring, and two arms of dots winding out of it.
C, CORE = (348.0, 556.0), 236.0
RING_MAX, RING_MIN = 22.0, 2.5
RING_FROM = 145.0                # ring is heaviest here, thinnest opposite

# One arm only: (standoff from core, biggest dot, start angle, end angle,
# outward drift).  It comes up out of the lower left, over the top, and stops
# at two o'clock.
ARMS = [(34.0, 26.0, 200.0, 30.0, 4.0)]   # near-zero drift: it hugs the core
DOT_MIN = 3.5
DOT_DECAY = 2.4          # higher falls away faster
ARM_SPACING = 3.9


def ring_poly(steps=540):
    """The photon ring: a circle whose weight falls off away from RING_FROM."""
    outer, inner = [], []
    for i in range(steps + 1):
        th = RING_FROM - 360.0 * i / steps
        f = (1 + math.cos(math.radians(th - RING_FROM))) / 2      # 1 -> 0 -> 1
        w = RING_MIN + (RING_MAX - RING_MIN) * f ** 1.6
        a = math.radians(th)
        outer.append((C[0] + (CORE + w) * math.cos(a), C[1] - (CORE + w) * math.sin(a)))
        inner.append((C[0] + CORE * math.cos(a), C[1] - CORE * math.sin(a)))
    pts = outer + inner[::-1]
    return "M" + " L".join("%.1f %.1f" % q for q in pts) + " Z"


def arms():
    out = []
    for standoff, big, a_from, a_to, drift in ARMS:
        th = a_from
        while th > a_to:
            t = (a_from - th) / (a_from - a_to)
            r = DOT_MIN + (big - DOT_MIN) * (1 - t) ** DOT_DECAY
            rad = CORE + standoff + drift * t
            a = math.radians(th)
            out.append((C[0] + rad * math.cos(a), C[1] - rad * math.sin(a), r))
            th -= math.degrees(ARM_SPACING * r / rad)
    return out


# ---- four-pointed stars --------------------------------------------------
def star(cx, cy, r, waist=0.16):
    """A sparkle: a diamond with its sides drawn in."""
    w = r * waist
    return ("M%.1f %.1f C%.1f %.1f %.1f %.1f %.1f %.1f "
            "C%.1f %.1f %.1f %.1f %.1f %.1f "
            "C%.1f %.1f %.1f %.1f %.1f %.1f "
            "C%.1f %.1f %.1f %.1f %.1f %.1f Z") % (
        cx, cy - r,
        cx + w, cy - w * 2.2, cx + w * 2.2, cy - w, cx + r, cy,
        cx + w * 2.2, cy + w, cx + w, cy + w * 2.2, cx, cy + r,
        cx - w, cy + w * 2.2, cx - w * 2.2, cy + w, cx - r, cy,
        cx - w * 2.2, cy - w, cx - w, cy - w * 2.2, cx, cy - r)


# also concentric with the core, one ring out from the dots
STAR_RING = 310.0
STARS = [(th, r) for th, r in [(140.0, 22.0), (100.0, 13.0), (58.0, 17.0)]]
STARS = [(C[0] + STAR_RING * math.cos(math.radians(th)),
          C[1] - STAR_RING * math.sin(math.radians(th)), r) for th, r in STARS]

# ---- assemble ------------------------------------------------------------
svg = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d">' % (W, H),
       '<rect width="%d" height="%d" fill="#fff"/>' % (W, H),
       '<path d="%s" fill="%s"/>' % (d_path(0.0), NAVY),
       '<g fill="#fff">',
       '<path d="%s"/>' % ring_poly()]
svg += ['<circle cx="%.1f" cy="%.1f" r="%.1f"/>' % d for d in arms()]
svg += ['<path d="%s"/>' % star(*s) for s in STARS]
svg += ['</g></svg>']
open(BASE + "space_mark.svg", "w").write("\n".join(svg))
print("dots:", len(arms()), "stars:", len(STARS))
