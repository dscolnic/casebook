"""Trace the Duke SPACE screenshot into clean vector paths."""
import glob
import os

import numpy as np
from PIL import Image
from scipy import ndimage
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

BASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "")
NAVY = "#21274C"
SCALE = 2          # supersample before contouring, for sub-pixel edges
SMOOTH = 1.6       # gaussian blur in supersampled pixels
TOL = 0.45         # simplification tolerance, in original pixels


def rdp(pts, tol):
    """Ramer-Douglas-Peucker, iterative."""
    keep = np.zeros(len(pts), bool)
    keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        i, j = stack.pop()
        if j <= i + 1:
            continue
        seg = pts[j] - pts[i]
        n = np.hypot(*seg)
        if n == 0:
            d = np.hypot(*(pts[i+1:j] - pts[i]).T)
        else:
            v = pts[i+1:j] - pts[i]
            d = np.abs(seg[0] * v[:, 1] - seg[1] * v[:, 0]) / n
        k = int(d.argmax())
        if d[k] > tol:
            keep[i + 1 + k] = True
            stack += [(i, i + 1 + k), (i + 1 + k, j)]
    return pts[keep]


src = glob.glob(BASE + "Screenshot*.png")[0]
im = Image.open(src).convert("RGB")
W, H = im.size
a = np.array(im).astype(int)
navy = (np.abs(a - np.array([33, 39, 76])).sum(2) < 150).astype(float)

big = ndimage.zoom(navy, SCALE, order=1)
big = ndimage.gaussian_filter(big, SMOOTH)

fig = plt.figure()
cs = plt.contour(big, levels=[0.5])
subpaths = []
for path in cs.get_paths():
    for poly in path.to_polygons():
        if len(poly) < 8:
            continue
        pts = rdp(poly / SCALE, TOL)              # contour gives (x, y) already
        if len(pts) < 4:
            continue
        subpaths.append(pts)
plt.close(fig)

d = []
for pts in subpaths:
    d.append("M" + " L".join("%.2f %.2f" % (x, y) for x, y in pts) + " Z")
svg = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d">' % (W, H),
       '<rect width="%d" height="%d" fill="#fff"/>' % (W, H),
       '<path fill="%s" fill-rule="evenodd" d="%s"/>' % (NAVY, " ".join(d)),
       '</svg>']
out = BASE + "space_trace.svg"
open(out, "w").write("\n".join(svg))
print("subpaths:", len(subpaths), "points:", sum(len(p) for p in subpaths),
      "size:", os.path.getsize(out) // 1024, "KB")
