# 🌿 Fresh Farm Campus

A fully responsive React web app for Farm Fresh Campus — connecting local farmers directly to consumers.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

## 🏗️ Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── App.jsx                  # All routes
├── main.jsx                 # Entry point
├── index.css                # Global styles
├── assets/                  # assets used
    └── images.png            
├── context/
│   └── CartContext.jsx      # Cart state (React Context)
├── data/
│   └── index.js             # Products, farmers, orders data
├── components/
│   └── UI.jsx               # Shared components (Icon, TopNav, BottomNav, etc.)
└── pages/
    ├── AuthPages.jsx         # Splash, SelectRole, Login, ForgotPassword, OTP, CreateAccount
    ├── LocationPages.jsx     # EnableLocation, Detecting, Confirm, Manual
    ├── BrowsePages.jsx       # Home, Search, BrowseProduce, BrowseFarmers
    ├── ProductPages.jsx      # FarmerProfile, ProductDetail
    ├── CheckoutPages.jsx     # Cart, Address, Checkout, Payment, OrderConfirm
    └── ProfilePages.jsx      # Profile, EditProfile, Orders, Tracking, Rate, etc.
```

## 🛠️ Tech Stack

- **React 18** with hooks
- **React Router v6** for client-side routing
- **Vite** for fast development & builds
- **Context API** for cart state management
- **CSS Variables** for theming

## 📱 Screens

- Splash → Select Role → Login → Forgot Password → OTP → Create Account
- Enable Location → Detecting → Confirm → Manual Entry
- Home → Browse Produce → Browse Farmers → Farmer Profile → Product Detail
- Cart → Address → Checkout → Payment → Order Confirmation
- Profile → Edit Profile → Saved Addresses → Orders → Tracking → Rate Experience
- Coupons, Notifications

