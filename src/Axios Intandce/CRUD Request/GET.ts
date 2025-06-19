
import { AxiosIntandce } from "../Axios Intandce";


const requestGet = async (url: string ) => {

    const res = await AxiosIntandce.get(url)
    return res;
 
};

export {
    requestGet
}