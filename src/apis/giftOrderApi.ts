import axiosInstance from './axiosInstance';

export const fetchProductSummury = async (id: string | undefined) => {
  const res = await axiosInstance.get(`/products/${id}/summary`);
  return res.data.data;
};
