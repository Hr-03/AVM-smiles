"use client";

import { getParameterTypeData } from '@/api/parameterType';
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState,useRef } from 'react'
import { useSelector } from 'react-redux';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';


 function ParameterType() {
  const parentRef = useRef(null);

  const router=useRouter();

    const parameterData = useSelector((state) => state.parameterType);

    const headerData = useSelector((state) => state.headerData);

console.log(parameterData);

console.log(headerData);



  const [user, setUser] = useState(null);


  useEffect(() => {
    const storedUser = localStorage.getItem("userID");
    setUser(storedUser);
  }, []);
    
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["parameterType",parameterData?.parameterTypeId,headerData?.region,user],
     queryFn: () =>
    getParameterTypeData(
      parameterData?.parameterTypeId,
      headerData?.region??"0",
      user
    ),
  enabled: !!parameterData && !!headerData && !!user,
    // staleTime: 1000 * 60 * 5, // optional cache time (5 mins)
  });


    const rowVirtualizer = useVirtualizer({
    count: data?.length ?? 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50, // height of one row
    overscan: 5, // render a few extra rows for smooth scrolling
  });
    
  return (
  <>
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 p-6 space-y-8 transition-colors duration-300">
<div className='m-0 flex font-semibold cursor-pointer' onClick={()=>router.back()}><ArrowLeft/> <span>Go back to Grouped data</span></div>
   <div className="pt-5 space-y-8">
        <Card className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border dark:border-gray-700 p-0">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">
              Branchwise Summary by {parameterData?.parameterName}
            </h3>

       <div className="w-full bg-gray-900 text-white rounded-md shadow-lg">
  {/* Header */}
  <div className="grid grid-cols-6 px-2 py-3 border-b border-gray-700 sticky top-0 bg-gray-900 z-20 font-semibold">
    <div className="text-left">Parameters</div>
    <div className="text-right">Yesterday</div>
    <div className="text-right">7 days</div>
    <div className="text-right">30 days</div>
    <div className="text-right">90 days</div>
    <div className="text-right">365 days</div>
  </div>

  {/* Virtualized scroll container */}
  <div
    ref={parentRef}
    className="h-[70vh] overflow-auto relative"
  >
    <div
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
        position: "relative",
      }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const parameters = data?.[virtualRow.index];
        return (
          <div
            key={virtualRow.index}
            className="grid grid-cols-6 px-2 py-2 border-b border-gray-700 hover:bg-gray-800 cursor-pointer"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <div className="font-semibold text-left">{parameters.clinicName}</div>
            <div className="text-right">{parameters.yesterday}</div>
            <div className="text-right">{parameters.days7}</div>
            <div className="text-right">{parameters.days30}</div>
            <div className="text-right">{parameters.days90}</div>
            <div className="text-right">{parameters.days365}</div>
          </div>
        );
      })}
    </div>
  </div>
</div>


          </CardContent>
        </Card>
        </div>
        </div>
  </>
  )
}

export default ParameterType
