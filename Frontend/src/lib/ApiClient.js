import axios from "axios";

const ApiClient = axios.create({
    baseURL: "http://localhost:3000/",
    timeout: 4000,
    headers: {
        'Content-Type': 'application/json'
    },
})

export default ApiClient;