
import { AxiosIntandce } from "../Axios Intandce";
import type { CRUDRequestErrorProps } from "./CRUD Request Props";

const requestDelete = async (url: string) => {
    try {
        const res = await AxiosIntandce.delete(url)
        return res;
    } catch (error) {
        console.log(error);
        return error as CRUDRequestErrorProps;
    }
};

export {
    requestDelete
}