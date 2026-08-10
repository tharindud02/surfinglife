// Tiny boot loader — pulls the full booking module only on first Book click.
export {};

type OpenBooking = (roomType: string) => void;

let loadPromise: Promise<OpenBooking> | null = null;

const loadBooking = (): Promise<OpenBooking> => {
  if (!loadPromise) {
    loadPromise = import("./booking")
      .then(() => {
        const open = (window as unknown as { __openBooking?: OpenBooking }).__openBooking;
        if (!open) {
          throw new Error("Booking module failed to initialize");
        }
        return open;
      })
      .catch((err: unknown) => {
        loadPromise = null;
        throw err;
      });
  }
  return loadPromise;
};

// Delegation so triggers added later (drawer, HMR) still work.
document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const trigger = target.closest<HTMLElement>("[data-book-trigger]");
  if (!trigger) return;

  event.preventDefault();
  void loadBooking()
    .then((open) => open(trigger.dataset.roomType || "Room"))
    .catch((err: unknown) => {
      console.error("[booking]", err);
    });
});
