import type { NextFunction, Request, Response } from "express"
import modelsAccount from "../../../Schema/Account/Account";
import { compareStr } from "./Secure";




const Login = {

    login: async (getNext: { valid: boolean }, req: Request, res: Response, next: NextFunction) => {
        try {
            if (getNext.valid) {
                const { username, password } = req.body as { username: string, password: string } | any;                

                const account = await modelsAccount.findOne({ username }) as {} | undefined | any;

                if (account) {
                    const checkPass = await compareStr(password, account.password);
                    if (!checkPass) {
                        res.status(400).json({ isValid: false, message: "Tài khoản khôn tìm thấy" })

                    } else {

                        next({
                            valid: true,
                            id: account._id,
                            reFreshToken: false,
                            hasImage: !!account.avatar
                        })
                    }
                } else {

                    res.status(400).json({ message: "Tài khoản khôn tìm thấy" })
                }
                return;
            }

            res.status(400).json({ message: "Tài khoản không hợp lệ" })
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Lỗi server nội bộ" })
        }
    },
    autoLogin: async (getNext: { valid: boolean, id: string, resfreshToken: boolean, isAdmin: boolean }, req: Request, res: Response, next: NextFunction) => {
        try {

            if (getNext.valid) {
                const account = await modelsAccount.findOne({ _id: getNext.id }) as {} | undefined | any;
                if (account) {
                    const obAccount = account.toObject();
                    const isAdmin = getNext.isAdmin as boolean;
                    if (isAdmin) {
                        obAccount.isAdmin = true;
                    }
                    const refreshToken = getNext.resfreshToken;

                    if (refreshToken) {
                        next({ valid: true, account: obAccount, resfreshToken: getNext.resfreshToken });
                    } else {

                        res.status(200).json({ isValid: true, account: obAccount });
                    }
                }
            } else {
                res.status(400).json({ isValid: false, message: "Tài khoản không tồn tại." });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ isValid: false, message: "Lỗi server nội bộ." });
        }
    },
}

export default Login