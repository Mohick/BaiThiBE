import express from "express";
import RuleAccount from "../../Model/Account/Account/Rule";
import AccountUser from "../../Model/Account/Account/Account User";
import register from "../../Model/Account/Account/Register";
import Login from "../../Model/Account/Account/Login";

const RoutesAccount = express.Router();

RoutesAccount.post("/register", RuleAccount.ruleRegister, register.wasCreate, register.register, AccountUser.sendToken)
RoutesAccount.get("/auto-login", AccountUser.readToken, AccountUser.roleAccount, Login.autoLogin, AccountUser.sendToken)
RoutesAccount.post("/login", RuleAccount.ruleLogin, Login.login, AccountUser.sendToken)
RoutesAccount.patch("/upload-avatar", AccountUser.readToken, AccountUser.roleAccount,AccountUser.uploadAvartar)
RoutesAccount.post("/require-reset-password", AccountUser.requireResetPassword)
RoutesAccount.patch("/reset-password", AccountUser.resetPassword)


export default RoutesAccount