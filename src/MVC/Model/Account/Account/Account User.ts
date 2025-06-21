import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import modelsAdmin from "../../../../Schema/Admin/Admin";
import modelsAccount from "../../../../Schema/Account/Account";
import modelsRequirePassword from "../../../../Schema/Reset Password/Reset Password";
import { hashStr } from "./Secure";
import { sendEmail } from "../../../../Send Email/Send Email";

const AccountUser = {

    roleAccount: async (getNext: { valid: boolean, id: string, }, req: Request, res: Response, next: NextFunction) => {
        try {
            const claim = getNext.valid;
            if (claim) {
                const admin = await modelsAdmin.findOne({ adminID: getNext.id });
                console.log(admin);
                
                let checkAdmin = admin ? true : false
                console.log(checkAdmin);
                
                next({ valid: true, isAdmin: checkAdmin, id: getNext.id });
            } else {
                res.status(400).json({ isValid: false, message: "Xác thực không thành công." });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ isValid: false, message: "Lỗi server nội bộ." });
        }
    },
    sendToken: async (getNext: { valid: boolean, id: string, reFreshToken: boolean, account: any }, req: Request, res: Response, next: NextFunction) => {
        try {
            if (getNext.valid) {
                const token = jwt.sign({ id: getNext.id }, process.env.SECRET_KEY as string, { expiresIn: "7d" });

                if (getNext.reFreshToken) {
                    res.status(200).cookie("token", token, { httpOnly: false, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: "lax", secure: false }).json({
                        isValid: true, message: "Đăng nhập thành công.",
                        account: getNext.account
                    })
                    return;
                } else {
                    res.status(200).cookie("token", token, { httpOnly: false, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: "lax", secure: false }).json({
                        isValid: true, message: "Đăng nhập thành công. 1"
                    });
                }
            } else {
                res.status(400).json({ isValid: false, message: "Xác thực không thành công." });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ isValid: false, message: "Lỗi server nội bộ." });
        }
    },
    readToken: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.token;
            if (token) {
                const tokenDecode = jwt.verify(token, process.env.SECRET_KEY as string) as { exp: number, id: string };

                if (tokenDecode.id) {
                    let reFreshToken = false;
                    if ((tokenDecode.exp - (Date.now() / 1000)) < 2) {
                        reFreshToken = true;
                    }
                    return next({ valid: true, id: tokenDecode.id, reFreshToken });
                }
            } else {
                res.status(400).json({ isValid: false, message: "Token không hợp lệ." });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ isValid: false, message: "Lỗi server nội bộ." });
        }
    },
    wasLogin: async (getNext: { valid: boolean, id: string }, req: Request, res: Response, next: NextFunction) => {
        try {
            if (getNext.valid) {
                const account = await modelsAccount.findOne({ _id: getNext.id }) as {} | undefined | any;
                if (account) {
                    next({ valid: true, data: account, id: getNext.id, resfreshToken: false });
                }
            } else {
                res.status(400).json({ isValid: false, message: "Tài khoản không tồn tại." });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ isValid: false, message: "Lỗi server nội bộ." });
        }
    },
    uploadAvartar: async (getNext: { valid: boolean, id: string }, req: Request, res: Response, next: NextFunction) => {
        try {

            const { avatar } = req.body;

            if (getNext.valid && avatar) {
                const account = await modelsAccount.findOne({ _id: getNext.id }) as {} | undefined | any;
                if (account) {
                    account.avatar = avatar;
                    await account.save();
                    res.status(200).json({ isValid: true, message: "Thay đổi avatar thành công." });
                }else {
                    res.status(400).json({
                        isValid: true, message: "Thay đổi avatar thành công." 
                    })
                }
            } else {
                res.status(400).json({ isValid: false, message: "Tài khoản không tồn tại." });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ isValid: false, message: "Lỗi server nội bộ." });
        }
    },
    requireResetPassword: async (req: Request, res: Response, next: NextFunction) => {
        const { email } = req.body;
        try {
            if (email) {
                const [account, requireResetPassword] = await Promise.all([modelsAccount.findOne({ email }), modelsRequirePassword.findOne({ email: email })]);
                if (account && !requireResetPassword) {
                    const requireResetPassword = new modelsRequirePassword({ email: email });
                    await requireResetPassword.save();
                    sendEmail({ toEmail: email, titleEmail: "Yêu cầu đổi mật khẩu", messageEmail: `<h2>Yêu cầu đổi mật khẩu</h2> ${process.env.CLIENT_URL}/reset-password/${account._id}` })
                    res.status(200).json({ isValid: true, message: "Thay đổi avatar thành công." });
                } else {
                    res.status(400).json({ isValid: false, message: "Tài khoản không tồn tại." });
                }
            } else {
                res.status(400).json({ isValid: false, message: "Tài khoản không tồn tại." });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ isValid: false, message: "Lỗi server nội bộ." });
        }
    },
    resetPassword: async (req: Request, res: Response, next: NextFunction) => {
        const { id, password, confirmPassword } = req.body;
        try {
            if (id && (confirmPassword == password)) {
                const account = await modelsAccount.findOne({ _id: id })
                if (account) {
                    const requireResetPassword = await modelsRequirePassword.findOne({ email: account.email });
                    if (requireResetPassword) {
                        let hashPassword: string | any = await hashStr(password);
                        account.password = hashPassword;
                        await account.save()
                        res.status(200).json({ isValid: true, message: "Thay đổi mật khẩu thành công." });
                    } else {
                        res.status(400).json({ isValid: false, message: "Tài khoản không tồn tại." });
                    }
                } else {
                    res.status(400).json({ isValid: false, message: "Tài khoản không tồn tại." });
                }
            } else {
                res.status(400).json({ isValid: false, message: "Tài khoản không tồn tại." });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ isValid: false, message: "Lỗi server nội bộ." });
        }
    }
}

export default AccountUser;
