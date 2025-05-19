"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Coins, 
  GraduationCap, 
  BookOpen, 
  Building2, 
  Gift, 
  History, 
  LogOut, 
  Menu, 
  X,
  Home,
  Settings,
  Users
} from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { cn } from "@/lib/utils";

type SidebarProps = {
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (isOpen: boolean) => void;
};

export default function Sidebar({ 
  isMobileSidebarOpen, 
  setIsMobileSidebarOpen 
}: SidebarProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const sidebarClass = cn(
    "sidebar",
    isMobileSidebarOpen ? "open" : ""
  );

  const closeSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const getNavItems = () => {
    const commonItems = [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: <Home className="h-5 w-5" />,
      },
    ];

    const roleSpecificItems = {
      STUDENT: [
        {
          name: "Meu Saldo",
          href: "/dashboard/balance",
          icon: <Coins className="h-5 w-5" />,
        },
        {
          name: "Vantagens",
          href: "/dashboard/advantages",
          icon: <Gift className="h-5 w-5" />,
        },
        {
          name: "Histórico",
          href: "/dashboard/history",
          icon: <History className="h-5 w-5" />,
        },
      ],
      TEACHER: [
        {
          name: "Meu Saldo",
          href: "/dashboard/balance",
          icon: <Coins className="h-5 w-5" />,
        },
        {
          name: "Enviar Moedas",
          href: "/dashboard/send-coins",
          icon: <GraduationCap className="h-5 w-5" />,
        },
        {
          name: "Histórico",
          href: "/dashboard/history",
          icon: <History className="h-5 w-5" />,
        },
      ],
      COMPANY: [
        {
          name: "Vantagens",
          href: "/dashboard/advantages",
          icon: <Gift className="h-5 w-5" />,
        },
        {
          name: "Resgates",
          href: "/dashboard/redemptions",
          icon: <History className="h-5 w-5" />,
        },
      ],
      ADMIN: [
        {
          name: "Instituições",
          href: "/dashboard/institutions",
          icon: <BookOpen className="h-5 w-5" />,
        },
        {
          name: "Professores",
          href: "/dashboard/teachers",
          icon: <Users className="h-5 w-5" />,
        },
        {
          name: "Alunos",
          href: "/dashboard/students",
          icon: <GraduationCap className="h-5 w-5" />,
        },
        {
          name: "Empresas",
          href: "/dashboard/companies",
          icon: <Building2 className="h-5 w-5" />,
        },
      ],
    };

    const settingsItem = [
      {
        name: "Configurações",
        href: "/dashboard/settings",
        icon: <Settings className="h-5 w-5" />,
      },
    ];

    return [
      ...commonItems,
      ...(user?.role ? roleSpecificItems[user.role] || [] : []),
      ...settingsItem,
    ];
  };

  const navItems = getNavItems();

  return (
    <div className={sidebarClass}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Coins className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Moeda Estudantil</span>
            </Link>
            <button
              className="md:hidden text-gray-500 hover:text-gray-700"
              onClick={closeSidebar}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeSidebar}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-700 hover:bg-primary/10"
                  )}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="absolute right-0 w-1 h-8 bg-primary rounded-l-md"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t">
          <button
            onClick={logout}
            className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-gray-700 hover:bg-red-50 hover:text-red-600 w-full transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="ml-3">Sair</span>
          </button>
        </div>
      </div>
    </div>
  );
}