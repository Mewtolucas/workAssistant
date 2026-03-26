# Chrome Extension Setup

## Personal Assistant PDF Extractor

This extension allows you to extract PDF content from Chrome and send it directly to your Personal Assistant app.

### Installation

1. **Open Chrome Extensions Page**
   - Type in address bar: `chrome://extensions/`
   - Or go to Menu → More tools → Extensions

2. **Enable Developer Mode**
   - Toggle "Developer mode" in the top right corner

3. **Load Unpacked Extension**
   - Click "Load unpacked"
   - Navigate to the `extension` folder in this project
   - Select the folder and click "Open"

4. **Verify Installation**
   - You should see "Personal Assistant PDF Extractor" in your extensions list
   - A new icon should appear in your Chrome toolbar

### How to Use

1. **Open a PDF in Chrome**
   - Navigate to any PDF file in your browser
   - (Local files: `file://path/to/file.pdf`)
   - (Online PDFs: Direct links to PDF files)

2. **Click the Extension Icon**
   - Click the Personal Assistant icon in your toolbar
   - A popup will appear

3. **Extract and Send**
   - Click "Extract PDF & Send"
   - The extension will extract the text from the PDF
   - Data is stored and ready to use in your Personal Assistant app

4. **Use in Your App**
   - Open your Personal Assistant app
   - Go to Notes, Summarizer, or Flashcards tab
   - Look for the "Sync from Extension" button (if added)
   - Or use the normal file upload to access the extracted content

### Features

- ✅ Extracts text from multi-page PDFs (up to 50 pages)
- ✅ Works with local files and online PDFs
- ✅ Stores extracted content locally
- ✅ No data sent to external servers
- ✅ Dark theme UI

### Limitations

- Only extracts text (not images or complex layouts)
- Limited to 50 pages (can be increased in code)
- Requires the PDF to have text content
- Some PDFs with special formatting may extract imperfectly

### Troubleshooting

**Extension not showing icon**
- Refresh the page
- Check that extension is enabled (toggle in extensions page)

**Can't extract PDF**
- Make sure you're on a PDF page (address should end in .pdf)
- Check browser console for errors (F12 → Console)
- Try reloading the page

**Extracted text looks broken**
- Some PDFs have complex layouts that don't extract well
- Try using the Summarizer to clean up the text

### File Structure

```
extension/
├── manifest.json      # Extension configuration
├── popup.html        # Popup UI
├── popup.js          # Popup logic & PDF extraction
├── background.js     # Service worker
├── content.js        # Content script
├── images/           # Extension icons
└── SETUP.md         # This file
```

### Future Improvements

- [ ] Add browser action menu for choosing action (Summarize/Note/Flashcard)
- [ ] Real-time sync with Personal Assistant app
- [ ] Custom keyboard shortcut
- [ ] Support for more languages
- [ ] Better handling of images and complex layouts
