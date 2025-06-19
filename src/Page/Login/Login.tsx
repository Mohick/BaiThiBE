import { Link, useNavigate } from "react-router-dom"
import { handleFormLogin } from "./handle button login/handle button login"
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";



const LoginPage = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [form, setForm] = useState<{ username: string; password: string; }>
        ({ username: "", password: "" });
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <div className="flex flex-col items-center">
                <div className="text-3xl mb-4">💬</div>
                <h2 className="text-2xl font-semibold mb-1">Đăng nhập</h2>
                <p className="text-gray-500 text-sm mb-6">
                    Nhập thông tin đăng nhập của bạn để tiếp tục
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm capitalize font-medium text-gray-700">
                        username
                    </label>
                    <input
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                        id="username"
                        type="search"
                        placeholder="username"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                    />
                </div>

                <div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Mật khẩu
                        </label>
                        <Link to="/forgot-password" className="text-sm text-black hover:underline">
                            Quên mật khẩu?
                        </Link>
                    </div>
                    <input
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        id="password"
                        type="password"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                    />
                </div>

                <button
                    onClick={() => handleFormLogin(form, queryClient, navigate)}
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
                >
                    Đăng nhập
                </button>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600">
                Chưa có tài khoản?{' '}
                <Link to="/register" className="text-black font-medium hover:underline">
                    Đăng ký
                </Link>
            </p>
        </div>
    </div>
}

export default LoginPage