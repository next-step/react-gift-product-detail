import GiftsList from "./GiftsList";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import BoxMessage from "@/components/common/BoxMessage";
import { fetchProductsRanking } from "@/api/products";
import type { TargetType, RankType } from "@/types/gift";
import { useQuery } from "@tanstack/react-query";

type GiftsRenderProps = {
  targetType: TargetType;
  rankType: RankType;
};

const GiftsRender = ({ targetType, rankType }: GiftsRenderProps) => {
  const {
    data: gifts,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["gifts", targetType, rankType],
    queryFn: () => fetchProductsRanking({ targetType, rankType }),
    refetchOnWindowFocus: false,
  });

  if (isPending) {
    return <LoadingSpinner height="266px" />;
  }
  if (isError) {
    return (
      <BoxMessage
        message="상품을 불러오는 데 실패했습니다. 다시 시도해주세요."
        height="266px"
      />
    );
  }
  if (!gifts || gifts.length === 0) {
    return <BoxMessage message="상품이 없습니다." height="266px" />;
  }
  return <GiftsList items={gifts} />;
};

export default GiftsRender;
