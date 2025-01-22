"use client"
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { icon: Home, label: "Dashboard", badge: "" },
    { icon: Compass, label: "Discover", badge: "New" },
    { icon: Users, label: "Team", badge: "" },
    { icon: FolderOpen, label: "Projects", badge: "3" },
    { icon: BarChart3, label: "Analytics", badge: "" },
    { icon: Star, label: "Favorites", badge: "" },
    { icon: Bell, label: "Notifications", badge: "5" },
  ];

  const bottomMenuItems = [
    { icon: Settings, label: "Settings" },
    { icon: HelpCircle, label: "Help & Support" },
  ];

  return (
    <div
      className={cn(
        "fixed top-[82px] left-0 h-[calc(100vh)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300 ease-in-out z-50",
        isOpen ? "w-64" : "w-16"
      )}
    >

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full p-1.5 shadow-sm hover:shadow-md transition-all duration-200"
      >
        {isOpen ? (
          <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        )}
      </button>

      {/* Logo */}
      <div className="px-4 py-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          {isOpen && (
            <span className="text-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Sidebaar
            </span>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-3 py-2">
        <nav className="space-y-1">
          {menuItems.map((item, idx) => (
            <a
              key={idx}
              href="#"
              className={cn(
                "flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 group relative",
                !isOpen && "justify-center"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors",
                !isOpen && "h-6 w-6"
              )} />
              {isOpen && (
                <>
                  <span className="font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="absolute right-3 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full text-xs font-medium">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {!isOpen && item.badge && (
                <span className="absolute top-0 right-0 h-2 w-2 bg-indigo-500 rounded-full" />
              )}
            </a>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-800 px-3 py-4">
        <nav className="space-y-1">
          {bottomMenuItems.map((item, idx) => (
            <a
              key={idx}
              href="#"
              className={cn(
                "flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 group",
                !isOpen && "justify-center"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors",
                !isOpen && "h-6 w-6"
              )} />
              {isOpen && (
                <span className="font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {item.label}
                </span>
              )}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;