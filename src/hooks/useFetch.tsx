import axiosInstance from "@/utils/axiosInstance"

const useFetch = <T,>(url: string) => axiosInstance.get<T>(url).then((res) => res.data)

export default useFetch 