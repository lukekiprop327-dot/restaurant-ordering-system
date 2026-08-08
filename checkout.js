// checkout Modal & Order Processing Logic

document.addEventListener("DOMContentLoaded", () => {
    const checkoutBtn = document.getElementById("checkout-btn"); 
    const modal = document.getElementById("checkout-modal");
    const closeModalBtn = document.getElementById("close-modal");
    const checkoutForm = document.getElementById("checkout-form");

    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            if (modal) {
                modal.style.display = "flex";
            }
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            if (modal) {
                modal.style.display = "none";
            }
        });
    }

    if (checkoutForm) {
        checkoutForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("cust-name").value.trim();
            const phone = document.getElementById("cust-phone").value.trim();
            const address = document.getElementById("cust-address").value.trim();

            if (!name || !phone || !address) {
                alert("Please fill in all delivery details.");
                return;
            }

            alert(`Thank you for your order, ${name}! Your food is being prepared and will be delivered to ${address}.`);
            
            checkoutForm.reset();
            if (modal) {
                modal.style.display = "none";
            }
        });
    }
});