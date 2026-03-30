# 🚀 Easy Chrome Extension Installation

No terminal needed! Just click and follow along.

---

## Quick Install (Windows)

### Option 1: Automatic Installer (Easiest!)

1. **Find the installer file**
   - Navigate to: `Personal Assistant → extension → install-windows.bat`
   - Double-click `install-windows.bat`

2. **Follow the prompts**
   - The script will open Chrome automatically
   - Follow the on-screen instructions
   - Takes 2 minutes!

### Option 2: Manual Installation (Windows)

**Step 1: Open Extensions Page**
- Open Google Chrome
- Copy this into the address bar: `chrome://extensions/`
- Press Enter

**Step 2: Enable Developer Mode**
- Look at the **top right** of the page
- Find the **"Developer mode"** toggle
- Click to turn it **ON** (it turns blue)

**Step 3: Load the Extension**
- Click the **"Load unpacked"** button (appears after enabling Developer mode)
- A file browser will open

**Step 4: Select the Extension Folder**
- Navigate to: `Personal Assistant → extension`
- The folder should contain:
  - `manifest.json`
  - `popup.html`
  - `popup.js`
  - Other files
- Click **"Select Folder"** or **"Open"**

**Step 5: Done!**
- The extension appears in your extensions list
- Look for the **Personal Assistant icon** in your toolbar (top right)
- You can now use it!

---

## Quick Install (Mac)

### Option 1: Automatic Installer (Easiest!)

1. **Open Terminal** (⌘ Space, type "terminal", press Enter)

2. **Copy and paste this:**
   ```bash
   bash ~/Path/To/personal-assistant/extension/install-mac-linux.sh
   ```
   (Replace the path with where you saved the app)

3. **Or navigate manually:**
   - Finder → Applications → Utilities → Terminal
   - Drag the `install-mac-linux.sh` file into Terminal
   - Press Enter

### Option 2: Manual Installation (Mac)

**Step 1: Open Chrome Extensions**
- Open Google Chrome
- Type in address bar: `chrome://extensions/`
- Press Enter

**Step 2: Enable Developer Mode**
- Look at the **top right** corner
- Find **"Developer mode"** toggle
- Click to turn it **ON**

**Step 3: Load Extension**
- Click **"Load unpacked"**
- Find the `extension` folder in your Personal Assistant folder
- Click **"Select"**

**Step 4: Verify**
- Extension appears in the list
- Personal Assistant icon shows in toolbar

---

## Quick Install (Linux)

### Option 1: Automatic Installer (Easiest!)

1. **Open Terminal** (Ctrl+Alt+T or search for "Terminal")

2. **Run the installer:**
   ```bash
   bash ~/path/to/personal-assistant/extension/install-mac-linux.sh
   ```
   (Replace path with your actual path)

### Option 2: Manual Installation (Linux)

**Step 1: Open Extensions Page**
- Open Chrome
- Type: `chrome://extensions/`
- Press Enter

**Step 2: Enable Developer Mode**
- Top right corner
- Click **"Developer mode"** toggle
- Turn it **ON**

**Step 3: Load Unpacked**
- Click **"Load unpacked"**
- Navigate to the `extension` folder
- Click **"Open"**

---

## Visual Guide (Step-by-Step)

### Screenshot 1: Extensions Page
```
┌─────────────────────────────────────────────┐
│ Chrome Extensions                           │
├─────────────────────────────────────────────┤
│                                             │
│  Developer mode ──────────────────────[●]  │
│                                             │
│  [Load unpacked]  [Pack extension]          │
│                                             │
└─────────────────────────────────────────────┘
```

**What to do:**
1. Toggle "Developer mode" ON (it turns blue)
2. Click "Load unpacked"

### Screenshot 2: File Browser
```
┌──────────────────────────────────┐
│ Select a folder                  │
├──────────────────────────────────┤
│                                  │
│ 📁 personal-assistant            │
│   📁 src                          │
│   📁 public                       │
│   📁 extension     ← SELECT THIS  │
│   📄 package.json                 │
│   📄 README.md                    │
│                                  │
│        [Select Folder]           │
│                                  │
└──────────────────────────────────┘
```

**What to do:**
1. Double-click to open `personal-assistant` folder
2. Find the `extension` folder
3. Click on it once to select
4. Click "Select Folder"

### Screenshot 3: Extension Installed
```
┌──────────────────────────────────────────────┐
│ Extensions                                   │
├──────────────────────────────────────────────┤
│                                              │
│ Personal Assistant PDF Extractor             │
│ ───────────────────────────────────────      │
│ Extract PDF content and send it to           │
│ your Personal Assistant app                  │
│                                              │
│ [Enable]  [More details]                     │
│                                              │
│ 📌 Pin to toolbar                            │
│                                              │
└──────────────────────────────────────────────┘
```

**What to do:**
1. Make sure it's enabled (toggle is ON)
2. Click "Pin to toolbar" to keep it visible
3. Done! Look for the icon in your toolbar

---

## After Installation

### 1. Find the Icon
Look for the Personal Assistant icon in your Chrome toolbar (top right area).

**If you don't see it:**
- Click the **puzzle icon** (⚙️) in the top right
- Find "Personal Assistant PDF Extractor"
- Click **"Pin"**

### 2. Test It
1. Open any PDF in Chrome
2. Click the Personal Assistant icon
3. Click "Extract PDF & Send"
4. You should see ✅ "PDF sent to Personal Assistant!"

### 3. You're Done!
The extension is now ready to use.

---

## Troubleshooting

### "I don't see the Load unpacked button"
**Solution:**
- Make sure Developer mode is enabled (top right toggle)
- Should turn blue when enabled
- The "Load unpacked" button appears when Developer mode is on

### "I can't find the extension folder"
**Solution:**
- Open your file manager
- Find the `personal-assistant` folder
- Inside, there's an `extension` folder
- That's the one!

**On Windows:**
```
C:\Users\YourName\Desktop\personal-assistant\extension
```

**On Mac:**
```
/Users/YourName/personal-assistant/extension
```

**On Linux:**
```
/home/username/personal-assistant/extension
```

### "Extension won't load"
**Solution:**
- Make sure you selected the `extension` folder
- Not the whole `personal-assistant` folder
- The folder should have `manifest.json` directly inside it
- Try refreshing the extensions page (F5)

### "No icon in toolbar"
**Solution:**
1. Go to `chrome://extensions/`
2. Find "Personal Assistant PDF Extractor"
3. Click the **"Pin"** button or the **puzzle icon**
4. Drag to reposition if needed

### "Can't extract PDFs"
**Solution:**
- Make sure you're on a PDF page (address ends in `.pdf`)
- Try refreshing the page first
- Reload the extension (toggle off/on in extensions page)
- Try another PDF file

---

## If It Still Doesn't Work

### Option 1: Try Manual Steps
Sometimes the installer might not work perfectly on your system.

**Do this instead:**
1. Open `chrome://extensions/` manually
2. Toggle Developer mode ON
3. Click "Load unpacked"
4. Navigate to the `extension` folder
5. Select it
6. Done!

### Option 2: Check File Location
Make sure you have the complete `extension` folder with:
- ✅ `manifest.json`
- ✅ `popup.html`
- ✅ `popup.js`
- ✅ `background.js`
- ✅ `content.js`

If files are missing, your download might be incomplete.

### Option 3: Restart Chrome
Sometimes Chrome needs a restart:
1. Close Chrome completely
2. Wait 5 seconds
3. Open Chrome again
4. Go to `chrome://extensions/`
5. Reload the extension (circular arrow icon)

---

## Need Help?

If you get stuck:
1. Read the **PDF_GUIDE.md** for detailed usage instructions
2. Check **extension/SETUP.md** for more technical details
3. Look at the troubleshooting section above

**Common Issues Solved:**
- ✅ Extension won't load
- ✅ Icon doesn't appear
- ✅ Can't extract PDFs
- ✅ File browser won't open

---

## Summary

| System | Easiest Method | Time |
|--------|---|---|
| **Windows** | Double-click `install-windows.bat` | 2 min |
| **Mac** | Run `install-mac-linux.sh` in Terminal | 3 min |
| **Linux** | Run `install-mac-linux.sh` in Terminal | 3 min |
| **Any** | Manual: Extensions page → Load unpacked → Select folder | 5 min |

---

## You're All Set! 🎉

Once installed:
1. Open any PDF in Chrome
2. Click the Personal Assistant icon
3. Click "Extract PDF & Send"
4. Use the extracted text in your app

Enjoy! Questions? See **PDF_GUIDE.md** for detailed usage.
