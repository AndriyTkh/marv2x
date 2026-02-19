/**
 * Utility functions for managing spec download access state in localStorage
 *
 * Access state determines whether a user has submitted the form and can
 * download product specifications directly without filling out the form again.
 */

const STORAGE_KEY = 'marvilon_spec_access';

/**
 * Reads the access state from localStorage
 *
 * @returns {boolean} true if user has access, false otherwise
 *
 * Requirements: 2.1, 2.4, 7.2
 * - Reads from localStorage using key "marvilon_spec_access"
 * - Handles localStorage access errors gracefully (defaults to false)
 * - Supports persistent access across sessions
 */
export function getAccessState(): boolean {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'true';
  } catch (error) {
    // If localStorage access fails, default to false (show form)
    console.error('Failed to read access state from localStorage:', error);
    return false;
  }
}

/**
 * Writes the access state to localStorage
 *
 * @param {boolean} hasAccess - Whether the user has been granted access
 *
 * Requirements: 5.2, 7.1, 7.3, 7.4
 * - Stores in localStorage (not sessionStorage) for persistence
 * - Uses key "marvilon_spec_access"
 * - Persists until user clears browser data
 * - Shared across all product pages
 */
export function setAccessState(hasAccess: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEY, String(hasAccess));
  } catch (error) {
    // Log error but don't throw - localStorage might be disabled
    console.error('Failed to write access state to localStorage:', error);
  }
}

/**
 * Gets the button label based on access state
 *
 * @param {boolean} hasAccess - Whether the user has access
 * @returns {string} The appropriate button label
 *
 * Requirements: 1.2, 1.3
 * - Returns "Request Full Specs" when access is false
 * - Returns "Download PDF" when access is true
 */
export function getButtonLabel(hasAccess: boolean): string {
  return hasAccess ? 'Download PDF' : 'Request Full Specs';
}

/**
 * Clears the access state from localStorage
 * Useful for testing or manual reset scenarios
 */
export function clearAccessState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear access state from localStorage:', error);
  }
}
