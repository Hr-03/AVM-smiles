import { useEffect, useState } from "react";

export const getUser=()=>{
      const [user, setUser] = useState(null);
    
    
      useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
      }, []);

      return user;
}