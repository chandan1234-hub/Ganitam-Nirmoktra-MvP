import axios from "axios";

const ApiClient = axios.create({
    // Same-origin by default so Vercel rewrites `/api/*` to the backend service.
    // Override with VITE_API_URL only when the API is on a different host (e.g. Docker).
    baseURL: import.meta.env.VITE_API_URL || "/",
    timeout: 4000,
    headers: {
        'Content-Type': 'application/json'
    },
})

export default ApiClient;