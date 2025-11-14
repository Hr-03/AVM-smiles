"use client";

import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function HeaderLayout({ onToggle, sidebarOpen }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <header
      className={cn(
        "fixed top-0 z-40 h-16 bg-card border-b border-border text-foreground flex items-center justify-between px-6 shadow-sm transition-all duration-300",
        sidebarOpen ? "left-64 w-[calc(100%-16rem)]" : "left-16 w-[calc(100%-4rem)]"
      )}
    >
      {/* Left Section: Menu + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggle}
          className="p-2 rounded-md hover:bg-accent transition-colors"
        >
          <Menu size={22} className="cursor-pointer"/>
        </button>
      </div>
        {/* <h1 className="text-lg font-semibold">Dashboard</h1> */}

      {/* Right Section: User + Logout */}
      <div className="flex items-center gap-3">
        <span className="text-sm">User</span>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full px-3 text-red-600 border-red-400 hover:bg-red-100 dark:hover:bg-red-950"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-1" /> Logout
        </Button>
      </div>
    </header>
  );
}
