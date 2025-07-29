import axios from "axios"

const useFetch = <T,>(url: string) => axios.get<T>(url).then((res) => res.data)

export default useFetch
