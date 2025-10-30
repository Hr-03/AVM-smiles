import axiosClient from "@/lib/axiosClient";

export const getDashboardCountData = async (Regions,UserId,Type) => {
    const response = await axiosClient.get(`/api/Dashboard/GetAllDashboard`,{
        params:{
            Regions,
            UserId,
            Type
        }
    })

return response.data;
};