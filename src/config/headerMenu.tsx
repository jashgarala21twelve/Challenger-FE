import {
  Home,
  Briefcase,
  ClipboardList,
  Package,
  FileText,
  Car,
  Database,
  Shield,
  Users,
  BarChart,
  Settings,
  Search,
} from "lucide-react";

export const menuItems = [
  { name: "dashboard", icon: Home, path: "/" },
  { name: "jobs", icon: Briefcase, path: "/jobs" },
  { name: "emptyjobs", icon: ClipboardList, path: "/jobs/empty" },
  { name: "spareparts", icon: Package, path: "/spareparts" },
  { name: "memo", icon: FileText, path: "/memo" },
  { name: "cars", icon: Car, path: "/cars" },
  { name: "inventory", icon: Database, path: "/inventory/used" },
  { name: "accounting", icon: Shield, path: "/accounts" },
  { name: "hrms", icon: Users, path: "/hrms/employee" },
  { name: "customers", icon: Users, path: "/customers" },
  { name: "reports", icon: BarChart, path: "/reports" },
  { name: "settings", icon: Settings, path: "/settings" },
  { name: "search", icon: Search, path: "/search" },
];
