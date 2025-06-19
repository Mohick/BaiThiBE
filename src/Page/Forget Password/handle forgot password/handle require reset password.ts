import { RegexEmail } from "../../../assets/Pattern";
import { requireResetPassword } from "../../../Axios Intandce/Call API";
import type { CRUDRequestSuccessProps } from "../../../Axios Intandce/CRUD Request/CRUD Request Props";



const handleRequireResetPassword = async (email: string) => {
    try {
        const isValidEmail = RegexEmail.test(email);
        if (isValidEmail) {
            const res = await requireResetPassword({ email }) as CRUDRequestSuccessProps
            if (res.data.isValid) {
                alert(res.data.message)
            }
            alert(res.data.message)
            return res
        } else {
            alert("Email khong hop le")
            return { valid: false, message: "Email khong hop le" }
        }
    } catch (error) {
        console.log(error);
        alert("Loi bat ngo")
        return (error as {
            response: {
                data: {
                    valid: boolean
                }
            }
        }).response
    }
}
export {
    handleRequireResetPassword
}