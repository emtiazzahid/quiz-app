import axios from "axios";
 
export const axiosConnection = axios.create({
    baseURL: import.meta.env.VUE_APP_API_URL
})