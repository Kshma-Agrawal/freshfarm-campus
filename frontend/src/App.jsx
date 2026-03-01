import { Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'

// Auth
import { SplashPage, SelectRolePage, LoginPage, ForgotPasswordPage, OTPPage, CreateAccountPage } from './pages/AuthPages'

// Location
import { EnableLocationPage, DetectingLocationPage, LocationConfirmPage, ManualLocationPage } from './pages/LocationPages'

// Browse
import { HomePage, SearchPage, BrowseProducePage, BrowseFarmersPage } from './pages/BrowsePages'

// Products & Farmers
import { FarmerProfilePage, ProductDetailPage } from './pages/ProductPages'

// Checkout
import { CartPage, AddressPage, CheckoutPage, PaymentPage, OrderConfirmPage } from './pages/CheckoutPages'

// Profile & Orders
import {
  ProfilePage, EditProfilePage, SavedAddressesPage,
  OrdersPage, OrderDetailPage, OrderTrackingPage, RateExperiencePage,
  CouponsPage, NotificationsPage
} from './pages/ProfilePages'

export default function App() {
  return (
    <CartProvider>
      <div className="app-shell">
        <Routes>
          {/* Auth */}
          <Route path="/splash" element={<SplashPage />} />
          <Route path="/select-role" element={<SelectRolePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/otp" element={<OTPPage />} />
          <Route path="/create-account" element={<CreateAccountPage />} />

          {/* Location */}
          <Route path="/enable-location" element={<EnableLocationPage />} />
          <Route path="/detecting-location" element={<DetectingLocationPage />} />
          <Route path="/location-confirm" element={<LocationConfirmPage />} />
          <Route path="/manual-location" element={<ManualLocationPage />} />
          <Route path="/location" element={<ManualLocationPage />} />

          {/* Main App */}
          <Route path="/" element={<Navigate to="/splash" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/browse" element={<BrowseProducePage />} />
          <Route path="/farmers" element={<BrowseFarmersPage />} />
          <Route path="/farmer/:id" element={<FarmerProfilePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />

          {/* Cart & Checkout */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/address" element={<AddressPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order-confirm" element={<OrderConfirmPage />} />

          {/* Profile */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/saved-addresses" element={<SavedAddressesPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/order/:id" element={<OrderDetailPage />} />
          <Route path="/order-tracking" element={<OrderTrackingPage />} />
          <Route path="/rate/:id" element={<RateExperiencePage />} />
          <Route path="/coupons" element={<CouponsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/splash" replace />} />
        </Routes>
      </div>
    </CartProvider>
  )
}
