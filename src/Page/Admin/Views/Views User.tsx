
import { useNavigate, useOutletContext } from "react-router-dom";
import type { AccountProps } from "../../../Hooks/Account/Props Account";

const UserDetail = () => {
    const navigate = useNavigate();
    const user = useOutletContext<AccountProps>();
    return (
        <div className="max-w-2xl mx-auto fixed left-0 right-0 bottom-0 top-0 bg-white h-fit mt-10 p-6 rounded-lg z-40 shadow-lg border">
            <h2 className="text-2xl font-semibold mb-4">User Detail</h2>
            <div className="space-y-2">
                <p><strong>_id:</strong> <span className="text-red-600">{user._id}</span></p>
                <p><strong>username:</strong> {user.username}</p>
                <p><strong>email:</strong> {user.email}</p>
                <p><strong>password:</strong> <span className="text-green-700 break-all">{user.password}</span></p>
                <p><strong>avatar:</strong> {user.avatar || '""'}</p>
                <p><strong>verify:</strong> {user.verify ? "true" : "false"}</p>
                <p><strong>createdAt:</strong> {new Date(`${user.createdAt}`).toISOString()}</p>
                <p><strong>updatedAt:</strong> {new Date(`${user.updatedAt}`).toISOString()}</p>
                <p><strong>__v:</strong> {user.__v}</p>
            </div>
            <button
                onClick={() => navigate(-1)}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Quay lại
            </button>
        </div>
    );
};

export default UserDetail;
