import axiosInstance from "@/utils/axiosInstance"
import { AxiosRequestConfig } from "axios"

const fetchHandler = <T,>(url: string, options?: AxiosRequestConfig) =>
  axiosInstance.get<T>(url, options).then((res) => res.data)
export default fetchHandler
