# Logo Files Instructions

## Required Logo File

Place your logo icon file in this `public` folder with the following name:

**File Name:** `logo-icon.png`

## File Specifications

- **Format:** PNG (with transparency recommended)
- **Size:** 48x48 pixels or larger (will be scaled to 48x48 in the UI)
- **Content:** The concentric circles icon with three dots at the top
- **Background:** Transparent or white background

## Alternative File Names

If your file has a different name, you can update the components:
- `components/Header.tsx` - Line ~54: Change `/logo-icon.png` to your filename
- `components/Footer.tsx` - Line ~24: Change `/logo-icon.png` to your filename

## Supported Formats

- PNG (recommended)
- SVG
- JPG/JPEG

## Usage

The logo will automatically be used in:
- Header (top navigation)
- Footer (bottom of page)

Both components use Next.js Image optimization for better performance.

