"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const mainContentClass = cn(
    "main-content",
    isMobileSidebarOpen ? "sidebar-open" : ""
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        isMobileSidebarOpen={isMobileSidebarOpen}
        setIsMobileSidebarOpen={setIsMobileSidebarOpen}
      />
      
      <div className={mainContentClass}>
        <Header
          isMobileSidebarOpen={isMobileSidebarOpen}
          setIsMobileSidebarOpen={setIsMobileSidebarOpen}
        />
        
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-6"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}