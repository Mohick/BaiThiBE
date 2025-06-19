import type { PropsRegister } from './Props Request/Register';
import { requestGet } from "./CRUD Request/GET"
import { requestPost } from "./CRUD Request/POST"
import type { PropsLogin } from './Props Request/Login';
import type { PropsUploadAvatar } from './Props Request/Upload Avatar';
import type { PropsRequireResetPassword } from './Props Request/Require Reset Password';
import type { PropsResetPassword } from './Props Request/Reset Password';
import type { PropsChat } from './Props Request/Chat';
import { requestPatch } from './CRUD Request/PATCH';
import type { PropsUpdateAccount } from './Props Request/Update Account';
import { requestDelete } from './CRUD Request/DELETE';

// user
const autoLogin = async () => {
    const res = await requestGet('/account/auto-login')
    return res
}
const register = async (body: PropsRegister) => {
    return await requestPost('/account/register', { body })
}
const loginAccount = async (body: PropsLogin) => {
    return await requestPost('/account/login', { body })
}
const uploadImage = async (body: PropsUploadAvatar) => {

    return await requestPatch('/account/upload-avatar', { body })

}
const logout = async () => {
    return await requestGet('/account/logout')
}
const requireResetPassword = async (body: PropsRequireResetPassword) => {
    return await requestPost('/account/require-reset-password', { body })
}
const resetPassword = async (body: PropsResetPassword) => {
    return await requestPatch('/account/reset-password', { body })
}
const sendChat = async (body: PropsChat) => {
    return await requestPost('/chat/send-message', { body })
}

const getAllAccount = async () => {
    return await requestGet('/admin/all-accounts')
}


const upDateAccountFromAdmin = (body: PropsUpdateAccount) => {
    return requestPatch('/admin/update-account', { body })
}
const createAccountFromAdmin = (body: PropsRegister) => {
    return requestPost('/admin/create-account', { body })
}

const deleteAccountFromAdmin = (id: string) => {
    return requestDelete(`/admin/delete-account${id}`)
}
export {
    autoLogin,
    register,
    loginAccount,
    uploadImage,
    logout,
    requireResetPassword,
    resetPassword,
    sendChat,
    getAllAccount,
    upDateAccountFromAdmin,
    createAccountFromAdmin,
    deleteAccountFromAdmin
}