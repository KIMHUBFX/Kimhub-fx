/* ============================================
   GLOBAL BACKEND URL
============================================ */
const BACKEND_URL = "http://localhost:5000"; // Replace with your deployed backend URL


/* ============================================
   1. LOGIN BUTTON
============================================ */
const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        redirectToDerivLogin();
    });
}

/* Redirect user to Deriv OAuth login page */
function redirectToDerivLogin() {
    const app_id = 112604; // Your Deriv app ID
    const redirect_uri = window.location.origin + "/login.html";

    const oauthUrl =
        `https://oauth.deriv.com/oauth2/authorize?app_id=${app_id}&redirect_uri=${redirect_uri}`;

    window.location.href = oauthUrl;
}


/* ============================================
   2. HANDLE DERIV CALLBACK TOKENS
============================================ */
window.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has("token1") || urlParams.has("token")) {
        handleDerivCallback(urlParams);
    }
});

async function handleDerivCallback(params) {
    const callbackParams = {};

    params.forEach((value, key) => {
        callbackParams[key] = value;
    });

    try {
        const response = await fetch(`${BACKEND_URL}/api/auth/deriv-callback`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ callbackParams })
        });

        const data = await response.json();

        if (data.error) {
            document.getElementById("response").textContent = data.error;
            return;
        }

        // Save login info locally
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("deriv_account", data.deriv.account);

        // Redirect to dashboard/index
        window.location.href = "index.html";
    } catch (err) {
        console.error(err);
        document.getElementById("response").textContent = "Login failed. Please try again.";
    }
}


/* ============================================
   3. AUTO DISPLAY LOGGED-IN USER
============================================ */
if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
    window.addEventListener("DOMContentLoaded", () => {
        const username = localStorage.getItem("username");
        const loginBtn = document.getElementById("loginBtn");
        const signupBtn = document.getElementById("signupBtn");

        if (username && loginBtn && signupBtn) {
            loginBtn.style.display = "none";
            signupBtn.style.display = "none";

            const right = document.querySelector(".topbar .right");
            right.innerHTML = `<span style="font-weight:bold;">Hi, ${username}</span>`;
        }
    });
}


/* ============================================
   4. LOGOUT FUNCTION (Optional)
============================================ */
function logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    localStorage.removeItem("deriv_account");
    window.location.href = "index.html";
}