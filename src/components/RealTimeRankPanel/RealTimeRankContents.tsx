import styled from "@emotion/styled";
import { useState } from "react";
import TargetSelectionPanel from "./subcomponents/TargetSelectionPanel";
import Card from "./subcomponents/Card";
import { type Product } from "@src/mock/productMockData";
import theme from "@src/styles/kakaoTheme";
import { useSearchParams } from "react-router-dom";
import { fetchRealTimeRankings } from "@src/apis/BackEnd/apiList";
import { useSuspenseQuery } from "@tanstack/react-query";
import RankSelectionPanel from "./subcomponents/RankSelectionPanel";

function RealTimeRankContents() {
  const DEFAULT_PRODUCT_LIST_LENGTH = 6;

  const [searchParams] = useSearchParams();
  const targetType = searchParams.get("targetType") ?? "ALL";
  const rankType = searchParams.get("rankType") ?? "MANY_WISH";

  const productList = useSuspenseQuery<Product[]>({
    queryKey: ["realTimeRankings", targetType, rankType],
    queryFn: () => fetchRealTimeRankings(targetType, rankType)
  });

  const [expand, setExpand] = useState<boolean>(false);
  const productRenderList = expand
    ? productList.data
    : productList.data.slice(0, DEFAULT_PRODUCT_LIST_LENGTH);

  return (
    <RealTimeRankContentsWrapper>
      <TitleP>실시간 급상승 선물랭킹</TitleP>
      <TargetSelectionPanel />
      <RankSelectionPanel />
      {productList.data.length > 0 && (
        <>
          <CardPlaceHolder>
            {productRenderList.map((p, i) => {
              return <Card key={p.id} no={i + 1} prod={p} />;
            })}
          </CardPlaceHolder>
          {productList.data.length > DEFAULT_PRODUCT_LIST_LENGTH && (
            <ExpandButton
              onClick={() => {
                setExpand(!expand);
              }}
            >
              {expand ? "접기" : "더보기"}
            </ExpandButton>
          )}
        </>
      )}
      {productList.data.length <= 0 && <NoProduct>상품이 없습니다.</NoProduct>}
    </RealTimeRankContentsWrapper>
  );
}

const NoProduct = styled.div`
  margin: 20px;
  padding: 20px;
  width: calc(100% - 2 * 20px - 2 * 20px);
  border: 1px solid ${theme.colors.gray.gray300};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleP = styled.p`
  width: 95%;
  font-size: 20px;
  font-weight: bold;
`;

const ExpandButton = styled.button`
  border: 2px solid ${theme.colors.gray.gray300};
  background-color: transparent;
  border-radius: 10px;
  width: 95%;
  height: 100px;
  margin-bottom: 100px;
`;

const CardPlaceHolder = styled.div`
  padding: 20px;
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const RealTimeRankContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: white;
`;

export default RealTimeRankContents;
