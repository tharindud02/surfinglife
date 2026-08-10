// Mobile nav drawer: open/close + backdrop click + link click closes it.
export {};

const trigger = document.getElementById("drawer-trigger");
const overlay = document.getElementById("drawer-overlay");
const panel = document.getElementById("drawer-panel");
const closeBtn = document.getElementById("drawer-close");

if (trigger && overlay && panel) {
  const openDrawer = () => {
    overlay.classList.remove("opacity-0", "-translate-x-full", "pointer-events-none");
    panel.classList.remove("-translate-x-full");
  };

  const closeDrawer = () => {
    overlay.classList.add("opacity-0");
    panel.classList.add("-translate-x-full");
    window.setTimeout(() => {
      overlay.classList.add("-translate-x-full", "pointer-events-none");
    }, 300);
  };

  trigger.addEventListener("click", openDrawer);
  closeBtn?.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeDrawer();
  });
  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });
}
