document.addEventListener("DOMContentLoaded", () => {
    const addToCartButton = document.querySelector(".add-to-cart-btn");

    if (addToCartButton) {
        addToCartButton.addEventListener("click", async () => {
            const productId = addToCartButton.getAttribute("data-product-id");
            const cartId = addToCartButton.getAttribute("data-cart-id");
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
    }
});
