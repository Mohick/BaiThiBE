import { socket } from "./Connect Socket"






const sendChat = () =>{
    socket.on("chat", (data) => {
        console.log(data)
    })
}


export default sendChat