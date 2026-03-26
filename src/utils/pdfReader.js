import * as pdfjsLib from 'pdfjs-dist';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * Extract text from a PDF file
 * @param {File} file - The PDF file
 * @returns {Promise<string>} - The extracted text
 */
export async function extractTextFromPDF(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let text = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      text += pageText + '\n';
    }

    return text.trim();
  } catch (error) {
    console.error('Error extracting PDF:', error);
    throw new Error('Failed to extract text from PDF: ' + error.message);
  }
}

/**
 * Get file from browser FileList
 * @param {Event} event - File input change event
 * @returns {File|null} - The first file or null
 */
export function getFileFromInput(event) {
  const files = event.target.files;
  if (files && files.length > 0) {
    return files[0];
  }
  return null;
}
