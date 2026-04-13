// ── Smooth scroll for any in-page anchor ──────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ── Fade-in entries on scroll ─────────────────────────────────────────────
const observerOptions = {
  threshold: 0.12,
  rootMargin: "0px 0px -40px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document
  .querySelectorAll(".exp-entry, .edu-entry, .sidebar-block")
  .forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = `opacity 0.45s ease ${i * 0.06}s, transform 0.45s ease ${i * 0.06}s`;
    observer.observe(el);
  });

// Add .visible class handler via CSS would be cleaner,
// but since we apply inline transitions we toggle directly:
document.addEventListener("DOMContentLoaded", () => {
  // Trigger observer check on load for elements already in view
  document
    .querySelectorAll(".exp-entry, .edu-entry, .sidebar-block")
    .forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }
    });
});

// Restore opacity/transform on IntersectionObserver callback
const restoreEl = (el) => {
  el.style.opacity = "1";
  el.style.transform = "translateY(0)";
};

// Patch observer to call restoreEl
const patchedObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      restoreEl(entry.target);
      patchedObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document
  .querySelectorAll(".exp-entry, .edu-entry, .sidebar-block")
  .forEach((el) => {
    patchedObserver.observe(el);
  });
