# 🌿 FarmFresh — Farmer App

Mobile-first React app for the FarmFresh farmer side. Built with React 18 + Vite + React Router DOM v6 + Phosphor Icons.

---

## Quick Start

```bash
npm install
npm run dev
```

Then open [http://localhost:5173/farmer/splash](http://localhost:5173/farmer/splash)

---

## Project Structure

```
farmfresh-farmer/
├── index.html
├── vite.config.js
├── package.json
├── src/
│   ├── main.jsx          # Entry point
│   ├── App.jsx           # Root wrapper
│   ├── index.css         # Global design tokens + shared classes
│   └── pages/
│       ├── FarmerApp.jsx              # All routes (React Router)
│       ├── FarmerAuthPages.jsx        # Splash, Language, Role, Login, OTP, Sign Up
│       ├── FarmerOnboardingPages.jsx  # Setup steps + FarmerBottomNav
│       ├── FarmerVerificationPages.jsx
│       ├── FarmerDashboardPages.jsx   # Home, Notifications, Help
│       ├── FarmerInventoryPages.jsx   # Farm tab — produce management
│       ├── FarmerOrderPages.jsx       # Orders tab — all order states
│       ├── FarmerResourcesPages.jsx   # Marketplace, cart, purchases
│       ├── FarmerCounsellingPages.jsx # Demand insights, crop planning, schemes
│       └── FarmerProfilePages.jsx     # Profile, settings, earnings
```

---

## Routes

| Path | Screen |
|------|--------|
| `/farmer/splash` | Splash screen |
| `/farmer/select-language` | Language picker |
| `/farmer/select-role` | Consumer / Farmer role select |
| `/farmer/login` | Phone login |
| `/farmer/otp` | OTP verification |
| `/farmer/create-account` | Sign up form |
| `/farmer/dashboard` | Onboarding (before setup) |
| `/farmer/add-farm` | Add farm details |
| `/farmer/documents` | Document upload |
| `/farmer/payment-setup` | Bank / UPI setup |
| `/farmer/verification-submitted` | Submitted confirmation |
| `/farmer/home-pending` | Awaiting verification |
| `/farmer/verification-pending` | Verification status detail |
| `/farmer/account-verified` | Verified success |
| `/farmer/home` | Main dashboard |
| `/farmer/farm` | Inventory list |
| `/farmer/add-produce` | Add new produce |
| `/farmer/produce/:id` | Produce detail |
| `/farmer/edit-produce/:id` | Edit produce |
| `/farmer/orders` | Orders list |
| `/farmer/order/:id` | Order detail (new) |
| `/farmer/order/:id/preparing` | Preparing state |
| `/farmer/order/:id/ready` | Ready for pickup |
| `/farmer/order/:id/delivery` | Out for delivery |
| `/farmer/order/:id/cancelled` | Cancelled |
| `/farmer/order/:id/completed` | Completed |
| `/farmer/resources` | Resources hub |
| `/farmer/marketplace` | Material marketplace |
| `/farmer/my-listings` | My listed materials |
| `/farmer/farm-cart` | Cart |
| `/farmer/farm-checkout` | Checkout |
| `/farmer/my-purchases` | Purchase history |
| `/farmer/counselling` | Counselling hub |
| `/farmer/demand-insights` | Market demand data |
| `/farmer/crop-planning` | Crop plans |
| `/farmer/best-practices` | Articles |
| `/farmer/govt-schemes` | Government schemes |
| `/farmer/profile` | Profile menu |
| `/farmer/farm-details` | View farm details |
| `/farmer/payment-details` | View payment details |
| `/farmer/settings` | App settings |
| `/farmer/earnings` | Earnings dashboard |
| `/farmer/transactions` | Transaction history |
| `/farmer/transaction/:id` | Transaction detail |

---

## Design System

All tokens are in `src/index.css`. Key variables:

```css
--green-main:  #2d5a27   /* primary brand green */
--green-light: #eaf2e8   /* tinted backgrounds  */
--red:         #e53935   /* destructive actions */
--radius-lg:   22px      /* card border radius  */
--font:        'Noto Sans', sans-serif
```

## Tech Stack

- **React 18** + **Vite 5**
- **React Router DOM v6** (client-side routing)
- **Phosphor Icons** (`@phosphor-icons/react`)
- Plain CSS with CSS custom properties (no Tailwind, no CSS modules)
- Mobile-first, max-width 430px
