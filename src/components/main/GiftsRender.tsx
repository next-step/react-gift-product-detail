import GiftsList from "./GiftsList";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import BoxMessage from "@/components/common/BoxMessage";
import type { TargetType, RankType } from "@/types/gift";
import useProductsRanking from "@/hooks/api/useProductsRanking";
import { Suspense } from "react";

type GiftsRenderProps = {
  targetType: TargetType;
  rankType: RankType;
};

const GiftsRender = ({ targetType, rankType }: GiftsRenderProps) => {
  const { gifts, isError } = useProductsRanking({
    targetType,
    rankType,
  });

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
  return (
    <Suspense fallback={<LoadingSpinner height="266px" />}>
      <GiftsList items={gifts} />
    </Suspense>
  );
};

export default GiftsRender;
