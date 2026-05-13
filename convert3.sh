#!/usr/bin/env bash
set -e
PHOTO=/sessions/zealous-wonderful-brown/mnt/agency/demos/composite-panels/photo
OUT=/sessions/zealous-wonderful-brown/mnt/agency/demos/composite-panels/public/images

conv() {
  convert "$PHOTO/$4" -resize "${1}x${2}^" -gravity center -extent "${1}x${2}" -strip -quality "$3" "$OUT/$5"
  echo "  → $5"
}

# Большие баннеры под full-screen секции — 21:9 cinematic ratio
conv 3000 1300 80 hf_20260512_204612_ad952729-4aea-4b61-916d-976c0754d9bb.png banners/material-macro.webp
conv 3000 1300 80 hf_20260512_210704_5f480c5b-952e-4986-998c-fc71a610bf8c.png banners/grand-facade.webp
conv 3000 1300 80 hf_20260512_203820_45d37495-2867-49a4-af41-b5e2016c691c.png banners/golden-dusk.webp

# Hero/main теперь идёт в FinalManifesto (видео уже на 1 экране)
cp "$OUT/hero/main.webp" "$OUT/banners/manifesto.webp" 2>/dev/null || true

echo "DONE"
