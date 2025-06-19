import type { QueryClient } from "@tanstack/react-query";
import { RegexPassword, RegexUserName } from "../../../assets/Pattern";
import { loginAccount } from "../../../Axios Intandce/Call API";
import type { CRUDRequestSuccessProps } from "../../../Axios Intandce/CRUD Request/CRUD Request Props";







const handleFormLogin = async (
    {
        username = "",
        password = "",
    }: {
        username: string,
        password: string
    }
    , queryClient: QueryClient, navagate: (path: string) => void) => {
    if (username && password) {
        if (RegexUserName.test(username) && RegexPassword.test(password)) {
            const res = await loginAccount({ username, password }) as CRUDRequestSuccessProps
            console.log(res);
            
            if (res.data.isValid) {
                await queryClient.refetchQueries({ queryKey: ["account"] })
                alert(res.data.message)
                navagate("/home")
                return;
            }
            alert(res.data.message)
            return;
        }
        alert("vui long kien du thong tin")
        return;
    }
    alert("vui long kien du thong tin")

}


export {
    handleFormLogin
}