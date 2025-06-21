import { useEffect, useState } from "react";
import { handleChooseImages } from "./handle choose images/handle choose images";
import { useNavigate, useOutletContext } from "react-router-dom";
import type { PropsAccount } from "../../Axios Intandce/Props Request/Account";







export const avatars = [
    "./Avatar/1.png",
    "./Avatar/2.png",
    "./Avatar/3.png"
]



const ChooseImages = () => {
    const outletContext = useOutletContext() as PropsAccount
    const [selectedAvatar, setSelectedAvatar] = useState<{
        index: number;
        image: string,
        payload: "default" | "other"
    } | null>(null);
    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        if (outletContext && outletContext.avatar) {
            navigate("/home")
        }
    }, [outletContext])
    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6 space-y-6 transition-all duration-300">
            <h2 className="text-xl font-bold text-center">Chọn ảnh đại diện</h2>
            <p className="text-center text-sm text-gray-500">
                Chọn một ảnh đại diện hoặc tải lên ảnh của bạn
            </p>
            {/* Grid ảnh đại diện */}
            <div className="grid grid-cols-3 gap-4">
                {avatars.map((_, index) => (
                    <div className="w-full flex justify-center">
                        <img
                            key={index}
                            src={_}
                            alt={`Avatar ${index + 1}`}
                            className={`w-16 text-center h-16 rounded-full cursor-pointer ${selectedAvatar?.index === index ? "border-2 border-black" : ""
                                } transition-all duration-300`}
                            onClick={() => {
                                setSelectedAvatar({
                                    index,
                                    image: avatars[index],
                                    payload: "default"
                                })
                                setIsDisabled(false);
                            }}
                        />
                    </div>
                ))}

            </div>

            {/* Upload ảnh */}
            <div className="text-center space-y-2">
                <p className="text-sm text-gray-500">Hoặc tải lên ảnh của bạn</p>
                <div className="relative inline-block">
                    <img src={`${selectedAvatar?.index == avatars.length && selectedAvatar?.image}`} alt="" className=" absolute rounded-full z-50 pointer-events-none left-0 right-0 w-full h-full transition-all duration-300" />
                    <input onChange={(e) => {
                        const image = e.target.files?.item(0)
                        if (image) {
                            setSelectedAvatar({
                                index: avatars.length,
                                image: URL.createObjectURL(image),
                                payload: "other"
                            })
                            setIsDisabled(false);
                        }
                    }} type="file" accept="image/*" multiple={false}
                        className={`${selectedAvatar?.payload === "other" ? "border-2 border-black" : ""} avatar-custom mx-auto w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-300`} />

                </div>
            </div>

            {/* Nút tiếp tục / bỏ qua */}
            <div className="flex flex-col gap-2">
                <button onClick={() => {
                    if (selectedAvatar) {
                        handleChooseImages({ payload: selectedAvatar.payload, linkImage: selectedAvatar.image, className: "avatar-custom" }, navigate)
                    }
                }} className={`${isDisabled ? "bg-gray-200 text-gray-600 opacity-50" : "bg-black cursor-pointer  text-white"} transition-all duration-300`} disabled={isDisabled}>
                    Tiếp tục
                </button>
            </div>
        </div>
    );
}

export default ChooseImages

