// ── Scroll animations ─────────────────────────────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 80);
      }
    });
  },
  { threshold: 0.1 },
);

document
  .querySelectorAll(".win-card, .exp-item")
  .forEach((el) => observer.observe(el));

// ── Copy Link Button ─────────────────────────────────
const copyBtn = document.getElementById("copyBtn");

if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        const original = copyBtn.textContent;
        copyBtn.textContent = "✅ Kopiert!";
        copyBtn.disabled = true;
        setTimeout(() => {
          copyBtn.textContent = original;
          copyBtn.disabled = false;
        }, 2000);
      })
      .catch(() => {
        // Fallback for older browsers
        const input = document.createElement("input");
        input.value = window.location.href;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
        copyBtn.textContent = "✅ Kopiert!";
        setTimeout(() => (copyBtn.textContent = "📋 Link kopieren"), 2000);
      });
  });
}

// ── Click Counters ────────────────────────────────────
const STORAGE_KEY = "lom_link_clicks";

function loadCounts() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveCounts(counts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(counts));
  } catch {}
}

function updateCounterDisplay(id, count) {
  document.querySelectorAll(`.counter[data-id="${id}"]`).forEach((el) => {
    el.textContent = count;
  });
}

// Init all counters from storage
const counts = loadCounts();
document.querySelectorAll(".counter[data-id]").forEach((el) => {
  const id = el.dataset.id;
  el.textContent = counts[id] || 0;
});

// Track clicks on links
document.querySelectorAll(".link[data-id]").forEach((link) => {
  link.addEventListener("click", () => {
    const id = link.dataset.id;
    const current = loadCounts();
    current[id] = (current[id] || 0) + 1;
    saveCounts(current);
    updateCounterDisplay(id, current[id]);
  });
});
