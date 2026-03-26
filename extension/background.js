// Background service worker for the extension
// Handles communication and storage

chrome.runtime.onInstalled.addListener(() => {
  console.log('Personal Assistant PDF Extractor installed');
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'pdf-extracted') {
    // Handle PDF extraction message
    chrome.storage.local.set({
      lastPDFExtract: request.data,
      lastPDFExtractTime: Date.now()
    });
    sendResponse({ success: true });
  }
});

// Clean up old data periodically
chrome.alarms.create('cleanup', { periodInMinutes: 60 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'cleanup') {
    chrome.storage.local.get(null, (items) => {
      const now = Date.now();
      Object.keys(items).forEach(key => {
        if (key.startsWith('pdf_') && items[key].timestamp) {
          const age = now - items[key].timestamp;
          if (age > 24 * 60 * 60 * 1000) {
            // Delete items older than 24 hours
            chrome.storage.local.remove(key);
          }
        }
      });
    });
  }
});
