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

        // Attach logout handler
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
   3. DASHBOARD LINK ACTIVE STATE
============================================ */
const dashboardLinks = document.querySelectorAll(".dashboard-bar a");
dashboardLinks.forEach(link => {
    link.addEventListener("click", () => {
        dashboardLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
    });
});


/* ============================================
   4. CHANNEL MENU TOGGLE
============================================ */
const menuBtn = document.getElementById("menuBtn");
if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        const menu = document.getElementById("channelMenu");
        menu.classList.toggle("hidden");
    });
}


/* ============================================
   5. OPTIONAL: LOAD TOOL CONTENT DYNAMICALLY
   (e.g., Bot Builder, FreeBots, Analysis)
============================================ */
function loadTool(toolName) {
    const contentBox = document.querySelector(".content .box");
    if (!contentBox) return;

    switch (toolName) {
        case "botbuilder":
            contentBox.innerHTML = `
                <h2>Bot Builder</h2>
                <p>Here you can create or manage your trading bots.</p>
            `;
            break;
        case "freebots":
            contentBox.innerHTML = `
                <h2>Free Bots</h2>
                <p>Access prebuilt bots for Deriv trading.</p>
            `;
            break;
        case "analysis":
            contentBox.innerHTML = `
                <h2>Analysis Tool</h2>
                <p>Analyze market trends and signals.</p>
            `;
            break;
        case "dptool":
            contentBox.innerHTML = `
                <h2>DP Tool</h2>
                <p>Dynamic Profit Tool for trading strategies.</p>
            `;
            break;
        case "dtrader":
            contentBox.innerHTML = `
                <h2>DTrader</h2>
                <p>Launch Deriv DTrader directly from here.</p>
            `;
            break;
        default:
            contentBox.innerHTML = `
                <h2>Welcome to KIMHUBFX</h2>
                <p>Select an option above to start.</p>
            `;
    }
}

// Example: load tool from URL param
const urlParams = new URLSearchParams(window.location.search);
const toolParam = urlParams.get("tool");
if (toolParam) {
    loadTool(toolParam);
}