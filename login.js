const BACKEND_URL = "http://localhost:5000"; // Update with your deployed backend

const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        redirectToDerivLogin();
    });
});

function redirectToDerivLogin() {
    const app_id = 112604; // Your Deriv app ID
    const redirect_uri = window.location.origin + "/login.html";
    const referral = "https://deriv.partners/rx?ca=kimhuhfx.com&utm_campaign=dynamicworks&utm_medium=affiliate&utm_source=CU154142";

    const oauthUrl = `https://oauth.deriv.com/oauth2/authorize?app_id=${app_id}&redirect_uri=${redirect_uri}&ref=${encodeURIComponent(referral)}`;
    window.location.href = oauthUrl;
}

window.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("token1") || urlParams.has("token")) {
        handleDerivCallback(urlParams);
    }
});

async function handleDerivCallback(params) {
    const callbackParams = {};
    params.forEach((value, key) => callbackParams[key] = value);

    try {
        const response = await fetch(`${BACKEND_URL}/api/auth/deriv-callback`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ callbackParams, referral: "kimhuhfx.com" })
        });
        const data = await response.json();
        if (data.error) {
            document.getElementById("response").textContent = data.error;
            return;
        }
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("deriv_account", data.deriv.account);
        window.location.href = "index.html";
    } catch (err) {
        console.error(err);
        document.getElementById("response").textContent = "Login failed. Please try again.";
    }
}