





export const getCookie = (name: string) => document.cookie.split(";").find((cookie) => cookie.startsWith(name))?.split("=")[1]
export const setCookie = (name: string, value: string) => document.cookie = `${name}=${value}`