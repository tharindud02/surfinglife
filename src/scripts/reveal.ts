// Scroll-triggered fade-in for elements marked with [data-reveal].
// Replaces react-awesome-reveal's <Fade> with zero framework runtime.
export {};

const revealEls = document.querySelectorAll<HTMLElement>("[data-reveal]");

const show = (el: HTMLElement) => {
  el.classList.add("is-visible");
};

// If JS is delayed, don't leave content invisible forever.
window.setTimeout(() => {
  revealEls.forEach((el) => {
    if (!el.classList.contains("is-visible")) show(el);
  });
}, 2500);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          show(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach(show);
}
