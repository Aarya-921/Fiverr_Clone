import axios from "axios";

const newRequest = axios.create({
    baseURL: "https://fiverr-clone-htr9.onrender.com/api",
    withCredentials: true
} );

export default newRequest