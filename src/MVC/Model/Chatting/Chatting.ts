import type { NextFunction, Response, Request } from "express";
import { io } from "../../../..";








const chatApps = {
    messages: [] as {
        message: string,
        id: string,
        time: string
    }[],
    sendChat: async (getNext: { valid: boolean, id: string, reFreshToken: boolean, account: any }, req: Request, res: Response, next: NextFunction) => {
        try {
            const { message } = req.body as { message: string };
            if (message && getNext) {
                
                chatApps.messages.push({
                    message: message as string,
                    id: getNext.id as string,
                    time: new Date().toLocaleString()
                });
                console.log(chatApps);
                if (chatApps.messages.length > 50) {
                    chatApps.messages.shift()
                };
                io.emit("chat", chatApps.messages);
                res.status(200).json({ message: "ok" });
            } else {
                res.status(400).json({ message: "méo có tin nhắn gửi cái căn cọt " })
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Lỗi server nội bộ" })
        }
    },
    getChat: async (getNext: { valid: boolean, id: string, reFreshToken: boolean, account: any }, req: Request, res: Response, next: NextFunction) => {
        if (getNext) {
            res.status(200).json({ messages: chatApps.messages });
        }
    }
}
export default chatApps