import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../lib/type";
import { api } from "@/shared/lib/api-client";
import { handleError } from "@/shared/lib/handle-api-error";

type TestPassword = {
  onSuccess?: (data: unknown, variables: resetPassword, ctx: unknown) => void;
  onError?: (data: Error, variables: resetPassword, ctx: unknown) => void;
};

const useRestPassword = ({ onSuccess, onError }: TestPassword = {}) => {
  return useMutation({
    mutationFn: async (credentials: resetPassword) => {
      return await api.post("/auth/reset-password", credentials, {
        requiresAuth: false,
      });
    },
    onSuccess: (data, variables, ctx) => {
      if (onSuccess) {
        onSuccess(data, variables, ctx);
      }
    },
    onError(error, variables, ctx) {
      handleError(error);
      if (onError) {
        onError(error, variables, ctx);
      }
    },
  });
};

export { useRestPassword };
