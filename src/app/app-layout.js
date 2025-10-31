"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Sidebar from "./sidebar";
import HeaderLayout from "./headerlayout";

export default function AppLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isLoginPage = pathname === "/";

  if (isLoginPage) return children;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} />

      {/* Content */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <HeaderLayout onToggle={() => setSidebarOpen(!sidebarOpen)}           sidebarOpen={sidebarOpen}
 />
        <main className="flex-1 mt-15">{children}</main>
      </div>
    </div>
  );
}
