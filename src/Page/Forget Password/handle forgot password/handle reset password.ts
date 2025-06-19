import { RegexPassword } from "../../../assets/Pattern"
import { resetPassword } from "../../../Axios Intandce/Call API"
import type { CRUDRequestSuccessProps } from "../../../Axios Intandce/CRUD Request/CRUD Request Props"


const handleresetPassword = async (passwod: string, confirmPassword: string, id: string) => {
    try {
        if (passwod == confirmPassword && RegexPassword.test(passwod)) {
            const res = await resetPassword({ password: passwod, confirmPassword: passwod, id: id }) as CRUDRequestSuccessProps
            alert(res.data.message)
            if(res.data.isValid){
                alert(res.data.message)
                return true
            }
            alert(res.data.message)
            return false
        } else {
            alert("Mat khau khong hop le")
            return false
        }
    } catch (error) {
        console.log(error);
        alert((error as { response: { data: { message: string } } }).response.data.message)
        return false
    }
}

export {
    handleresetPassword
}