import { Routes, Route, Navigate } from 'react-router-dom'

// Auth
import {
  FarmerSplashPage, FarmerSelectLanguagePage, FarmerSelectRolePage,
  FarmerLoginPage, FarmerOTPPage, FarmerCreateAccountPage
} from './FarmerAuthPages'

// Onboarding
import {
  FarmerDashboardBeforeSetupPage, AddFarmDetailsPage,
  DocumentUploadPage, PaymentSetupPage
} from './FarmerOnboardingPages'

// Verification
import {
  VerificationSubmittedPage, FarmerHomePendingPage,
  VerificationPendingPage, AccountVerifiedPage
} from './FarmerVerificationPages'

// Dashboard
import {
  FarmerHomeEmptyPage, FarmerHomePage,
  FarmerNotificationsPage, HelpSupportPage
} from './FarmerDashboardPages'

// Inventory
import {
  InventoryEmptyPage, InventoryListPage, AddProducePage, RestockPage,
  ProduceDetailsPage, EditProducePage, DeleteProduceConfirmPage
} from './FarmerInventoryPages'

// Orders
import {
  FarmerOrdersListPage,
  OrderDetailNewPage, OrderDetailPreparingPage, OrderDetailReadyPage,
  OrderDetailDeliveryPage, OrderDetailCancelledPage, OrderDetailCompletedPage
} from './FarmerOrderPages'

// Resources
import {
  ResourcesMainPage, MarketplacePage, MyListingsPage, MaterialDetailPage,
  FarmCartPage, FarmCheckoutPage, FarmOrderConfirmPage,
  AddMaterialPage, EditMaterialPage, MyPurchasesPage,
  PurchaseDetailsPage, TrackOrderPage
} from './FarmerResourcesPages'

// Counselling
import {
  CounsellingPage, DemandInsightsPage, CropPlanningPage, CreatePlanPage,
  BestPracticesPage, ArticleDetailPage, GovernmentSchemesPage, BookmarksPage
} from './FarmerCounsellingPages'

// Profile
import {
  FarmerProfilePage, FarmDetailsPage, EditFarmDetailsPage,
  PaymentDetailsPage, EditPaymentDetailsPage,
  FarmerSettingsPage, EarningsPage, TransactionHistoryPage, TransactionDetailPage
} from './FarmerProfilePages'

export default function FarmerApp() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Navigate to="splash" replace />} />
      <Route path="splash" element={<FarmerSplashPage />} />
      <Route path="select-language" element={<FarmerSelectLanguagePage />} />
      <Route path="select-role" element={<FarmerSelectRolePage />} />
      <Route path="login" element={<FarmerLoginPage />} />
      <Route path="otp" element={<FarmerOTPPage />} />
      <Route path="create-account" element={<FarmerCreateAccountPage />} />

      {/* Onboarding */}
      <Route path="dashboard" element={<FarmerDashboardBeforeSetupPage />} />
      <Route path="add-farm" element={<AddFarmDetailsPage />} />
      <Route path="documents" element={<DocumentUploadPage />} />
      <Route path="payment-setup" element={<PaymentSetupPage />} />

      {/* Verification */}
      <Route path="verification-submitted" element={<VerificationSubmittedPage />} />
      <Route path="home-pending" element={<FarmerHomePendingPage />} />
      <Route path="verification-pending" element={<VerificationPendingPage />} />
      <Route path="account-verified" element={<AccountVerifiedPage />} />

      {/* Main Dashboard */}
      <Route path="home" element={<FarmerHomePage />} />
      <Route path="home-empty" element={<FarmerHomeEmptyPage />} />
      <Route path="notifications" element={<FarmerNotificationsPage />} />
      <Route path="help" element={<HelpSupportPage />} />

      {/* Inventory */}
      <Route path="farm" element={<InventoryListPage />} />
      <Route path="inventory" element={<InventoryListPage />} />
      <Route path="inventory-empty" element={<InventoryEmptyPage />} />
      <Route path="add-produce" element={<AddProducePage />} />
      <Route path="produce/:id" element={<ProduceDetailsPage />} />
      <Route path="edit-produce/:id" element={<EditProducePage />} />
      <Route path="delete-produce/:id" element={<DeleteProduceConfirmPage />} />
      <Route path="restock" element={<RestockPage />} />

      {/* Orders */}
      <Route path="orders" element={<FarmerOrdersListPage />} />
      <Route path="order/:id" element={<OrderDetailNewPage />} />
      <Route path="order/:id/preparing" element={<OrderDetailPreparingPage />} />
      <Route path="order/:id/ready" element={<OrderDetailReadyPage />} />
      <Route path="order/:id/delivery" element={<OrderDetailDeliveryPage />} />
      <Route path="order/:id/cancelled" element={<OrderDetailCancelledPage />} />
      <Route path="order/:id/completed" element={<OrderDetailCompletedPage />} />

      {/* Resources */}
      <Route path="resources" element={<ResourcesMainPage />} />
      <Route path="marketplace" element={<MarketplacePage />} />
      <Route path="my-listings" element={<MyListingsPage />} />
      <Route path="material/:id" element={<MaterialDetailPage />} />
      <Route path="farm-cart" element={<FarmCartPage />} />
      <Route path="farm-checkout" element={<FarmCheckoutPage />} />
      <Route path="order-confirm" element={<FarmOrderConfirmPage />} />
      <Route path="add-material" element={<AddMaterialPage />} />
      <Route path="edit-material/:id" element={<EditMaterialPage />} />
      <Route path="my-purchases" element={<MyPurchasesPage />} />
      <Route path="purchase/:id" element={<PurchaseDetailsPage />} />
      <Route path="track-order" element={<TrackOrderPage />} />

      {/* Counselling */}
      <Route path="counselling" element={<CounsellingPage />} />
      <Route path="demand-insights" element={<DemandInsightsPage />} />
      <Route path="crop-planning" element={<CropPlanningPage />} />
      <Route path="create-plan" element={<CreatePlanPage />} />
      <Route path="best-practices" element={<BestPracticesPage />} />
      <Route path="article/:id" element={<ArticleDetailPage />} />
      <Route path="govt-schemes" element={<GovernmentSchemesPage />} />
      <Route path="bookmarks" element={<BookmarksPage />} />

      {/* Profile */}
      <Route path="profile" element={<FarmerProfilePage />} />
      <Route path="farm-details" element={<FarmDetailsPage />} />
      <Route path="edit-farm" element={<EditFarmDetailsPage />} />
      <Route path="payment-details" element={<PaymentDetailsPage />} />
      <Route path="edit-payment" element={<EditPaymentDetailsPage />} />
      <Route path="settings" element={<FarmerSettingsPage />} />
      <Route path="earnings" element={<EarningsPage />} />
      <Route path="transactions" element={<TransactionHistoryPage />} />
      <Route path="transaction/:id" element={<TransactionDetailPage />} />
    </Routes>
  )
}