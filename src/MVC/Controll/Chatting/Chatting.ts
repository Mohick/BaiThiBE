import express from "express";
import Account from "../../Model/Account/Account/Account User";
import chatApps from "../../Model/Chatting/Chatting";
const chatApp = express.Router();

chatApp.post("/send-message", Account.readToken, Account.wasLogin,chatApps.sendChat)
chatApp.get("/get-sessage/:id",Account.readToken, Account.wasLogin,)
chatApp.get("/get-sessage",Account.readToken, Account.wasLogin,chatApps.getChat)
export default chatApp