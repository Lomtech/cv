// ── Smooth scroll for in-page anchors ────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ── Fade-in on scroll ─────────────────────────────────────────────────────
const SELECTORS = ".exp-entry, .edu-entry, .sidebar-block";

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -32px 0px" },
);

document.querySelectorAll(SELECTORS).forEach((el, i) => {
  // Elements already in view on load get no delay
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
    el.style.transition = "none";
  } else {
    el.style.opacity = "0";
    el.style.transform = "translateY(14px)";
    el.style.transition = `opacity 0.45s ease ${i * 0.05}s, transform 0.45s ease ${i * 0.05}s`;
    observer.observe(el);
  }
});
