import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_PROD_BASE_URL_V1,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
})
console.log("API Base URL:", process.env.NEXT_PUBLIC_API_PROD_BASE_URL_V1);
export default api;