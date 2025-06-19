import { useQuery } from "@tanstack/react-query"
import { autoLogin } from "../../Axios Intandce/Call API"
import type { PropsAccount } from "../../Axios Intandce/Props Request/Account"








const useAccount = (options: PropsAccount) => {
    return useQuery({
        ...options,
        queryKey: ['account'],
        queryFn: async () => {
            try {
                return (await autoLogin()) as PropsAccount
            } catch (error) {
                console.log(error);
                return {
                    data: {
                        valid: false
                    }
                }
            }
        }
    })
}
export {
    useAccount
}