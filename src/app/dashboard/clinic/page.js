"use client";
import { getUser } from '@/api/getUser';
import GenericTable from '@/components/common/GenericTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { useDoctorsData } from '@/hooks/useDoctorsData';
import { Select } from '@radix-ui/react-select';
import { useQuery } from '@tanstack/react-query';
import { DivideCircle } from 'lucide-react';
import { DivideSquare } from 'lucide-react';
import { Activity } from 'lucide-react';
import { Check } from 'lucide-react';
import { ChevronsUpDown } from 'lucide-react';
import { IndianRupee } from 'lucide-react';
import { Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function page() {
  const router = useRouter(); // ✅ Initialize router
  const [user, setUser] = useState(null);

    let userDetails=getUser();


  const UserID=userDetails?.userData?.userId;
  const UserRole=userDetails?.userData?.roleName;
console.log(UserID);

  const {data:DoctorsList,isLoading,isError:DoctorListError} = useDoctorsData(UserID)


  console.log(DoctorsList);
  





     const { data:dashCountData, isLoading:dashLoading, isError, error:dashError } = useQuery({
            queryKey: ["dashboardCount",user],
             queryFn: () =>
            getDashboardCountData(
              region,
              user,
              period
            ),
          enabled:!!user,
            // staleTime: 1000 * 60 * 5, // optional cache time (5 mins)
          });
    
    
          let cardsData= dashCountData?.[0]?.dashboardCounts?.[0];


     const statCards = [
        {
          title: "Patients",
          value: "124",
          key: "patients",
          icon: <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
        },
        {
          title: "Procedures",
          value: "89",
          key: "procedures",
          icon: <Activity className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
        },
        {
          title: "Revenue",
          value: "₹ 2.8L",
          key: "revenue",
          icon: <IndianRupee  className="w-5 h-5 text-green-600 dark:text-green-400" />,
        },
        {
          title: "Revenue / Patient",
          value: "₹ 2,250",
          key: "revenuePatient",
          icon: <DivideSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
        },
        {
          title: "Revenue / Procedure",
          value: "₹ 3,150",
          key: "revenueProcedure",
          icon: <DivideCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
        },
      ];


      const data=[
        {
        rpl: "Patients",
        d1: 25,
        d2: 30,
        d3: 28,
        },
        {
        rpl: "Leads",
        d1: 15,
        d2: 18,
        d3: 20,
        },
      ]


        const columns = [
          {
            accessorKey: "rpl",
            header: "",
            cell: ({ row }) => (
              <span
              
                // className="underline text-blue-600 dark:text-blue-400 hover:text-blue-500 hover:cursor-pointer"
              >
                {row.original.rpl}
              </span>
            ),
          },
          ...["d1","d2","d3"].map((key) => ({
            accessorKey: key.toUpperCase(),
            cell: ({ getValue }) => {
              const val = getValue();
              return val ? Number(val).toLocaleString("en-IN") : "-";
            },
             sortingFn: "alphanumeric", 
          })),
        ];


         const columnsWeeks = [
          {
            accessorKey: "rpl",
            header: "",
            cell: ({ row }) => (
              <span
              
                // className="underline text-blue-600 dark:text-blue-400 hover:text-blue-500 hover:cursor-pointer"
              >
                {row.original.rpl}
              </span>
            ),
          },
          ...["w1","w2","w3"].map((key) => ({
            accessorKey: key.toUpperCase(),
            cell: ({ getValue }) => {
              const val = getValue();
              return val ? Number(val).toLocaleString("en-IN") : "-";
            },
             sortingFn: "alphanumeric", 
          })),
        ];


         const columnsMonths = [
          {
            accessorKey: "rpl",
            header: "",
            cell: ({ row }) => (
              <span
              
                // className="underline text-blue-600 dark:text-blue-400 hover:text-blue-500 hover:cursor-pointer"
              >
                {row.original.rpl}
              </span>
            ),
          },
          ...["m1","m2","m3"].map((key) => ({
            accessorKey: key.toUpperCase(),
            cell: ({ getValue }) => {
              const val = getValue();
              return val ? Number(val).toLocaleString("en-IN") : "-";
            },
             sortingFn: "alphanumeric", 
          })),
        ];


         const columnsQuarters = [
          {
            accessorKey: "rpl",
            header: "",
            cell: ({ row }) => (
              <span
              
                // className="underline text-blue-600 dark:text-blue-400 hover:text-blue-500 hover:cursor-pointer"
              >
                {row.original.rpl}
              </span>
            ),
          },
          ...["q1","q2","q3"].map((key) => ({
            accessorKey: key.toUpperCase(),
            cell: ({ getValue }) => {
              const val = getValue();
              return val ? Number(val).toLocaleString("en-IN") : "-";
            },
             sortingFn: "alphanumeric", 
          })),
        ];

         const columnsYears = [
          {
            accessorKey: "rpl",
            header: "",
            cell: ({ row }) => (
              <span
              
                // className="underline text-blue-600 dark:text-blue-400 hover:text-blue-500 hover:cursor-pointer"
              >
                {row.original.rpl}
              </span>
            ),
          },
          ...["y1","y2","y3"].map((key) => ({
            accessorKey: key.toUpperCase(),
            cell: ({ getValue }) => {
              const val = getValue();
              return val ? Number(val).toLocaleString("en-IN") : "-";
            },
             sortingFn: "alphanumeric", 
          })),
        ];


         const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")


    if (isLoading) return <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
<Spinner/></div>;

  return (
   <>
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 p-6 space-y-8 transition-colors duration-300">
   <header className="w-full bg-black dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm px-6 py-4 mb-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Left Section */}
      {/* <div className="flex items-center gap-2">
        <LayoutDashboard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight">
          Dashboard
        </h1>
      </div> */}

      {/* Right Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-end">
        {/* Region Selector */}
        {/* <Select
        //   onValueChange={(value) => {
        //     setRegion(value);
        //     dispatch(setHeaderData({ region: value, period: null }));
        //   }}
        //   value={region}
        >
          <SelectTrigger className="w-[160px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-sm font-medium">
            <SelectValue placeholder="Doctor" />
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
        </Select> */}
<Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? DoctorsList?.find((framework) => framework.doctorID === value)?.doctorName
            : "Select Doctor..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search doctor..." className="h-9" />
          <CommandList>
            <CommandEmpty>No Doctor found.</CommandEmpty>
            <CommandGroup>
              {DoctorsList?.map((framework) => (
                <CommandItem
                  key={framework.doctorID}
                  value={framework.doctorName}
                  onSelect={(currentValue) => {
                    setValue(framework.doctorID === value ? "" : framework.doctorID)
                    setOpen(false)
                  }}
                >
                  {framework?.doctorName}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework?.doctorID ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
        
       
      </div>
    </header>



    <div className="pt-4 space-y-8">
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((item) =>
        
        {
          // const stats = cardsData;
          // console.log(stats);
          
  // const value = stats?.[item?.key];
          return (
          <Card key={item.title} className="bg-white dark:bg-gray-800 text-center shadow-md hover:shadow-xl transition-all">
            <CardContent className="p-5 flex flex-col items-center space-y-2">
              <div>{item.icon}</div>
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {item.title}
              </p>
              <h2 className="text-l whitespace-nowrap font-bold text-gray-900 dark:text-white"> {item.key.includes("revenue") ? `₹ ${Number(value).toLocaleString("en-IN")}` : value}
</h2>
            </CardContent>
          </Card>
        )})}
      </section>

<section className='grid grid-cols-2 gap-4'>
<Card className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border dark:border-gray-700 p-0 transition-all">
                <CardContent className="p-4">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">
                    Last 3 days Summary
                  </h3>
    
                 <GenericTable data={data} columns={columns}  showSorting={false} showPagination={false} />
    </CardContent>
    </Card>
<Card className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border dark:border-gray-700 p-0 transition-all">
                <CardContent className="p-4">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">
                    Last 3 Weeks Summary
                  </h3>
    
                 <GenericTable data={data} columns={columnsWeeks}  showSorting={false} showPagination={false}/>
    </CardContent>
    </Card>
<Card className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border dark:border-gray-700 p-0 transition-all">
                <CardContent className="p-4">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">
                    Last 3 Months Summary
                  </h3>
    
                 <GenericTable data={data} columns={columnsMonths}  showSorting={false} showPagination={false}/>
    </CardContent>
    </Card>
<Card className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border dark:border-gray-700 p-0 transition-all">
                <CardContent className="p-4">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">
                    Last 3 Quarters Summary
                  </h3>
    
                 <GenericTable data={data} columns={columnsQuarters}  showSorting={false} showPagination={false}/>
    </CardContent>
    </Card>
<Card className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border dark:border-gray-700 p-0 transition-all">
                <CardContent className="p-4">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">
                    Last 3 Years Summary
                  </h3>
    
                 <GenericTable data={data} columns={columnsYears}  showSorting={false} showPagination={false}/>
    </CardContent>
    </Card>
</section>
    </div>
   </div>
   </>
  )
}

export default page
