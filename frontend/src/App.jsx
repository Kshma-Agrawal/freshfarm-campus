import { Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'

// ── CONSUMER APP ──────────────────────────────────────────────────
import { SplashPage, SelectRolePage, LoginPage, ForgotPasswordPage, OTPPage, CreateAccountPage } from './pages/AuthPages'
import { EnableLocationPage, DetectingLocationPage, LocationConfirmPage, ManualLocationPage } from './pages/LocationPages'
import { HomePage, SearchPage, FarmersPage } from './pages/BrowsePages'
import { FarmerProfilePage, ProductDetailPage } from './pages/ProductPages'
import { CartPage, AddressPage, CheckoutPage, OrderConfirmationPage, PaymentSettingsPage } from './pages/CheckoutPages'
import { ProfilePage, EditProfilePage, SavedAddressesPage, OrdersPage, OrderDetailPage, OrderTrackingPage, RateExperiencePage, CouponsPage, NotificationsPage, ConsumerSettingsPage } from './pages/ProfilePages'

// ── FARMER APP ────────────────────────────────────────────────────
import FarmerApp from './pages/FarmerApp'

export default function App() {
  return (
    <CartProvider>
      <div className="app-shell">
        <Routes>
          {/* ── Root ── */}
          <Route path="/" element={<Navigate to="/splash" replace />} />

          {/* ── FARMER APP — must come first, catches all /farmer/* ── */}
          <Route path="/farmer/*" element={<FarmerApp />} />

          {/* ── Consumer: Auth ── */}
          <Route path="/splash" element={<SplashPage />} />
          <Route path="/select-role" element={<SelectRolePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/otp" element={<OTPPage />} />
          <Route path="/create-account" element={<CreateAccountPage />} />

          {/* ── Consumer: Location ── */}
          <Route path="/enable-location" element={<EnableLocationPage />} />
          <Route path="/detecting-location" element={<DetectingLocationPage />} />
          <Route path="/location-confirm" element={<LocationConfirmPage />} />
          <Route path="/manual-location" element={<ManualLocationPage />} />
          <Route path="/location" element={<ManualLocationPage />} />

          {/* ── Consumer: Main ── */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/farmers" element={<FarmersPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />

          {/* ── Consumer: Farmer profile (view-only, /view-farmer/:id) ── */}
          <Route path="/view-farmer/:id" element={<FarmerProfilePage />} />

          {/* ── Consumer: Cart & Checkout ── */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/address" element={<AddressPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/payment-settings" element={<PaymentSettingsPage />} />

          {/* ── Consumer: Profile ── */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/saved-addresses" element={<SavedAddressesPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/order/:id" element={<OrderDetailPage />} />
          <Route path="/order-tracking" element={<OrderTrackingPage />} />
          <Route path="/rate/:id" element={<RateExperiencePage />} />
          <Route path="/coupons" element={<CouponsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<ConsumerSettingsPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/splash" replace />} />
        </Routes>
      </div>
    </CartProvider>
  )
}