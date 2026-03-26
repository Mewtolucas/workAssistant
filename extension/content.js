// Content script runs on all pages
// This script enables communication with the page context

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'check-pdf') {
    // Check if current page is a PDF
    const isPDF = document.contentType === 'application/pdf';
    sendResponse({ isPDF: isPDF });
  }
});
