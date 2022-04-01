/*
http://localhost:1337/api/auth/local/register
*/
checkToken()
const form = document.getElementById('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = document.getElementById('email')
    const username = document.getElementById('username')
    username.value = email.value

    sendData(form)
})

async function sendData(form) {
    try {
        const formData = new FormData(form)
        const queryString = new URLSearchParams(formData).toString()
        const response = await fetch('http://localhost:1337/api/auth/local/register', {
            method: "POST",
            body: queryString, headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (!response.ok) {
            const message = `Error: ${response.status}`;
            throw new Error(message);
        }
        const data = await response.json();
        console.log(data);

        doLogin(data)


    } catch (error) {
        console.log(error)
    }
}

function doLogin(data) {
    localStorage.setItem("token", data.jwt)
    window.location.href = "index.html"
}

function checkToken() {
    if (!isTokenExpired()) {
        window.location.href = "index.html"
    }
}

