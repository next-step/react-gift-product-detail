import axios from "axios"

const fetchHandler = <T,>(url: string) =>
  axios.get<T>(url).then((res) => res.data)

export default fetchHandler
