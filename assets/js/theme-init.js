// Runs before first paint so the page never flashes the wrong theme. Dark is the default.
try {
  const saved = localStorage.getItem('getcovered:theme');
  if (saved === 'light' || saved === 'dark') document.documentElement.dataset.theme = saved;
} catch (e) {
  /* storage blocked: keep the default */
}
