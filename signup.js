document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const referral = urlParams.get("ref") || "https://deriv.partners/rx?ca=kimhuhfx.com&utm_campaign=dynamicworks&utm_medium=affiliate&utm_source=CU154142";

    const signupBtn = document.getElementById("signupBtn");
    const signupForm = document.getElementById("signupForm");

    if (signupBtn) {
        signupBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = referral;
        });
    }

    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = signupForm.email?.value;
            const password = signupForm.password?.value;
            if (!email || !password) { alert("Please fill in all required fields."); return; }
            window.location.href = referral;
        });
    }
});