import { HomeIcon, Package, Settings } from "lucide-react";
import Index from "./pages/Index.jsx";
import ItemsPage from "./pages/ItemsPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Items",
    to: "/items",
    icon: <Package className="h-4 w-4" />,
    page: <ItemsPage />,
  },
  {
    title: "Settings",
    to: "/settings",
    icon: <Settings className="h-4 w-4" />,
    page: <SettingsPage />,
  },
];
