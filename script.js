const navLinks = document.querySelectorAll(".section-nav a");
const sections = document.querySelectorAll("main section[id]");
const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");
const zoomModal = document.querySelector(".zoom-modal");
const modalContent = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const zoomTriggers = document.querySelectorAll(".zoom-trigger");

if (menuToggle && sidebar) {
  menuToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const activateNav = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
  });
};

if (sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activateNav(entry.target.id);
        }
      });
    },
    { rootMargin: "-30% 0px -55% 0px", threshold: 0.15 }
  );

  sections.forEach((section) => observer.observe(section));
}

zoomTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    if (!zoomModal || !modalContent) return;
    modalContent.innerHTML = "";
    const clone = trigger.cloneNode(true);
    clone.classList.remove("zoom-trigger");
    clone.setAttribute("aria-label", "Expanded diagram");
    modalContent.appendChild(clone);
    zoomModal.showModal();
  });
});

if (modalClose && zoomModal) {
  modalClose.addEventListener("click", () => zoomModal.close());
  zoomModal.addEventListener("click", (event) => {
    const rect = zoomModal.getBoundingClientRect();
    const inside =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;
    if (!inside) zoomModal.close();
  });
}
