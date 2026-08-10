// Vanilla-JS booking modal: collects a few fields and hands the guest off
// to WhatsApp with a pre-filled message. No backend involved (matches the
// previous React implementation's behavior exactly).
export {};

const WHATSAPP_NUMBER = "94777401667";

const overlay = document.getElementById("booking-overlay");
const modal = document.getElementById("booking-modal");
const form = document.getElementById("booking-form") as HTMLFormElement | null;
const titleEl = document.getElementById("booking-title");
const confirmView = document.getElementById("booking-confirmation");
const confirmText = document.getElementById("booking-confirmation-text");
const formView = document.getElementById("booking-form-view");
const checkInInput = document.getElementById(
  "booking-checkin"
) as HTMLInputElement | null;
const checkOutInput = document.getElementById(
  "booking-checkout"
) as HTMLInputElement | null;

if (overlay && modal && form && titleEl && confirmView && confirmText && formView) {
  let currentRoomType = "Room";

  const today = new Date().toISOString().split("T")[0];
  if (checkInInput) checkInInput.min = today;
  if (checkOutInput) checkOutInput.min = today;

  checkInInput?.addEventListener("change", () => {
    if (checkOutInput) checkOutInput.min = checkInInput.value || today;
  });

  const openModal = (roomType: string) => {
    currentRoomType = roomType;
    titleEl.textContent = `Book ${roomType}`;
    form.reset();
    if (checkInInput) checkInInput.min = today;
    if (checkOutInput) checkOutInput.min = today;
    formView.hidden = false;
    confirmView.hidden = true;
    overlay.classList.remove("pointer-events-none", "opacity-0");
    modal.classList.remove("translate-y-4", "opacity-0");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    overlay.classList.add("opacity-0");
    modal.classList.add("translate-y-4", "opacity-0");
    document.body.style.overflow = "";
    window.setTimeout(() => {
      overlay.classList.add("pointer-events-none");
    }, 300);
  };

  document.querySelectorAll<HTMLElement>("[data-book-trigger]").forEach((el) => {
    el.addEventListener("click", () => {
      openModal(el.dataset.roomType || "Room");
    });
  });

  document
    .querySelectorAll<HTMLElement>("[data-book-close]")
    .forEach((el) => el.addEventListener("click", closeModal));

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.classList.contains("pointer-events-none")) {
      closeModal();
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const phone = data.get("phone") as string;
    const checkIn = data.get("checkIn") as string;
    const checkOut = data.get("checkOut") as string;
    const guests = data.get("guests") as string;
    const specialRequests = (data.get("specialRequests") as string) || "None";

    const message = `Hello! I would like to confirm my booking for ${currentRoomType}:

Name: ${name}
Email: ${email}
Phone: ${phone}
Check-in: ${checkIn}
Check-out: ${checkOut}
Guests: ${guests}
Special Requests: ${specialRequests}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");

    confirmText.textContent = `Thank you for choosing ${currentRoomType}. We've opened WhatsApp for you to confirm your booking.`;
    formView.hidden = true;
    confirmView.hidden = false;
  });
}
