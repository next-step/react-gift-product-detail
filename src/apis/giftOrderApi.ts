import axiosInstance from './axiosInstance';

export const fetchProductSummury = async (id: string | undefined) => {
  const res = await axiosInstance.get(`/products/${id}/summary`);
  return res.data.data;
};

interface OrderType {
  body: Record<string, unknown>;
  options: { headers: Record<string, string> };
}

export const postOrder = async ({ body, options }: OrderType) => {
  const res = await axiosInstance.post('/order', body, options);
  return res.data.data;
};
