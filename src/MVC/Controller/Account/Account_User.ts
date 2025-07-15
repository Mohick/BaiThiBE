import express from "express";
import AccountUser from "../../Model/Account/Account_User";
import Login from "../../Model/Account/Login";
import register from "../../Model/Account/Register";
import RuleAccount from "../../Model/Account/Rule";

const RoutesAccount = express.Router();

RoutesAccount.post("/register", RuleAccount.ruleRegister, register.wasCreate, register.register, AccountUser.sendToken)
RoutesAccount.get("/auto-login", AccountUser.readToken, AccountUser.roleAccount, Login.autoLogin, AccountUser.sendToken)
RoutesAccount.post("/login", RuleAccount.ruleLogin, Login.login,AccountUser.sendToken)
RoutesAccount.patch("/upload-avatar", AccountUser.readToken, AccountUser.roleAccount,AccountUser.uploadAvartar)
RoutesAccount.post("/require-reset-password", AccountUser.requireResetPassword)
RoutesAccount.patch("/reset-password", AccountUser.resetPassword)
RoutesAccount.delete("/delete-account", AccountUser.readToken, AccountUser.roleAccount, AccountUser.deleteAccount)



export default RoutesAccount