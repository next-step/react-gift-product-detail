import type { LoginRequest, LoginResponse } from "../model/types";
import type { ApiResponse } from "@/shared/types";
import { api } from '@/shared/lib/api';

export const login = async (loginData: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<ApiResponse<LoginResponse>>("/login", loginData);
    return response.data.data;
}
