// SECTION 5: ABOUT US, SERVICES, & FOOTER INTERACTIVITY

document.addEventListener("DOMContentLoaded", () => {
  // 1. Smooth scrolling for footer links
  const footerLinks = document.querySelectorAll(".footer-links a");

  footerLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId.startsWith("#")) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // 2. Simple interactive hover effect for service cards
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)";
      card.style.transition = "transform 0.3s ease";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });
});