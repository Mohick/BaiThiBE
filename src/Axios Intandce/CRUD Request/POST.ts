
import { AxiosIntandce } from "../Axios Intandce";
import type { CRUDRequestErrorProps, PropsBody } from "./CRUD Request Props";

const requestPost = async (url: string, data: PropsBody) => {
    try {
        const res = await AxiosIntandce.post(url, data.body)
        return res;
    } catch (error) {
        console.log(error);
        return error as CRUDRequestErrorProps;
    }
};

export {
    requestPost
}