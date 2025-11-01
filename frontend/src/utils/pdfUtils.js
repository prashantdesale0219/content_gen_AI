import { jsPDF } from 'jspdf';

/**
 * Generate and download a PDF from content
 * @param {string} title - The title of the content
 * @param {string} content - The main content text
 * @param {string} contentType - Type of content (blog, article, etc.)
 * @param {string} tone - Tone of the content
 */
export const generatePDF = (title, content, contentType, tone) => {
  const doc = new jsPDF();
  
  // Set document properties
  doc.setProperties({
    title: title,
    subject: contentType,
    creator: 'AI Content Generator',
    author: 'User'
  });
  
  // Add title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(title, 20, 20);
  
  // Add metadata
  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.text(`Type: ${contentType} | Tone: ${tone}`, 20, 30);
  
  // Add content
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  // Split content into lines to fit page width
  const textLines = doc.splitTextToSize(content, 170);
  doc.text(textLines, 20, 40);
  
  // Save the PDF
  doc.save(`${title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
};