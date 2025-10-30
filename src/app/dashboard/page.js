"use client";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  BarChart as BarChartIcon,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Users,
  Activity,
  DollarSign,
  DivideSquare,
  DivideCircle,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  
  Tooltip,
  Pie,
  PieChart,
  Cell,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { IndianRupee } from "lucide-react";
import { useRouter } from "next/navigation";
import { setParameterType } from "@/store/slices/parameterType";
import { useDispatch } from "react-redux";
import { setHeaderData } from "@/store/slices/headerSlice";
import { getDashboardCountData } from "@/api/dashboardCount";
import { useQuery } from "@tanstack/react-query";

export default function DashboardPage() {
  const [region, setRegion] = useState("0");
  const [period, setPeriod] = useState("All");
  const router = useRouter(); // ✅ Initialize router
  const [user, setUser] = useState(null);


  useEffect(() => {
    const storedUser = localStorage.getItem("userID");
    setUser(storedUser);
  }, []);
    const { data, isLoading, error } = useDashboardData(region, user);


    const { data:dashCountData, isLoading:dashLoading, isError, error:dashError } = useQuery({
        queryKey: ["dashboardCount",region,user,period],
         queryFn: () =>
        getDashboardCountData(
          region,
          user,
          period
        ),
      enabled: !!region && !!user && !!period,
        // staleTime: 1000 * 60 * 5, // optional cache time (5 mins)
      });


      let cardsData= dashCountData?.[0]?.dashboardCounts?.[0];

      let piechartData=dashCountData?.[0]?.paiCharts;

      console.log(dashCountData?.[0]?.dashboardCounts?.[0]);
      

    const dispatch = useDispatch();


const groupedData=[
  {
    parameter:"Patients",
    D1:"124",
    W1:"560",
    M1:"2400",
    Q1:"7200",  
    Y1:"28800",
  },
  {
    parameter:"Procedures",
    D1:"89",
    W1:"400",
    M1:"1700",
    Q1:"5100",  
    Y1:"20400",
  },
  {
    parameter:"Revenue",
    D1:"₹2.8L",
    W1:"₹12.5L",
    M1:"₹50L",
    Q1:"₹1.5Cr",  
    Y1:"₹6Cr",
  },
  {
    parameter:"Revenue / Patient",
    D1:"₹2,250",
    W1:"₹2,232",
    M1:"₹2,083",
    Q1:"₹2,083",  
    Y1:"₹2,000",
  },
  {
    parameter:"Revenue / Procedure",
    D1:"₹3,150",
    W1:"₹3,125",
    M1:"₹2,941",
    Q1:"₹2,941",  
    Y1:"₹2,941",
  
  }
]


  const invoices = [
    {
      branch: "East",
      patients: "45",
      procedures: "28",
      turnover: "₹1.2L",
      expenditure: "₹0.5L",
      inventory: "₹0.3L",
    },
    {
      branch: "West",
      patients: "30",
      procedures: "25",
      turnover: "₹0.9L",
      expenditure: "₹0.4L",
      inventory: "₹0.2L",
    },
    {
      branch: "North",
      patients: "25",
      procedures: "20",
      turnover: "₹0.5L",
      expenditure: "₹0.3L",
      inventory: "₹0.15L",
    },
    {
      branch: "South",
      patients: "24",
      procedures: "16",
      turnover: "₹0.2L",
      expenditure: "₹0.2L",
      inventory: "₹0.1L",
    },
  ]

  const periods = [
    { id: "Yesterday", label: "Yesterday" },
    { id: "days7", label: "Last 7 Days" },
    { id: "days30", label: "30 Days" },
    { id: "days90", label: "90 Days" },
    { id: "days365", label: "365 Days" },
    { id: "All", label: "Grouped" },
  ];

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

  // Dummy data for charts
  const revenueGrowthData = [
    { month: "Jan", revenue: 40000 },
    { month: "Feb", revenue: 45000 },
    { month: "Mar", revenue: 47000 },
    { month: "Apr", revenue: 52000 },
    { month: "May", revenue: 58000 },
    { month: "Jun", revenue: 60000 },
    { month: "Jul", revenue: 65000 },
    { month: "Aug", revenue: 63000 },
    { month: "Sep", revenue: 68000 },
    { month: "Oct", revenue: 71000 }
  ];

  const revenueBreakupData = [
    { name: "General", value: 30000 },
    { name: "Braces", value: 45000 },
    { name: "Implants", value: 15000 },
    { name: "Aligners", value: 25000 },
  ];


  const formatted = piechartData?.map(item => ({
  name: item?.groupName,
  value: Number(item?.revenue),
}));


console.log(formatted);

  const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

  const inventorySummaryData = [
    { name: "Medicines", value: 520 },
    { name: "Equipment", value: 450 },
    { name: "Supplies", value: 200 },
    { name: "Consumables", value: 100 },
  ];


    const totalRevenue = revenueBreakupData.reduce((sum, item) => sum + item.value, 0);


    const handleLogout = () => {
  // Example logic — adjust for your app
  localStorage.removeItem("token");
    router.push("/"); 
};


  if (isLoading) return <p>Loading dashboard...</p>;
  if (error) return <p>Error: {error.message}</p>;


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 p-6 space-y-8 transition-colors duration-300">
      {/* Header */}
 {/* Header (Fixed) */}
<header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-gray-100/90 to-gray-200/90 dark:from-gray-900/80 dark:to-gray-950/80 backdrop-blur-md border-b border-gray-300 dark:border-gray-800 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
  <div className="flex gap-1 items-center">
    <LayoutDashboard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
    <span className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
      Dashboard
    </span>
  </div>

  <div className="flex flex-wrap gap-4 items-center">
    {/* Region Selector */}
    <Select onValueChange={(value)=>{
      setRegion(value)
      dispatch(setHeaderData({region:value,period:null}))
      }} value={region}>
      <SelectTrigger className="w-[160px] bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm text-sm font-medium">
        <SelectValue placeholder="Region" />
      </SelectTrigger>
      <SelectContent>
        {[{regionName:"All",regionValue:"0"},{regionName:"East",regionValue:"1"},{regionName:"West",regionValue:"2"},{regionName:"North",regionValue:"3"},{regionName:"South",regionValue:"4"},{regionName:"Central",regionValue:"5"}].map((r) => (
          <SelectItem key={r.regionValue} value={r.regionValue}>
            {r.regionName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

    {/* Period Buttons */}
    <div className="flex gap-2">
      {periods.map((p) => (
        <Button
          key={p.id}
          size="sm"
          variant={period === p.id ? "default" : "outline"}
          onClick={() =>{
             setPeriod(p.id)
      dispatch(setHeaderData({region:null,period:p.id}))
            
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
{period!=="All"?
<div className="pt-20 space-y-8">

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((item) =>
        
        {
          const stats = cardsData;
          console.log(stats);
          
  const value = stats?.[item?.key];
          return (
          <Card key={item.title} className="bg-white dark:bg-gray-800 text-center shadow-md hover:shadow-xl transition-all">
            <CardContent className="p-5 flex flex-col items-center space-y-2">
              <div>{item.icon}</div>
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {item.title}
              </p>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white"> {item.key.includes("revenue") ? `₹ ${Number(value).toLocaleString("en-IN")}` : value}
</h2>
            </CardContent>
          </Card>
        )})}
      </section>

      {/* Revenue Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Growth - Line Chart */}
        <Card className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border dark:border-gray-700 p-0">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Revenue Growth
            </h3>
           
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Breakup - Pie Chart */}
        <Card className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border dark:border-gray-700 p-0">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Revenue Breakup
            </h3>
            <div className="h-60 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={formatted}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                      label={({ name, value }) => `${name}: ₹${value.toLocaleString("en-IN")}`} // ✅ formatted label

                  >
                    {formatted?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Inventory & Expenditure */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Summary - Bar Chart */}
        <Card className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border dark:border-gray-700 p-0">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Inventory Consumption
            </h3>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={inventorySummaryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#22c55e" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Expenditure Breakdown - Table */}
        <Card className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border dark:border-gray-700 p-0">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Expenditure Breakdown
            </h3>
            <table className="w-full text-sm text-gray-700 dark:text-gray-300">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-600 text-left">
                  <th className="py-2">Heading</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Utilities</td><td>₹25,000</td></tr>
                <tr><td>Equipment</td><td>₹40,000</td></tr>
                <tr><td>Staff Salaries</td><td>₹1,20,000</td></tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>

      {/* Branch Summary */}
      <Card className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border dark:border-gray-700 p-0">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Branch Summary
          </h3>
          {/* <table className="w-full text-sm text-gray-700 dark:text-gray-300">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-600 text-left">
                <th>Branch</th>
                <th>Patients</th>
                <th>Procedures</th>
                <th>Turnover</th>
                <th>Expenditure</th>
                <th>Inventory</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>East</td><td>45</td><td>28</td><td>₹1.2L</td><td>₹0.5L</td><td>₹0.3L</td></tr>
              <tr><td>West</td><td>30</td><td>25</td><td>₹0.9L</td><td>₹0.4L</td><td>₹0.2L</td></tr>
              <tr><td>North</td><td>25</td><td>20</td><td>₹0.5L</td><td>₹0.3L</td><td>₹0.15L</td></tr>
              <tr><td>South</td><td>24</td><td>16</td><td>₹0.2L</td><td>₹0.2L</td><td>₹0.1L</td></tr>
            </tbody>
          </table> */}
           <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Branch</TableHead>
          <TableHead className="text-right">Patients</TableHead>
          <TableHead className="text-right">Procedures</TableHead>
          <TableHead className="text-right">Turnover</TableHead>
          <TableHead className="text-right">Expenditure</TableHead>
          <TableHead className="text-right">Inventory</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice,index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{invoice.branch}</TableCell>
            <TableCell className="text-right">{invoice.patients}</TableCell>
            <TableCell className="text-right">{invoice.procedures}</TableCell>
            <TableCell className="text-right">{invoice.turnover}</TableCell>
            <TableCell className="text-right">{invoice.expenditure}</TableCell>
            <TableCell className="text-right">{invoice.inventory}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">₹2.8L</TableCell>
          <TableCell className="text-right">₹1.4L</TableCell>
          <TableCell className="text-right">₹0.75L</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
        </CardContent>
      </Card>
      </div>:
      <div className="pt-20 space-y-8">
      <Card className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border dark:border-gray-700 p-0">
        <CardContent className="p-4">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">
            Overall Summary
          </h3>
           <Table className="border-1">
      <TableHeader>
        <TableRow className="bg-gray-200 dark:bg-gray-700">
          <TableHead className="w-[100px] border">Parameters</TableHead>
          <TableHead className="text-right border">Yesterday</TableHead>
          <TableHead className="text-right border">7 days</TableHead>
          <TableHead className="text-right border">30 days</TableHead>
          <TableHead className="text-right border">90 days</TableHead>
          <TableHead className="text-right border">365 days</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((grouped,index) => (
          <TableRow key={index} className="bg-blue-500/10 hover:bg-blue-500/20 border-t-black/5">
            <TableCell className="font-medium border underline hover:text-blue-400 hover:cursor-pointer" onClick={()=>{
              router.push(`/dashboard/parameters/${grouped.type}`)
             dispatch(setParameterType({
                parameterName:grouped.parameters,
                parameterTypeId:grouped.type
              }))
            }}>{grouped.parameters}</TableCell>     
            <TableCell className="text-right border">{grouped.yesterday}</TableCell>
            <TableCell className="text-right border">{grouped.days7}</TableCell>
            <TableCell className="text-right border">{grouped.days30}</TableCell>
            <TableCell className="text-right border">{grouped.days90}</TableCell>
            <TableCell className="text-right border">{grouped.days365}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter className="bg-gray-100 dark:bg-gray-700">
        <TableRow>
          <TableCell colSpan={3} className="border">Total</TableCell>
          <TableCell className="text-right border">₹</TableCell>
          <TableCell className="text-right border">₹1.4L</TableCell>
          <TableCell className="text-right border">₹0.75L</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
        </CardContent>
      </Card>
      </div>
      }

    </div>
  );
}
