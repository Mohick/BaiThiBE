import type { Application } from "express-serve-static-core"
import RoutesAccount from "./Account/Account_User"
import chatApp from "./Chatting/Chatting"
import RoutesAdmin from "./Account/Account_Admin"
const RouterApp = (app: Application) => {
    app.use("/account", RoutesAccount)
    app.use("/chat",chatApp)
    app.use("/admin",RoutesAdmin)
}


export default RouterApp