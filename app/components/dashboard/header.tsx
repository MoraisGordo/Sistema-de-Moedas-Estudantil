"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { Bell, Menu, User } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type HeaderProps = {
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (isOpen: boolean) => void;
};

export default function Header({ 
  isMobileSidebarOpen, 
  setIsMobileSidebarOpen 
}: HeaderProps) {
  const { user } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const getRoleLabel = (role: string) => {
    const roleMap: Record<string, string> = {
      STUDENT: "Aluno",
      TEACHER: "Professor",
      COMPANY: "Empresa",
      ADMIN: "Administrador",
    };
    return roleMap[role] || role;
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 py-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              className="md:hidden mr-4 text-gray-500 hover:text-gray-700"
              onClick={toggleSidebar}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </button>

            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center space-x-3 focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.role ? getRoleLabel(user.role) : ""}</p>
                </div>
              </button>

              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border"
                >
                  <a
                    href="/dashboard/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Configurações
                  </a>
                  <a
                    href="#"
                    onClick={() => {
                      // Handle logout
                      setShowUserMenu(false);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sair
                  </a>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}