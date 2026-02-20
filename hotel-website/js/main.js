// Buildora Hotel interactions
const body = document.body;
const loader = document.getElementById("page-loader");
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const bookingForm = document.getElementById("booking-form");
const bookingPopup = document.getElementById("booking-popup");
const closePopup = document.getElementById("close-popup");
const contactForm = document.getElementById("contact-form");
const contactSuccess = document.getElementById("contact-success");
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxClose = lightbox.querySelector(".lightbox-close");
const revealItems = document.querySelectorAll(".reveal");
const parallaxHero = document.querySelector("[data-parallax]");

// Page load animation
body.classList.add("loading");
window.addEventListener("load", () => {
  loader.classList.add("hidden");
  body.classList.remove("loading");
});

// Sticky navbar style
window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Subtle parallax effect for hero background
  if (parallaxHero) {
    const offset = window.scrollY * 0.3;
    parallaxHero.style.backgroundPosition = `center ${offset}px`;
  }
});

// Mobile navigation toggle
navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("active");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Booking popup
bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  bookingPopup.classList.add("active");
});

closePopup.addEventListener("click", () => {
  bookingPopup.classList.remove("active");
});

bookingPopup.addEventListener("click", (event) => {
  if (event.target === bookingPopup) {
    bookingPopup.classList.remove("active");
  }
});

// Contact form success message
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  contactSuccess.textContent = "Thank you! Your inquiry has been received.";
  contactForm.reset();
});

// Gallery lightbox
const openLightbox = (src, alt) => {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
};

const closeLightbox = () => {
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
};

galleryItems.forEach((item) => {
  item.addEventListener("click", () => openLightbox(item.src, item.alt));
});

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

// Testimonials slider
const slider = document.querySelector("[data-slider]");
if (slider) {
  const slides = slider.querySelector(".slides");
  const prev = slider.querySelector("[data-prev]");
  const next = slider.querySelector("[data-next]");
  let index = 0;

  const updateSlider = () => {
    slides.scrollTo({
      left: slides.clientWidth * index,
      behavior: "smooth",
    });
  };

  next.addEventListener("click", () => {
    index = (index + 1) % slides.children.length;
    updateSlider();
  });

  prev.addEventListener("click", () => {
    index = (index - 1 + slides.children.length) % slides.children.length;
    updateSlider();
  });

  setInterval(() => {
    index = (index + 1) % slides.children.length;
    updateSlider();
  }, 7000);
}

// Reveal on scroll
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => revealObserver.observe(item));
