document.addEventListener("DOMContentLoaded", () => {
  // 1. Smooth scrolling for nav & footer links
  const links = document.querySelectorAll(".category-nav a, .footer-links a");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId && targetId.startsWith("#")) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // 2. Interactive hover effect for service cards
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

  // 3. Add to Cart functionality
  const cart = [];
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const btn = e.target;
      const card = btn.closest(".food-card");

      // Extract item details directly from the food card elements
      const name = card.querySelector("h3") ? card.querySelector("h3").textContent.trim() : "Item";
      const priceElement = card.querySelector(".food-price");
      const priceText = priceElement ? priceElement.textContent : "0";
      const price = parseFloat(priceText.replace(/[^0-9.]/g, "")) || 0;

      const item = { name, price };

      addToCart(item);
      animateButton(btn);
    });
  });

  function addToCart(item) {
    const existingItem = cart.find((cartItem) => cartItem.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    console.log("Cart contents:", cart);
  }

  function animateButton(button) {
    const originalText = button.textContent;
    button.textContent = "Added! ✓";
    button.style.backgroundColor = "#2e7d32";

    setTimeout(() => {
      button.textContent = originalText;
      button.style.backgroundColor = "";
    }, 1200);
  }
});