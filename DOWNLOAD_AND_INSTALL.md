# 📥 Download and Install - Personal Assistant

Complete guide to downloading and installing the Personal Assistant app on your computer.

---

## 🎯 What You'll Need

- **Computer** (Windows, Mac, or Linux)
- **Internet connection** (for downloading)
- **Node.js** (if not already installed - we'll check)
- **Claude API key** (optional but recommended)

---

## Step-by-Step Installation

### Step 1: Get Node.js (If You Don't Have It)

**What is Node.js?**
Node.js is required to run the app. It's a JavaScript runtime.

**Check if you already have it:**
- **Windows:** Open Command Prompt and type: `node --version`
- **Mac:** Open Terminal and type: `node --version`
- **Linux:** Open Terminal and type: `node --version`

If it shows a version number (like `v18.0.0`), you already have it! Skip to Step 2.

**If you don't have Node.js:**
1. Go to https://nodejs.org/
2. Download the **LTS** (Long Term Support) version
3. Run the installer and follow the steps
4. Restart your computer

---

### Step 2: Download the App

**Option A: From GitHub (Recommended)**
1. Go to the project repository
2. Click the green **"Code"** button
3. Click **"Download ZIP"**
4. Extract the ZIP file to your preferred location
5. Open the extracted folder

**Option B: Direct File Access**
If you have direct access to the project folder, just copy it to your desired location.

**Result:** You should have a folder named `personal-assistant` containing:
- Files like `package.json`, `README.md`
- Folders like `src`, `public`, `extension`
- Installer scripts (`install-windows.bat`, `install-mac-linux.sh`)

---

### Step 3: Run the Installer

The installer will handle everything automatically!

#### **Windows Users:**

1. **Open the `personal-assistant` folder**
2. **Double-click:** `install-windows.bat`
3. **A command window will open** showing the installation progress
4. **Follow the on-screen prompts:**
   - The installer checks Node.js ✓
   - Installs dependencies ✓
   - Asks for your Claude API key (optional)
   - Sets up the Chrome extension ✓
   - Starts the app ✓

That's it! The app will start automatically.

#### **Mac/Linux Users:**

**Option 1: Using File Explorer (Easiest)**
1. **Open Finder/File Manager**
2. Navigate to the `personal-assistant` folder
3. **Right-click** on `install-mac-linux.sh`
4. Click **"Open"** or **"Run"**
5. A terminal window will open
6. **Follow the on-screen prompts** (same as Windows above)

**Option 2: Using Terminal (If Option 1 doesn't work)**
1. Open Terminal
2. Type: `bash /path/to/personal-assistant/install-mac-linux.sh`
   - Replace `/path/to/` with the actual path
3. Press Enter
4. **Follow the on-screen prompts**

---

### Step 4: Configure Your Claude API Key

During installation, you'll be prompted for your Claude API key.

**Getting Your Claude API Key:**
1. Go to https://console.anthropic.com/
2. Sign in (or create a free account)
3. Click **"API Keys"** in the left menu
4. Click **"Create Key"**
5. Copy the key that starts with `sk-ant-`
6. Paste it when the installer asks

**Note:** You need this for the Summarizer and Flashcard features.
Without it, Notes will still work, but summarization won't.

---

### Step 5: Install the Chrome Extension

The installer will remind you to install the Chrome extension.

**Quick Installation:**
1. Open the `personal-assistant` folder
2. Open the `extension` folder
3. **Double-click:** `install-windows.bat` (Windows) or `install-mac-linux.sh` (Mac/Linux)
4. Follow the prompts

**Manual Installation:**
1. Open Chrome
2. Type in address bar: `chrome://extensions/`
3. Toggle **"Developer mode"** (top right)
4. Click **"Load unpacked"**
5. Select the `extension` folder from your `personal-assistant` folder
6. Done!

See **EXTENSION_INSTALL.md** for detailed help.

---

## ✅ Verify Installation

**Step 1: App Running?**
- You should see a window titled "Personal Assistant"
- Dark theme with sidebar navigation
- Tabs: Dashboard, Email, Notes, Summarizer, Flashcards, Calendar

**Step 2: Check Dashboard**
- Click the **Dashboard** tab
- You should see stats cards (Notes, Flashcards, Emails, Events)

**Step 3: Try Creating a Note**
- Click the **Notes** tab
- Type a title and content
- Click **"Save"**
- The note should appear in the right panel

**Step 4: Chrome Extension Installed? (Optional)**
- Open Chrome
- Look for the Personal Assistant icon in the toolbar (top right)
- If you see it, the extension is installed!

---

## 🚀 Starting the App Later

After the initial setup, you don't need to run the installer again!

### **Windows:**
Just **double-click:** `start-app-windows.bat` in the main folder

### **Mac/Linux:**
Open Terminal and run: `bash start-app-mac-linux.sh`

Or open the `personal-assistant` folder and double-click `start-app-mac-linux.sh`

---

## 🎮 Using the App

Once the app is running:

### **Notes Tab**
- Create new notes
- Upload PDF files
- Save notes locally
- Edit and delete notes

### **Summarizer Tab**
- Paste text
- Click "Summarize"
- Get AI-powered summary
- Copy the result

### **Flashcards Tab**
- Paste study material
- Click "Generate Flashcards"
- Study with interactive cards
- Track progress

### **Dashboard**
- See overview of all your data
- Quick stats on everything

---

## 🆘 Troubleshooting

### "Node.js is not installed"
**Solution:**
- Download Node.js from https://nodejs.org/ (LTS version)
- Install it
- Restart your computer
- Run the installer again

### "npm install failed"
**Solution:**
1. Check your internet connection
2. Close antivirus (temporarily - it may be blocking npm)
3. Delete the `node_modules` folder if it exists
4. Run the installer again

### "API key prompt doesn't appear"
**Solution:**
- You can edit the `.env` file manually
- Open `.env` with a text editor
- Add: `REACT_APP_CLAUDE_API_KEY=your_key_here`
- Save and restart the app

### "App won't start"
**Solution:**
- Make sure Node.js is installed correctly
- Delete `node_modules` folder
- Run: `npm install`
- Try again

### "Chrome extension won't load"
**Solution:**
- See **EXTENSION_INSTALL.md** for detailed help
- Or run the extension installer script

### "Can't find the installer files"
**Solution:**
- Make sure you extracted the ZIP file completely
- The installer should be in the main folder
- If missing, re-download the project

---

## 📁 Folder Structure After Installation

```
personal-assistant/
├── src/                          # React source code
├── public/                       # Public assets
├── extension/                    # Chrome extension
│   ├── install-windows.bat
│   ├── install-mac-linux.sh
│   └── ... extension files
├── install-windows.bat           # Main installer (Windows)
├── install-mac-linux.sh          # Main installer (Mac/Linux)
├── start-app-windows.bat         # Quick launcher (Windows)
├── start-app-mac-linux.sh        # Quick launcher (Mac/Linux)
├── .env                          # Your API key (created by installer)
├── package.json                  # Dependencies list
├── README.md                     # Full documentation
└── ... other files
```

---

## 📚 Learning the App

After installing, read these guides:

1. **README.md** - Project overview and features
2. **PDF_GUIDE.md** - How to use PDF features
3. **EXTENSION_INSTALL.md** - Chrome extension setup
4. **INSTALLATION.md** - Detailed setup information

---

## 🎯 What's Next?

### Setup Complete? Do This:
1. ✅ Create a test note
2. ✅ Try the summarizer
3. ✅ Generate some flashcards
4. ✅ Install the Chrome extension
5. ✅ Test extracting a PDF

### Ready to Use?
- Your notes are saved in `~/.personal-assistant/notes/`
- Your flashcards are in `~/.personal-assistant/flashcards/`
- Everything is local - no cloud needed!

---

## 💡 Tips

- **Slow internet?** npm install might take 10+ minutes - be patient
- **Issues during install?** Check the .env file was created
- **App not starting?** Try restarting your computer
- **Need API key later?** Edit the .env file with any text editor
- **Lost notes?** Check the folders above - JSON files are easily recoverable

---

## 🆘 Still Having Issues?

1. **Check the README.md** - Has more detailed info
2. **Check INSTALLATION.md** - Has detailed prerequisites
3. **Check error messages** - They often tell you what's wrong
4. **Try the manual steps** - Sometimes faster than installers

---

## ✨ You're All Set!

Your Personal Assistant is now installed and ready to use. Enjoy! 🚀

---

## Quick Reference

| Need | File | Action |
|------|------|--------|
| Install everything | `install-windows.bat` or `install-mac-linux.sh` | Double-click or run |
| Start the app later | `start-app-windows.bat` or `start-app-mac-linux.sh` | Double-click or run |
| Install extension | `extension/install-windows.bat` or `extension/install-mac-linux.sh` | Double-click or run |
| Configure API key | `.env` | Edit with text editor |
| View features | `README.md` | Open with text editor |
| PDF help | `PDF_GUIDE.md` | Open with text editor |

---

Happy note-taking! 📝✨
