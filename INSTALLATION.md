# DETAILED INSTALLATION GUIDE
## Personal Assistant Desktop App

This guide walks you through every step needed to get the app running on your computer.

---

## ⚡ QUICK START (Recommended)

**Most users should use the automatic installers:**

- **Windows:** Double-click `install-windows.bat`
- **Mac:** Double-click `install-mac.command`
- **Linux:** Double-click `install-linux.sh` or run `bash install-linux.sh`

The installers handle everything automatically. This guide is for those who prefer manual installation.

---

---

## STEP 1: Check Your System Requirements

Before you start, make sure you have:

### Requirements:
- **Node.js** version 14 or higher
- **npm** (comes with Node.js)
- A text editor (VS Code, Notepad, etc.)
- A Claude API key (free to get)

### Check if you have Node.js installed:

Open your terminal/command prompt and type:
```bash
node --version
npm --version
```

You should see version numbers like:
- `v18.0.0` (or higher)
- `9.0.0` (or higher)

**If you don't have Node.js:**
1. Go to https://nodejs.org/
2. Download the "LTS" (Long Term Support) version
3. Install it by following the installer
4. Restart your terminal/command prompt
5. Run the version commands again to verify

---

## STEP 2: Navigate to the Project Directory

Open a terminal/command prompt and go to where your personal assistant app is located:

```bash
cd /path/to/personal-assistant
```

**Example on Windows:**
```bash
cd C:\Users\YourName\Desktop\personal-assistant
```

**Example on Mac/Linux:**
```bash
cd /Users/YourName/Desktop/personal-assistant
cd /home/username/workAssistant
```

You should be in a folder that contains:
- `package.json`
- `README.md`
- `src/` folder
- `public/` folder

Verify by typing:
```bash
ls
```

or on Windows:
```bash
dir
```

You should see the files listed above.

---

## STEP 3: Install Dependencies

This downloads all the libraries the app needs to run (React, Electron, TailwindCSS, etc.).

Run this command:
```bash
npm install
```

**What's happening:**
- This creates a `node_modules` folder
- Downloads all dependencies (~500+ MB)
- Creates a `package-lock.json` file
- **Takes 2-5 minutes** depending on internet speed

Wait for it to finish. You'll see:
```
added XXX packages in XXs
```

---

## STEP 4: Get Your Claude API Key

This is required for the Summarizer and Flashcard features to work.

### Get Your Claude API Key:

1. Go to: https://console.anthropic.com/
2. Sign in (or create a free account)
3. Click **"API Keys"** in the left menu
4. Click **"Create Key"** button
5. Give it a name (e.g., "Personal Assistant App")
6. Copy the key that starts with `sk-ant-`
7. **Keep this key safe** - don't share it!

The key should look like:
```
sk-ant-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

---

## STEP 5: Configure the Environment Variables

This tells the app where to find your API key.

### Option A: Using a Text Editor (Easiest)

1. Open the `.env` file in the project with any text editor
   - Look in the project root folder
   - File is named `.env` (starts with a dot)

2. Replace `your_actual_api_key_here` with your real Claude API key:

**Before:**
```
REACT_APP_CLAUDE_API_KEY=your_claude_api_key_here
```

**After:**
```
REACT_APP_CLAUDE_API_KEY=sk-ant-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

3. Save the file (Ctrl+S or Cmd+S)

### Option B: Using Command Line

Run this command (replace with your actual key):

**On Mac/Linux:**
```bash
echo "REACT_APP_CLAUDE_API_KEY=sk-ant-your-actual-key-here" > .env
```

**On Windows (PowerShell):**
```powershell
"REACT_APP_CLAUDE_API_KEY=sk-ant-your-actual-key-here" | Out-File -Encoding UTF8 .env
```

---

## STEP 6: Start the Application

You're ready! Start the app with:

```bash
npm start
```

**What happens:**
1. React development server starts (port 3000)
2. Electron app opens automatically
3. You should see the Personal Assistant window
4. There will be a message like:
   ```
   ✓ Compiled successfully in XXs
   Compiled with warnings
   ```

**First time only:**
- Takes 1-2 minutes to compile
- You might see a warning about source maps (ignore this)
- The Electron window should open automatically

If the window doesn't open, wait 5-10 seconds and check if it appears.

---

## STEP 7: Test the App

Once the app is open, test each feature:

### Test 1: Dashboard
- Click the **Dashboard** tab (home icon)
- You should see stats cards showing:
  - Notes: 0
  - Flashcard Sets: 0
  - Unread Emails: 0
  - Upcoming Events: 0

### Test 2: Notes
- Click the **Notes** tab
- Type a title: "Hello World"
- Type content: "This is my first note!"
- Click **Save**
- You should see it appear in the right panel

### Test 3: Summarizer
- Click the **Summarizer** tab
- Paste some text (news article, book excerpt, etc.)
- Click **Summarize**
- Wait 3-5 seconds
- Claude should show a summary

### Test 4: Flashcards
- Click the **Flashcards** tab
- Set Title: "Spanish Words"
- Paste study material (e.g., "hola = hello, adiós = goodbye, gracias = thank you")
- Click **Generate Flashcards**
- Wait 5-10 seconds
- Click on the generated set to view flashcards

---

## STEP 8: Stop the App

To stop the app:
1. Click the X button to close the Electron window
2. In the terminal, press **Ctrl+C** (Cmd+C on Mac)
3. You should see the terminal prompt again

---

## After Installation

### Where Your Data is Saved

All your notes and flashcards are saved in your home directory:

**On Mac/Linux:**
```
~/.personal-assistant/notes/
~/.personal-assistant/flashcards/
```

**On Windows:**
```
C:\Users\YourName\.personal-assistant\notes\
C:\Users\YourName\.personal-assistant\flashcards\
```

Each note and flashcard set is a `.json` file you can open in any text editor.

### Starting the App Again

Next time you want to use the app:
1. Open terminal
2. `cd` to the project folder
3. Run `npm start`

No need to reinstall or reconfigure!

### Stopping Automatic Dev Tools

The app opens with developer tools by default (console at bottom). To disable:

Edit `public/electron.js` and change:
```javascript
if (isDev) {
  mainWindow.webContents.openDevTools();
}
```

to:
```javascript
if (isDev) {
  // mainWindow.webContents.openDevTools();
}
```

---

## Troubleshooting

### Problem: "npm: command not found"
**Solution:** Node.js isn't installed. Go to Step 1 and install Node.js.

### Problem: "Claude API key not configured"
**Solution:**
1. Check your `.env` file has the API key
2. Make sure there are no extra spaces or quotes
3. Save the file
4. Stop the app (Ctrl+C) and restart with `npm start`

### Problem: App won't start / "Cannot find module"
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

### Problem: Port 3000 already in use
**Solution:** Change the port. Edit `.env` and add:
```
PORT=3001
```

### Problem: API calls failing / "Failed to generate flashcards"
**Solutions:**
- Check your API key is correct
- Verify your Claude account has credits
- Check internet connection
- Try restarting the app

### Problem: Notes not saving
**Solution:** Check the folder exists:
- Mac/Linux: `mkdir -p ~/.personal-assistant/notes`
- Windows: Create manually if needed
- Restart the app

---

## IMPORTANT NOTES

⚠️ **KEEP YOUR API KEY SAFE:**
- Never share your `.env` file
- Never commit it to Git/GitHub
- Never post it in forums or screenshots
- The app only uses it locally

✅ **DATA PRIVACY:**
- All notes and flashcards are stored locally
- Nothing is sent to a server
- You own all your data

🔄 **UPDATING THE APP:**
When you pull new changes:
```bash
git pull
npm install  # In case dependencies changed
npm start
```

---

## Need Help?

If something goes wrong:
1. Read the error message in the terminal
2. Check the Troubleshooting section above
3. Make sure your `.env` file is configured correctly
4. Try restarting (stop with Ctrl+C, run `npm start` again)

---

## Next Steps

Once installed, check out the README.md for:
- Feature explanations
- Usage guide for each tab
- Development notes
- Project structure details

Happy studying and note-taking! 🚀
