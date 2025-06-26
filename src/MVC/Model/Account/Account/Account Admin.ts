import modelsAccount from "../../../../Schema/Account/Account";
import { hashStr } from "./Secure";
import type { NextFunction, Request, Response } from "express";


const AccountAdmin = {
    requestGetUserFromAdmin: async (gextNext: { valid: boolean, id: string, isAdmin: boolean }, req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(gextNext.isAdmin);

            if (gextNext.valid && gextNext.isAdmin) {
                const skipItems = (1 /*page*/ - 1 /*index*/) * 10 /*limit*/;
                const modelAccounts = await modelsAccount.find({}).skip(skipItems).limit(10).exec() as {} | undefined | any;
                res.json({ isValid: true, accounts: modelAccounts });
            } else {
                res.status(400).json({ isValid: false, message: "Xác thực không tiong." });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ isValid: false, message: "Lỗi server nội bộ." });
        }
    },
    requestUpdateAccountFromAdmin: async (getNext: { valid: boolean, id: string, isAdmin: boolean }, req: Request, res: Response, next: NextFunction) => {
        try {
            if (getNext.valid && getNext.isAdmin) {
                const { _id, password, ...body } = req.body as { username: string, email: string, password: string } | any;
                if (password) {
                    body.password = await hashStr(password);
                }
                await modelsAccount.findOneAndUpdate({ _id }, body, { new: true }) as {} | undefined | any;

                res.json({ isValid: true, message: 'Thay đổi tài khoản thành công.' });
            } else {
                res.status(400).json({ isValid: false, message: "Xác thực không tiong." });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ isValid: false, message: "Lỗi server nội bộ." });
        }
    },
    requestCreateAccountFromAdmin: async (getNext: { valid: boolean, id: string, isAdmin: boolean }, req: Request, res: Response, next: NextFunction) => {
        try {
            if (getNext.valid && getNext.isAdmin) {
                const { password, ...body } = req.body as { username: string, email: string, password: string } | any;
                if (password) {
                    body.password = await hashStr(password);
                }
                const account = new modelsAccount(body) as {} | undefined | any;
                await account.save();
                res.json({ isValid: true, message: 'Tạo tài khoản tiong.' });
            } else {
                res.status(400).json({ isValid: false, message: "Xác thực không tiong." });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ isValid: false, message: "Lỗi server nội bộ." });
        }
    },
    requestDeleteAccountFromAdmin: async (getNext: { valid: boolean, id: string, isAdmin: boolean }, req: Request, res: Response, next: NextFunction) => {
        try {
            if (getNext.valid && getNext.isAdmin) {
                const { _id } = req.params as { _id: string } | any;
                const account = await modelsAccount.findOneAndDelete({ _id }) as {} | undefined | any;
                res.json({ isValid: true, message: 'Xóa tài khoản tiong.' });
            } else {
                res.status(400).json({ isValid: false, message: "Xác thực không tiong." });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ isValid: false, message: "Lỗi server nội bộ." });
        }
    },
}

export default AccountAdmin
