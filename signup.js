/* ============================================
   GLOBAL BACKEND URL
============================================ */
const BACKEND_URL = "http://localhost:5000"; // Replace with your deployed backend URL

/* ============================================
   1. PREFILL REFERRAL LINK
============================================ */
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const referral = urlParams.get("ref") || "https://deriv.partners/rx?ca=kimhuhfx.com&utm_campaign=dynamicworks&utm_medium=affiliate&utm_source=CU154142";

    const signupBtn = document.getElementById("signupBtn");
    const signupForm = document.getElementById("signupForm");

    /* If using a direct button link */
    if (signupBtn) {
        signupBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = referral;
        });
    }

    /* If using a form submission */
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = signupForm.email?.value;
            const password = signupForm.password?.value;

            if (!email || !password) {
                alert("Please fill in all required fields.");
                return;
            }

            // Redirect user to Deriv signup page with referral
            window.location.href = referral;
        });
    }
});

/* ============================================
   2. OPTIONAL: Display logged-in user
============================================ */
if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
    window.addEventListener("DOMContentLoaded", () => {
        const username = localStorage.getItem("username");
        if (username) {
            const right = document.querySelector(".topbar .right");
            if (right) {
                right.innerHTML = `<span style="font-weight:bold;">Hi, ${username}</span> <button onclick="logout()">Logout</button>`;
            }
        }
    });
}

/* ============================================
   3. LOGOUT FUNCTION
============================================ */
function logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    localStorage.removeItem("deriv_account");
    window.location.href = "index.html";
}