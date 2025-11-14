import { useQuery } from "@tanstack/react-query";
import { getMenuService } from "@/api/menu.service";


export const useMenuData = (RoleId) => {
    return useQuery({
        queryKey: ['menuData', RoleId],
        queryFn: () => getMenuService.getAllMenu(RoleId),
        enabled: !!RoleId,
    })
}