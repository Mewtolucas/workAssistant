# Mac Setup Guide

Easy setup for Mac users using `.command` files.

---

## 🎯 Installation (Mac Users)

### Step 1: Download the App
1. Go to the GitHub repository
2. Click the green **"Code"** button
3. Click **"Download ZIP"**
4. Wait for the download to complete
5. The ZIP file will be in your Downloads folder

### Step 2: Extract the ZIP
1. Open Finder
2. Go to Downloads
3. **Double-click** the `personal-assistant-main.zip` file
4. A new folder named `personal-assistant` is created
5. You can move this folder anywhere you want

### Step 3: Run the Installer

**Method 1: Double-click (Easiest)**
1. **Open Finder**
2. Navigate to the `personal-assistant` folder
3. **Double-click:** `install-mac.command`
4. **Important:** Mac will ask if you want to open it
5. Click **"Open"** when prompted
6. A Terminal window will open
7. **Follow the on-screen prompts**

**Method 2: Right-click and Open**
1. **Open Finder**
2. Navigate to the `personal-assistant` folder
3. **Right-click** `install-mac.command`
4. Click **"Open"**
5. Click **"Open"** when Mac asks for confirmation
6. A Terminal window will open
7. **Follow the on-screen prompts**

### Step 4: Follow the Prompts
The installer will:
- Check if Node.js is installed
- Ask if you want to install dependencies
- Ask for your Claude API key (optional)
- Show you how to install the Chrome extension
- Start the app automatically

---

## ⚠️ Important: Mac Security Alert

On the first run, you might see this message:

```
"install-mac.command" cannot be opened because the developer
cannot be verified.
```

**This is normal!** Mac shows this for unsigned scripts. To fix it:

1. Click **"Cancel"** on the first popup
2. Open **Finder**
3. Go to the `personal-assistant` folder
4. **Right-click** `install-mac.command`
5. Click **"Open"** (not just single-click)
6. Click **"Open"** in the security prompt
7. Now it will run!

---

## 🚀 Starting the App Later

After installation, you can start the app anytime by:

1. Opening Finder
2. Going to the `personal-assistant` folder
3. **Double-clicking:** `start-app-mac.command`

Or you can drag it to your dock for quick access!

---

## What's a `.command` File?

A `.command` file is Mac's way of running shell scripts with a double-click.
- `.command` = Mac's executable script
- `.sh` = Linux/Unix script (works on Mac too but requires Terminal)
- `.bat` = Windows batch script

We use `.command` for Mac because it's the native way to double-click and run.

---

## Troubleshooting

### "The developer cannot be verified"
**Solution:** Use right-click → Open instead of double-click
(See section above)

### Script doesn't run
**Solution:**
1. Make sure you're double-clicking (not single-clicking)
2. Try right-click → Open
3. If still doesn't work, open Terminal and run:
   ```bash
   bash ~/Path/To/personal-assistant/install-mac.command
   ```

### "Node.js is not installed"
**Solution:**
1. Download Node.js from https://nodejs.org/ (LTS version)
2. Install it
3. Restart your computer
4. Run the installer again

### App won't start
**Solution:**
1. Close any open Terminal windows
2. Try running `start-app-mac.command` again
3. Or run in Terminal: `npm start` from the project folder

### Terminal window closes immediately
**Solution:**
- The app might be starting correctly!
- Look for the Personal Assistant window (might be behind other windows)
- Check if it's running in your Dock

---

## File Reference

| File | Purpose |
|------|---------|
| `install-mac.command` | First-time installation |
| `start-app-mac.command` | Start the app anytime |
| `extension/install-mac.command` | Install Chrome extension |
| `.env` | Your API key (created by installer) |

---

## Next Steps

1. ✅ Installation complete
2. ✅ App is running
3. ✅ Create a test note
4. ✅ (Optional) Add Claude API key to use Summarizer
5. ✅ (Optional) Install Chrome extension

---

## Tips for Mac Users

- **Keep the folder accessible:** Consider putting it in Applications or Favorites
- **Add to Dock:** Drag `start-app-mac.command` to your Dock for quick access
- **Create an Alias:** Right-click the installer and select "Make Alias" for quick access
- **Move the app:** You can move the entire folder anywhere after installation

---

## Still Need Help?

- See **README.md** for full feature list
- See **GETTING_STARTED.md** for quick reference
- See **PDF_GUIDE.md** for PDF features
- See **DOWNLOAD_AND_INSTALL.md** for cross-platform help

---

**Happy note-taking on Mac!** 🍎✨
