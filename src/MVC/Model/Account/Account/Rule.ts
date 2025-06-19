import type { NextFunction, Request, Response } from "express";




const RuleAccount = {
    ruleEmail: (email: string = "") => {
        if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            return true
        }
        return false
    },
    ruleUsername: (username: string = "") => {
        if (/^[a-zA-Z0-9]{2,30}$/.test(username)) {
            return true
        }
        return false
    },
    rulePassword: (password: string = "") => {
        if (/^(?=(.*\d){8,})/.test(password)) {
            return true
        }
        return false
    },
    async ruleRegister(req: Request, res: Response, next: NextFunction) {
        try {

            const { username, password, email, confirmPassword } = req.body as { username: string, password: string, email: string, confirmPassword: string } | any;
            const checkEmail = RuleAccount.ruleEmail(email);
            const checkUsername = RuleAccount.ruleUsername(username);
            const checkPassword = RuleAccount.rulePassword(password);
            const checkRePassword = password == confirmPassword;

            if (checkEmail && checkUsername && checkPassword && checkRePassword) {
                next({ valid: true })
            } else {

                res.status(400).json({
                    username: {
                        isValid: checkUsername,
                        message: !checkUsername ? "Username phải có độ dài từ 2 đến 30 ký tự" : ""
                    },
                    email: {
                        isValid: checkEmail,
                        message: !checkEmail ? "Email không hợp lệ" : ""
                    },
                    password: {
                        isValid: checkPassword,
                        message: !checkPassword ? "Mật khẩu phải có độ dài ít nhất 8 ký tự và chứa ít nhất 1 số" : ""
                    },
                    rePassword: {
                        isValid: checkRePassword,
                        message: !checkRePassword ? "Mật khẩu nhập lại không trùng khớp" : ""
                    }
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send("Lỗi server nội bộ");
        }


    },
    ruleLogin: (req: Request, res: Response, next: NextFunction) => {
        const { username, password } = req.body as { username: string, password: string } | any;
        if (!username || !password) {
            res.status(400).json({ message: "Vui lòng nhập tài khoản" })
        } else {
            if (RuleAccount.ruleUsername(username) && RuleAccount.rulePassword(password)) {
                next({ valid: true })
            } else {

                res.status(400).json({
                    username: {
                        isValid: RuleAccount.ruleUsername(username),
                        message: !RuleAccount.ruleUsername(username) ? "Username phải có độ dài từ 2 đến 30 ký tự" : ""
                    },
                    password: {
                        isValid: RuleAccount.rulePassword(password),
                        message: !RuleAccount.rulePassword(password) ? "Mật khẩu phải có độ dài ít nhất 8 ký tự và chứa ít nhất 1 số" : ""
                    }
                });
            }
        }
    }
}

export default RuleAccount

