"use client";
import { LayoutDashboard, LogOut } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setHeaderData } from "@/store/slices/headerSlice";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [region, setRegion] = useState("0");
  const [period, setPeriod] = useState("All");

  const periods = [
    { id: "D1", label: "Yesterday" },
    { id: "W1", label: "Last 7 Days" },
    { id: "M1", label: "30 Days" },
    { id: "Q1", label: "90 Days" },
    { id: "Y1", label: "365 Days" },
    { id: "All", label: "Grouped" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-gray-100/90 to-gray-200/90 dark:from-gray-900/80 dark:to-gray-950/80 backdrop-blur-md border-b border-gray-300 dark:border-gray-800 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex gap-1 items-center">
        <LayoutDashboard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <span className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Dashboard
        </span>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <Select
          onValueChange={(value) => {
            setRegion(value);
            dispatch(setHeaderData({ region: value, period: null }));
          }}
          value={region}
        >
          <SelectTrigger className="w-[160px] bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm text-sm font-medium">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            {[
              { regionName: "All", regionValue: "0" },
              { regionName: "East", regionValue: "1" },
              { regionName: "West", regionValue: "2" },
              { regionName: "North", regionValue: "3" },
              { regionName: "South", regionValue: "4" },
              { regionName: "Central", regionValue: "5" },
            ].map((r) => (
              <SelectItem key={r.regionValue} value={r.regionValue}>
                {r.regionName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          {periods.map((p) => (
            <Button
              key={p.id}
              size="sm"
              variant={period === p.id ? "default" : "outline"}
              onClick={() => {
                setPeriod(p.id);
                dispatch(setHeaderData({ region: null, period: p.id }));
              }}
              className="rounded-full px-4"
            >
              {p.label}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="rounded-full px-3 text-red-600 border-red-400 hover:bg-red-100 dark:hover:bg-red-950 hover:cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-1" /> Logout
        </Button>
      </div>
    </header>
  );
}
