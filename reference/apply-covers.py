"""Copies reviewed candidates over the live covers, skipping any listed as
rejected. Backs each original up first so a bad call is reversible."""
import json
import os
import shutil
import sys

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TARGET_W = 900

stage = sys.argv[1]
reject = set(a.lower() for a in sys.argv[2:])

rep = json.load(open(os.path.join(stage, "report.json"), encoding="utf-8"))
backup = os.path.join(stage, "_original")
os.makedirs(backup, exist_ok=True)

applied, skipped = [], []
for r in rep:
    if r["status"] != "ok":
        skipped.append((r["title"], r["status"]))
        continue
    if r["title"].lower() in reject:
        skipped.append((r["title"], "rejected on review"))
        continue
    live = os.path.join(ROOT, "public", r["cover"].lstrip("/"))
    shutil.copy2(live, os.path.join(backup, os.path.basename(live)))
    shutil.copy2(r["staged"], live)
    applied.append((r["title"], r["size"]))

print("APPLIED", len(applied))
for t, s in applied:
    print(f"  {t:<22} {s}")
print("\nSKIPPED", len(skipped))
for t, why in skipped:
    print(f"  {t:<22} {why}")
print("\noriginals backed up to:", backup)
