// Scroll-triggered fade-in for elements marked with [data-reveal].
// Replaces react-awesome-reveal's <Fade> with zero framework runtime.
export {};

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
  observer.observe(el);
});
