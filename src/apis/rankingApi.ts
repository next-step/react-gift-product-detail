import axiosInstance from './axiosInstance';

// Home 페이지 랭킹 상품 요청 API
export const fetchRankedProducts = async (
  apiTargetType: string,
  apiRankType: string
) => {
  const res = await axiosInstance.get(
    `/products/ranking?targetType=${apiTargetType}&rankType=${apiRankType}`
  );
  return res.data.data;
};
