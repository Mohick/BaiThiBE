import { useOutletContext } from "react-router-dom";
import { BackPage } from "../../Components/Back Page/Back Page";



export default function UserProfile() {
    const outletContext = useOutletContext() as { data: { isValid: boolean, account: { _id: string, username: string, email: string, avatar: string } } };
    const account = outletContext.data.account
    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6">
                <BackPage  />
                <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-4 flex items-center justify-center text-gray-400 text-3xl">
                        <img src={account.avatar} alt="" />
                    </div>
                    <h2 className="text-xl font-semibold">{account.username}</h2>
                    <p className="text-sm text-gray-500">{account.email}</p>
                </div>
                <div className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
                        <p className="text-gray-900">{account.username}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="text-gray-900">{account.email}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Giới thiệu</label>
                        <p className="text-gray-900">Xin chào! Tôi là người dùng mới của ứng dụng chat.</p>
                    </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                        Chỉnh sửa thông tin
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        Xóa tài khoản
                    </button>
                </div>
            </div>
        </div>
    );
}
