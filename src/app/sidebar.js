"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Home,
  Settings,
  ChevronDown,
  ChevronRight,
  Users,
  BarChart2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Image from "next/image";

export default function Sidebar({ open }) {
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-full transition-all duration-300 border-r border-border shadow-sm bg-card text-foreground",
        open ? "w-64" : "w-16"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-border">
        <span className="text-xl font-bold">{open ? <Image src="/AVM logo.png" width={80} height={80}/> : "AVM"}</span>
      </div>

      <nav className="mt-6 space-y-1">
        {/* Dashboard */}
        <SidebarItem href="/dashboard" icon={<Home size={20} />} label="Dashboard" open={open} />

        {/* <Collapsible open={analyticsOpen} onOpenChange={setAnalyticsOpen}>
          <CollapsibleTrigger asChild>
            <button
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                "text-left"
              )}
            >
              <BarChart2 size={20} />
              {open && (
                <>
                  <span className="flex-1 text-sm font-medium">Analytics</span>
                  {analyticsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </>
              )}
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="ml-8 mt-1 flex flex-col space-y-1">
              <SidebarSubItem href="/analytics/overview" label="Overview" open={open} />
              <SidebarSubItem href="/analytics/reports" label="Reports" open={open} />
              <SidebarSubItem href="/analytics/insights" label="Insights" open={open} />
            </div>
          </CollapsibleContent>
        </Collapsible>

       <SidebarItem href="/users" icon={<Users size={20} />} label="Users" open={open} />

        <SidebarItem href="/settings" icon={<Settings size={20} />} label="Settings" open={open} />
      */}
     
      </nav>
    </aside>
  );
}

/* ------------------ Sidebar Item Components ------------------ */

function SidebarItem({ href, icon, label, open }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
        open ? "justify-start" : "justify-center"
      )}
    >
      {icon}
      {open && <span>{label}</span>}
    </Link>
  );
}

function SidebarSubItem({ href, label, open }) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground transition-colors",
        !open && "hidden"
      )}
    >
      {label}
    </Link>
  );
}
