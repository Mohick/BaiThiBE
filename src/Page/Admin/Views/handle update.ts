import type { NavigateFunction } from "react-router-dom";
import type { PropsAccount } from "../../../Axios Intandce/Props Request/Account";
import type { PropsUpdateAccount } from "../../../Axios Intandce/Props Request/Update Account";
import { upDateAccountFromAdmin } from "../../../Axios Intandce/Call API";
import type { CRUDRequestSuccessProps } from "../../../Axios Intandce/CRUD Request/CRUD Request Props";


const handleUpdate = async (form: PropsUpdateAccount, user: PropsAccount, navigate: NavigateFunction) => {
    try {
        const body = {
            _id: user._id,
            username: form.username != user.username ? form.username : undefined,
            email: form.email != user.email ? form.email : undefined,
            password: form.password != user.password ? form.password : undefined,
            avatar: form.avatar != user.avatar ? form.avatar : undefined,
            verify: form.verify != user.verify ? form.verify : undefined,
        }
        const update = await upDateAccountFromAdmin(body) as CRUDRequestSuccessProps
        const { data: { isValid } } = update
        if (isValid) {
            alert("Cap nhat thanh cong")
            navigate(-1)
            return;
        }
        alert(update.data.message)

    } catch (error) {
        alert("Loi bat ngo" + (error as { response: { data: { message: string } } }).response.data.message)
    }
}

export {
    handleUpdate
}