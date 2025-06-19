import { useEffect, useState } from "react";
import { deleteAccountFromAdmin, getAllAccount } from "../../Axios Intandce/Call API";
import { Link, Outlet, useOutlet, useOutletContext } from "react-router-dom";
import type { PropsAccount } from "../../Axios Intandce/Props Request/Account";
import { BackPage } from "../../Components/Back Page/Back Page";




const Admin = () => {
    const [allAccounts, setGetAllAccounts] = useState<PropsAccount[]>([]);
    const outlet = useOutlet()
    const outletContext = useOutletContext() as { data: { isValid: boolean, account: { _id: string, username: string, email: string, avatar: string } } };
    const account = outletContext.data.account as  PropsAccount
    const [reload, setReload] = useState('');
    useEffect(() => {
        (async () => {
           if(account.isAdmin){
             const res = await getAllAccount();
            setGetAllAccounts(res.data.accounts);
           }
        })()
    }, [reload])
    const [user, setUser] = useState<PropsAccount>({
        _id: "",
        username: "",
        email: "",
        avatar: "",
        verify: false
    });
    console.log(account);
    
    if(!account.isAdmin) {
        return <div className="w-screen h-screen flex justify-center items-center">
            <div className="text-xl flex items-center gap-2 font-semibold">
                <BackPage/> Không có quyền truy cập oki chưa !
            </div>
        </div>
    }
    return (
        <div className="p-6 bg-white rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl flex items-center gap-2 font-semibold">
                    <BackPage />
                    Danh sách người dùng</h2>
                <div className="flex gap-2">
                    <button onClick={() => setReload((prev) => (prev + 1))} className="bg-black text-white px-4 py-2 rounded hover:opacity-90">
                        Update UI
                    </button>
                    <Link to={'/admin/add-user'} className="bg-black text-white px-4 py-2 rounded hover:opacity-90">
                        + Thêm người dùng
                    </Link>
                </div>
            </div>

            <div className="w-full">
                <table className="text-sm w-full text-left">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="p-3">Tên người dùng</th>
                            <th className="p-3">Trạng thái xác thực</th>
                            <th className="p-3">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allAccounts.map((u, index) => (
                            <tr key={index} className="border-b">
                                <td className="p-3 font-mono text-xs text-gray-700">
                                    {u.username}
                                </td>
                                <td className="p-3">
                                    {u.verify ? (
                                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                                            Đã xác thực
                                        </span>
                                    ) : (
                                        <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded">
                                            Chưa xác thực
                                        </span>
                                    )}
                                </td>
                                <td className="p-3 text-xl cursor-pointer group relative">⋯
                                    <div className="absolute z-50 top-2/4 group-hover:opacity-100 group-hover:h-full transition-all duration-300 left-0 opacity-0 h-0 bg-white shadow p-1 rounded-md">
                                        <Link to={`views/${u._id}`} onClick={() => setUser(u)} className=" cursor-pointer p-2 hover:opacity-50 text-blue-500 hover:text-blue-700">Xem</Link>
                                        <Link to={`update/${u._id}`} onClick={() => setUser(u)} className=" cursor-pointer p-2 hover:opacity-50 text-green-500 hover:text-green-700">Sửa</Link>
                                        <button onClick={() => {
                                            deleteAccountFromAdmin(`${u._id}`)
                                            setReload((prev) => (prev + 1))
                                        }} className=" cursor-pointer p-2 hover:opacity-50 text-red-500 hover:text-red-700">Xóa</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {outlet && <div className="fixed left-0 bg-white right-0 bottom-0 top-0 ">
                <Outlet context={user} />
            </div>
            }
        </div>
    );
};

export default Admin

