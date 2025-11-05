"use client";

import { getParameterTypeData } from "@/api/parameterType";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import GenericTable from "@/components/common/GenericTable";

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

  const columns = useMemo(
    () => [
      {
        header: "Clinic Name",
        accessorKey: "clinicName",
        cell: (info) => (
          <div className="text-left font-semibold text-gray-900 dark:text-gray-100">
            {info.getValue()}
          </div>
        ),
      },
      ...[
        "d1",
        "d2",
        "w1",
        "w2",
        "m1",
        "m2",
        "q1",
        "q2",
        "y1",
        "y2",
        "w1W2",
        "m1M2",
        "q1Q2",
        "y1Y2",
      ].map((key) => ({
        header: key.toUpperCase(),
        accessorKey: key,
        cell: (info) => (
          <div className="text-center text-gray-900 dark:text-gray-100">
            {info.getValue()}
          </div>
        ),
      })),
    ],
    []
  );

  if (isLoading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 p-6 space-y-8 transition-colors duration-300">
      {/* Back button */}
      <div
        className="m-0 flex items-center gap-2 font-semibold cursor-pointer text-gray-800 dark:text-gray-100"
        onClick={() => router.back()}
      >
        <ArrowLeft size={18} /> <span>Go back to Grouped data</span>
      </div>

      {/* Card */}
      <Card className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border dark:border-gray-700">
        <CardContent className="p-4">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">
            Branchwise Summary by {parameterData?.parameterName}
          </h3>

          {/* ✅ Generic Table */}
          <GenericTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}

export default ParameterType;
