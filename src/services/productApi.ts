import api from '@/lib/axiosInstance';
export type ProductIntro = {
  announcements: Announcement[];
  description: string;
};

export type Announcement = {
 name: string;
 value:string;
 displayOrder:number;

};
export type ProductWish ={
    wishCount:number
    isWished:boolean;
}
export const fetchProductIntro = async (productId: number) => {
  const res = await api.get(`/products/${productId}`);
  return res.data.data;
};

export const fetchProductDetail = async (productId: number) => {
  const res = await api.get(`/products/${productId}/detail`);
  return res.data.data;
};

export const fetchProductHighlightReview = async (productId: number) => {
  const res = await api.get(`/products/${productId}/highlight-review`);
  return res.data.data.reviews;
};
export const fetchProductWish = async (productId: number)=>{
    const res = await api.get(`/products/${productId}/wish`)

return res.data.data
}
