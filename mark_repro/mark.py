"""Reproduce the halftone-arc mark. Writes mark.svg and mark.png."""
import math
import os
import numpy as np

W = H = 1254
BLACK = "#141414"

# VARIANT picks the treatment:
#   "none"    body, disc, crescent, hairline only
#   "orbit"   one arc concentric with the disc, riding just outside the
#             hairline through the lower right, swelling where the hairline
#             is thinnest so the two trade the job between them
#   "burst"   the hairline never recovers: it thins all the way to the bottom,
#             breaks, and carries on as dots that grow as they go
#   "fade"    the same line, but it simply runs out — no dots at all
#   "solid"   no crescent: the body closes into a full rounded square and the
#             disc is carried by the hairline alone, right round the circle
#   "inset"   the D closes all the way round, so its border is unbroken black,
#             and the crescent is clipped to sit inside it
#   "transit" the source mark's outer arc, kept to the top-left field only
#   "full"    both original bands
VARIANT = os.environ.get("VARIANT", "none")
# BORDER draws a black keyline along the edges of the white shapes, so the
# crescent reads as an edge where it would otherwise bleed into the page.
BORDER = float(os.environ.get("BORDER", 0.0))
OUT = "mark" if VARIANT == "none" else "mark_" + VARIANT
BASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "")

# ---------------------------------------------------------------- geometry
CX, CY, CR = 622.0, 877.5, 342.3          # the disc
LX, TY, RX, BY = 114.0, 71.0, 1177.0, 1238.4

# Each corner is a squircle quadrant: centre, x-radius, y-radius, bezier k.
TR = (644.4, 602.2, 532.6, 531.2, 0.664)
BR = (789.9, 835.6, 387.1, 402.8, 0.607)
BL = (664.7, 835.6, 348.3, 402.8, 0.607)
if VARIANT in ("solid", "inset"):          # mirror the bottom-right corner so
    BL = (LX + BR[2], BR[1], BR[2], BR[3], BR[4])   # the left edge closes cleanly

# The white crescent: a second, larger circle that touches the disc from the
# outside at TOUCH and swings clear of it down to the lower left.  Its own left
# edge is tangent to the blob's, which is what puts the sharp nick at (114,806).
TOUCH, LUNE_END = 77.0, 245.0


def disc_point(th_deg, r=CR):
    a = math.radians(th_deg)
    return CX + r * math.cos(a), CY - r * math.sin(a)


def lune_circle():
    """Centre and radius of the crescent's outer circle."""
    tx, ty = disc_point(TOUCH)
    ux, uy = (tx - CX) / CR, (ty - CY) / CR        # outward at the touch point
    # centre sits back along that normal; radius set by passing through the nick
    num = (LX - tx) ** 2 + (806.0 - ty) ** 2
    den = 2 * ((LX - tx) * -ux + (806.0 - ty) * -uy)
    ro = num / den
    return (tx - ro * ux, ty - ro * uy), ro


LC, LR = lune_circle()


def ray_hit(th_deg, centre, r):
    """Where the ray leaving the disc's centre at th_deg leaves that circle."""
    ux, uy = math.cos(math.radians(th_deg)), -math.sin(math.radians(th_deg))
    vx, vy = CX - centre[0], CY - centre[1]
    b = vx * ux + vy * uy
    t = -b + math.sqrt(b * b - (vx * vx + vy * vy - r * r))
    return CX + t * ux, CY + t * uy


def blob_path():
    return [
        ("M", LX, TY),
        ("L", TR[0], TY),
        ("C", TR[0] + TR[2] * TR[4], TY, RX, TR[1] - TR[3] * TR[4], RX, TR[1]),
        ("L", RX, BR[1]),
        ("C", RX, BR[1] + BR[3] * BR[4], BR[0] + BR[2] * BR[4], BY, BR[0], BY),
        ("L", BL[0], BY),
        ("C", BL[0] - BL[2] * BL[4], BY, BL[0] - BL[2], BL[1] + BL[3] * BL[4],
         BL[0] - BL[2], BL[1]),
        ("L", LX, BL[1]),
        ("Z",),
    ]


def bez(p0, p1, p2, p3, t):
    u = 1 - t
    return (u*u*u*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t*t*t*p3[0],
            u*u*u*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t*t*t*p3[1])


def outline_points(n=1400):
    """The D's visible silhouette: the body, but with its lower left handed
    over to the crescent's outer arc, which is the real edge there."""
    pts = [(LX, TY), (TR[0], TY)]
    for i in range(1, n // 4 + 1):
        pts.append(bez((TR[0], TY), (TR[0] + TR[2]*TR[4], TY),
                       (RX, TR[1] - TR[3]*TR[4]), (RX, TR[1]), i / (n // 4)))
    pts.append((RX, BR[1]))
    for i in range(1, n // 4 + 1):
        pts.append(bez((RX, BR[1]), (RX, BR[1] + BR[3]*BR[4]),
                       (BR[0] + BR[2]*BR[4], BY), (BR[0], BY), i / (n // 4)))
    pts.append((BL[0], BY))
    c0, c1 = (BL[0] - BL[2]*BL[4], BY), (BL[0] - BL[2], BL[1] + BL[3]*BL[4])
    for i in range(1, n // 4 + 1):
        q = bez((BL[0], BY), c0, c1, (BL[0] - BL[2], BL[1]), i / (n // 4))
        if math.hypot(q[0] - LC[0], q[1] - LC[1]) <= LR:
            break                      # the crescent takes over from here
        pts.append(q)
    a0 = math.atan2(pts[-1][1] - LC[1], pts[-1][0] - LC[0])
    a1 = math.atan2(806.0 - LC[1], LX - LC[0])
    for i in range(1, n // 3 + 1):
        a = a0 + (a1 - a0) * i / (n // 3)
        pts.append((LC[0] + LR * math.cos(a), LC[1] + LR * math.sin(a)))
    pts.append((LX, TY))
    return pts


def lune_path():
    a = disc_point(TOUCH)
    b = ray_hit(LUNE_END, LC, LR)
    c = disc_point(LUNE_END)
    return [("M", a[0], a[1]),
            ("A", LR, LR, 0, 0, 0, b[0], b[1]),    # out around the bigger circle
            ("L", c[0], c[1]),
            ("A", CR, CR, 0, 0, 1, a[0], a[1]),    # back along the disc
            ("Z",)]


# ------------------------------------------------- halftone bands (measured)
MC = (638.0, 880.0)   # centre the source dots were measured against
# (theta_deg, band_radius, dot_radius)
BAND_A = [(159.8,524.1,28.0),(151.1,500.5,28.5),(141.1,488.0,29.4),(130.7,478.5,28.1),
          (120.4,466.1,26.6),(110.1,453.8,24.8),(99.4,440.1,22.3),(88.8,426.4,19.8),
          (77.9,413.7,17.4),(67.0,404.0,15.5),(56.1,398.5,13.4),(45.0,390.8,12.2),
          (33.5,384.9,11.4),(21.8,380.0,10.4),(9.8,375.7,9.5),(-2.6,374.8,8.3),
          (-14.8,376.5,7.7),(-26.9,380.2,6.8),(-39.4,387.2,7.1)]
BAND_B = [(148.4,568.5,29.6),(137.2,572.3,31.1),(126.6,566.2,29.1),(116.6,551.8,27.6),
          (106.4,540.9,24.8),(95.8,523.8,22.4),(85.3,506.5,19.5),(74.9,489.0,16.9),
          (64.4,473.1,14.5),(53.8,461.3,12.3),(42.9,449.5,11.5),(31.5,437.2,10.6),
          (19.8,427.7,9.6),(7.7,421.8,8.6),(-4.3,419.1,7.7),(-16.3,418.3,7.2),
          (-28.0,420.1,5.9)]
BAND_C = [(58.3,347.1,13.4),(47.2,342.7,12.5),(36.0,339.2,11.4),(24.3,335.1,10.5),
          (12.4,333.8,9.8),(-0.2,333.9,8.9),(-12.8,336.2,8.1),(-25.4,339.5,7.4),
          (-38.0,345.0,7.0),(-50.0,349.5,6.7)]

# Dot size is one smooth function of angle across all three bands.
_ALL = BAND_A + BAND_B + BAND_C
_FIT = np.polyfit([t for t, _, _ in _ALL], [r for _, _, r in _ALL], 3)
dot_r = lambda th: float(np.polyval(_FIT, max(-50.0, min(155.0, th)))) 

# The inner band rides the disc's own edge, its centres a fixed 0.84 dot-radii
# outside it, so each dot bites the same shallow scallop out of the disc.
# Turn it off to leave the disc's edge unbroken.
C_RIDE = 0.84
INNER_BAND = False

# The hairline that carries the disc's edge round the part the crescent leaves
# bare.  It starts back inside the crescent, at the angle where the crescent is
# exactly RING wide, so the two meet at matching thickness and overlap through
# the pinch.  From there it thins fast to RING_TIP at the halfway mark, then
# reverses and swells back to RING_END as it comes round the bottom.
RING, RING_TIP, RING_END = 3.0, 0.25, 4.0
RING_FALLOFF, RING_RISE, RING_MID = 0.5, 0.55, 0.68

# "burst": the line runs out at RING_BREAK, down by then to RING_BREAK_W, and
# dots pick it up from there and swell to BURST_MAX by the lower left.
RING_BREAK, RING_BREAK_W = -25.0, 0.7
BURST_LEAD = 15.0     # clear gap between the end of the line and the first dot
BURST_TO, BURST_MIN, BURST_MAX, BURST_GAP = -80.0, 4.0, 19.0, 17.0

RING_TO = RING_BREAK if VARIANT in ("burst", "fade") else LUNE_END
if VARIANT == "solid":
    RING_TO = TOUCH - 359.9              # all the way round, meeting itself


def ring_width(t):
    if VARIANT in ("burst", "fade"):
        return RING * (RING_BREAK_W / RING) ** (t ** RING_FALLOFF)
    if t <= RING_MID:
        u = t / RING_MID
        return RING * (RING_TIP / RING) ** (u ** RING_FALLOFF)
    v = (t - RING_MID) / (1.0 - RING_MID)
    return RING_TIP * (RING_END / RING_TIP) ** (v ** RING_RISE)


def lune_width(th_deg):
    x, y = ray_hit(th_deg, LC, LR)
    return math.hypot(x - CX, y - CY) - CR


def ring_start():
    if VARIANT == "solid":
        return TOUCH
    th = TOUCH
    while lune_width(th) < RING and th < TOUCH + 90.0:
        th += 0.25
    return th


RING_FROM = ring_start()


def ring_path(steps=560):
    span = (RING_FROM - RING_TO) % 360.0
    outer, inner = [], []
    for i in range(steps + 1):
        t = i / steps
        th = RING_FROM - t * span
        w = ring_width(t)
        outer.append(disc_point(th, CR + w))   # sits outside the disc, as the
        inner.append(disc_point(th, CR))       # crescent does, so they join flush
    pts = outer + inner[::-1]
    return [("M", pts[0][0], pts[0][1])] + \
           [("L", x, y) for x, y in pts[1:]] + [("Z",)]


BAND_B_TOP = [b for b in BAND_B if b[0] >= 88.0]
BANDS = {"none": [], "orbit": [], "burst": [], "fade": [], "solid": [],
         "inset": [],
         "transit": [(BAND_B_TOP, 91.0, 172.0)],
         "full": [(BAND_A, 85.0, 180.0), (BAND_B, 91.0, 172.0)]}[VARIANT]

# the orbit arc: constant standoff from the disc, size peaking where the
# hairline has all but vanished
ORBIT_FROM, ORBIT_TO = 32.0, -86.0
ORBIT_GAP, ORBIT_MIN, ORBIT_MAX = 15.0, 8.0, 17.0


def orbit_r(th):
    t = (ORBIT_FROM - th) / (ORBIT_FROM - ORBIT_TO)
    return ORBIT_MIN + (ORBIT_MAX - ORBIT_MIN) * math.sin(math.pi * t) ** 0.8

dots = []
for pts, arc, th_top in BANDS:
    ts = [t for t, _, _ in pts][::-1]
    rs = [r for _, r, _ in pts][::-1]
    for th, rad, _ in pts:
        a = math.radians(th)
        dots.append((MC[0] + rad * math.cos(a), MC[1] - rad * math.sin(a), dot_r(th)))
    th = pts[0][0] + math.degrees(arc / pts[0][1])
    while th < th_top:
        rad = float(np.interp(th, ts, rs))
        a = math.radians(th)
        dots.append((MC[0] + rad * math.cos(a), MC[1] - rad * math.sin(a), dot_r(th)))
        th += math.degrees(arc / rad)

if VARIANT == "burst":
    # centres sit on the disc's own edge, the same circle the line runs on, so
    # the beads stay strung on that arc instead of drifting out as they grow
    first = RING_BREAK - BURST_LEAD
    span = first - BURST_TO
    th = first
    while th > BURST_TO:
        r = BURST_MIN * (BURST_MAX / BURST_MIN) ** ((first - th) / span)
        a = math.radians(th)
        dots.append((CX + CR * math.cos(a), CY - CR * math.sin(a), r))
        th -= math.degrees((2 * r + BURST_GAP) / CR)

if VARIANT == "orbit":
    th = ORBIT_FROM
    while th > ORBIT_TO:
        r = orbit_r(th)
        rad = CR + ORBIT_GAP + r
        a = math.radians(th)
        dots.append((CX + rad * math.cos(a), CY - rad * math.sin(a), r))
        th -= math.degrees((2 * r + 25.0) / rad)

# inner band, placed against the disc rather than against the measuring centre
if INNER_BAND:
    for th, rad, _ in BAND_C:
        a = math.radians(th)
        dots.append((MC[0] + rad * math.cos(a), MC[1] - rad * math.sin(a), dot_r(th)))
    x0, y0, _ = dots[-len(BAND_C)]
    th = math.degrees(math.atan2(CY - y0, x0 - CX))
    while th < 172.0:
        r = dot_r(th)
        rad = CR + C_RIDE * r
        a = math.radians(th)
        dots.append((CX + rad * math.cos(a), CY - rad * math.sin(a), r))
        th += math.degrees(70.5 / rad)

# ------------------------------------------------------------------- output
def svg_d(cmds):
    out = []
    for c in cmds:
        out.append(c[0] + " ".join(("%g" if isinstance(v, int) else "%.2f") % v
                                   for v in c[1:]))
    return " ".join(out)

svg = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d">' % (W, H),
       '<rect width="%d" height="%d" fill="#fff"/>' % (W, H)]
if VARIANT == "inset":
    svg += ['<clipPath id="d"><path d="%s"/></clipPath>' % svg_d(blob_path())]
svg += [
       '<g fill="%s">' % BLACK,
       '<path d="%s"/>' % svg_d(blob_path()),
       '<circle cx="%.1f" cy="%.1f" r="%.1f"/>' % (CX, CY, CR),
       '</g>',
       '<g fill="#fff"%s>' % (' clip-path="url(#d)"' if VARIANT == "inset" else '')]
if VARIANT != "solid":
    svg += ['<path d="%s"/>' % svg_d(lune_path())]
svg += ['<circle cx="%.2f" cy="%.2f" r="%.2f"/>' % d for d in dots]
svg += ['<path d="%s"/>' % svg_d(ring_path()), '</g>']
if BORDER:
    d = "M" + " L".join("%.2f %.2f" % q for q in outline_points())
    svg += ['<path d="%s" fill="none" stroke="%s" stroke-width="%.2f" '
            'stroke-linejoin="round"/>' % (d, BLACK, BORDER)]
svg += ['</svg>']
open(BASE + OUT + ".svg", "w").write("\n".join(svg))

# --- raster the same paths with matplotlib so they can be diffed pixel-wise ---
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.path import Path
from matplotlib.patches import PathPatch, Circle


def to_mpl(cmds):
    verts, codes, cur = [], [], None
    for c in cmds:
        if c[0] == "M":
            cur = (c[1], c[2]); verts.append(cur); codes.append(Path.MOVETO)
        elif c[0] == "L":
            cur = (c[1], c[2]); verts.append(cur); codes.append(Path.LINETO)
        elif c[0] == "C":
            verts += [(c[1], c[2]), (c[3], c[4]), (c[5], c[6])]
            codes += [Path.CURVE4] * 3; cur = (c[5], c[6])
        elif c[0] == "A":
            r, sweep, end = c[1], c[5], (c[6], c[7])
            centre = LC if abs(r - LR) < 1e-6 else (CX, CY)
            a0 = math.atan2(cur[1] - centre[1], cur[0] - centre[0])
            a1 = math.atan2(end[1] - centre[1], end[0] - centre[0])
            if sweep and a1 < a0:
                a1 += 2 * math.pi
            if not sweep and a1 > a0:
                a1 -= 2 * math.pi
            pts = [(centre[0] + r * math.cos(a), centre[1] + r * math.sin(a))
                   for a in np.linspace(a0, a1, 300)[1:]]
            verts += pts; codes += [Path.LINETO] * len(pts); cur = end
        else:
            verts.append(verts[0]); codes.append(Path.CLOSEPOLY)
    return Path(verts, codes)


fig = plt.figure(figsize=(W / 100, H / 100), dpi=100)
ax = fig.add_axes([0, 0, 1, 1]); ax.set_xlim(0, W); ax.set_ylim(H, 0); ax.axis("off")
ax.add_patch(PathPatch(to_mpl(blob_path()), facecolor=BLACK, edgecolor="none"))
ax.add_patch(Circle((CX, CY), CR, facecolor=BLACK, edgecolor="none"))
body = to_mpl(blob_path())
_white = []
if VARIANT != "solid":
    _white.append(ax.add_patch(PathPatch(to_mpl(lune_path()), facecolor="white",
                                         edgecolor="none")))
for x, y, r in dots:
    _white.append(ax.add_patch(Circle((x, y), r, facecolor="white",
                                      edgecolor="none", zorder=3)))
_white.append(ax.add_patch(PathPatch(to_mpl(ring_path()), facecolor="white",
                                     edgecolor="none", zorder=4)))
if VARIANT == "inset":
    for patch in _white:
        patch.set_clip_path(body, ax.transData)
if BORDER:
    xs, ys = zip(*outline_points())
    ax.plot(xs, ys, color=BLACK, linewidth=BORDER, solid_joinstyle="round",
            zorder=5)
fig.savefig(BASE + OUT + ".png", dpi=100, facecolor="white")
print("dots:", len(dots), "lune centre", tuple(round(v) for v in LC), "r", round(LR))
