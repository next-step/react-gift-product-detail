import styled from "@emotion/styled";
import theme from "@src/styles/kakaoTheme";
import { useState } from "react";
import Description from "./details/Description";
import Review from "./details/Review";
import Detail from "./details/Detail";

function ProductDetail() {
  const [detailSelection, setDetailSelection] = useState<
    "description" | "review" | "detail"
  >("description");

  return (
    <>
      <HorizontalLayout>
        <Button
          onClick={() => setDetailSelection("description")}
          selected={detailSelection === "description"}
        >
          상품설명
        </Button>
        <Button
          onClick={() => setDetailSelection("review")}
          selected={detailSelection === "review"}
        >
          선물후기
        </Button>
        <Button
          onClick={() => setDetailSelection("detail")}
          selected={detailSelection === "detail"}
        >
          상세정보
        </Button>
      </HorizontalLayout>
      {detailSelection === "description" && <Description />}
      {detailSelection === "review" && <Review />}
      {detailSelection === "detail" && <Detail />}
    </>
  );
}

const Button = styled.button<{ selected: boolean }>`
  flex: 1;
  cursor: pointer;
  background-color: white;
  padding: 10px;
  border: none;
  border-bottom: 2px solid
    ${({ selected }) =>
      selected
        ? `${theme.colors.gray.gray900}`
        : `${theme.colors.gray.gray400}`};
  transition: all 0.2s ease-in-out;
`;

const HorizontalLayout = styled.div`
  width: 100%;
  display: flex;
`;

export default ProductDetail;
