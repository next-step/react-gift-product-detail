import { api } from "@/api/api";
import type { GetRankingProductParams } from "@/api/product/types";
import type { ProductType } from "@/types";

export const getRankingProduct = async (
  params: GetRankingProductParams = {
    targetType: "ALL",
    rankType: "MANY_WISH",
  },
): Promise<ProductType[]> => {
  const { data: response } = await api.get<BaseResponse<ProductType[]>>(
    "/products/ranking",
    {
      params: {
        targetType: params.targetType,
        rankType: params.rankType,
      },
    },
  );
  return response.data;
};
