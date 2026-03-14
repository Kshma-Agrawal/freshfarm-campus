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
  InventoryEmptyPage, InventoryListPage, AddProducePage,
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
    <div className="app-shell">
      <Routes>
        {/* Auth */}
        <Route path="/farmer" element={<Navigate to="/farmer/splash" replace />} />
        <Route path="/farmer/splash" element={<FarmerSplashPage />} />
        <Route path="/farmer/select-language" element={<FarmerSelectLanguagePage />} />
        <Route path="/farmer/select-role" element={<FarmerSelectRolePage />} />
        <Route path="/farmer/login" element={<FarmerLoginPage />} />
        <Route path="/farmer/otp" element={<FarmerOTPPage />} />
        <Route path="/farmer/create-account" element={<FarmerCreateAccountPage />} />

        {/* Onboarding */}
        <Route path="/farmer/dashboard" element={<FarmerDashboardBeforeSetupPage />} />
        <Route path="/farmer/add-farm" element={<AddFarmDetailsPage />} />
        <Route path="/farmer/documents" element={<DocumentUploadPage />} />
        <Route path="/farmer/payment-setup" element={<PaymentSetupPage />} />

        {/* Verification */}
        <Route path="/farmer/verification-submitted" element={<VerificationSubmittedPage />} />
        <Route path="/farmer/home-pending" element={<FarmerHomePendingPage />} />
        <Route path="/farmer/verification-pending" element={<VerificationPendingPage />} />
        <Route path="/farmer/account-verified" element={<AccountVerifiedPage />} />

        {/* Main Dashboard */}
        <Route path="/farmer/home" element={<FarmerHomePage />} />
        <Route path="/farmer/home-empty" element={<FarmerHomeEmptyPage />} />
        <Route path="/farmer/notifications" element={<FarmerNotificationsPage />} />
        <Route path="/farmer/help" element={<HelpSupportPage />} />

        {/* Inventory */}
        <Route path="/farmer/farm" element={<InventoryListPage />} />
        <Route path="/farmer/inventory" element={<InventoryListPage />} />
        <Route path="/farmer/inventory-empty" element={<InventoryEmptyPage />} />
        <Route path="/farmer/add-produce" element={<AddProducePage />} />
        <Route path="/farmer/produce/:id" element={<ProduceDetailsPage />} />
        <Route path="/farmer/edit-produce/:id" element={<EditProducePage />} />
        <Route path="/farmer/delete-produce/:id" element={<DeleteProduceConfirmPage />} />

        {/* Orders */}
        <Route path="/farmer/orders" element={<FarmerOrdersListPage />} />
        <Route path="/farmer/order/:id" element={<OrderDetailNewPage />} />
        <Route path="/farmer/order/:id/preparing" element={<OrderDetailPreparingPage />} />
        <Route path="/farmer/order/:id/ready" element={<OrderDetailReadyPage />} />
        <Route path="/farmer/order/:id/delivery" element={<OrderDetailDeliveryPage />} />
        <Route path="/farmer/order/:id/cancelled" element={<OrderDetailCancelledPage />} />
        <Route path="/farmer/order/:id/completed" element={<OrderDetailCompletedPage />} />

        {/* Resources */}
        <Route path="/farmer/resources" element={<ResourcesMainPage />} />
        <Route path="/farmer/marketplace" element={<MarketplacePage />} />
        <Route path="/farmer/my-listings" element={<MyListingsPage />} />
        <Route path="/farmer/material/:id" element={<MaterialDetailPage />} />
        <Route path="/farmer/farm-cart" element={<FarmCartPage />} />
        <Route path="/farmer/farm-checkout" element={<FarmCheckoutPage />} />
        <Route path="/farmer/order-confirm" element={<FarmOrderConfirmPage />} />
        <Route path="/farmer/add-material" element={<AddMaterialPage />} />
        <Route path="/farmer/edit-material/:id" element={<EditMaterialPage />} />
        <Route path="/farmer/my-purchases" element={<MyPurchasesPage />} />
        <Route path="/farmer/purchase/:id" element={<PurchaseDetailsPage />} />
        <Route path="/farmer/track-order" element={<TrackOrderPage />} />

        {/* Counselling */}
        <Route path="/farmer/counselling" element={<CounsellingPage />} />
        <Route path="/farmer/demand-insights" element={<DemandInsightsPage />} />
        <Route path="/farmer/crop-planning" element={<CropPlanningPage />} />
        <Route path="/farmer/create-plan" element={<CreatePlanPage />} />
        <Route path="/farmer/best-practices" element={<BestPracticesPage />} />
        <Route path="/farmer/article/:id" element={<ArticleDetailPage />} />
        <Route path="/farmer/govt-schemes" element={<GovernmentSchemesPage />} />
        <Route path="/farmer/bookmarks" element={<BookmarksPage />} />

        {/* Profile */}
        <Route path="/farmer/profile" element={<FarmerProfilePage />} />
        <Route path="/farmer/farm-details" element={<FarmDetailsPage />} />
        <Route path="/farmer/edit-farm" element={<EditFarmDetailsPage />} />
        <Route path="/farmer/payment-details" element={<PaymentDetailsPage />} />
        <Route path="/farmer/edit-payment" element={<EditPaymentDetailsPage />} />
        <Route path="/farmer/settings" element={<FarmerSettingsPage />} />
        <Route path="/farmer/earnings" element={<EarningsPage />} />
        <Route path="/farmer/transactions" element={<TransactionHistoryPage />} />
        <Route path="/farmer/transaction/:id" element={<TransactionDetailPage />} />
      </Routes>
    </div>
  )
}
