/**
 * Utility functions for handling PDF specification downloads
 *
 * This module provides functionality to download product specification PDFs
 * from the public directory using browser download mechanisms.
 */

/**
 * Downloads a product specification PDF file
 *
 * Uses the PDF path from the product data and triggers a browser download
 * with a suggested filename.
 *
 * @param {string} pdfPath - The path to the PDF file from product.specs
 * @param {string} productName - The product name for the suggested filename
 * @returns {Promise<void>} Resolves when download is initiated successfully
 * @throws {Error} Throws error if PDF file is not found or network error occurs
 *
 * Requirements: 6.1, 6.2, 6.3, 6.4
 * - Uses PDF file path from product data
 * - Checks if PDF file exists before initiating download
 * - Initiates browser download using anchor element with download attribute
 * - Sets suggested filename based on product name
 * - Throws error with message "Specification not available for this product" if file not found
 */
export async function downloadProductPDF(pdfPath: string, productName: string): Promise<void> {
  // Construct the suggested filename from product name
  const safeProductName = productName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
  const suggestedFilename = `${safeProductName}_specifications.pdf`;

  try {
    // Check if the PDF file exists using a HEAD request
    const response = await fetch(pdfPath, { method: 'HEAD' });

    console.log(response.status);
    

    if (!response.ok) {
      if (response.status === 404) {
        // File not found - throw specific error message per requirement 6.3
        throw new Error('Specification not available for this product');
      } else {
        // Other HTTP errors
        throw new Error(`Failed to access specification file (Status: ${response.status})`);
      }
    }

    // File exists, proceed with download
    // Create a temporary anchor element
    const anchor = document.createElement('a');
    anchor.href = pdfPath;
    anchor.download = suggestedFilename;

    // Append to body (required for Firefox)
    document.body.appendChild(anchor);

    // Trigger the download
    anchor.click();

    // Clean up - remove the anchor element
    document.body.removeChild(anchor);
  } catch (error) {
    // Handle network errors gracefully
    if (error instanceof Error) {
      // Re-throw the error with the original message
      throw error;
    } else {
      // Unknown error type
      throw new Error('An unexpected error occurred while downloading the specification');
    }
  }
}
