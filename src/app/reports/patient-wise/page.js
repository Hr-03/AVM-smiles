"use client";
import { reportsService } from '@/api/reports.service';
import GenericTable from '@/components/common/GenericTable'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react'

function page() {



    const [fromDate, setfromDate] = useState("");
    const [toDate, settoDate] = useState("");




    const {data,isLoading,isError} = useQuery({
        queryKey: ['patientWiseReport',fromDate,toDate],
        queryFn: () => reportsService.getPatientWiseReport(fromDate,toDate),
        // enabled: !!fromDate && !!toDate,
    })


    console.log(data);
      console.log('Query enabled:', !!fromDate && !!toDate);
      console.log('From date:', fromDate, 'To date:', toDate);
    
     const columns = useMemo(
        () => [
          {
            header: "Clinic Name",
            accessorKey: "clinicName",
          },
          {
            header:"No. of Leads",
            accessorKey:"noOfLeads"
          },
          {
            header:"No. of Patients",
            accessorKey:"noOfPatients"
          },
          {
            header:"Revenue",
            accessorKey:"revenue"
          },
          {
            header:"Procedure",
            accessorKey:"procedure"
          },
          {
            header:"Revenue per Patient",
            accessorKey:"revenuePerPatient"
          }

        ],
        []
      );
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 p-6 space-y-8 transition-colors duration-300">
      {/* Back button */}
      {/* <div
        className="m-0 flex items-center gap-2 font-semibold cursor-pointer text-gray-800 dark:text-gray-100"
        onClick={() => router.back()}
      >
        <ArrowLeft size={18} /> <span>Go back to Grouped data</span>
      </div> */}

      {/* Card */}
      <Card className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border dark:border-gray-700">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
            Patient Wise Report
          </h3>

          {/* Date Range Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="fromDate">From Date</Label>
              <Input
                id="fromDate"
                type="date"
                value={fromDate}
                onChange={(e) => setfromDate(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="toDate">To Date</Label>
              <Input
                id="toDate"
                type="date"
                value={toDate}
                onChange={(e) => settoDate(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {/* Loading state */}
          {isLoading && <div className="text-center text-gray-600 dark:text-gray-300">Loading report...</div>}

          {/* Error state */}
          {isError && <div className="text-center text-red-600">Error loading report</div>}

          {/* No data state */}
          {!isLoading && !data && <div className="text-center text-gray-500">Select dates to generate report</div>}

          {/* Table */}
          {data && <GenericTable columns={columns} data={data} />}
        </CardContent>
      </Card>
    </div>
    </>
  )
}

export default page
