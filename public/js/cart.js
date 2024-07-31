document.addEventListener('DOMContentLoaded', () => {
    const purchaseBtn = document.getElementById('purchaseBtn');

    purchaseBtn.addEventListener('click', async () => {
        const cartId = purchaseBtn.getAttribute("cart-id");
        try {
            const response = await fetch(`/api/carts/${cartId}/purchase`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                window.location.reload();
            } else {
                const result = await response.json();
                console.error('Purchase failed:', result);
                alert('Purchase failed: ' + result.message);
            }
        } catch (error) {
            console.error('Error during purchase:', error);
            alert('Error during purchase. Please try again.');
        }
    });
});
