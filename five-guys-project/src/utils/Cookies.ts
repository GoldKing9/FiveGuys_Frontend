/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name: string, value: string, option?: any): void => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name: string): string | undefined => {
  return cookies.get(name);
};

export const removeCookie = (name: string, option?: any): void => {
  return cookies.remove(name, { ...option });
};

export const setRefreshToken = (refreshToken: any) => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 7);

  return cookies.set("refreshToken", refreshToken, {
    sameSite: "strict",
    path: "/",
    expires: new Date(expireDate)
  })
}

export const getCookieToken = () => {
  return cookies.get("refreshToken");
}

export const removeCookieToken = () => {
  return cookies.remove("refreshToken", {sameSite: "strict", path: "/"})
}