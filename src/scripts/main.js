/**
 * Navigates to a URL after a 450ms delay cause animation.
 * @param {string} url - The destination URL.
 */
function handleDelayedNavigation(url) {
    setTimeout(() => {
      window.location.href = url;
    }, 450);
  }
  window.handleDelayedNavigation = handleDelayedNavigation;