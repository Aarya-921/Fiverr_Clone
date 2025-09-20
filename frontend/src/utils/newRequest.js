import axios from "axios";

const newRequest = axios.create({
    baseURL: "http://localhost:2190/api",
    withCredentials: true
} );

export default newRequest