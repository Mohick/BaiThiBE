import { AxiosIntandce } from "../Axios Intandce";
import type {  PropsBody } from "./CRUD Request Props";

const requestPatch = async (url: string, data: PropsBody) => {
    const res = await AxiosIntandce.patch(url, data.body)
    return res;
  
};

export {
    requestPatch
}