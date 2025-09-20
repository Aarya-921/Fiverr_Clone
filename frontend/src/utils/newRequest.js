import axios from "axios";

const newRequest = axios.create({
    baseURL: "https://fiverr-clone-x1hg.onrender.com/api",
    withCredentials: true
} );

export default newRequest