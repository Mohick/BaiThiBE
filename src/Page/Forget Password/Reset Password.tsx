import React, { useState } from "react";
import { useNavigate,  useParams } from "react-router-dom";
import { handleresetPassword } from "./handle forgot password/handle reset password";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { id } = useParams();
  const navigate = useNavigate()

  return (
    <div className="bg-gray-50 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
        <div className="text-4xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold mb-2">Thay đổi mật khẩu</h2>
        <p className="text-gray-600 mb-6 text-sm">
          Nhập mật khẩu mới cho tài khoản của bạn
        </p>


        <div className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium mb-1">Mật khẩu mới</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Xác nhận mật khẩu</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            onClick={async () => {
              const res = await handleresetPassword(password, confirmPassword, id!)
              if (res) {
                navigate('/login')
              }
            }}
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Thay đổi mật khẩu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
