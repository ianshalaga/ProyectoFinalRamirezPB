const form = document.getElementById("newPasswordForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const dataObj = {};
    data.forEach((value, key) => (dataObj[key] = value));
    // const queryString = new URLSearchParams(dataObj).toString();
    // console.log(queryString)
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    console.log(token)
    fetch(`/api/users/create-new-password?token=${token}`, {
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