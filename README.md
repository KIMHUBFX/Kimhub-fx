# KIMHUBFX — Fullstack Trading Platform (Deriv OAuth Integrated)

KIMHUBFX is a fullstack trading dashboard that integrates directly with **Deriv OAuth**, allowing users to log in using their Deriv account and access tools such as:

- Dashboard  
- Bot Builder  
- Free Bots  
- Analysis Tools  
- DP Tool  
- DTrader Launch  
- Social Channels Menu  

The UI is designed to match the custom layout provided by the platform owner, with two menu bars and full mobile responsiveness.


---

## 📌 Features

### ✅ **Frontend**
- Custom UI/UX as provided (two bars, horizontal scroll on small screens).
- Full mobile & desktop responsive design.
- Clean static pages:
  - `index.html`
  - `login.html`
  - `signup.html`
  - `dashboard.html`
- Automatic login detection using localStorage.

### ✅ **Backend**
- Node.js + Express server
- `/api/auth/deriv-callback` — Handles Deriv OAuth response
- JWT token generation
- User data storage (optional future database)
- Middleware-ready structure

### ✅ **Authentication Flow (Deriv OAuth)**
1. User clicks **Login with Deriv**.
2. Redirects to  
   `https://oauth.deriv.com/oauth2/authorize?app_id=XXXX&redirect_uri=YOUR_SITE/login.html`
3. Deriv returns:
   - `token1`
   - `acct1`
   - `landing_company`
   - etc.
4. Frontend sends these tokens to backend: