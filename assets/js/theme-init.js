// Runs before first paint so the page never flashes the wrong theme. Dark is the default.
try {
  const saved = localStorage.getItem('getcovered:theme');
  if (saved === 'light' || saved === 'dark') document.documentElement.dataset.theme = saved;
} catch (e) {
  /* storage blocked: keep the default */
}

// Safety net: if the app has not shown itself after 8 seconds (very slow network, blocked script),
// stop hiding the page so the person is never left looking at a splash screen.
setTimeout(function () {
  if (!document.documentElement.hasAttribute('data-ready')) document.documentElement.setAttribute('data-ready', 'late');
}, 8000);
