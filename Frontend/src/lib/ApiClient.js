import axios from "axios";

const ApiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/",
    timeout: 4000,
    headers: {
        'Content-Type': 'application/json'
    },
})

export default ApiClient;