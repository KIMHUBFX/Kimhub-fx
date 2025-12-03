/* ============================================
   GLOBAL BACKEND URL
============================================ */
const BACKEND_URL = "http://localhost:5000"; // Replace with deployed backend URL

/* ============================================
   LOGIN BUTTON
============================================ */
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      redirectToDerivLogin();
    });
  }

  // Check for Deriv callback tokens in URL
  handleDerivCallbackFromURL();
});

/* Redirect user to Deriv OAuth login page */
function redirectToDerivLogin() {
  const app_id = 112604; // Your Deriv App ID
  const redirect_uri = window.location.origin + "/login.html";
  const referral = "https://deriv.partners/rx?ca=kimhuhfx.com&utm_campaign=dynamicworks&utm_medium=affiliate&utm_source=CU154142";

  const oauthUrl = `https://oauth.deriv.com/oauth2/authorize?app_id=${app_id}&redirect_uri=${redirect_uri}&ref=${encodeURIComponent(referral)}`;
  window.location.href = oauthUrl;
}

/* ============================================
   HANDLE DERIV CALLBACK TOKENS
============================================ */
async function handleDerivCallbackFromURL() {
  const urlParams = new URLSearchParams(window.location.search);

  if (!urlParams.has("token1") && !urlParams.has("token")) return;

  const callbackParams = {};
  urlParams.forEach((value, key) => {
    callbackParams[key] = value;
  });

  try {
    const response = await fetch(`${BACKEND_URL}/api/auth/deriv-callback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ callbackParams, referral: "kimhuhfx.com" })
    });

    const data = await response.json();

    if (data.error) {
      const respElem = document.getElementById("response");
      if (respElem) respElem.textContent = data.error;
      return;
    }

    // Store user info locally
    localStorage.setItem("jwt", data.token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("deriv_account", data.deriv.account);

    // Redirect to dashboard
    window.location.href = "dashboard.html";
  } catch (err) {
    console.error(err);
    const respElem = document.getElementById("response");
    if (respElem) respElem.textContent = "Login failed. Please try again.";
  }
}

/* ============================================
   AUTO DISPLAY LOGGED-IN USER
============================================ */
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.endsWith("dashboard.html")) {
    const username = localStorage.getItem("username");
    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");
    const authContainer = document.getElementById("authContainer");

    if (username && authContainer) {
      authContainer.innerHTML = `<span style="font-weight:bold;">Hi, ${username} <button onclick="logout()">Logout</button></span>`;
      if (loginBtn) loginBtn.style.display = "none";
      if (signupBtn) signupBtn.style.display = "none";
    }
  }
});

/* ============================================
   LOGOUT FUNCTION
============================================ */
function logout() {
  localStorage.removeItem("jwt");
  localStorage.removeItem("username");
  localStorage.removeItem("deriv_account");
  window.location.href = "login.html";
}