document.addEventListener("DOMContentLoaded", () => {
    const changeRoleButtons = document.querySelectorAll(".change-rol-btn");
    const deleteUserButtons = document.querySelectorAll(".delete-user-btn");

    changeRoleButtons.forEach(button => {
        button.addEventListener("click", async (event) => {
            const userId = event.target.dataset.id;
            try {
                const response = await fetch(`/api/users/premium/${userId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ newRole: "newRoleValue" }) // Cambia newRoleValue por el rol deseado
                });
                const result = await response.json();
                if (response.ok) {
                    alert("User role updated successfully");
                    location.reload();
                } else {
                    alert("Failed to update user role");
                }
            } catch (error) {
                console.error("Error updating user role:", error);
                alert("Error updating user role");
            }
        });
    });

    deleteUserButtons.forEach(button => {
        button.addEventListener("click", async (event) => {
            const userId = event.target.dataset.id;
            try {
                const response = await fetch(`/api/users/${userId}`, {
                    method: "DELETE",
                });
                const result = await response.json();
                if (response.ok) {
                    alert(`User deleted successfully`);
                    location.reload();
                } else {
                    alert(`Failed to delete user: ${result.message}`);
                }
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("Error deleting user");
            }
        });
    });
});
