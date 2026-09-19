/* =========================================================
   EARLIE JUMPERS LLC
   JAVASCRIPT
   ========================================================= */


/* =========================================================
   ELEMENTS
   ========================================================= */

const themeToggle =
  document.getElementById("themeToggle");

const menuToggle =
  document.getElementById("menuToggle");

const mainNav =
  document.getElementById("mainNav");

const bookingModal =
  document.getElementById("bookingModal");

const modalOverlay =
  document.getElementById("modalOverlay");

const modalClose =
  document.getElementById("modalClose");

const selectedRental =
  document.getElementById("selectedRental");

const quoteForm =
  document.getElementById("quoteForm");

const toast =
  document.getElementById("toast");

const eventDate =
  document.getElementById("eventDate");

const currentYear =
  document.getElementById("currentYear");

const modalFormButton =
  document.getElementById("modalFormButton");


/* =========================================================
   CURRENT YEAR
   ========================================================= */

if (currentYear) {

  currentYear.textContent =
    new Date().getFullYear();

}


/* =========================================================
   LIGHT / DARK MODE
   ========================================================= */

function updateThemeButton() {

  if (!themeToggle) return;

  const isDark =
    document.body.classList.contains("dark-mode");

  if (isDark) {

    themeToggle.textContent = "☀️";

    themeToggle.setAttribute(
      "aria-label",
      "Switch to light mode"
    );

    themeToggle.setAttribute(
      "title",
      "Switch to light mode"
    );

  } else {

    themeToggle.textContent = "🌙";

    themeToggle.setAttribute(
      "aria-label",
      "Switch to dark mode"
    );

    themeToggle.setAttribute(
      "title",
      "Switch to dark mode"
    );

  }

}


/* Load saved theme */

const savedTheme =
  localStorage.getItem("earlieJumpersTheme");


if (savedTheme === "dark") {

  document.body.classList.add("dark-mode");

}


/* If no saved preference, respect device setting */

if (!savedTheme) {

  const prefersDark =
    window.matchMedia &&
    window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

  if (prefersDark) {

    document.body.classList.add("dark-mode");

  }

}


updateThemeButton();


/* Toggle */

if (themeToggle) {

  themeToggle.addEventListener(
    "click",
    () => {

      document.body.classList.toggle(
        "dark-mode"
      );

      const isDark =
        document.body.classList.contains(
          "dark-mode"
        );

      localStorage.setItem(
        "earlieJumpersTheme",
        isDark
          ? "dark"
          : "light"
      );

      updateThemeButton();

    }
  );

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

if (menuToggle && mainNav) {

  menuToggle.addEventListener(
    "click",
    () => {

      const isOpen =
        mainNav.classList.toggle("active");

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen
      );

      menuToggle.textContent =
        isOpen
          ? "×"
          : "☰";

    }
  );


  /* Close menu after clicking a link */

  mainNav
    .querySelectorAll("a")
    .forEach(
      link => {

        link.addEventListener(
          "click",
          () => {

            mainNav.classList.remove(
              "active"
            );

            menuToggle.setAttribute(
              "aria-expanded",
              "false"
            );

            menuToggle.textContent =
              "☰";

          }
        );

      }
    );

}


/* =========================================================
   BOOKING MODAL
   ========================================================= */

function openBookingModal(
  rentalName
) {

  if (!bookingModal) return;

  selectedRental.textContent =
    rentalName ||
    "Rental";

  bookingModal.classList.add(
    "active"
  );

  bookingModal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow =
    "hidden";

}


function closeBookingModal() {

  if (!bookingModal) return;

  bookingModal.classList.remove(
    "active"
  );

  bookingModal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow =
    "";

}


/* Rental buttons */

document
  .querySelectorAll(".book-btn")
  .forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const rental =
            button.dataset.rental;

          openBookingModal(
            rental
          );

        }
      );

    }
  );


/* Close modal */

if (modalClose) {

  modalClose.addEventListener(
    "click",
    closeBookingModal
  );

}


if (modalOverlay) {

  modalOverlay.addEventListener(
    "click",
    closeBookingModal
  );

}


/* Escape key */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeBookingModal();

    }

  }
);


/* =========================================================
   MODAL → CONTACT FORM
   ========================================================= */

if (modalFormButton) {

  modalFormButton.addEventListener(
    "click",
    () => {

      closeBookingModal();

      const contact =
        document.getElementById(
          "contact"
        );

      if (contact) {

        contact.scrollIntoView({
          behavior: "smooth"
        });

      }

      setTimeout(
        () => {

          const rentalSelect =
            document.getElementById(
              "rentalType"
            );

          if (
            rentalSelect &&
            selectedRental
          ) {

            const rental =
              selectedRental.textContent.trim();

            const options =
              Array.from(
                rentalSelect.options
              );

            const matchingOption =
              options.find(
                option =>
                  option.text.trim() ===
                  rental
              );

            if (matchingOption) {

              rentalSelect.value =
                matchingOption.value;

            }

          }

        },
        500
      );

    }
  );

}


/* =========================================================
   DATE PICKER
   ========================================================= */

if (eventDate) {

  const today =
    new Date();

  const year =
    today.getFullYear();

  const month =
    String(
      today.getMonth() + 1
    ).padStart(
      2,
      "0"
    );

  const day =
    String(
      today.getDate()
    ).padStart(
      2,
      "0"
    );

  eventDate.min =
    `${year}-${month}-${day}`;

}


/* =========================================================
   QUOTE FORM
   ========================================================= */

if (quoteForm) {

  quoteForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const name =
        document.getElementById(
          "name"
        ).value.trim();

      if (!name) {

        showToast(
          "Please enter your name."
        );

        return;

      }


      /*
        This is currently a front-end demo.

        It does NOT send an email.

        For the real Earlie Jumpers website,
        this can later be connected to:
        - Formspree
        - Netlify Forms
        - EmailJS
        - a custom backend
      */

      showToast(
        `🎉 Thanks ${name}! Jamar can be reached at 765-517-0043.`
      );

      quoteForm.reset();

    }
  );

}


/* =========================================================
   TOAST
   ========================================================= */

let toastTimer;


function showToast(message) {

  if (!toast) return;

  toast.textContent =
    message;

  toast.classList.add(
    "show"
  );

  clearTimeout(
    toastTimer
  );

  toastTimer =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      4500
    );

}


/* =========================================================
   PHONE NUMBER FORMATTING
   ========================================================= */

const phoneInput =
  document.getElementById(
    "phone"
  );


if (phoneInput) {

  phoneInput.addEventListener(
    "input",
    () => {

      let digits =
        phoneInput.value
          .replace(
            /\D/g,
            ""
          )
          .slice(
            0,
            10
          );


      if (digits.length >= 7) {

        phoneInput.value =
          `(${digits.slice(0,3)}) ` +
          `${digits.slice(3,6)}-` +
          `${digits.slice(6)}`;

      } else if (
        digits.length >= 4
      ) {

        phoneInput.value =
          `(${digits.slice(0,3)}) ` +
          digits.slice(3);

      } else {

        phoneInput.value =
          digits;

      }

    }
  );

}


/* =========================================================
   SMOOTH ANCHOR SCROLLING
   ========================================================= */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach(
    link => {

      link.addEventListener(
        "click",
        event => {

          const targetId =
            link.getAttribute(
              "href"
            );

          if (
            !targetId ||
            targetId === "#"
          ) {

            return;

          }

          const target =
            document.querySelector(
              targetId
            );

          if (!target) return;

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    }
  );


/* =========================================================
   HERO / CARD ANIMATION
   ========================================================= */

const animatedElements =
  document.querySelectorAll(
    ".rental-card, .package-card, .review-card, .feature-item"
  );


if (
  "IntersectionObserver"
  in window
) {

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.style.opacity =
                "1";

              entry.target.style.transform =
                "translateY(0)";

              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold: 0.12
      }
    );


  animatedElements.forEach(
    element => {

      element.style.opacity =
        "0";

      element.style.transform =
        "translateY(20px)";

      element.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

      observer.observe(
        element
      );

    }
  );

}


/* =========================================================
   END
   ========================================================= */
