import { useEffect } from "react"
import { useAccount } from "../../Hooks/Account/Account"
import { Outlet, useNavigate } from "react-router-dom"
import type { CRUDRequestSuccessProps } from "../../Axios Intandce/CRUD Request/CRUD Request Props"
import type { PropsAccount } from "../../Axios Intandce/Props Request/Account"





const CheckLogin = () => {
    const { data, isLoading, isError } = useAccount({})
    const navigate = useNavigate()
    useEffect(() => {
        if (!isLoading) {
            const res = data as CRUDRequestSuccessProps
            const { isValid, account } = res.data as {
                isValid: boolean
                account: PropsAccount
            }
            if (isValid) {
                if (`${account.avatar?.trim()}`.length > 0) {
                    navigate("/home")
                } else {
                    navigate("/choose-images")
                }
            } else {
                console.log(isError);
                navigate("/login")
            }
        }
    }, [isLoading])

    return <Outlet context={data} />
}

export default CheckLogin