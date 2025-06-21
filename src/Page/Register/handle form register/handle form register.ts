import type { QueryClient } from "@tanstack/react-query";
import { RegexEmail, RegexPassword, RegexUserName } from "../../../assets/Pattern";
import { register } from "../../../Axios Intandce/Call API";
import type { CRUDRequestSuccessProps } from "../../../Axios Intandce/CRUD Request/CRUD Request Props";




const handleFormRegister = async (
    { username = "", email = "", password = "", confirmPassword = "" }:
        { username: string, email: string, password: string, confirmPassword: string }, queryClient: QueryClient, navagate: (path: string) => void) => {
    try {
        if (username && email && password && confirmPassword) {
            if (password == confirmPassword && password.length >= 8) {
                const isValidEmail = RegexEmail.test(email);
                const isValidUsername = RegexUserName.test(username);
                const isValidPassword = RegexPassword.test(password);

                if (!(isValidEmail && isValidUsername && isValidPassword)) {
                    let message = '';
                    if (!isValidEmail) message += 'Email không hợp lệ\n';
                    if (!isValidUsername) message += 'Tên không hợp lệ\n';
                    if (!isValidPassword) message += 'Mật khẩu không hợp lệ\n';

                    alert(message);
                    return;
                }

                const res = await register({ username, email, password, confirmPassword }) as CRUDRequestSuccessProps
                if (res.data.isValid) {
                    await queryClient.refetchQueries({ queryKey: ["account"] })
                    alert(res.data.message)
                    navagate("/choose-images")
                    return;
                }
                alert(res.data.message)

            } else {
                alert("mat khau khong khop")
            }
        } else {
            alert("vui long nhap day du thong tin")
        }
    } catch (error) {
        console.log(error);
        alert(error)

    }

}
export {
    handleFormRegister
}