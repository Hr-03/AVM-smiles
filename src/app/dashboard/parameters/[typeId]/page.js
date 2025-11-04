"use client";

import { getParameterTypeData } from "@/api/parameterType";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function ParameterType() {
  const router = useRouter();
  const parameterData = useSelector((state) => state.parameterType);
  const headerData = useSelector((state) => state.headerData);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userID");
    setUser(storedUser);
  }, []);

  const { data, isLoading } = useQuery({
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

  if (isLoading) return <div className="text-center p-4">Loading...</div>;

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

          {/* ✅ Scrollable + Non-wrapping Table */}
          <div className="w-full overflow-x-auto rounded-lg border border-gray-700">
            <Table className="min-w-[1100px] text-sm">
              <TableHeader className="bg-gray-900 text-white sticky top-0 z-10">
                <TableRow>
                  <TableHead className="text-left font-semibold w-[220px] whitespace-nowrap">
                    Parameters
                  </TableHead>
                  <TableHead className="text-center whitespace-nowrap w-[80px]">
                    D1
                  </TableHead>
                  <TableHead className="text-center whitespace-nowrap w-[80px]">
                    D2
                  </TableHead>
                  <TableHead className="text-center whitespace-nowrap w-[80px]">
                    W1
                  </TableHead>
                  <TableHead className="text-center whitespace-nowrap w-[80px]">
                    W2
                  </TableHead>
                  <TableHead className="text-center whitespace-nowrap w-[80px]">
                    M1
                  </TableHead>
                  <TableHead className="text-center whitespace-nowrap w-[80px]">
                    M2
                  </TableHead>
                  <TableHead className="text-center whitespace-nowrap w-[80px]">
                    Q1
                  </TableHead>
                  <TableHead className="text-center whitespace-nowrap w-[80px]">
                    Q2
                  </TableHead>
                  <TableHead className="text-center whitespace-nowrap w-[80px]">
                    W1/W2
                  </TableHead>
                  <TableHead className="text-center whitespace-nowrap w-[80px]">
                    M1/M2
                  </TableHead>
                  <TableHead className="text-center whitespace-nowrap w-[80px]">
                    Q1/Q2
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data?.map((row, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-800/50 border-b border-gray-700 text-gray-100"
                  >
                    <TableCell className="text-left font-semibold whitespace-nowrap">
                      {row.clinicName}
                    </TableCell>
                    <TableCell className="text-center">{row.d1}</TableCell>
                    <TableCell className="text-center">{row.d2}</TableCell>
                    <TableCell className="text-center">{row.w1}</TableCell>
                    <TableCell className="text-center">{row.w2}</TableCell>
                    <TableCell className="text-center">{row.m1}</TableCell>
                    <TableCell className="text-center">{row.m2}</TableCell>
                    <TableCell className="text-center">{row.q1}</TableCell>
                    <TableCell className="text-center">{row.q2}</TableCell>
                    <TableCell className="text-center">{row.w1w2}</TableCell>
                    <TableCell className="text-center">{row.m1m2}</TableCell>
                    <TableCell className="text-center">{row.q1q2}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ParameterType;
