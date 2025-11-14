import axiosClient from "@/lib/axiosClient";


export const reportsService = {
    getPatientWiseReport: async (FromDate,ToDate)=>{
        console.log('API called with:', {FromDate, ToDate});
        const response =  await axiosClient.get(`/api/Report/GetPatientWiseReport`,{
            params:{
                FromDate,
                ToDate
            }
        })
        console.log('API response:', response);
        return response.data;
    },
    getTreatmentWiseReport: async (FromDate,ToDate)=>{
        const response =  await axiosClient.get(`/api/Report/GetTreatmentWiseReport`,{
            params:{
                FromDate,
                ToDate
            }
        })
        return response.data;
    },
    getDateWiseReport: async (FromDate,ToDate)=>{
        const response =  await axiosClient.get(`/api/Report/GetDateWiseReport`,{
            params:{
                FromDate,
                ToDate
            }
        })
        return response.data;
    },
}