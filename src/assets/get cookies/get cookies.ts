





export const getCookie = (name: string) => document.cookie.split(";").find((cookie) => cookie.startsWith(name))?.split("=")[1]