import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL || "http://ec2-16-170-207-123.eu-north-1.compute.amazonaws.com:8080";

const instance = axios.create({
    baseURL: `${baseUrl}`
})

export default instance;