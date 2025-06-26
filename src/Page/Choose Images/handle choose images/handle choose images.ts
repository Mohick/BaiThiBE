import axios from "axios";
import { uploadImage } from "../../../Axios Intandce/Call API"
import type { CRUDRequestSuccessProps } from "../../../Axios Intandce/CRUD Request/CRUD Request Props";

const uploadImageToCloudinary = async (file: File): Promise<string | null> => {
    try {
        console.log(file);

        const formData = new FormData();
        formData.append("file", file); // Cloudinary yêu cầu key là "file"
        formData.append("upload_preset", import.meta.env.VITE_CLOUDYNARY_PRECENT); // Thay bằng preset bạn đã tạo
        console.log(import.meta.env.VITE_CLOUDYNARY_NAME, import.meta.env.VITE_CLOUDYNARY_PRECENT);

        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDYNARY_NAME}/image/upload`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        // Trả về link ảnh sau khi upload
        return response.data.secure_url;
    } catch (error) {
        console.error("Upload to Cloudinary failed:", error);
        return ''.trim(); // hoặc throw error nếu bạn muốn xử lý ở nơi gọi
    }
};


const handleChooseImages = async ({ payload, linkImage, className }: {
    payload: "default" | "other"
    linkImage?: string,
    className?: string
}, navigate: (path: string) => void) => {

    try {
        const inputFile = document.querySelector(`.${className}`) as HTMLInputElement;
        switch (payload) {
            case 'default':
                if (payload) {
                    const hasUploadDefault = await uploadImage({ avatar: `${linkImage}` }) as CRUDRequestSuccessProps
                    const {data : {isValid}} = hasUploadDefault
                    if (isValid) {
                        navigate('/home')
                    }
                }
                break;
            case 'other':
                if (inputFile) {
                    const file = inputFile.files?.[0];
                    const res = await uploadImageToCloudinary(file!);
                    if (res) {
                        const hasUpload = await uploadImage({ avatar: `${res}` }) as CRUDRequestSuccessProps
                          const {data : {isValid}}   =  hasUpload
                        if (isValid) {
                            navigate('/home')
                        }
                    }
                }
                break;
            default:
                throw new Error("Invalid payload");
        }
    } catch (error) {
        console.log(error);

    }
}


export {
    handleChooseImages
}