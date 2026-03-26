const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');

const isDev = process.env.NODE_ENV === 'development';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      sandbox: true
    }
  });

  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IPC Handlers for file operations
const NOTES_DIR = path.join(os.homedir(), '.personal-assistant', 'notes');
const FLASHCARDS_DIR = path.join(os.homedir(), '.personal-assistant', 'flashcards');

// Ensure directories exist
[NOTES_DIR, FLASHCARDS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Notes operations
ipcMain.handle('read-notes', async () => {
  try {
    if (!fs.existsSync(NOTES_DIR)) {
      return [];
    }
    const files = fs.readdirSync(NOTES_DIR);
    const notes = files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const content = fs.readFileSync(path.join(NOTES_DIR, file), 'utf-8');
        return JSON.parse(content);
      })
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    return notes;
  } catch (error) {
    console.error('Error reading notes:', error);
    return [];
  }
});

ipcMain.handle('save-note', async (event, note) => {
  try {
    const noteId = note.id || Date.now().toString();
    const filePath = path.join(NOTES_DIR, `${noteId}.json`);
    const noteData = {
      ...note,
      id: noteId,
      updatedAt: new Date().toISOString()
    };
    fs.writeFileSync(filePath, JSON.stringify(noteData, null, 2));
    return noteData;
  } catch (error) {
    console.error('Error saving note:', error);
    throw error;
  }
});

ipcMain.handle('delete-note', async (event, noteId) => {
  try {
    const filePath = path.join(NOTES_DIR, `${noteId}.json`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    return true;
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
});

// Flashcards operations
ipcMain.handle('read-flashcards', async () => {
  try {
    if (!fs.existsSync(FLASHCARDS_DIR)) {
      return [];
    }
    const files = fs.readdirSync(FLASHCARDS_DIR);
    const flashcards = files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const content = fs.readFileSync(path.join(FLASHCARDS_DIR, file), 'utf-8');
        return JSON.parse(content);
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return flashcards;
  } catch (error) {
    console.error('Error reading flashcards:', error);
    return [];
  }
});

ipcMain.handle('save-flashcard-set', async (event, flashcardSet) => {
  try {
    const setId = flashcardSet.id || Date.now().toString();
    const filePath = path.join(FLASHCARDS_DIR, `${setId}.json`);
    const setData = {
      ...flashcardSet,
      id: setId,
      createdAt: flashcardSet.createdAt || new Date().toISOString()
    };
    fs.writeFileSync(filePath, JSON.stringify(setData, null, 2));
    return setData;
  } catch (error) {
    console.error('Error saving flashcard set:', error);
    throw error;
  }
});

ipcMain.handle('delete-flashcard-set', async (event, setId) => {
  try {
    const filePath = path.join(FLASHCARDS_DIR, `${setId}.json`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    return true;
  } catch (error) {
    console.error('Error deleting flashcard set:', error);
    throw error;
  }
});

// Get stats
ipcMain.handle('get-stats', async () => {
  try {
    const notesCount = fs.existsSync(NOTES_DIR)
      ? fs.readdirSync(NOTES_DIR).filter(f => f.endsWith('.json')).length
      : 0;
    const flashcardsCount = fs.existsSync(FLASHCARDS_DIR)
      ? fs.readdirSync(FLASHCARDS_DIR).filter(f => f.endsWith('.json')).length
      : 0;

    return {
      notesCount,
      flashcardsCount,
      unreadEmails: 0, // Placeholder
      upcomingEvents: 0 // Placeholder
    };
  } catch (error) {
    console.error('Error getting stats:', error);
    return { notesCount: 0, flashcardsCount: 0, unreadEmails: 0, upcomingEvents: 0 };
  }
});
