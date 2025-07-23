import { useMutation } from "@tanstack/react-query";
import { login, type LoginResponse } from "@/apis/auth";

interface LoginVariables {
    email: string;
    password: string;
}

export function useLoginMutation() {
    return useMutation<LoginResponse, Error, LoginVariables>({
        mutationFn: login,
    });
}