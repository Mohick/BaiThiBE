import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import { createServer } from 'http';
import { Server } from 'socket.io';
const app = express();
const PORT = process.env.PORT || 3000;
import morgan from "morgan";
import RouterApp from "./src/MVC/Controll/Router";
import { connectDB } from "./src/DB/ConnectDB";
import cookieParser from "cookie-parser";
connectDB();
app.use(morgan("combined"));
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST","PATCH","DELETE"],
    credentials: true
}));
// 👇 Middleware để parse JSON từ client
app.use(express.json());
app.use(cookieParser());
// Nếu bạn cần đọc dữ liệu từ form-urlen coded:
app.use(express.urlencoded({ extended: true }));
const server = createServer(app);
const io = new Server(server, { cors: { origin: process.env.CLIENT_URL, methods: ["GET", "POST"], credentials: true } });
io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
    socket.on("chat", (data) => {
      
    })
});
export { io };


RouterApp(app);
server.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
});

