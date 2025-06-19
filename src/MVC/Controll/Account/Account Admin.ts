import express from "express";
import AccountUser from "../../Model/Account/Account/Account User";
import AccountAdmin from "../../Model/Account/Account/Account Admin";
const RoutesAdmin = express.Router();

RoutesAdmin.get("/all-accounts", AccountUser.readToken, AccountUser.roleAccount, AccountAdmin.requestGetUserFromAdmin)
RoutesAdmin.post("/create-account", AccountUser.readToken, AccountUser.roleAccount, AccountAdmin.requestCreateAccountFromAdmin)
RoutesAdmin.patch("/update-account", AccountUser.readToken, AccountUser.roleAccount, AccountAdmin.requestUpdateAccountFromAdmin)
RoutesAdmin.delete("/delete-account:_id", AccountUser.readToken, AccountUser.roleAccount, AccountAdmin.requestDeleteAccountFromAdmin)


export default RoutesAdmin