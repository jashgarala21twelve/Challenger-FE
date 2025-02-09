import api, { axiosRequestWrapper } from "../api";

// Login API Call
export const loginApi = async (data: Record<string, any>) => {
  return axiosRequestWrapper(api.post, "/login", data);
};

//Logout Api
export const logoutApi = async (data: Record<string, any>) => {
  return axiosRequestWrapper(api.post, "/aut/logout", data);
};

//Change Password Api
export const ChangePasswordApi = async (data: Record<string, any>) => {
  return axiosRequestWrapper(api.post, "/change_password", data);
};
