#!/usr/bin/env bash
set -e
PHOTO=/sessions/zealous-wonderful-brown/mnt/agency/demos/composite-panels/photo
OUT=/sessions/zealous-wonderful-brown/mnt/agency/demos/composite-panels/public/images

conv() {
  convert "$PHOTO/$4" -resize "${1}x${2}^" -gravity center -extent "${1}x${2}" -strip -quality "$3" "$OUT/$5"
  echo "  → $5"
}

echo "Portfolio..."
conv 1600 1200 82 hf_20260512_203459_627e8fec-37b7-42c5-86bc-3c96058c5511.png portfolio/tc-aurora.webp
conv 1600 1200 82 hf_20260512_203507_7fe86f65-fe77-44a4-84f9-f0e7f3b4069f.png portfolio/bc-meridian.webp
conv 1600 1200 82 hf_20260512_203531_5bcdb9ce-818e-4ecf-b9b1-42b4e03f6f84.png portfolio/airport-vlk.webp
conv 1600 1200 82 hf_20260512_203541_0c34c6e4-bdb4-4b56-b5a3-0d56d63a849d.png portfolio/plant-ural.webp
conv 1600 1200 82 hf_20260512_203550_9afe0542-408e-4eac-93e2-0a21d8e72a4b.png portfolio/arena-sib.webp
conv 1600 1200 82 hf_20260512_203600_639b1ded-d45b-41e7-9968-28b287c0c5d5.png portfolio/gov-rostov.webp
conv 1600 1200 82 hf_20260512_203608_7e2980e4-51a8-4f9d-b216-372cc0a31ab7.png portfolio/museum-kzn.webp
conv 1600 1200 82 hf_20260512_203617_07e06821-584c-45f7-b26e-a42a954667f0.png portfolio/school-spb.webp
conv 1600 1200 82 hf_20260512_203820_45d37495-2867-49a4-af41-b5e2016c691c.png portfolio/zhk-cedar.webp

echo "Production..."
conv 2400 1350 82 hf_20260512_203228_a5192272-8365-4d47-8bb9-754736239bab.png production/main.webp
conv 2400 1350 82 hf_20260512_203248_00833e3f-6af5-4191-99b6-24f9eb36502a.png production/lab.webp
conv 2400 1350 82 hf_20260512_203256_80365117-90e6-44bd-9544-77c8e0ae4e4d.png production/warehouse.webp

echo "Case..."
conv 2400 1350 82 hf_20260512_203715_b6e8e71c-f93b-464e-85ca-a7497081ed48.png case/before.webp
conv 2400 1350 82 hf_20260512_203725_a1e651d6-7434-442d-a3c6-dc654d1142b8.png case/after.webp

echo "DONE"
