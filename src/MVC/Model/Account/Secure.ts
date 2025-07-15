

import brycpt from "bcrypt";


const hashStr = async (str: string) => {
    try {
        const salt: string | number | any = await brycpt.genSalt(3);
        const hash = await brycpt.hash(str, salt);
        return hash
    } catch (error) {
        console.log(error);
    }
}

const compareStr = async (str: string, hashStr: string) => {

    try {
        return await brycpt.compare(str, hashStr);
    } catch (error) {
        console.log(error);
    }
}
export { hashStr, compareStr }