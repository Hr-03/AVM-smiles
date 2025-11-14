import axiosClient from "@/lib/axiosClient";

export const getMenuService = {
    getAllMenu: async (RoleId) => {
        const response = await axiosClient.get("/api/Menu/Getmenu",{
            params: {
                RoleId
            }
        })
        return response.data;
    },
    
}

