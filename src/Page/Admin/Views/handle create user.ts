import type { NavigateFunction } from "react-router-dom"
import { RegexEmail, RegexPassword, RegexUserName } from "../../../assets/Pattern"
import { createAccountFromAdmin } from "../../../Axios Intandce/Call API"
import type { CRUDRequestSuccessProps } from "../../../Axios Intandce/CRUD Request/CRUD Request Props"



export interface FormCreateUserProps {
    username: string
    email: string
    password: string
    confirmPassword: string
}


const handleCreateUser = async (form: FormCreateUserProps, navigate: NavigateFunction) => {

    if (form.password == form.confirmPassword &&
        RegexEmail.test(form.email) &&
        RegexPassword.test(form.password) &&
        RegexUserName.test(form.username)

    ) {
        const res = await createAccountFromAdmin(form) as CRUDRequestSuccessProps

        const { data: { isValid } } = res

        if (isValid) {
            alert("Tao tai khoan thanh cong")
            navigate(-1)
            return;
        }
        alert(res.data.message)
    } else {
        alert("Vui long kiem tra lai thong tin")
    }

}


export {
    handleCreateUser
}