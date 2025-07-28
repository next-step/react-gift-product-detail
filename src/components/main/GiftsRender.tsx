import GiftsList from "./GiftsList";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import BoxMessage from "@/components/common/BoxMessage";
import type { TargetType, RankType } from "@/types/gift";
import useProductsRanking from "@/hooks/useProductsRanking";

type GiftsRenderProps = {
  targetType: TargetType;
  rankType: RankType;
};

const GiftsRender = ({ targetType, rankType }: GiftsRenderProps) => {
  const { gifts, isPending, isError } = useProductsRanking({
    targetType,
    rankType,
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
