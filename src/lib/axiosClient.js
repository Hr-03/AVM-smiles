import axios from "axios";

const axiosClient = axios.create({
baseURL:"https://orthosquareportal.com/ManagementApi",    
});

axiosClient.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization=`Bearer ${token}`;
    // Clean empty params: remove keys with undefined, null or empty string values
    if (config.params && typeof config.params === 'object') {
        Object.keys(config.params).forEach((key) => {
            const val = config.params[key];
            if (val === undefined || val === null) {
                delete config.params[key];
            } else if (typeof val === 'string' && val.trim() === '') {
                delete config.params[key];
            }
        });
        // If no params remain, delete the params object entirely
        if (Object.keys(config.params).length === 0) delete config.params;
    }

    return config;
});

export default axiosClient;