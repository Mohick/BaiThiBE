import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleFormRegister } from "./handle form register/handle form register";
import { useQueryClient } from "@tanstack/react-query";






const RegisterPage = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [form, setForm] = useState<{
        username: string;
        email: string;
        password: string;
        confirmPassword: string
    }>({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="flex flex-col items-center">
                    <div className="text-3xl mb-4">💬</div>
                    <h2 className="text-2xl font-semibold mb-1">Đăng ký</h2>
                    <p className="text-gray-500 text-sm mb-6">
                        Tạo tài khoản mới để bắt đầu trò chuyện
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Họ và tên
                        </label>
                        <input
                            id="name"
                            onBlur={(e) => setForm({ ...form, username: e.target.value })}
                            type="text"
                            placeholder="Nguyễn Văn A"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            onBlur={(e) => setForm({ ...form, email: e.target.value })}
                            type="email"
                            placeholder="name@example.com"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Mật khẩu
                        </label>
                        <input
                            onBlur={(e) => setForm({ ...form, password: e.target.value })}
                            id="password"
                            type="password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Xác nhận mật khẩu
                        </label>
                        <input
                            onBlur={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                            id="confirmPassword"
                            type="password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                        />
                    </div>

                    <button
                        type="submit"
                        onClick={() => handleFormRegister(form, queryClient, navigate)}
                        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
                    >
                        Đăng ký
                    </button>
                </div>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Đã có tài khoản?{' '}
                    <Link to="/login" className="text-black font-medium hover:underline">
                        Đăng nhập
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage