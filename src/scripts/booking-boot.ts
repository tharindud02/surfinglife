// Tiny boot loader — pulls the full booking module only on first Book click
// (or during idle time), keeping ~9KB off the critical path.
export {};

type OpenBooking = (roomType: string) => void;

let loadPromise: Promise<OpenBooking> | null = null;

const loadBooking = (): Promise<OpenBooking> => {
  if (!loadPromise) {
    loadPromise = import("./booking").then(() => {
      const open = (window as unknown as { __openBooking?: OpenBooking }).__openBooking;
      if (!open) {
        throw new Error("Booking module failed to initialize");
      }
      return open;
    });
  }
  return loadPromise;
};

document.querySelectorAll<HTMLElement>("[data-book-trigger]").forEach((el) => {
  el.addEventListener("click", async () => {
    const open = await loadBooking();
    open(el.dataset.roomType || "Room");
  });
});

const warm = () => {
  void loadBooking().catch(() => {
    /* ignore warm failures — click path will retry */
  });
};

const w = window as Window &
  typeof globalThis & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  };

if (typeof w.requestIdleCallback === "function") {
  w.requestIdleCallback(warm, { timeout: 6000 });
} else {
  globalThis.setTimeout(warm, 4000);
}
