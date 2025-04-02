"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Home,
  Compass,
  FolderOpen,
  Settings,
  Star,
  ChevronLeft,
  ChevronRight,
  Users,
  BarChart3,
  Bell,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // Responsive sidebar toggle based on screen size
  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 1024); // Adjusted to a larger breakpoint for a more desktop-focused experience
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { id: 1, icon: Compass, label: "Discover", path: "/discover", badge: "New" },
    { id: 2, icon: Users, label: "Billing", path: "/billing", badge: "$" },
    { id: 3, icon: FolderOpen, label: "Projects", path: "/projects", badge: "3" },
    { id: 4, icon: BarChart3, label: "Analytics", path: "/analytics", badge: "" },
    { id: 5, icon: Star, label: "Favorites", path: "/favorites", badge: "" },
    { id: 6, icon: Bell, label: "Notifications", path: "/notifications-list", badge: "5" },
  ];

  const bottomMenuItems = [
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: HelpCircle, label: "Help & Support", path: "/support" },
  ];

  return (
    <aside
      className={cn(
        "fixed top-[82px] left-0 h-[calc(100vh-82px)] bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700 shadow-lg transition-all duration-300 ease-in-out z-50",
        isOpen ? "w-72" : "w-20"
      )}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
      >
        {isOpen ? (
          <ChevronLeft className="h-5 w-5 text-white" />
        ) : (
          <ChevronRight className="h-5 w-5 text-white" />
        )}
      </button>

      {/* Logo Section */}
      <div className=" py-8 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
            <span className="text-white font-extrabold text-2xl">A</span>
          </div>
          {isOpen && (
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              AI Dashboard
            </span>
          )}
        </div>
      </div>

      {/* Main Menu */}
      <nav className="px-4 py-2 flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.path}
                className={cn(
                  "flex items-center space-x-4 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-700 hover:text-white group relative transition-all duration-200",
                  !isOpen && "justify-center px-0"
                )}
              >
                <item.icon
                  className={cn(
                    "h-6 w-6 text-gray-400 group-hover:text-purple-400 transition-colors",
                    !isOpen && "h-7 w-7"
                  )}
                />
                {isOpen && (
                  <>
                    <span className="font-semibold group-hover:text-purple-300 transition-colors">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="absolute right-4 bg-purple-600 text-white px-2 py-0.5 rounded-full text-xs font-medium shadow-sm">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                {!isOpen && item.badge && (
                  <span className="absolute top-1 right-1 h-3 w-3 bg-purple-500 rounded-full animate-pulse" />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Menu */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-700 px-4 py-4 bg-gray-900 bg-opacity-80">
        <nav className="space-y-2">
          {bottomMenuItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.path}
              className={cn(
                "flex items-center space-x-4 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200",
                !isOpen && "justify-center px-0"
              )}
            >
              <item.icon
                className={cn(
                  "h-6 w-6 text-gray-400 group-hover:text-purple-400 transition-colors",
                  !isOpen && "h-7 w-7"
                )}
              />
              {isOpen && (
                <span className="font-semibold group-hover:text-purple-300 transition-colors">
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;