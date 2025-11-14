"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { ChevronDown, ChevronRight } from "lucide-react";

import { useMenuData } from "@/hooks/useMenuData";
import { getUser } from "@/api/getUser";

export default function Sidebar({ open }) {
  let userDetails = getUser();
  const UserRole = userDetails?.userData?.roleName;

  const { data, isLoading } = useMenuData(UserRole);

  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuID) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuID]: !prev[menuID],
    }));
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-full transition-all duration-300 border-r border-border shadow-sm bg-card text-foreground",
        open ? "w-64" : "w-16"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-border">
        {open ? (
          <Image src="/AVM logo.png" width={80} height={80} alt="logo" />
        ) : (
          <span className="text-xl font-bold">AVM</span>
        )}
      </div>

      <nav className="mt-6 space-y-1">
        {data?.map((menu) => {
          const hasChildren = menu.menuChild && menu.menuChild.length > 0;

          if (!hasChildren) {
            return (
              <Link
                key={menu.menuID}
                href={menu.menuPath || "#"}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                  open ? "justify-start" : "justify-center"
                )}
              >
                <div className="w-6 h-6 flex items-center justify-center rounded bg-primary text-white text-xs">
                  {menu.menuName?.charAt(0)}
                </div>

                {open && <span>{menu.menuName}</span>}
              </Link>
            );
          }

          // ✔ Has Children → Show Collapsible
          return (
            <Collapsible
              key={menu.menuID}
              open={openMenus[menu.menuID]}
              onOpenChange={() => toggleMenu(menu.menuID)}
            >
              <CollapsibleTrigger asChild>
                <button
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-left"
                  )}
                >
                  <div className="w-6 h-6 flex items-center justify-center rounded bg-primary text-white text-xs">
                    {menu.menuName?.charAt(0)}
                  </div>

                  {open && (
                    <>
                      <span className="flex-1 text-sm font-medium">
                        {menu.menuName}
                      </span>
                      {openMenus[menu.menuID] ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </>
                  )}
                </button>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="ml-8 mt-1 flex flex-col space-y-1">
                  {menu.menuChild.map((child, i) => (
                    <Link
                      key={child.menuID}
                      href={child.menuPath || "#"}
                      className={cn(
                        "text-sm rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground transition-colors",
                        !open && "hidden"
                      )}
                    >
                      {child.menuName || `Child ${i + 1}`}
                    </Link>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </nav>
    </aside>
  );
}
