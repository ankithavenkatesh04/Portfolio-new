const content = document.querySelector(".cs-content");
const sections = document.querySelectorAll(".cs-section");
const sidebarLinks = document.querySelectorAll(".cs-sidebar a");

function updateActiveLink() {
  let currentSection = "";

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const offset = 200;

    if (rect.top <= offset && rect.bottom >= offset) {
      currentSection = section.id;
    }
  });

  sidebarLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
      keepChipVisible(link);
    }
  });
}

// Mobile only: the sidebar is a horizontally scrolling chip bar, so keep
// the active chip centred in view. No effect on desktop.
const chipBar = document.querySelector(".cs-sidebar ul");
const mobileBar = window.matchMedia("(max-width: 768px)");

function keepChipVisible(link) {
  if (!mobileBar.matches || !chipBar) return;
  const target = link.offsetLeft - (chipBar.clientWidth - link.offsetWidth) / 2;
  chipBar.scrollTo({ left: target, behavior: "smooth" });
}

// Desktop: the content panel scrolls
content.addEventListener("scroll", updateActiveLink);

// Tablet / mobile: the page itself scrolls (content panel no longer does)
window.addEventListener("scroll", updateActiveLink, { passive: true });