// Booking modal: party size → room suggestions → WhatsApp or email contact,
// then hand off to property WhatsApp with a pre-filled request.

export type OpenBookingFn = (roomType: string) => void;

const WHATSAPP_NUMBER = "94777401667";
const BOOKING_EMAIL = "info@surfinglife.com";

const MAX_ADULTS = 12;
const MAX_CHILDREN = 8;
const MIN_ADULTS = 1;

type RoomType = {
  id: string;
  name: string;
  sleeps: number;
  available: number;
  note: string;
};

type RoomSuggestion = {
  id: string;
  label: string;
  detail: string;
  rooms: string[];
};

const ROOM_INVENTORY: RoomType[] = [
  { id: "budget-double", name: "Budget Double Room", sleeps: 2, available: 2, note: "Fan cooled" },
  { id: "twin", name: "Twin Room", sleeps: 2, available: 1, note: "Fan cooled · 2 singles" },
  { id: "triple-ac", name: "Triple Room", sleeps: 3, available: 1, note: "Air conditioned" },
  { id: "cabana", name: "Cabana Room", sleeps: 3, available: 1, note: "Private cabana" },
  { id: "deluxe-ac", name: "Deluxe Room", sleeps: 2, available: 2, note: "Air conditioned" },
];

const overlay = document.getElementById("booking-overlay");
const modal = document.getElementById("booking-modal");
const form = document.getElementById("booking-form") as HTMLFormElement | null;
const titleEl = document.getElementById("booking-title");
const confirmView = document.getElementById("booking-confirmation");
const confirmText = document.getElementById("booking-confirmation-text");
const formView = document.getElementById("booking-form-view");
const checkInInput = document.getElementById("booking-checkin") as HTMLInputElement | null;
const checkOutInput = document.getElementById("booking-checkout") as HTMLInputElement | null;
const adultsInput = document.getElementById("booking-adults") as HTMLInputElement | null;
const childrenInput = document.getElementById("booking-children") as HTMLInputElement | null;
const adultsCountEl = document.getElementById("adults-count");
const childrenCountEl = document.getElementById("children-count");
const partySummaryEl = document.getElementById("booking-party-summary");
const suggestionsEl = document.getElementById("room-suggestions");
const suggestionHintEl = document.getElementById("room-suggestion-hint");
const roomOptionInput = document.getElementById("booking-room-option") as HTMLInputElement | null;
const contactMethodInput = document.getElementById(
  "booking-contact-method"
) as HTMLInputElement | null;
const whatsappField = document.getElementById("contact-whatsapp-field");
const emailField = document.getElementById("contact-email-field");
const whatsappInput = document.getElementById("booking-whatsapp") as HTMLInputElement | null;
const emailInput = document.getElementById("booking-email") as HTMLInputElement | null;
const submitBtn = document.getElementById("booking-submit");

if (
  overlay &&
  modal &&
  form &&
  titleEl &&
  confirmView &&
  confirmText &&
  formView &&
  adultsInput &&
  childrenInput &&
  adultsCountEl &&
  childrenCountEl &&
  partySummaryEl &&
  suggestionsEl &&
  suggestionHintEl &&
  roomOptionInput &&
  contactMethodInput &&
  whatsappField &&
  emailField &&
  whatsappInput &&
  emailInput &&
  submitBtn
) {
  let preferredRoomName = "";
  let selectedSuggestionId = "";
  let adults = 2;
  let children = 0;

  const today = new Date().toISOString().split("T")[0];
  if (checkInInput) checkInInput.min = today;
  if (checkOutInput) checkOutInput.min = today;

  checkInInput?.addEventListener("change", () => {
    if (checkOutInput) checkOutInput.min = checkInInput.value || today;
  });

  const partyLabel = (a: number, c: number): string => {
    const parts: string[] = [];
    parts.push(`${a} adult${a === 1 ? "" : "s"}`);
    if (c > 0) parts.push(`${c} child${c === 1 ? "" : "ren"}`);
    return parts.join(", ");
  };

  const expandInventory = (): RoomType[] => {
    const instances: RoomType[] = [];
    for (const room of ROOM_INVENTORY) {
      for (let i = 0; i < room.available; i += 1) {
        instances.push({
          ...room,
          id: `${room.id}-${i + 1}`,
          name: room.available > 1 ? `${room.name} #${i + 1}` : room.name,
        });
      }
    }
    return instances;
  };

  const packGreedy = (total: number): RoomType[] | null => {
    const pool = expandInventory().sort((a, b) => b.sleeps - a.sleeps);
    const picked: RoomType[] = [];
    let remaining = total;

    while (remaining > 0 && pool.length > 0) {
      let bestIdx = -1;
      for (let i = 0; i < pool.length; i += 1) {
        if (pool[i].sleeps >= remaining) {
          bestIdx = i;
          break;
        }
      }
      if (bestIdx === -1) bestIdx = 0;
      const room = pool.splice(bestIdx, 1)[0];
      picked.push(room);
      remaining -= room.sleeps;
    }

    return remaining <= 0 ? picked : null;
  };

  const packSmallRooms = (total: number): RoomType[] | null => {
    const pool = expandInventory().sort((a, b) => a.sleeps - b.sleeps);
    const picked: RoomType[] = [];
    let remaining = total;

    while (remaining > 0 && pool.length > 0) {
      let bestIdx = pool.findIndex((r) => r.sleeps >= remaining);
      if (bestIdx === -1) bestIdx = pool.length - 1;
      const room = pool.splice(bestIdx, 1)[0];
      picked.push(room);
      remaining -= room.sleeps;
    }

    return remaining <= 0 ? picked : null;
  };

  const formatPack = (rooms: RoomType[]): { label: string; detail: string; rooms: string[] } => {
    const counts = new Map<string, number>();
    for (const room of rooms) {
      const base = room.name.replace(/ #\d+$/, "");
      counts.set(base, (counts.get(base) || 0) + 1);
    }
    const parts: string[] = [];
    for (const [name, count] of counts) {
      parts.push(count > 1 ? `${count}× ${name}` : name);
    }
    const capacity = rooms.reduce((sum, r) => sum + r.sleeps, 0);
    return {
      label: parts.join(" + "),
      detail: `${rooms.length} room${rooms.length === 1 ? "" : "s"} · sleeps up to ${capacity}`,
      rooms: parts,
    };
  };

  const buildSuggestions = (total: number, preferred: string): RoomSuggestion[] => {
    const suggestions: RoomSuggestion[] = [];
    const seen = new Set<string>();

    const push = (suggestion: RoomSuggestion) => {
      if (seen.has(suggestion.id)) return;
      seen.add(suggestion.id);
      suggestions.push(suggestion);
    };

    // Single-room fits first
    for (const room of ROOM_INVENTORY) {
      if (room.sleeps >= total) {
        push({
          id: `single-${room.id}`,
          label: room.name,
          detail: `Sleeps ${room.sleeps} · ${room.note}`,
          rooms: [room.name],
        });
      }
    }

    // Preferred room even if undersized → pair with another
    if (preferred) {
      const preferredRoom = ROOM_INVENTORY.find((r) => r.name === preferred);
      if (preferredRoom && preferredRoom.sleeps < total) {
        const remaining = total - preferredRoom.sleeps;
        const partner = ROOM_INVENTORY.find(
          (r) => r.name !== preferred && r.sleeps >= remaining
        );
        if (partner) {
          const pack = formatPack([preferredRoom, partner]);
          push({
            id: `pref-${preferredRoom.id}-${partner.id}`,
            label: pack.label,
            detail: `${pack.detail} · includes your ${preferred}`,
            rooms: pack.rooms,
          });
        }
      }
    }

    if (suggestions.length < 3 && total > 1) {
      const greedy = packGreedy(total);
      if (greedy && greedy.length > 1) {
        const pack = formatPack(greedy);
        push({
          id: `pack-greedy-${total}`,
          label: pack.label,
          detail: pack.detail,
          rooms: pack.rooms,
        });
      }

      const compact = packSmallRooms(total);
      if (compact && compact.length > 1) {
        const pack = formatPack(compact);
        push({
          id: `pack-compact-${total}`,
          label: pack.label,
          detail: `${pack.detail} · more smaller rooms`,
          rooms: pack.rooms,
        });
      }
    }

    // Prefer matching the room the guest clicked
    if (preferred) {
      suggestions.sort((a, b) => {
        const aMatch = a.label.includes(preferred) ? 0 : 1;
        const bMatch = b.label.includes(preferred) ? 0 : 1;
        return aMatch - bMatch;
      });
    }

    return suggestions.slice(0, 4);
  };

  const renderSuggestions = () => {
    const total = adults + children;
    partySummaryEl.textContent = partyLabel(adults, children);

    const suggestions = buildSuggestions(total, preferredRoomName);
    suggestionsEl.innerHTML = "";

    if (suggestions.length === 0) {
      roomOptionInput.value = "";
      selectedSuggestionId = "";
      suggestionHintEl.textContent =
        "That party is larger than our usual capacity. Send a request and we’ll help arrange a stay.";
      const fallback = document.createElement("button");
      fallback.type = "button";
      fallback.className =
        "w-full text-left rounded-xl border-2 border-pink bg-pink/5 px-4 py-3";
      fallback.innerHTML = `
        <p class="text-sm font-semibold text-gray-900">Custom arrangement</p>
        <p class="text-xs text-gray-500 mt-0.5">We’ll suggest the best mix of rooms for ${total} guests</p>
      `;
      fallback.addEventListener("click", () => {
        selectedSuggestionId = "custom";
        roomOptionInput.value = `Custom arrangement for ${total} guests`;
        renderSuggestions();
      });
      suggestionsEl.appendChild(fallback);
      roomOptionInput.value = `Custom arrangement for ${total} guests`;
      selectedSuggestionId = "custom";
      return;
    }

    suggestionHintEl.textContent =
      total >= 4
        ? "Larger groups usually book more than one room — pick a mix below."
        : "Pick the option that fits your stay.";

    const stillValid = suggestions.some((s) => s.id === selectedSuggestionId);
    if (!stillValid) {
      selectedSuggestionId = suggestions[0].id;
      roomOptionInput.value = suggestions[0].label;
    }

    for (const suggestion of suggestions) {
      const selected = suggestion.id === selectedSuggestionId;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("role", "radio");
      btn.setAttribute("aria-checked", selected ? "true" : "false");
      btn.className = selected
        ? "w-full text-left rounded-xl border-2 border-pink bg-pink/5 px-4 py-3 transition-colors"
        : "w-full text-left rounded-xl border border-gray-200 px-4 py-3 hover:border-pink/50 transition-colors";
      btn.innerHTML = `
        <div class="flex items-start gap-3">
          <span class="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
            selected ? "border-pink bg-pink" : "border-gray-300"
          }">
            ${selected ? '<span class="h-1.5 w-1.5 rounded-full bg-white"></span>' : ""}
          </span>
          <span>
            <span class="block text-sm font-semibold text-gray-900">${suggestion.label}</span>
            <span class="block text-xs text-gray-500 mt-0.5">${suggestion.detail}</span>
          </span>
        </div>
      `;
      btn.addEventListener("click", () => {
        selectedSuggestionId = suggestion.id;
        roomOptionInput.value = suggestion.label;
        renderSuggestions();
      });
      suggestionsEl.appendChild(btn);
    }
  };

  const syncGuestUI = () => {
    adultsInput.value = String(adults);
    childrenInput.value = String(children);
    adultsCountEl.textContent = String(adults);
    childrenCountEl.textContent = String(children);

    const adultsMinus = document.getElementById("adults-minus") as HTMLButtonElement | null;
    const adultsPlus = document.getElementById("adults-plus") as HTMLButtonElement | null;
    const childrenMinus = document.getElementById("children-minus") as HTMLButtonElement | null;
    const childrenPlus = document.getElementById("children-plus") as HTMLButtonElement | null;

    if (adultsMinus) adultsMinus.disabled = adults <= MIN_ADULTS;
    if (adultsPlus) adultsPlus.disabled = adults >= MAX_ADULTS;
    if (childrenMinus) childrenMinus.disabled = children <= 0;
    if (childrenPlus) childrenPlus.disabled = children >= MAX_CHILDREN;

    renderSuggestions();
  };

  document.getElementById("adults-minus")?.addEventListener("click", () => {
    if (adults > MIN_ADULTS) {
      adults -= 1;
      syncGuestUI();
    }
  });
  document.getElementById("adults-plus")?.addEventListener("click", () => {
    if (adults < MAX_ADULTS) {
      adults += 1;
      syncGuestUI();
    }
  });
  document.getElementById("children-minus")?.addEventListener("click", () => {
    if (children > 0) {
      children -= 1;
      syncGuestUI();
    }
  });
  document.getElementById("children-plus")?.addEventListener("click", () => {
    if (children < MAX_CHILDREN) {
      children += 1;
      syncGuestUI();
    }
  });

  const setContactMethod = (method: "whatsapp" | "email") => {
    contactMethodInput.value = method;

    document.querySelectorAll<HTMLElement>(".contact-tab").forEach((tab) => {
      const active = tab.dataset.contactMethod === method;
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.setAttribute("tabindex", active ? "0" : "-1");
      tab.className = active
        ? "contact-tab rounded-lg py-2.5 text-sm font-medium transition-colors bg-white text-gray-900 shadow-sm"
        : "contact-tab rounded-lg py-2.5 text-sm font-medium transition-colors text-gray-700 hover:text-gray-900";
    });

    if (method === "whatsapp") {
      whatsappField.hidden = false;
      emailField.hidden = true;
      whatsappInput.required = true;
      emailInput.required = false;
      emailInput.value = "";
      submitBtn.textContent = "Book via WhatsApp";
    } else {
      whatsappField.hidden = true;
      emailField.hidden = false;
      whatsappInput.required = false;
      emailInput.required = true;
      whatsappInput.value = "";
      submitBtn.textContent = "Book via Email";
    }
  };

  document.getElementById("contact-whatsapp")?.addEventListener("click", () => {
    setContactMethod("whatsapp");
  });
  document.getElementById("contact-email")?.addEventListener("click", () => {
    setContactMethod("email");
  });

  const openModal = (roomType: string) => {
    preferredRoomName = roomType === "Room" ? "" : roomType;
    titleEl.textContent = preferredRoomName ? `Book ${preferredRoomName}` : "Book a Stay";
    form.reset();
    adults = 2;
    children = 0;
    selectedSuggestionId = "";
    if (checkInInput) checkInInput.min = today;
    if (checkOutInput) checkOutInput.min = today;
    setContactMethod("whatsapp");
    syncGuestUI();
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

  // Triggers are wired by booking-boot.ts so this chunk stays off the critical path.
  (window as unknown as { __openBooking?: (roomType: string) => void }).__openBooking =
    openModal;

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
    const checkIn = data.get("checkIn") as string;
    const checkOut = data.get("checkOut") as string;
    const roomOption = (data.get("roomOption") as string) || "Not specified";
    const specialRequests = ((data.get("specialRequests") as string) || "").trim() || "None";
    const method = contactMethodInput.value as "whatsapp" | "email";
    const whatsapp = ((data.get("whatsapp") as string) || "").trim();
    const email = ((data.get("email") as string) || "").trim();

    if (method === "whatsapp" && !whatsapp) {
      whatsappInput.focus();
      return;
    }
    if (method === "email" && !email) {
      emailInput.focus();
      return;
    }

    const contactLine =
      method === "whatsapp" ? `Guest WhatsApp: +${whatsapp.replace(/^\+/, "")}` : `Guest Email: ${email}`;

    const message = `Hello! I'd like to book a stay at Surfing Life:

Room option: ${roomOption}
Check-in: ${checkIn}
Check-out: ${checkOut}
Adults: ${adults}
Children: ${children}
${contactLine}
Special requests: ${specialRequests}`;

    if (method === "whatsapp") {
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
        "_blank"
      );
      confirmText.textContent =
        "We've opened WhatsApp with your booking details. Send the message to confirm.";
    } else {
      const subject = encodeURIComponent(`Booking request — ${roomOption}`);
      const body = encodeURIComponent(message);
      window.open(`mailto:${BOOKING_EMAIL}?subject=${subject}&body=${body}`, "_blank");
      confirmText.textContent =
        "We've opened your email app with a pre-filled booking request. Send it when you're ready.";
    }

    formView.hidden = true;
    confirmView.hidden = false;
  });

  syncGuestUI();
}
