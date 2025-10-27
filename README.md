# PDF OCR Tool

A Node.js tool that extracts text from PDF files using Optical Character Recognition (OCR).

## Installation

1. Install the required dependencies:
   ```bash
   npm install pdfjs-dist@3.11.174 canvas tesseract.js
   ```

## Setup

2. Create a `test.pdf` file in the project root directory (or choose another path)

## Usage

**Basic usage (processes `test.pdf`):**

```bash
node index.js
```

**Custom PDF file:**

```bash
node index.js /path/to/your/document.pdf
```

## Configuration

You can modify the options in `index.js`:

```javascript
ocrPdf(pdfPath, {
  language: 'por', // Language: 'eng', 'por', 'spa', etc.
  scale: 2.0, // Image quality (1.5-3.0)
  saveImages: false, // Save debug images (true/false)
  outputFile: 'result.txt', // Output filename
});
```

## Output

- Extracted text is saved to `result.txt` (or your specified output file)
- Progress and statistics are displayed in the console
- Debug images can be saved by setting `saveImages: true`

## Language Support

Common language codes:

- `eng` - English
- `por` - Portuguese
- `spa` - Spanish
- `fra` - French
- `deu` - German
