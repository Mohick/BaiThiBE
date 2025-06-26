import type { PropsChat } from './../Props Request/Chat';
import type { PropsAccount } from "../Props Request/Account"
import type { PropsLogin } from "../Props Request/Login"
import type { PropsRegister } from '../Props Request/Register';
import type { PropsUploadAvatar } from '../Props Request/Upload Avatar';
import type { PropsRequireResetPassword } from '../Props Request/Require Reset Password';
import type { PropsResetPassword } from '../Props Request/Reset Password';
import type { PropsUpdateAccount } from '../Props Request/Update Account';
import type { PropsDeleteAccount } from '../Props Request/Delete Account';





export interface CRUDRequestSuccessProps {
    data: {
        isValid: boolean,
        message: string,
        account?: PropsAccount
        hasImage?: boolean
    },
    status: number;
    statusText: string;
    headers: {
        [key: string]: string;
    };
    config: {
        transitional: {
            silentJSONParsing: boolean;
            forcedJSONParsing: boolean;
            clarifyTimeoutError: boolean;
        };
        adapter: string[];
        timeout: number;
        xsrfCookieName: string;
        xsrfHeaderName: string;
        maxContentLength: number;
        maxBodyLength: number;
        env: object;
        headers: {
            Accept: string;
            authorization?: string;
            [key: string]: string | undefined;
        };
        baseURL: string;
        withCredentials: boolean;
        method: string;
        url: string;
        allowAbsoluteUrls: boolean;
    };
}

export interface CRUDRequestErrorProps {
    status: number,
    response: {
        data: {
            valid: boolean
            message: string
        }
    },
    message: string,
}

export interface PropsBody {
    body: PropsAccount | PropsLogin | PropsUpdateAccount | PropsChat |
    PropsRegister | PropsUploadAvatar |
    PropsRequireResetPassword | PropsResetPassword |  PropsDeleteAccount
}