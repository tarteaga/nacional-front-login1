/*
http://localhost:1337/api/users/me
*/
import { isTokenExpired } from './token.js';

const btLogout = document.getElementById("btLogout")

checkToken()

btLogout.addEventListener("click", () => {
    localStorage.removeItem("token")
    window.location.href = "login.html"
})

async function sendData() {
    try {
        const token = localStorage.getItem("token")
        const response = await fetch('http://localhost:1337/api/users/me', {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (!response.ok) {

            if (response.status == 401) {
                localStorage.removeItem("token")
                window.location.href = "login.html"
            } else {
                const message = `Error: ${response.status}`;
                throw new Error(message);
            }
        }

        const data = await response.json();
        console.log(data);

        showUserData(data)

    } catch (error) {
        console.log(error)
    }
}

function showUserData(data) {
    const welcome = document.getElementById("welcome")
    welcome.textContent = `Bienvenido ${data.name} ${data.surname}`
}

sendData()

function checkToken() {
    if (isTokenExpired()) {
        localStorage.removeItem("token")
        window.location.href = "login.html"
    }
}
