import { useMutation } from "@tanstack/react-query";
import { auth, type LoginRequest, type LoginResponse } from "@/services/auth";

export function useLoginMutation() {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: auth,
  });
}
