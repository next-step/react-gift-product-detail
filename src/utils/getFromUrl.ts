import type { ApiResponse } from "@/type/GiftAPI/product";
import axios from "axios";

export async function getFromUrl<T>(url: string): Promise<T> {
  try {
    const response = await axios.get<ApiResponse<T>>(url);
    return response.data.data;
  } catch (error) {
    throw new Error(`${url} 접근 실패,  ${(error as Error).message}`);
  }
}

