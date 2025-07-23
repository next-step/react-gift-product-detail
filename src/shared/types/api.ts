export interface ApiResponse<T> {
    data: T;
}

export interface ApiErrorData {
    status: string;
    statusCode: number;
    message: string;
}

export interface ApiErrorResponse {
    data: ApiErrorData;
}

export interface AxiosErrorResponse {
    response?: {
        status: number;
        data: ApiErrorResponse;
    };
    message: string;
}
