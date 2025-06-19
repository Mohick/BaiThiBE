import { Route, Routes } from "react-router-dom"
import CheckLogin from "../Page/Check/Check"
import LoginPage from "../Page/Login/Login"
import RegisterPage from "../Page/Register/Register"
import HomePage from "../Page/Home/Home"
import ChooseImages from "../Page/Choose Images/Choose Images"
import UserProfile from "../Page/Profile/Profile"
import ForgotPassword from "../Page/Forget Password/Forgot Password"
import ResetPassword from "../Page/Forget Password/Reset Password"
import Admin from "../Page/Admin/Admin"
import ViewsUser from "../Page/Admin/Views/Views User"
import UpdateUser from "../Page/Admin/Views/Update User"
import { CreateUser } from "../Page/Admin/Views/Create User"




const RoutesPage = () => {

    return <Routes>
        <Route path="/" element={<CheckLogin />} >
            <Route path="choose-images" element={<ChooseImages />} />
            <Route path="home" element={<HomePage />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="admin" element={<Admin />} >
                <Route path="add-user" element={<CreateUser />} />
                <Route path="views/:id" element={<ViewsUser />} />
                <Route path="update/:id" element={<UpdateUser />} />
            </Route>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:id" element={<ResetPassword />} />
    </Routes>
}

export default RoutesPage