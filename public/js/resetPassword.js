const form = document.getElementById("resetPasswordForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const dataObj = {};
    data.forEach((value, key) => (dataObj[key] = value));
    fetch("/api/users/reset-password", {
        method: "PUT",
        body: JSON.stringify(dataObj),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (response.status === 200) {
                window.location.replace("/login");
            }
        });
});