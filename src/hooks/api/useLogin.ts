import { loginApi } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import {
  setSessionStorageItem,
  setSessionStorageObject,
  setToken,
} from "@/utils/sessionStorage";
import { useNavigate } from "react-router-dom";
import Toast from "@/components/toast/commonToast";

export const useLoginMutation = (onSuccessHandler) => {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      if (!data?.success) {
        Toast(
          "destructive",
          "Login Failed",
          data?.msg || "Invalid Email or Password!"
        );
        return;
      }
      const { token, ...loginData } = data.success;
      if (token) {
        onSuccessHandler(token, loginData);
      }
    },
    onError: (error: any) => {
      console.error("Login failed:", error);
      Toast("destructive", "Your session is about to expire.", "warning", 5000);
    },
  });
};
