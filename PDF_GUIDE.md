# PDF Guide: Personal Assistant App

Complete guide to using PDF files with your Personal Assistant desktop app.

---

## Overview

Your Personal Assistant app now has **full PDF support** in two ways:

1. **File Upload** - Upload PDF files directly in the app
2. **Chrome Extension** - Extract PDFs from your browser

---

## Method 1: File Upload (Easiest)

### Upload PDFs in the App

#### Notes Tab
1. Click the **Notes** tab in the sidebar
2. Click the green **"PDF"** button
3. Select a PDF file from your computer
4. The text is automatically extracted and placed in the content area
5. The filename becomes the note title (you can change it)
6. Click **"Save"** to save the note

**Example Workflow:**
```
Research Paper (PDF) → Click PDF Button → Extract Text → Save as Note → Edit later
```

#### Summarizer Tab
1. Click the **Summarizer** tab
2. Click the green **"Upload PDF"** button
3. Select your PDF
4. The text appears in the input box
5. Click **"Summarize"** to get an AI summary
6. Copy the summary to use elsewhere

**Example Workflow:**
```
Long Article (PDF) → Upload → Auto-Extract → Claude Summarizes → Copy Summary
```

#### Flashcards Tab
1. Click the **Flashcards** tab
2. Enter a title for your flashcard set (e.g., "Biology Chapter 3")
3. Click the green **"PDF"** button
4. Select your PDF with study material
5. The text is extracted into the material field
6. The filename becomes the set title (you can change it)
7. Click **"Generate"** to create flashcards

**Example Workflow:**
```
Textbook Chapter (PDF) → Upload → Extract Material → Generate Flashcards → Study
```

### What PDFs Work Best?

✅ **Works Well:**
- Textbooks and educational content
- News articles and blog posts
- Research papers and academic docs
- Study guides and notes
- Book excerpts

⚠️ **May Have Issues:**
- Scanned images of documents (no text layer)
- Complex layouts with multiple columns
- PDFs with images and minimal text
- Very large PDFs (100+ pages)

### Tips for Best Results

1. **Clean Text** - PDFs with clear, readable text extract best
2. **Copy-Paste Alternative** - If PDF extraction is messy, copy-paste text manually
3. **Summarizer for Cleanup** - Use the Summarizer to clean up messy extracted text
4. **Preview Before Saving** - Check the extracted text before saving/processing

---

## Method 2: Chrome Extension

### Install the Extension

#### Step-by-Step Installation

1. **Open Chrome Extensions Page**
   - Go to `chrome://extensions/`
   - Or: Menu (⋮) → More tools → Extensions

2. **Enable Developer Mode**
   - Toggle **"Developer mode"** in the top-right corner
   - A blue "Load unpacked" button will appear

3. **Load the Extension**
   - Click **"Load unpacked"**
   - Navigate to your project folder: `/path/to/personal-assistant/extension/`
   - Click **"Open"** or **"Select Folder"**

4. **Verify Installation**
   - You should see "Personal Assistant PDF Extractor" in your extensions list
   - Check the ✓ box to enable it
   - A new icon appears in your Chrome toolbar (top right)

#### Troubleshooting Installation

**Extension won't load:**
- Make sure you selected the `extension` folder (not the entire project)
- Check that `manifest.json` is directly in the selected folder

**Icon doesn't appear:**
- Refresh the page
- Make sure the extension is enabled (toggle switch)
- Try restarting Chrome

### Using the Extension

#### Extract PDFs from Browser

1. **Open a PDF in Chrome**
   - Go to a PDF link in your browser
   - Or open a local PDF: `Ctrl+O` / `Cmd+O`, then select a PDF

2. **Click the Extension Icon**
   - Look for the Personal Assistant icon in your toolbar (top right)
   - Click it

3. **Extract the PDF**
   - Click **"Extract PDF & Send"**
   - Wait for the extraction (usually 1-5 seconds)
   - You'll see ✅ "PDF sent to Personal Assistant!"
   - The popup closes automatically

4. **Use in Your App**
   - Open your Personal Assistant app
   - The extracted PDF text is ready to use
   - Option A: Manually copy the text from extension storage
   - Option B: Use file upload feature for easier integration

#### What Gets Extracted?

- ✅ All text content from the PDF
- ✅ Multi-page documents (up to 50 pages)
- ❌ Images and images-with-text
- ❌ Complex formatting (maintains basic layout)
- ❌ Metadata and annotations

#### Extension Features

| Feature | Status | Notes |
|---------|--------|-------|
| Text extraction | ✅ Works | Accurate for text-based PDFs |
| Multi-page support | ✅ Works | Up to 50 pages |
| Local files | ✅ Works | `file://` URLs supported |
| Online PDFs | ✅ Works | Any direct PDF URL |
| Image extraction | ❌ Not supported | Text-only |
| Dark theme | ✅ Included | Matches your system |

---

## Workflow Examples

### Example 1: Research Paper → Summary → Notes

```
1. Find research paper PDF online
2. Click extension icon in Chrome
3. Click "Extract PDF & Send"
4. Open Personal Assistant app
5. Go to Summarizer tab
6. Paste the extracted text
7. Click "Summarize"
8. Get a concise summary from Claude
9. Go to Notes tab
10. Paste the summary and save
```

### Example 2: Textbook → Flashcards → Study

```
1. Have a textbook chapter as PDF
2. Option A: Upload via app
   - Flashcards tab → Click PDF button → Select file
3. Option B: Use extension
   - Click extension → Extract
   - Copy text to Flashcards tab
4. Add a title (e.g., "Chapter 5: Biology")
5. Click "Generate"
6. Claude creates 10 Q&A pairs
7. Start studying by flipping cards!
```

### Example 3: Meeting Notes → Note Storage

```
1. Download meeting minutes as PDF
2. Open Personal Assistant app
3. Notes tab → Click PDF button
4. Select the PDF
5. Edit title if needed
6. Click "Save"
7. Note is stored with full content
8. Easy to find later with search
```

---

## Tips & Tricks

### 🎯 Best Practices

1. **Use Meaningful Titles** - Change auto-generated names to something searchable
2. **Clean Extracted Text** - Edit if the extraction is messy
3. **One Topic Per Note** - Split large PDFs into multiple topics
4. **Tag Important Notes** - Use naming convention like "URGENT-", "TODO-", etc.
5. **Back Up Your Data** - JSON files in `~/.personal-assistant/` can be backed up

### 🔧 Pro Tips

**For Large PDFs:**
- Summarize first to get key points
- Generate flashcards from summary
- Create multiple notes for each section

**For Scanned Documents:**
- Use a separate OCR tool first to add text layer
- Then use the extension or file upload

**For Web Articles:**
- Some websites block PDF extraction
- Try copying the text directly instead
- Or use the extension on the HTML page

**For Clean Extraction:**
- Check that the PDF has selectable text
- Try zooming out to 75% in browser
- Some PDFs extract better than others

---

## Troubleshooting

### PDF Upload Issues

#### "File won't upload"
**Solution:**
- Check file is actually a PDF (ends in `.pdf`)
- File size is reasonable (< 50 MB)
- Try a different PDF first

#### "Text looks corrupted/weird"
**Solution:**
- Some PDFs have encoding issues
- Use the Summarizer to clean it up
- Copy-paste from the PDF manually
- Try the Chrome extension instead

#### "Nothing happens after upload"
**Solution:**
- Browser might not support File API
- Try a different browser (Chrome, Firefox, Edge)
- Check browser console for errors (F12)
- Try restarting the app

### Chrome Extension Issues

#### "Extension won't load"
**Solution:**
- Make sure Developer mode is ON
- You selected the `extension` folder, not the whole project
- `manifest.json` should be at the top level of the folder

#### "Can't extract the PDF"
**Solutions:**
- Make sure you're viewing a PDF (address ends in `.pdf`)
- Try refreshing the page (F5)
- Check that the PDF has text content (not just images)
- Look in browser console for errors (F12 → Console)

#### "Extraction is blank or incomplete"
**Solutions:**
- Some PDFs are image-only (no text layer)
- Try another PDF first to test
- Text may be extracted but hidden - check carefully
- Use an OCR tool first if it's a scanned document

#### "Icon doesn't appear in toolbar"
**Solutions:**
- Refresh the page
- Check the extension is enabled in `chrome://extensions/`
- Restart Chrome completely
- Try unpacking and re-loading the extension

### Data Issues

#### "Where did my extracted text go?"
**For File Upload:**
- Check the input field is populated
- The text is shown in the editor, not saved yet
- Click "Save" in Notes or "Summarize" in Summarizer

**For Extension:**
- Text is stored in Chrome's local storage
- Currently, you'll need to copy-paste or use file upload
- Future: Real-time sync feature planned

#### "Lost my notes/flashcards"
**Backup info:**
- Check `~/.personal-assistant/notes/` folder
- Each file is a JSON with timestamp
- Can recover manually if needed
- Consider backing up this folder regularly

---

## FAQ

**Q: Can I use PDFs from Google Drive or OneDrive?**
A: Yes! Download the PDF to your computer, then upload or use the extension.

**Q: Does the extension work on mobile Chrome?**
A: No, extensions only work on desktop Chrome.

**Q: Can I increase the page limit (currently 50)?**
A: Yes! Edit `src/utils/pdfReader.js` and change the loop limit.

**Q: Is my PDF data secure?**
A: Yes! All PDF processing happens locally. No data is sent to servers.

**Q: Can I extract images from PDFs?**
A: Not currently - the app focuses on text extraction. Images are skipped.

**Q: Why is extracted text sometimes broken?**
A: Some PDFs have complex formatting or encoding that doesn't extract cleanly. These are rare.

**Q: Can I use this on Mac/Linux?**
A: Yes! Both the app and extension work on all platforms.

---

## Next Steps

Now that you have PDF support:

1. ✅ Test with a sample PDF
2. ✅ Install the Chrome extension
3. ✅ Try extracting a PDF from your browser
4. ✅ Generate flashcards or summary
5. ✅ Create a note from a PDF

Enjoy your enhanced Personal Assistant! 🚀
