"use client";

import { getParameterTypeData } from "@/api/parameterType";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useVirtualizer } from "@tanstack/react-virtual";

function ParameterType() {
  const router = useRouter();
  const parameterData = useSelector((state) => state.parameterType);
  const headerData = useSelector((state) => state.headerData);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userID");
    setUser(storedUser);
  }, []);

  const { data = [], isLoading } = useQuery({
    queryKey: [
      "parameterType",
      parameterData?.parameterTypeId,
      headerData?.region,
      user,
    ],
    queryFn: () =>
      getParameterTypeData(
        headerData?.region ?? "0",
        user,
        parameterData?.parameterTypeId
      ),
    enabled: !!parameterData && !!headerData && !!user,
  });

  const parentRef = useRef(null);
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 42, // row height
    overscan: 8,
  });

  if (isLoading) return <div className="text-center p-4">Loading...</div>;

  // Define consistent column widths (match header & rows)
// First column wider for clinic name, rest fixed
const gridTemplate = "220px repeat(14, 80px)";


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 p-6 space-y-8 transition-colors duration-300">
      <div
        className="m-0 flex items-center gap-2 font-semibold cursor-pointer text-gray-800 dark:text-gray-100"
        onClick={() => router.back()}
      >
        <ArrowLeft size={18} /> <span>Go back to Grouped data</span>
      </div>

      <Card className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border dark:border-gray-700">
        <CardContent className="p-4">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">
            Branchwise Summary by {parameterData?.parameterName}
          </h3>

     <div
  className="relative w-full overflow-x-auto overflow-y-hidden rounded-lg border border-gray-300 dark:border-gray-700 whitespace-nowrap"
  style={{
    height: "70vh",
    maxWidth: "100%", // ensure it stays within card
  }}
>
  <div
    ref={parentRef}
    className="overflow-y-auto"
    style={{
      height: "100%",
      width: "max-content", // keep columns on one line
      minWidth: "100%", // prevent table shrinking smaller than card
    }}
  >
    {/* ✅ Fixed header row */}
    <div
className="sticky top-0 z-10 font-semibold grid bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white"
      style={{
        gridTemplateColumns: gridTemplate,
      }}
    >
      <div className="px-3 py-2 border-r border-gray-700"></div>
      {[
        "D1", "D2", "W1", "W2", "M1", "M2", "Q1", "Q2",
        "Y1", "Y2", "W1/W2", "M1/M2", "Q1/Q2", "Y1/Y2",
      ].map((h) => (
        <div
          key={h}
          className="px-3 py-2 text-center border-r border-gray-700 whitespace-nowrap"
        >
          {h}
        </div>
      ))}
    </div>

    {/* ✅ Virtualized body */}
    <div
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
        position: "relative",
      }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const row = data[virtualRow.index];
        return (
          <div
            key={virtualRow.key}
            ref={rowVirtualizer.measureElement}
className="grid border-b border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-900 dark:text-gray-100 text-sm absolute w-full"
            style={{
              gridTemplateColumns: gridTemplate,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <div className="px-3 py-2 font-semibold border-r border-gray-700 truncate">
              {row.clinicName}
            </div>
            <div className="text-center px-2 py-2 border-r border-gray-700">{row.d1}</div>
            <div className="text-center px-2 py-2 border-r border-gray-700">{row.d2}</div>
            <div className="text-center px-2 py-2 border-r border-gray-700">{row.w1}</div>
            <div className="text-center px-2 py-2 border-r border-gray-700">{row.w2}</div>
            <div className="text-center px-2 py-2 border-r border-gray-700">{row.m1}</div>
            <div className="text-center px-2 py-2 border-r border-gray-700">{row.m2}</div>
            <div className="text-center px-2 py-2 border-r border-gray-700">{row.q1}</div>
            <div className="text-center px-2 py-2 border-r border-gray-700">{row.q2}</div>
            <div className="text-center px-2 py-2 border-r border-gray-700">{row.y1}</div>
            <div className="text-center px-2 py-2 border-r border-gray-700">{row.y2}</div>
            <div className="text-center px-2 py-2 border-r border-gray-700">{row.w1W2}</div>
            <div className="text-center px-2 py-2 border-r border-gray-700">{row.m1M2}</div>
            <div className="text-center px-2 py-2 border-r border-gray-700">{row.q1Q2}</div>
            <div className="text-center px-2 py-2">{row.y1Y2}</div>
          </div>
        );
      })}
    </div>
  </div>
</div>

        </CardContent>
      </Card>
    </div>
  );
}

export default ParameterType;
