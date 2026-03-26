// Load PDF.js from CDN
const pdfjsScript = document.createElement('script');
pdfjsScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
document.head.appendChild(pdfjsScript);

document.getElementById('extractBtn').addEventListener('click', extractAndSend);

function showStatus(message, type = 'info') {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = message;
  statusDiv.className = `status ${type}`;
  statusDiv.style.display = 'block';
}

function hideStatus() {
  const statusDiv = document.getElementById('status');
  statusDiv.style.display = 'none';
}

async function extractAndSend() {
  const btn = document.getElementById('extractBtn');

  try {
    // Get the current tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Check if it's a PDF
    if (!tab.url.endsWith('.pdf')) {
      showStatus('❌ This page is not a PDF file', 'error');
      return;
    }

    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span>Extracting...';
    showStatus('📖 Extracting PDF content...', 'info');

    // Extract PDF text
    const pdfText = await extractPDFText(tab.url);

    if (!pdfText) {
      showStatus('❌ Could not extract text from PDF', 'error');
      btn.disabled = false;
      btn.innerHTML = 'Extract PDF & Send';
      return;
    }

    // Send to local server (Personal Assistant app)
    await sendToApp(pdfText, tab.title);

    showStatus('✅ PDF sent to Personal Assistant!', 'success');
    btn.disabled = false;
    btn.innerHTML = 'Extract PDF & Send';

    // Close popup after 2 seconds
    setTimeout(() => window.close(), 2000);
  } catch (error) {
    console.error('Error:', error);
    showStatus(`❌ Error: ${error.message}`, 'error');
    btn.disabled = false;
    btn.innerHTML = 'Extract PDF & Send';
  }
}

async function extractPDFText(url) {
  try {
    // Wait for PDF.js to load
    while (typeof pdfjsLib === 'undefined') {
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const pdf = await pdfjsLib.getDocument(url).promise;
    let text = '';

    for (let i = 1; i <= Math.min(pdf.numPages, 50); i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      text += pageText + '\n';
    }

    return text.trim();
  } catch (error) {
    throw new Error('Failed to extract PDF: ' + error.message);
  }
}

async function sendToApp(content, filename) {
  // Try to send to the local app
  // The app should be listening on a local port

  const payload = {
    type: 'pdf-extract',
    content: content,
    source: filename,
    timestamp: new Date().toISOString()
  };

  // Store in chrome storage so the app can retrieve it
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(
      {
        lastPDFExtract: payload,
        lastPDFExtractTime: Date.now()
      },
      () => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve();
        }
      }
    );
  });
}
