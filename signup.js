// Toggle channel dropdown
document.getElementById("menuBtn").onclick = () => {
    const menu = document.getElementById("channelMenu");
    menu.classList.toggle("hidden");
};

// Auto-apply your referral link
const REFERRAL_URL =
    "https://deriv.com/signup/?referrer=kimhubfx&partner=CR154142&ref=https://deriv.partners/rx?ca=kimhuhfx.com&utm_campaign=dynamicworks&utm_medium=affiliate&utm_source=CU154142";

// Handle signup click
document.getElementById("signupDerivBtn").onclick = () => {
    let status = document.getElementById("signupStatus");
    status.style.color = "green";
    status.textContent = "Redirecting to Deriv signup...";

    setTimeout(() => {
        window.location.href = REFERRAL_URL;
    }, 700);
};