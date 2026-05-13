#!/usr/bin/env bash
set -e
PHOTO=/sessions/zealous-wonderful-brown/mnt/agency/demos/composite-panels/photo
OUT=/sessions/zealous-wonderful-brown/mnt/agency/demos/composite-panels/public/images

conv() {
  convert "$PHOTO/$4" -resize "${1}x${2}^" -gravity center -extent "${1}x${2}" -strip -quality "$3" "$OUT/$5"
  echo "  → $5"
}

echo "Hero..."
conv 2400 1350 82 hf_20260512_210742_56f8efc5-78d6-4db8-a92c-6f0a456f2795.png hero/main.webp

echo "ScrollStory..."
conv 2400 1350 82 hf_20260512_202910_7df53db9-349d-4b99-a753-279ff096a637.png story/phase-1.webp
conv 2400 1350 82 hf_20260512_210714_a17aa75d-2dd1-4e1e-8b08-aa757d150c25.png story/phase-2.webp
conv 2400 1350 82 hf_20260512_210733_2b7b5023-e9b8-441b-8cbd-0ee3805a06ca.png story/phase-3.webp
conv 2400 1350 82 hf_20260512_203520_528adc96-06eb-43a0-9470-3035734cd523.png story/phase-4.webp

echo "Products..."
conv 1200 900 85 hf_20260512_205951_b662d2af-53f0-45b2-8e53-ac8b696330b9.png products/akp.webp
conv 1200 900 85 hf_20260512_202945_ea72ddd6-9d9a-42d0-b774-670c4fe105f9.png products/akp-a2.webp
conv 1200 900 85 hf_20260512_202935_d9424ee7-4a25-447c-9135-2e3dc6567f20.png products/skp.webp
conv 1200 900 85 hf_20260512_203007_adae0470-d757-4e3d-ba10-97669d1774c5.png products/skp-a2.webp
conv 1200 900 85 hf_20260512_203024_cefa7063-983e-4f1f-9ff3-c762574fef28.png products/cassette-3d.webp
