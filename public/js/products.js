document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", async () => {
            const productId = button.getAttribute("data-product-id");
            const cartId = button.getAttribute("data-cart-id");

            const url = `/api/carts/${cartId}/product/${productId}`;

            try {
                const response = await fetch(url, {
                    method: "POST",
                });

                if (response.ok) {
                    alert("Product added to cart successfully!");
                } else {
                    alert("Failed to add product to cart.");
                }
            } catch (error) {
                console.error("Error adding product to cart:", error);
                alert("An error occurred while adding the product to the cart.");
            }
        });
    });

    // Manejador del formulario de logout
    const logoutForm = document.getElementById("logoutForm");
    if (logoutForm) {
        logoutForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            try {
                const response = await fetch("/api/sessions/logout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    window.location.replace("/login");
                } else {
                    alert("Failed to log out.");
                }
            } catch (error) {
                console.error("Error logging out:", error);
                alert("An error occurred while logging out.");
            }
        });
    }
});
