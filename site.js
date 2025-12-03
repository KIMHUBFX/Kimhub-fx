/* ============================================
   GLOBAL SETTINGS
============================================ */
const BACKEND_URL = "http://localhost:5000"; 
// Change this to your real backend when deployed


/* ============================================
   1. HANDLE MENU TOGGLE (from index.html)
============================================ */
const menuBtn = document.getElementById("menuBtn");
const channelMenu = document.getElementById("channelMenu");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        channelMenu.classList.toggle("hidden");
    });
}


/* ============================================
   2. LOGIN WITH DERIV BUTTON
============================================ */
const loginBtn = document.getElementById("loginBtn");

if (loginBtn && loginBtn.classList.contains("deriv-login")) {
    loginBtn.addEventListener("click", () => {
        redirectToDerivLogin();
    });
}

function redirectToDerivLogin() {
    const app_id = 112604;  // your Deriv app ID
    const redirect_uri = window.location.origin + "/login.html";

    const oauthUrl =
        `https://oauth.deriv.com/oauth2/authorize?app_id=${app_id}&redirect_uri=${redirect_uri}`;

    window.location.href = oauthUrl;
}


/* ============================================
   3. CHECK IF URL CONTAINS OAUTH TOKENS
============================================ */
window.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);

    // Deriv returns ?token1=xxxx&acct1=xxxxx
    if (urlParams.has("token1") || urlParams.has("token")) {
        handleDerivCallback(urlParams);
    }
});


/* ============================================
   4. HANDLE DERIV CALLBACK AND SEND TO BACKEND
============================================ */
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

        // Redirect to homepage/dashboard
        window.location.href = "index.html";
    } catch (err) {
        console.error(err);
        document.getElementById("response").textContent = "Login failed. Please try again.";
    }
}


/* ============================================
   5. SHOW USERNAME WHEN LOGGED IN
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
   6. LOGOUT FUNCTION (IF YOU ADD A LOGOUT BUTTON)
============================================ */
function logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    localStorage.removeItem("deriv_account");
    window.location.href = "index.html";
          }
