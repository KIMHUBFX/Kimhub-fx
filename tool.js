/* ============================================
   1. USER LOGIN DISPLAY
============================================ */
window.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("username");
    const rightBar = document.querySelector(".topbar .right");

    if (username && rightBar) {
        // Replace login/signup buttons with user info
        rightBar.innerHTML = `<span style="font-weight:bold;">Hi, ${username}</span>
                              <button class="auth-btn" id="logoutBtn">Logout</button>`;

        document.getElementById("logoutBtn").addEventListener("click", logout);
    }
});

/* ============================================
   2. LOGOUT FUNCTION
============================================ */
function logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    localStorage.removeItem("deriv_account");
    window.location.href = "index.html";
}

/* ============================================
   3. CHANNEL MENU TOGGLE
============================================ */
const menuBtn = document.getElementById("menuBtn");
if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        const menu = document.getElementById("channelMenu");
        menu.classList.toggle("hidden");
    });
}

/* ============================================
   4. LOAD TOOL CONTENT DYNAMICALLY
============================================ */
function loadToolContent(toolName) {
    const contentBox = document.querySelector(".content .box");
    if (!contentBox) return;

    const referral = "https://deriv.partners/rx?ca=kimhuhfx.com&utm_campaign=dynamicworks&utm_medium=affiliate&utm_source=CU154142";

    switch (toolName) {
        case "botbuilder":
            contentBox.innerHTML = `
                <h2>Bot Builder</h2>
                <p>Create and manage your trading bots here.</p>
                <a class="btn btn-primary" href="https://deriv.com/botbuilder?ref=${encodeURIComponent(referral)}" target="_blank">Launch Bot Builder</a>
            `;
            break;
        case "freebots":
            contentBox.innerHTML = `
                <h2>Free Bots</h2>
                <p>Access prebuilt bots for Deriv trading.</p>
                <a class="btn btn-primary" href="https://deriv.com/freebots?ref=${encodeURIComponent(referral)}" target="_blank">Access Free Bots</a>
            `;
            break;
        case "analysis":
            contentBox.innerHTML = `
                <h2>Analysis Tool</h2>
                <p>Analyze market trends and signals.</p>
                <a class="btn btn-primary" href="https://deriv.com/analysis?ref=${encodeURIComponent(referral)}" target="_blank">Use Analysis Tool</a>
            `;
            break;
        case "dptool":
            contentBox.innerHTML = `
                <h2>DP Tool</h2>
                <p>Dynamic Profit Tool for trading strategies.</p>
                <a class="btn btn-primary" href="https://deriv.com/dptool?ref=${encodeURIComponent(referral)}" target="_blank">Open DP Tool</a>
            `;
            break;
        case "dtrader":
            contentBox.innerHTML = `
                <h2>DTrader</h2>
                <p>Launch Deriv DTrader directly from here.</p>
                <a class="btn btn-primary" href="https://app.deriv.com/trader?ref=${encodeURIComponent(referral)}" target="_blank">Launch DTrader</a>
            `;
            break;
        default:
            contentBox.innerHTML = `
                <h2>Welcome to KIMHUBFX</h2>
                <p>Select a tool from the dashboard to start.</p>
            `;
    }
}

/* ============================================
   5. LOAD TOOL BASED ON URL PARAM
============================================ */
const urlParams = new URLSearchParams(window.location.search);
const toolParam = urlParams.get("tool");
if (toolParam) {
    loadToolContent(toolParam);
}

/* ============================================
   6. DASHBOARD LINK ACTIVE STATE
============================================ */
const dashboardLinks = document.querySelectorAll(".dashboard-bar a");
dashboardLinks.forEach(link => {
    link.addEventListener("click", () => {
        dashboardLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");

        // Load tool content dynamically if href contains ?tool=
        const url = new URL(link.href);
        const tool = url.searchParams.get("tool");
        if (tool) loadToolContent(tool);
    });
});