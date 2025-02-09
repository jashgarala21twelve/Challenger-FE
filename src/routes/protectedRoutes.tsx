import { lazy } from "react";
import { RouteObject } from "react-router-dom";

// Dashboard
const DashBoard = lazy(() => import("@/pages/dashboard"));

// Jobs Management
const Jobs = lazy(() => import("@/pages/jobs"));
const EmptyJobs = lazy(() => import("@/pages/jobs/emptyjobs"));
const CompletedJobs = lazy(() => import("@/pages/jobs/completedjobs"));
const SearchJobs = lazy(() => import("@/pages/searchjobs"));

// Cab History
const CabHistory = lazy(() => import("@/pages/cabhistory"));

// Spare Parts Management
const SpareParts = lazy(() => import("@/pages/spareparts"));
const UsedSpareParts = lazy(() => import("@/pages/inventory/usedspareparts"));
const NewSpareParts = lazy(() => import("@/pages/inventory/newspareparts"));
const SparePartsReturn = lazy(
  () => import("@/pages/inventory/sparepartsreturn")
);
const SparePartsPurchase = lazy(
  () => import("@/pages/inventory/sparepartspurchase")
);
const PurchaseReturn = lazy(() => import("@/pages/inventory/purchasereturn"));

// Memo Management
const Memo = lazy(() => import("@/pages/memo"));

// Cars Management
const Cars = lazy(() => import("@/pages/cars"));

// Accounts & Finance
const Accounts = lazy(() => import("@/pages/accounts"));
const AccountStatements = lazy(
  () => import("@/pages/accounts/accountstatement")
);
const GeneralLedger = lazy(() => import("@/pages/accounts/generalledger"));
const SupplierPayment = lazy(() => import("@/pages/accounts/supplierpayment"));
const PostingInvoices = lazy(() => import("@/pages/accounts/postinginvoices"));
const UserExpenses = lazy(() => import("@/pages/accounts/userexpense"));

// HRMS (Human Resource Management System)
const AddEmployee = lazy(() => import("@/pages/hrms/employee"));
const GeneralPayroll = lazy(() => import("@/pages/hrms/payroll"));
const Announcements = lazy(() => import("@/pages/hrms/announcement"));
const Holidays = lazy(() => import("@/pages/hrms/holidays"));

// Customers Management
const Customers = lazy(() => import("@/pages/customers"));

// Reports Section
const Reports = lazy(() => import("@/pages/reports"));

// Settings & Configuration
const Settings = lazy(() => import("@/pages/settings"));

// Define Routes
const ProtectedRoutes: RouteObject[] = [
  { path: "/", element: <DashBoard /> },
  { path: "/completed-jobs", element: <Jobs /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/jobs/empty", element: <EmptyJobs /> },
  { path: "/jobs/completed", element: <CompletedJobs /> },
  { path: "/jobs/search", element: <SearchJobs /> },
  { path: "/cabhistory", element: <CabHistory /> },
  { path: "/spareparts", element: <SpareParts /> },
  { path: "/inventory/used", element: <UsedSpareParts /> },
  { path: "/inventory/new", element: <NewSpareParts /> },
  { path: "/inventory/return", element: <SparePartsReturn /> },
  { path: "/inventory/purchase", element: <SparePartsPurchase /> },
  { path: "/inventory/purchase-return", element: <PurchaseReturn /> },
  { path: "/memo", element: <Memo /> },
  { path: "/cars", element: <Cars /> },
  { path: "/accounts", element: <Accounts /> },
  { path: "/accounts/statements", element: <AccountStatements /> },
  { path: "/accounts/ledger", element: <GeneralLedger /> },
  { path: "/accounts/supplier-payment", element: <SupplierPayment /> },
  { path: "/accounts/invoices", element: <PostingInvoices /> },
  { path: "/accounts/expenses", element: <UserExpenses /> },
  { path: "/hrms/employee", element: <AddEmployee /> },
  { path: "/hrms/payroll", element: <GeneralPayroll /> },
  { path: "/hrms/announcements", element: <Announcements /> },
  { path: "/hrms/holidays", element: <Holidays /> },
  { path: "/customers", element: <Customers /> },
  { path: "/reports", element: <Reports /> },
  { path: "/settings", element: <Settings /> },
];

export default ProtectedRoutes;
