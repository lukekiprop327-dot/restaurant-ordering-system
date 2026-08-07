document.addEventListener("DOMContentLoaded", () => {
  const cart = [];

  // Smooth Scrolling Navigation
  const navLinks = document.querySelectorAll(".category-nav a");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const navHeight = document.querySelector(".category-nav").offsetHeight;
        const sectionTop = targetSection.offsetTop - navHeight - 10;

        window.scrollTo({
          top: sectionTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Add to Cart Functionality & Feedback Animation
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const btn = e.target;

      const item = {
        id: btn.getAttribute("data-id"),
        name: btn.getAttribute("data-name"),
        price: parseFloat(btn.getAttribute("data-price")),
        category: btn.getAttribute("data-category"),
      };

      addToCart(item);
      animateButton(btn);
    });
  });

  function addToCart(item) {
    const existingIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
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