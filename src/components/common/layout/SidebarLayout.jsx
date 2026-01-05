import React, { useState, useEffect } from "react";
import {
  Menu, X, Home, Users, Package, Truck, LogOut,
  ChevronLeft, ChevronRight, Settings, HelpCircle,
  BarChart2, Search, ChevronDown, Factory,
  FlaskConical, ShoppingCart, Wallet, ShieldCheck,
  ArrowLeftCircle, Activity
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* =========================================================================
 * 1. ADMIN / COMPANY IMPORTS
 * ========================================================================= */
import DashboardPage from "../../../pages/DashboardPage";
// import ProductionPage from "../../../pages/ProductionPage";
import InventoryPage from "../../../pages/InventoryPage";
import OrdersPage from "../../../pages/OrdersPage";
import DistributionPage from "../../../pages/DistributionPage";
import CRMPage from "../../../pages/CRMPage";
import Analytics from "../../../pages/Analytics";
import Financials from "../../../pages/Financials";
import Invoices from "../../../pages/Invoices";

// Production
import LiveLineStatus from "../../production/company/LiveLineStatus";
import BatchHistory from "../../production/company/BatchHistory";
import Maintenance from "../../production/company/Maintenance";
import LabResults from "../../production/company/LabResults";
import IncidentReports from "../../production/company/IncidentReports";

// Inventory
import RawMaterials from "../../inventory/company/RawMaterials";
import FinishedGoods from "../../inventory/company/FinishedGoods";
import Procurement from "../../inventory/company/Procurement";
import DamagedReturns from "../../inventory/company/DamagedReturns";
import AuditLogs from "../../inventory/company/AuditLogs";

// Orders
import OrdersDashboard from "../../orders/company/OrdersDashboard";
import NewOrders from "../../orders/company/NewOrders";
import InProcessOrders from "../../orders/company/InProcessOrders";
import DeliveredOrders from "../../orders/company/DeliveredOrders";
import OrderHistory from "../../orders/company/OrderHistory";

// Distribution
import RoutePlanning from "../../distribution/company/RoutePlanning";
import RouteCustomers from "../../distribution/company/RouteCustomers";
import RouteNotifications from "../../distribution/company/RouteNotifications";
import TripSheets from "../../distribution/company/TripSheets";
import DeliveryConfirmation from "../../distribution/company/DeliveryConfirmation";

// Analytics
import ProductionAnalytics from "../../analytics/company/ProductionAnalytics";
import InventoryAnalytics from "../../analytics/company/InventoryAnalytics";
import SalesRevenue from "../../analytics/company/SalesRevenue";
import LossRisk from "../../analytics/company/LossRisk";
import Forecasts from "../../analytics/company/Forecasts";
import CustomerInsights from "../../analytics/company/CustomerInsights";
import DistributionPerformance from "../../analytics/company/DistributionPerformance";

/* =========================================================================
 * 2. WHOLESALER IMPORTS (PAGES + COMPONENTS)
 * ========================================================================= */

// Page
import WholesalerDashboard from "../../../pages/WholesalerDashboard";

// Dashboard widgets
import W_KPICards from "../../dashboard/wholesaler/KPICards";
import W_OrdersSummary from "../../dashboard/wholesaler/OrdersSummary";
import W_OutstandingBalance from "../../dashboard/wholesaler/OutstandingBalance";
import W_LastDeliveryStatus from "../../dashboard/wholesaler/DeliveryStatus";
import W_RecentOrdersWidget from "../../dashboard/wholesaler/RecentOrders";

// Orders
import W_OrdersDashboard from "../../orders/wholesaler/OrdersDashboard";
import W_NewOrders from "../../orders/wholesaler/NewOrders";
import W_InProcessOrders from "../../orders/wholesaler/InProcessOrders";
import W_DeliveredOrders from "../../orders/wholesaler/DeliveredOrders";
import W_OrderHistory from "../../orders/wholesaler/OrderHistory";

// Inventory
import W_FinishedGoods from "../../inventory/wholesaler/FinishedGoods";
import W_LowStockAlerts from "../../inventory/wholesaler/LowStockAlerts";
import W_ProductAvailability from "../../inventory/wholesaler/ProductAvailability";
// --- NEW IMPORT ADDED HERE ---
import W_InventorySummary from "../../inventory/wholesaler/Inventory_summary"; 

// Distribution
import W_DeliveryTracking from "../../distribution/wholesaler/DeliveryTracking";
import W_RouteStatus from "../../distribution/wholesaler/RouteStatus";
import W_DeliveryHistory from "../../distribution/wholesaler/DeliveryHistory";
import W_PODViewer from "../../distribution/wholesaler/PODViewer";

// Financials
import W_FinOverview from "../../financials/wholesaler/Overview";
import W_FinInvoices from "../../financials/wholesaler/Invoices";
import W_FinPayments from "../../financials/wholesaler/Payments";
import W_CreditLimit from "../../financials/wholesaler/CreditLimit";
import W_Statements from "../../financials/wholesaler/Statements";

// Analytics
import W_OrderTrends from "../../analytics/wholesaler/OrderTrends";
import W_MonthlyPurchases from "../../analytics/wholesaler/MonthlyPurchases";
import W_TopProducts from "../../analytics/wholesaler/TopProducts";

/* =========================================================================
 * 3. LAYOUT COMPONENT
 * ========================================================================= */

const SidebarLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [expandedMenu, setExpandedMenu] = useState(null);

  // Role State
  const [userRole, setUserRole] = useState("admin");
  const [userName, setUserName] = useState("User");

  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole") || "admin";
    const storedName = localStorage.getItem("userName") || "User";
    setUserRole(storedRole);
    setUserName(storedName);

    const handleResize = () => {
      if (window.innerWidth < 1280 && window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      } else if (window.innerWidth >= 1280) {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const hideScrollbarStyle = {
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  };

  /* =========================================================================
   * 4. MENU DEFINITIONS
   * ========================================================================= */

  // A. WHOLESALER SIDEBAR
  const wholesalerNavGroups = [
    {
      title: "Overview",
      items: [
        { id: "dashboard", label: "Dashboard", icon: Home },
        {
          id: "w_dashboard_widgets",
          label: "Dashboard Widgets",
          icon: Activity,
          subItems: [
            { id: "w_kpis", label: "KPI Cards" },
            { id: "w_orders_summary", label: "Orders Summary" },
            { id: "w_outstanding", label: "Outstanding Balance" },
            { id: "w_last_delivery", label: "Last Delivery Status" },
            { id: "w_recent_orders_widget", label: "Recent Orders Widget" },
          ],
        },
      ],
    },
    {
      title: "Orders",
      items: [
        {
          id: "w_orders_main",
          label: "My Orders",
          icon: ShoppingCart,
          subItems: [
            { id: "w_orders_dashboard", label: "Orders Dashboard" },
            { id: "w_new_order", label: "New Order" },
            { id: "w_in_process", label: "In Process" },
            { id: "w_delivered", label: "Delivered" },
            { id: "w_history", label: "Order History" },
          ],
        },
      ],
    },
    {
      title: "Inventory",
      items: [
        {
          id: "w_inventory_main",
          label: "My Stock",
          icon: Package,
          subItems: [
            // --- NEW MENU ITEM ADDED HERE ---
            { id: "w_inventory_summary", label: "Inventory Summary" },
            { id: "w_stock", label: "Finished Goods" },
            { id: "w_alerts", label: "Low Stock Alerts" },
            { id: "w_product_availability", label: "Product Availability" },
          ],
        },
      ],
    },
    {
      title: "Distribution",
      items: [
        {
          id: "w_distribution_main",
          label: "Deliveries",
          icon: Truck,
          subItems: [
            { id: "w_delivery_tracking", label: "Live Tracking" },
            { id: "w_route_status", label: "Route Status" },
            { id: "w_delivery_history", label: "Delivery History" },
            { id: "w_pod_viewer", label: "POD Viewer" },
          ],
        },
      ],
    },
    {
      title: "Finance",
      items: [
        {
          id: "w_finance_main",
          label: "Financials",
          icon: Wallet,
          subItems: [
            { id: "w_fin_overview", label: "Financial Overview" },
            { id: "w_invoices", label: "Invoices" },
            { id: "w_payments", label: "Payments" },
            { id: "w_credit_limit", label: "Credit Limit" },
            { id: "w_statements", label: "Account Statements" },
          ],
        },
      ],
    },
    {
      title: "Analytics",
      items: [
        {
          id: "w_analytics_main",
          label: "My Analytics",
          icon: BarChart2,
          subItems: [
            { id: "w_order_trends", label: "Order Trends" },
            { id: "w_monthly_purchases", label: "Monthly Purchases" },
            { id: "w_top_products", label: "Top Products" },
          ],
        },
      ],
    },
    {
      title: "Account",
      items: [
        { id: "profile", label: "Profile", icon: Users },
        { id: "logout_btn", label: "Logout", icon: LogOut },
      ],
    },
  ];

  // B. COMPANY / ADMIN SIDEBAR (unchanged)
  const companyNavGroups = [
    {
      title: "Main",
      items: [{ id: "back_to_home", label: "Back to Website", icon: ArrowLeftCircle }],
    },
    {
      title: "Overview",
      items: [
        { id: "dashboard", label: "Dashboard", icon: Home },
        {
          id: "analytics_main",
          label: "Analytics",
          icon: BarChart2,
          subItems: [
            { label: "Executive Overview", id: "analytics" },
            { label: "Production Insights", id: "analytics_production" },
            { label: "Inventory Health", id: "analytics_inventory" },
            { label: "Sales & Revenue", id: "analytics_sales" },
            { label: "Loss & Risk Monitor", id: "analytics_risk" },
            { label: "Demand Forecasting", id: "analytics_forecasts" },
            { label: "Customer Insights", id: "analytics_customers" },
            { label: "Distribution Perf.", id: "analytics_distribution" },
          ],
        },
      ],
    },
    {
      title: "Production & Mfg",
      items: [
        {
          id: "production_main",
          label: "Production Floor",
          icon: Factory,
          subItems: [
            { label: "Production Overview", id: "production" },
            { label: "Live Line Status", id: "live_line" },
            { label: "Batch History", id: "batch_history" },
            { label: "Maintenance", id: "maintenance" },
          ],
        },
        {
          id: "quality_main",
          label: "Quality Assurance",
          icon: FlaskConical,
          subItems: [
            { label: "Lab Results", id: "lab_results" },
            { label: "Incident Reports", id: "incident_reports" },
          ],
        },
      ],
    },
    {
      title: "Inventory & Stock",
      items: [
        {
          id: "inventory_main",
          label: "Inventory",
          icon: Package,
          subItems: [
            { label: "Inventory Dashboard", id: "inventory" },
            { label: "Raw Materials", id: "raw_materials" },
            { label: "Finished Goods", id: "finished_goods" },
            { label: "Procurement (POs)", id: "procurement" },
            { label: "Damaged / Returns", id: "damaged_returns" },
            { label: "Audit Logs", id: "audit_logs" },
          ],
        },
      ],
    },
    {
      title: "Sales & Logistics",
      items: [
        {
          id: "orders_main",
          label: "Sales Orders",
          icon: ShoppingCart,
          subItems: [
            { label: "Orders Dashboard", id: "orders" },
            { label: "New Orders", id: "new_orders" },
            { label: "In Process", id: "in_process_orders" },
            { label: "Delivered", id: "delivered_orders" },
            { label: "Order History", id: "order_history" },
          ],
        },
        {
          id: "distribution_main",
          label: "Distribution",
          icon: Truck,
          subItems: [
            { label: "Distribution Hub", id: "distribution" },
            { label: "Route Planning", id: "route_planning" },
            { label: "Route Customers", id: "route_customers" },
            { label: "Notifications", id: "route_notifications" },
            { label: "Trip Sheets", id: "trip_sheets" },
            { label: "Delivery Execution", id: "delivery_confirmation" },
          ],
        },
        {
          id: "crm_main",
          label: "CRM",
          icon: Users,
          subItems: [{ label: "Customer Directory", id: "crm" }],
        },
      ],
    },
    {
      title: "Finance",
      items: [
        {
          id: "finance_main",
          label: "Financials",
          icon: Wallet,
          subItems: [
            { label: "Overview & KPIs", id: "finance_overview" },
            { label: "Invoices", id: "invoices" },
          ],
        },
      ],
    },
    {
      title: "System",
      items: [
        {
          id: "users",
          label: "User Mgmt",
          icon: ShieldCheck,
          subItems: [{ label: "Staff & Roles", id: "roles" }],
        },
        { id: "settings", label: "Settings", icon: Settings, subItems: [] },
        { id: "support", label: "Help & Support", icon: HelpCircle },
      ],
    },
  ];

  const navGroups = userRole === "wholesaler" ? wholesalerNavGroups : companyNavGroups;

  /* =========================================================================
   * 5. CONTENT RENDERER
   * ========================================================================= */

  const renderContent = () => {
    const commonContainerClass =
      "flex-1 overflow-y-auto h-full w-full bg-slate-50 [&::-webkit-scrollbar]:hidden";

    const ComponentWrapper = ({ title, children }) => (
      <div className={commonContainerClass} style={hideScrollbarStyle}>
        <div className="p-6 sm:p-8 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-4">
            {title}
          </h2>
          {children}
        </div>
      </div>
    );

    const FullPageWrapper = ({ children }) => (
      <div className={commonContainerClass} style={hideScrollbarStyle}>
        {children}
      </div>
    );

    // WHOLESALER ROUTES
    if (userRole === "wholesaler") {
      switch (activePage) {
        // main dashboard
        case "dashboard":
          return (
            <FullPageWrapper>
              <WholesalerDashboard />
            </FullPageWrapper>
          );

        // dashboard widgets (direct views)
        case "w_kpis":
          return (
            <ComponentWrapper title="KPI Overview">
              <W_KPICards />
            </ComponentWrapper>
          );
        case "w_orders_summary":
          return (
            <ComponentWrapper title="Orders Summary">
              <W_OrdersSummary />
            </ComponentWrapper>
          );
        case "w_outstanding":
          return (
            <ComponentWrapper title="Outstanding Balance">
              <W_OutstandingBalance />
            </ComponentWrapper>
          );
        case "w_last_delivery":
          return (
            <ComponentWrapper title="Last Delivery Status">
              <W_LastDeliveryStatus />
            </ComponentWrapper>
          );
        case "w_recent_orders_widget":
          return (
            <ComponentWrapper title="Recent Orders">
              <W_RecentOrdersWidget />
            </ComponentWrapper>
          );

        // orders
        case "w_orders_dashboard":
          return (
            <ComponentWrapper title="Orders Dashboard">
              <W_OrdersDashboard />
            </ComponentWrapper>
          );
        case "w_new_order":
          return (
            <ComponentWrapper title="New Order">
              <W_NewOrders />
            </ComponentWrapper>
          );
        case "w_in_process":
          return (
            <ComponentWrapper title="Orders In Process">
              <W_InProcessOrders />
            </ComponentWrapper>
          );
        case "w_delivered":
          return (
            <ComponentWrapper title="Delivered Orders">
              <W_DeliveredOrders />
            </ComponentWrapper>
          );
        case "w_history":
          return (
            <ComponentWrapper title="Order History">
              <W_OrderHistory />
            </ComponentWrapper>
          );

        // inventory
        // --- NEW CASE ADDED HERE ---
        case "w_inventory_summary":
          return (
            <ComponentWrapper title="Inventory Summary">
              <W_InventorySummary />
            </ComponentWrapper>
          );
        case "w_stock":
          return (
            <ComponentWrapper title="Finished Goods">
              <W_FinishedGoods />
            </ComponentWrapper>
          );
        case "w_alerts":
          return (
            <ComponentWrapper title="Low Stock Alerts">
              <W_LowStockAlerts />
            </ComponentWrapper>
          );
        case "w_product_availability":
          return (
            <ComponentWrapper title="Product Availability">
              <W_ProductAvailability />
            </ComponentWrapper>
          );

        // distribution
        case "w_delivery_tracking":
          return (
            <ComponentWrapper title="Live Delivery Tracking">
              <W_DeliveryTracking />
            </ComponentWrapper>
          );
        case "w_route_status":
          return (
            <ComponentWrapper title="Route Status">
              <W_RouteStatus />
            </ComponentWrapper>
          );
        case "w_delivery_history":
          return (
            <ComponentWrapper title="Delivery History">
              <W_DeliveryHistory />
            </ComponentWrapper>
          );
        case "w_pod_viewer":
          return (
            <ComponentWrapper title="Proof of Delivery">
              <W_PODViewer />
            </ComponentWrapper>
          );

        // financials
        case "w_fin_overview":
          return (
            <ComponentWrapper title="Financial Overview">
              <W_FinOverview />
            </ComponentWrapper>
          );
        case "w_invoices":
          return (
            <ComponentWrapper title="Invoices">
              <W_FinInvoices />
            </ComponentWrapper>
          );
        case "w_payments":
          return (
            <ComponentWrapper title="Payments">
              <W_FinPayments />
            </ComponentWrapper>
          );
        case "w_credit_limit":
          return (
            <ComponentWrapper title="Credit Limit">
              <W_CreditLimit />
            </ComponentWrapper>
          );
        case "w_statements":
          return (
            <ComponentWrapper title="Account Statements">
              <W_Statements />
            </ComponentWrapper>
          );

        // analytics
        case "w_order_trends":
          return (
            <ComponentWrapper title="Order Trends">
              <W_OrderTrends />
            </ComponentWrapper>
          );
        case "w_monthly_purchases":
          return (
            <ComponentWrapper title="Monthly Purchases">
              <W_MonthlyPurchases />
            </ComponentWrapper>
          );
        case "w_top_products":
          return (
            <ComponentWrapper title="Top Products">
              <W_TopProducts />
            </ComponentWrapper>
          );

        default:
          return (
            <FullPageWrapper>
              <WholesalerDashboard />
            </FullPageWrapper>
          );
      }
    }

    // ADMIN / COMPANY ROUTES
    switch (activePage) {
      case "dashboard":
        return (
          <FullPageWrapper>
            <DashboardPage />
          </FullPageWrapper>
        );
      case "invoices":
        return (
          <FullPageWrapper>
            <Invoices />
          </FullPageWrapper>
        );
      case "finance_overview":
        return (
          <FullPageWrapper>
            <Financials />
          </FullPageWrapper>
        );

      case "production":
        return (
          <FullPageWrapper>
            <ProductionPage />
          </FullPageWrapper>
        );
      case "inventory":
        return (
          <FullPageWrapper>
            <InventoryPage />
          </FullPageWrapper>
        );
      case "orders":
        return (
          <FullPageWrapper>
            <OrdersPage />
          </FullPageWrapper>
        );
      case "distribution":
        return (
          <FullPageWrapper>
            <DistributionPage />
          </FullPageWrapper>
        );
      case "crm":
        return (
          <FullPageWrapper>
            <CRMPage />
          </FullPageWrapper>
        );

      case "analytics":
        return (
          <FullPageWrapper>
            <Analytics />
          </FullPageWrapper>
        );
      case "analytics_production":
        return (
          <ComponentWrapper title="Production Analytics Deep Dive">
            <ProductionAnalytics />
          </ComponentWrapper>
        );
      case "analytics_inventory":
        return (
          <ComponentWrapper title="Inventory Health Analytics">
            <InventoryAnalytics />
          </ComponentWrapper>
        );
      case "analytics_sales":
        return (
          <ComponentWrapper title="Sales & Revenue Performance">
            <SalesRevenue />
          </ComponentWrapper>
        );
      case "analytics_risk":
        return (
          <ComponentWrapper title="Operational Loss & Risk Monitor">
            <LossRisk />
          </ComponentWrapper>
        );
      case "analytics_forecasts":
        return (
          <ComponentWrapper title="AI Demand Forecasting">
            <Forecasts />
          </ComponentWrapper>
        );
      case "analytics_customers":
        return (
          <ComponentWrapper title="Customer Insights & Demographics">
            <CustomerInsights />
          </ComponentWrapper>
        );
      case "analytics_distribution":
        return (
          <ComponentWrapper title="Distribution Network Performance">
            <DistributionPerformance />
          </ComponentWrapper>
        );

      case "live_line":
        return (
          <ComponentWrapper title="Live Line Status">
            <LiveLineStatus />
          </ComponentWrapper>
        );
      case "batch_history":
        return (
          <ComponentWrapper title="Batch History Log">
            <BatchHistory />
          </ComponentWrapper>
        );
      case "maintenance":
        return (
          <ComponentWrapper title="Maintenance Schedules">
            <Maintenance />
          </ComponentWrapper>
        );
      case "lab_results":
        return (
          <ComponentWrapper title="Laboratory Results">
            <LabResults />
          </ComponentWrapper>
        );
      case "incident_reports":
        return (
          <ComponentWrapper title="Incident Reports">
            <IncidentReports />
          </ComponentWrapper>
        );

      case "raw_materials":
        return (
          <ComponentWrapper title="Raw Materials Stock">
            <RawMaterials />
          </ComponentWrapper>
        );
      case "finished_goods":
        return (
          <ComponentWrapper title="Finished Goods Inventory">
            <FinishedGoods />
          </ComponentWrapper>
        );
      case "procurement":
        return (
          <ComponentWrapper title="Procurement & Purchase Orders">
            <Procurement />
          </ComponentWrapper>
        );
      case "damaged_returns":
        return (
          <ComponentWrapper title="Damaged Goods & Returns">
            <DamagedReturns />
          </ComponentWrapper>
        );
      case "audit_logs":
        return (
          <ComponentWrapper title="Inventory Audit Logs">
            <AuditLogs />
          </ComponentWrapper>
        );

      case "orders_dashboard":
        return (
          <ComponentWrapper title="Orders Overview">
            <OrdersDashboard />
          </ComponentWrapper>
        );
      case "new_orders":
        return (
          <ComponentWrapper title="New Order Approvals">
            <NewOrders />
          </ComponentWrapper>
        );
      case "in_process_orders":
        return (
          <ComponentWrapper title="Orders In Process">
            <InProcessOrders />
          </ComponentWrapper>
        );
      case "delivered_orders":
        return (
          <ComponentWrapper title="Delivered & Pending Payment">
            <DeliveredOrders />
          </ComponentWrapper>
        );
      case "order_history":
        return (
          <ComponentWrapper title="Order History Archive">
            <OrderHistory />
          </ComponentWrapper>
        );

      case "route_planning":
        return (
          <ComponentWrapper title="Route Planning">
            <RoutePlanning />
          </ComponentWrapper>
        );
      case "route_customers":
        return (
          <ComponentWrapper title="Route Customers">
            <RouteCustomers />
          </ComponentWrapper>
        );
      case "route_notifications":
        return (
          <ComponentWrapper title="Broadcast Notifications">
            <RouteNotifications />
          </ComponentWrapper>
        );
      case "trip_sheets":
        return (
          <FullPageWrapper>
            <TripSheets />
          </FullPageWrapper>
        );
      case "delivery_confirmation":
        return (
          <ComponentWrapper title="Delivery Execution">
            <DeliveryConfirmation />
          </ComponentWrapper>
        );

      default:
        return (
          <FullPageWrapper>
            <DashboardPage />
          </FullPageWrapper>
        );
    }
  };

  /* =========================================================================
   * 6. SIDEBAR HANDLERS
   * ========================================================================= */

  const toggleSubMenu = (id) => {
    if (expandedMenu === id) {
      setExpandedMenu(null);
    } else {
      setExpandedMenu(id);
      if (!isSidebarOpen) setIsSidebarOpen(true);
    }
  };

  /* =========================================================================
   * 7. RENDER LAYOUT
   * ========================================================================= */

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          bg-slate-900 text-slate-300
          transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]
          flex flex-col border-r border-slate-800
          ${isMobileOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"}
          ${isSidebarOpen ? "lg:w-72" : "lg:w-20"}
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800/50 flex-shrink-0">
          <div
            className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ${
              !isSidebarOpen && "lg:w-0 lg:opacity-0"
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Factory className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight whitespace-nowrap">
              AquaFlow
            </span>
          </div>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            {isSidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>

          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1 text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className={`px-4 py-4 flex-shrink-0 ${!isSidebarOpen && "lg:hidden"}`}>
          <button className="w-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-xl px-3 py-2.5 flex items-center gap-2 text-sm text-slate-400 transition-all group">
            <Search size={16} className="group-hover:text-white transition-colors" />
            <span className="flex-1 text-left">Search...</span>
          </button>
        </div>

        {/* Navigation */}
        <div
          className="flex-1 overflow-y-auto px-3 py-2 space-y-6 [&::-webkit-scrollbar]:hidden"
          style={hideScrollbarStyle}
        >
          {navGroups.map((group, groupIdx) => (
            <div key={groupIdx}>
              {isSidebarOpen && (
                <h3 className="px-3 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  {group.title}
                </h3>
              )}

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const hasSubMenu = item.subItems && item.subItems.length > 0;

                  const isParentActive = activePage === item.id;
                  const isChildActiveInParent =
                    hasSubMenu && item.subItems.some((sub) => (sub.id || sub) === activePage);
                  const isExpanded =
                    expandedMenu === item.id || isParentActive || isChildActiveInParent;

                  return (
                    <div key={item.id}>
                      <button
                        onClick={() => {
                          if (item.id === "back_to_home") {
                            navigate("/");
                            return;
                          }
                          if (item.id === "logout_btn") {
                            handleLogout();
                            return;
                          }

                          if (hasSubMenu) {
                            toggleSubMenu(item.id);
                            if (item.subItems && item.subItems.length > 0) {
                              const firstChild = item.subItems[0];
                              setActivePage(firstChild.id || firstChild);
                            }
                          } else {
                            setActivePage(item.id);
                            setIsMobileOpen(false);
                          }
                        }}
                        className={`
                          w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-200 group relative
                          ${
                            isParentActive
                              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                              : isChildActiveInParent
                              ? "text-indigo-400 bg-transparent"
                              : "text-slate-400 hover:bg-slate-800 hover:text-white"
                          }
                        `}
                      >
                        <Icon
                          size={20}
                          strokeWidth={isParentActive || isChildActiveInParent ? 2.5 : 2}
                          className={!isSidebarOpen ? "mx-auto" : ""}
                        />

                        {isSidebarOpen && (
                          <>
                            <span className="flex-1 text-left truncate text-sm">{item.label}</span>
                            {hasSubMenu && (
                              <ChevronDown
                                size={14}
                                className={`transition-transform duration-200 ${
                                  isExpanded ? "rotate-180" : ""
                                }`}
                              />
                            )}
                          </>
                        )}
                      </button>

                      {hasSubMenu && isExpanded && isSidebarOpen && (
                        <div className="mt-1 ml-4 pl-4 border-l border-slate-800 space-y-1">
                          {item.subItems.map((subItem) => {
                            const subId = subItem.id || subItem;
                            const subLabel = subItem.label || subItem;
                            const isSubActive = activePage === subId;

                            return (
                              <button
                                key={subId}
                                onClick={() => {
                                  setActivePage(subId);
                                  setIsMobileOpen(false);
                                }}
                                className={`
                                  w-full text-left px-3 py-2 text-xs font-medium rounded-lg transition-colors
                                  ${
                                    isSubActive
                                      ? "text-white bg-indigo-600 shadow-sm"
                                      : "text-slate-500 hover:text-white hover:bg-slate-800/50"
                                  }
                                `}
                              >
                                {subLabel}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User Footer */}
        <div className="p-4 border-t border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                userRole === "admin" ? "bg-indigo-500" : "bg-emerald-500"
              }`}
            >
              {userName.charAt(0)}
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden flex-1">
                <p className="text-sm font-bold text-white truncate">{userName}</p>
                <p className="text-xs text-slate-500 truncate capitalize">
                  {userRole === "wholesaler" ? "Partner" : "Admin"}
                </p>
              </div>
            )}
            {isSidebarOpen && (
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="lg:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-30 flex-shrink-0">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 text-slate-600 bg-slate-50 rounded-lg"
          >
            <Menu size={24} />
          </button>
          <span className="font-bold text-slate-800">AquaFlow</span>
          <div className="w-10" />
        </header>

        <div className="flex-1 overflow-hidden relative">{renderContent()}</div>
      </div>
    </div>
  );
};

export default SidebarLayout;
