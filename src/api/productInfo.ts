import apiClient from '@/api/apiClient';

export interface Product {
  id: number;
  name: string;
  imageURL: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
}

export const getProductInfo = async (productId: number): Promise<Product> => {
  const response = await apiClient.get(`/api/products/${productId}`);
  return response.data.data;
};
