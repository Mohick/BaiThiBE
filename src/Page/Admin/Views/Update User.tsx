
import { useNavigate, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { AccountProps } from "../../../Hooks/Account/Props Account";
import { handleUpdate, type FormValues } from "./handle update";



const UpdateUser = () => {
    const navigate = useNavigate();
    const user = useOutletContext<AccountProps>();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            username: user.username,
            email: user.email,
            password: user.password,
            avatar: user.avatar || "",
            verify: user.verify || false,
        },
    });

    const onSubmit = (data: FormValues) => {
       handleUpdate(data,user,navigate)
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-2xl mx-auto fixed left-0 right-0 bottom-0 top-0 bg-white h-fit mt-10 p-6 rounded-lg z-40 shadow-lg border"
        >
            <h2 className="text-2xl font-semibold mb-4">Cập nhật thông tin người dùng</h2>

            <div className="space-y-4">
                <p><strong>_id:</strong> <span className="text-red-600">{user._id}</span></p>

                <div>
                    <label className="block font-medium">Username:</label>
                    <input
                        {...register("username", { required: "Username không được để trống" })}
                        className="w-full border rounded px-3 py-1"
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                </div>

                <div>
                    <label className="block font-medium">Email:</label>
                    <input
                        {...register("email", {
                            required: "Email không được để trống",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Email không hợp lệ",
                            },
                        })}
                        type="email"
                        className="w-full border rounded px-3 py-1"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="block font-medium">Password:</label>
                    <input
                        {...register("password", { required: "Password không được để trống" })}
                        type="text"
                        className="w-full border rounded px-3 py-1 break-all"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <div>
                    <label className="block font-medium">Avatar:</label>
                    <input
                        {...register("avatar")}
                        type="text"
                        className="w-full border rounded px-3 py-1"
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <input
                        {...register("verify")}
                        type="checkbox"
                        id="verify"
                    />
                    <label htmlFor="verify" className="font-medium">Đã xác minh</label>
                </div>

                <p><strong>createdAt:</strong> {new Date(`${user.createdAt}`).toISOString()}</p>
                <p><strong>updatedAt:</strong> {new Date(`${user.updatedAt}`).toISOString()}</p>
                <p><strong>__v:</strong> {user.__v}</p>
            </div>

            <div className="mt-6 flex space-x-4">
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Lưu thay đổi
                </button>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                    Quay lại
                </button>
            </div>
        </form>
    );
};

export default UpdateUser;
