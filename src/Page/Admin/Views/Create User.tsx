import { useForm } from "react-hook-form";
import { BackPage } from "../../../Components/Back Page/Back Page";
import { RegexEmail, RegexPassword, RegexUserName } from "../../../assets/Pattern";
import { handleCreateUser, type FormCreateUserProps } from "./handle create user";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const password = watch("password");

    const onSubmit = (data: FormCreateUserProps) => {
        handleCreateUser(data, navigate);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <BackPage />
                <div className="flex flex-col items-center">
                    <div className="text-3xl mb-4">💬</div>
                    <h2 className="text-2xl font-semibold mb-1">Đăng ký</h2>
                    <p className="text-gray-500 text-sm mb-6">
                        Tạo tài khoản mới để bắt đầu trò chuyện
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Username */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Họ và tên
                        </label>
                        <input
                            {...register("username", {
                                required: "Trường này là bắt buộc",
                                pattern: {
                                    value: RegexUserName,
                                    message: "Tên không hợp lệ"
                                }
                            })}
                            id="name"
                            type="text"
                            placeholder="Nguyễn Văn A"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                        />
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            {...register("email", {
                                required: "Trường này là bắt buộc",
                                pattern: {
                                    value: RegexEmail,
                                    message: "Email không hợp lệ"
                                }
                            })}
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Mật khẩu
                        </label>
                        <input
                            {...register("password", {
                                required: "Trường này là bắt buộc",
                                pattern: {
                                    value: RegexPassword,
                                    message: "Mật khẩu không hợp lệ"
                                }
                            })}
                            id="password"
                            type="password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Xác nhận mật khẩu
                        </label>
                        <input
                            {...register("confirmPassword", {
                                required: "Trường này là bắt buộc",
                                validate: (value) => value === password || "Mật khẩu xác nhận không khớp"
                            })}
                            id="confirmPassword"
                            type="password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
                    >
                        Đăng ký
                    </button>
                </form>
            </div>
        </div>
    );
};

export { CreateUser };
