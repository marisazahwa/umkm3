// Menu navigasi di HP
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
});

// Tutup menu setelah salah satu link diklik
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Buka menu");
  });
});

// Panah geser testimoni
const track = document.getElementById("testi-track");
const prev = document.getElementById("testi-prev");
const next = document.getElementById("testi-next");

function slide(direction) {
  const card = track.querySelector(".testi-card");
  if (!card) return;
  const step = card.getBoundingClientRect().width + 20;
  track.scrollBy({ left: direction * step, behavior: "smooth" });
}

prev.addEventListener("click", () => slide(-1));
next.addEventListener("click", () => slide(1));

// Tandai menu yang sedang dilihat
const links = [...navMenu.querySelectorAll("a")];
const sections = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id);
      });
    });
  },
  { rootMargin: "-40% 0px -55% 0px" },
);

sections.forEach((section) => observer.observe(section));
