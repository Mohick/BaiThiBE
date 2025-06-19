import axios from "axios";
import { getCookie } from "../assets/get cookies/get cookies";




const AxiosIntandce = axios.create({
    baseURL: import.meta.env.VITE_URL_SERVER,
    withCredentials: true,
    headers: {
        authorization: `Bearer ${getCookie("token")}`
    }
})

export {
    AxiosIntandce
}