export const scrollPageToTop = () => {
  window.scrollTo(0, 0);
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  const root = document.getElementById('root');
  if (root) {
    root.scrollTop = 0;
  }
};

export const scheduleScrollPageToTop = () => {
  scrollPageToTop();

  const frame = window.requestAnimationFrame(scrollPageToTop);
  const timeouts = [0, 60, 180, 360, 700].map((delay) =>
    window.setTimeout(scrollPageToTop, delay)
  );

  return () => {
    window.cancelAnimationFrame(frame);
    timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
  };
};
