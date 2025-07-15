import type { NextFunction, Request, Response } from "express";
import modelsAccount from "../../../Schema/Account/Account";
import { hashStr } from "./Secure";


const register = {
    register: async (getNext: { valid: boolean }, req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, email, password } = req.body as { username: string, email: string, password: string } | any;
            if (getNext.valid) {
                let hashPassword: string | any = await hashStr(password);
                const newAccount = new modelsAccount({ username, email, password:hashPassword });
                await newAccount.save();
                next({
                    valid: true,
                    id: newAccount._id
                })
            } else {
                res.status(400).json({ message: "Tài khoản không hợp lệ" })
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Lỗi server nội bộ" })
        }
    },
    wasCreate: async (getNext: { valid: boolean, id: string }, req: Request, res: Response, next: NextFunction) => {
        try {
            if (getNext.valid) {
                const { email, username } = req.body as { username: string, email: string, password: string } | any;
                const account = await modelsAccount.findOne({ $or: [{ username }, { email }] }) as {} | undefined | any;
                if (!account) {
                    next({
                        valid: true,
                        id: getNext.id,
                    })
                } else {
                    res.status(400).json({ message: "Tài khoản đã tồn tại" })
                }
            } else {
                res.status(400).json({ message: "Tài khoản không hợp lệ" })
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Lỗi server nội bộ" })
        }
    },
    verifeAccount: async (getNext: () => { valid: boolean, id: string, reFreshToken: boolean, account: any }, req: Request, res: Response, next: NextFunction) => {
        try {

            if (getNext().valid) {
                if (getNext().account.verify) {
                    next({ valid: true, id: getNext().id, reFreshToken: getNext().reFreshToken, account: getNext().account })
                    return;
                } else {
                    res.status(400).json({ message: "Tài khoản chưa được xác minh" })
                }
            } else {
                res.status(400).json({ message: "Tài khoản không hợp lệ" })
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Lỗi server nội bộ" })
        }
    }
}

export default register
