# Personal Assistant Desktop App

A powerful desktop application for note-taking, text summarization, and flashcard generation with AI-powered features using Claude and Electron + React.

## 🚀 Quick Start (5 Minutes!)

### **Windows Users:**
1. Download the project as a ZIP file
2. Extract it
3. **Double-click:** `install-windows.bat`
4. Follow the prompts
5. Done! ✨

### **Mac Users:**
1. Download the project as a ZIP file
2. Extract it
3. **Double-click:** `install-mac.command`
4. Follow the prompts
5. Done! ✨

### **Linux Users:**
1. Download the project as a ZIP file
2. Extract it
3. **Double-click:** `install-linux.sh`
   - Or in Terminal: `bash install-linux.sh`
4. Follow the prompts
5. Done! ✨

👉 **See [DOWNLOAD_AND_INSTALL.md](DOWNLOAD_AND_INSTALL.md) for detailed instructions**

## Features

- **Dashboard**: Quick overview of your notes, flashcards, emails, and calendar
- **Notes**: Create, edit, and manage notes with auto-save to local JSON files
  - 📄 **PDF Upload**: Upload PDF files and extract text automatically
- **Summarizer**: Paste any text and get AI-powered summaries using Claude API
  - 📄 **PDF Upload**: Upload PDFs to summarize them
  - 🔌 **Chrome Extension**: Extract PDFs from browser and send to app
- **Flashcards**: Generate flashcard sets from study material using Claude AI
  - 📄 **PDF Upload**: Generate flashcards from PDF content
  - 🔌 **Chrome Extension**: Extract study material from PDFs in your browser
- **Dark Mode**: Beautiful dark theme for comfortable use
- **Local Storage**: All data stored locally in your home directory
- **Chrome Extension**: Extract PDFs directly from your browser

## Tech Stack

- **Frontend**: React 18, TailwindCSS
- **Desktop**: Electron
- **AI**: Claude API (Anthropic)
- **Storage**: Local JSON files

## Setup

### Automatic Installation (Recommended)

**Windows:**
- Double-click `install-windows.bat`
- Follow the on-screen prompts
- The app will start automatically

**Mac/Linux:**
- Run `install-mac-linux.sh` from the terminal or double-click it
- Follow the on-screen prompts
- The app will start automatically

The installer will:
- ✅ Check if Node.js is installed
- ✅ Install all dependencies
- ✅ Prompt for your Claude API key
- ✅ Set up the Chrome extension
- ✅ Start the app automatically

📖 **See [DOWNLOAD_AND_INSTALL.md](DOWNLOAD_AND_INSTALL.md) for complete instructions**

### Manual Installation (Advanced)

If you prefer manual setup:

1. **Install Node.js** (if not already installed)
   - Download from https://nodejs.org/ (LTS version)

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Key**
   - Create a `.env` file in the root folder
   - Add your Claude API key:
   ```
   REACT_APP_CLAUDE_API_KEY=your_actual_api_key_here
   ```
   - Get your key from https://console.anthropic.com/

4. **Start the app**
   ```bash
   npm start
   ```

### Starting the App Later

**Windows:**
- Double-click `start-app-windows.bat`

**Mac/Linux:**
- Run `start-app-mac-linux.sh`
- Or: `npm start` in the project folder

## Project Structure

```
personal-assistant/
├── public/
│   ├── electron.js         # Electron main process
│   ├── preload.js          # IPC communication bridge
│   └── index.html          # HTML template
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx   # Stats dashboard
│   │   ├── NotesTab.jsx    # Notes management
│   │   ├── SummarizerTab.jsx # Text summarizer
│   │   └── FlashcardsTab.jsx # Flashcard generator
│   ├── App.jsx             # Main app component
│   ├── index.js            # React entry point
│   └── index.css           # TailwindCSS styles
├── package.json            # Dependencies
├── tailwind.config.js      # TailwindCSS config
└── .env                    # API keys (create from .env.example)
```

## Data Storage

- **Notes**: `~/.personal-assistant/notes/`
- **Flashcards**: `~/.personal-assistant/flashcards/`

All data is stored as JSON files for easy backup and portability.

## PDF Features

### Using PDF Files

The app supports PDFs in multiple ways:

#### 1. File Upload (All Tabs)
- **Notes Tab**: Click the "PDF" button to upload a PDF and auto-extract text as a note
- **Summarizer Tab**: Click "Upload PDF" to extract and summarize
- **Flashcards Tab**: Click "PDF" button to extract content for flashcard generation

#### 2. Chrome Extension (Easy One-Click Install!)
For extracting PDFs directly from your browser:

**Windows:** Double-click `extension/install-windows.bat`
**Mac/Linux:** Run `extension/install-mac-linux.sh` in Terminal

For detailed instructions, see **EXTENSION_INSTALL.md**

## Usage

### Notes
1. Go to the Notes tab
2. Write a title and content
3. Click "Save" to automatically save to local storage
4. View all notes in the right panel
5. Click edit (✏️) or delete (🗑️) buttons

### Summarizer
1. Go to the Summarizer tab
2. Paste any text you want summarized
3. Click "Summarize"
4. Claude will generate a concise summary
5. Copy the summary to clipboard with the "Copy" button

### Flashcards
1. Go to the Flashcards tab
2. Enter a title for your flashcard set (e.g., "Spanish Vocab")
3. Paste study material (textbook excerpts, notes, definitions)
4. Click "Generate Flashcards"
5. Claude will create 10 Q&A pairs automatically
6. Click on a set to study
7. Click the card to flip between question and answer
8. Use arrow buttons to navigate through cards

## Environment Variables

Create a `.env` file in the root directory:

```env
# Required: Your Claude API key
REACT_APP_CLAUDE_API_KEY=sk-ant-...

# Optional: Google OAuth for Gmail integration
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

## Features Roadmap

- [x] Dashboard with stats
- [x] Note-taking with local storage
- [x] Text summarization with Claude
- [x] Flashcard generation with Claude
- [ ] Gmail integration
- [ ] Calendar widget
- [ ] Advanced search
- [ ] Export notes as PDF
- [ ] Cloud sync (optional)

## Troubleshooting

### "Claude API key not configured"
Make sure you've added `REACT_APP_CLAUDE_API_KEY` to your `.env` file and the React server has reloaded.

### "Failed to generate flashcards"
This usually means the Claude API call failed. Check:
- Your API key is valid
- You have enough credits in your Claude account
- The study material is clear and well-formatted

### App won't start
Try deleting `node_modules` and `package-lock.json`, then run `npm install` again.

## Development Notes

- **IPC Communication**: Electron IPC handlers are in `public/electron.js`
- **React Components**: All UI components in `src/components/`
- **Styling**: Uses TailwindCSS utility classes
- **API Calls**: Claude API calls are made directly from React components

## License

MIT

## Support

For issues or suggestions, please create an issue or contact the developer.
