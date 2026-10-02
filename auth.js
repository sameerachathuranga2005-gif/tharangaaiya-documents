// ==========================================================================
// Green Light Enterprises - Security & Access Controller
// Password: "tharanga"
// ==========================================================================

const GLE_AUTH_KEY = 'gle_session_unlocked';
const GLE_CORRECT_PASSWORD = 'tharanga';

// Clear any old legacy localStorage keys to ensure lock comes first
try {
  localStorage.removeItem('gle_authenticated_remember');
  localStorage.removeItem('gle_authenticated_session');
} catch (e) {}

/**
 * Check if the current tab/session is unlocked
 */
function isGleAuthenticated() {
  return sessionStorage.getItem(GLE_AUTH_KEY) === 'true';
}

/**
 * Attempt login with password
 * @param {string} password 
 * @returns {boolean} true if correct, false otherwise
 */
function gleLogin(password) {
  if (!password) return false;
  
  if (password.trim().toLowerCase() === GLE_CORRECT_PASSWORD.toLowerCase()) {
    sessionStorage.setItem(GLE_AUTH_KEY, 'true');
    return true;
  }
  return false;
}

/**
 * Lock the system and go to intro page
 */
function gleLock() {
  sessionStorage.removeItem(GLE_AUTH_KEY);
  window.location.href = 'intro page.html';
}

/**
 * Enforce protection on 1.html, 2.html and 3.html
 */
function enforceGleProtection() {
  if (!isGleAuthenticated()) {
    window.location.replace('intro page.html');
  }
}
