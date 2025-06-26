
import { useState } from "react";
import { handleRequireResetPassword } from "./handle forgot password/handle require reset password";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="bg-gray-50 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
        <div className="text-4xl mb-4">💬</div>
        <h2 className="text-2xl font-bold mb-2">Quên mật khẩu</h2>
        <p className="text-gray-600 mb-6 text-sm">
          Nhập email của bạn và chúng tôi sẽ gửi cho bạn liên kết để đặt lại mật khẩu
        </p>

        <div className="space-y-4">
          <div className="text-left">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gmail.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-blue-50"
            />
          </div>
          <button
            type="submit"
            onClick={async () => {
              await handleRequireResetPassword(email)
              
            }}
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Gửi liên kết đặt lại
          </button>
        </div>

        <div className="mt-6">
          <a
            href="/login"
            className="text-sm text-gray-700 hover:underline inline-flex items-center"
          >
            ← Quay lại đăng nhập
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
