import axiosInstance from "@/utils/axiosInstance"
const fetchHandler = <T,>(url: string,options?:any) =>
  axiosInstance.get<T>(url,options).then((res) => res.data)

export default fetchHandler
