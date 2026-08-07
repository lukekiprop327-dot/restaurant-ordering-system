document.addEventListener("DOMContentLoaded", () => {
  let cart = [];

  
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  const cartCountElement = document.getElementById("cart-count");
  const checkoutBtn = document.getElementById("checkout-btn");


  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const btn = e.target;
      const item = {
        id: btn.getAttribute("data-id"),
        name: btn.getAttribute("data-name"),
        price: parseFloat(btn.getAttribute("data-price")),
      };
      addItemToCart(item);
      animateButton(btn);
    });
  });

  
  function addItemToCart(item) {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    renderCartUI();
  }

  
  window.changeQuantity = function (id, delta) {
    const item = cart.find((cartItem) => cartItem.id === id);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        removeItem(id);
        return;
      }
    }
    renderCartUI();
  };

  
  window.removeItem = function (id) {
    cart = cart.filter((cartItem) => cartItem.id !== id);
    renderCartUI();
  };

  
  function renderCartUI() {
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = "";
    let total = 0;
    let itemCount = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML =
        '<li style="color: #888; font-size: 0.9rem;">Your cart is empty.</li>';
      if (checkoutBtn) checkoutBtn.disabled = true;
    } else {
      if (checkoutBtn) checkoutBtn.disabled = false;

      cart.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        itemCount += item.quantity;

        const li = document.createElement("li");
        li.className = "cart-item";
        li.style.cssText =
          "display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #eee;";
        li.innerHTML = `
          <div class="cart-item-info">
            <strong>${item.name}</strong><br>
            <span>KSh ${item.price} x ${item.quantity}</span>
          </div>
          <div class="cart-controls">
            <button class="qty-btn" onclick="changeQuantity('${item.id}', -1)">-</button>
            <button class="qty-btn" onclick="changeQuantity('${item.id}', 1)">+</button>
            <button class="remove-btn" onclick="removeItem('${item.id}')" style="color: red; border: none; background: none; cursor: pointer; margin-left: 8px;">✕</button>
          </div>
        `;
        cartItemsContainer.appendChild(li);
      });
    }

    if (cartTotalElement) cartTotalElement.textContent = `KSh ${total.toLocaleString()}`;
    if (cartCountElement) cartCountElement.textContent = itemCount;
  }

  
  function animateButton(button) {
    const originalText = button.textContent;
    button.textContent = "Added! ";
    button.style.backgroundColor = "#2e7d32";

    setTimeout(() => {
      button.textContent = originalText;
      button.style.backgroundColor = "";
    }, 1000);
  }

  
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      alert(`Order submitted successfully! Total: ${cartTotalElement.textContent}`);
      cart = [];
      renderCartUI();
    });
  }
});
