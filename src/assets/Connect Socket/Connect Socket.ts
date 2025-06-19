import { io } from "socket.io-client";



const socket = io(import.meta.env.VITE_URL_SERVER,{
    withCredentials: true
});

export {
    socket
}