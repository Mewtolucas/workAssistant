const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  readNotes: () => ipcRenderer.invoke('read-notes'),
  saveNote: (note) => ipcRenderer.invoke('save-note', note),
  deleteNote: (noteId) => ipcRenderer.invoke('delete-note', noteId),
  readFlashcards: () => ipcRenderer.invoke('read-flashcards'),
  saveFlashcardSet: (flashcardSet) => ipcRenderer.invoke('save-flashcard-set', flashcardSet),
  deleteFlashcardSet: (setId) => ipcRenderer.invoke('delete-flashcard-set', setId),
  getStats: () => ipcRenderer.invoke('get-stats')
});
