const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", open);
    menuToggle.textContent = open ? "×" : "☰";
  });
}

// Close mobile menu after clicking a navigation link
document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    }
  });
});


// ================================
// SCROLL ANIMATIONS
// ================================

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.12
  }
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});


// ================================
// RENTAL / PACKAGE MODAL
// ================================

const modal = document.getElementById("bookingModal");
const modalTitle = document.getElementById("modalTitle");

document.querySelectorAll(".book-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const rental = button.dataset.rental;

    modalTitle.textContent = `Interested in ${rental}?`;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

const modalClose = document.getElementById("modalClose");

if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

const modalScroll = document.querySelector(".modal-scroll");

if (modalScroll) {
  modalScroll.addEventListener("click", closeModal);
}


// ================================
// GALLERY LIGHTBOX
// ================================

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const image = item.dataset.img;

    lightboxImg.src = image;
    lightboxImg.alt = item.querySelector("img").alt;

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");

  lightboxImg.src = "";
}

const lightboxClose = document.getElementById("lightboxClose");

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}


// ================================
// ESCAPE KEY
// ================================

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    closeLightbox();
  }
});


// ================================
// QUOTE FORM
// ================================

const form = document.getElementById("quoteForm");
const success = document.getElementById("formSuccess");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    success.style.display = "block";

    const submitButton = form.querySelector("button");

    if (submitButton) {
      submitButton.textContent = "✓ Request Ready";
    }
  });
}


// ================================
// CURRENT YEAR
// ================================

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}