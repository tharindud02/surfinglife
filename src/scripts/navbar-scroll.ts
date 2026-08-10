// Stores scroll position on <html data-scroll> so global.css can toggle the
// fixed/blurred navbar background once the page has scrolled.
export {};

const debounce = (fn: () => void) => {
  let frame: number;
  return () => {
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(fn);
  };
};

const storeScroll = () => {
  document.documentElement.dataset.scroll = String(window.scrollY);
};

document.addEventListener("scroll", debounce(storeScroll), { passive: true });
storeScroll();
