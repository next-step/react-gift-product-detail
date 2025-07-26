import styled from "@emotion/styled";
import { useState } from "react";
import Description from "@/pages/Product/components/Description";
import Detail from "@/pages/Product/components/Detail";
import Review from "@/pages/Product/components/Review";

const PRODUCT_CONTENT_TAB_TITLE = ["상품설명", "선물후기", "상세정보"];

const ProductContent = () => {
  const [selected, setSelected] = useState(0);

  return (
    <Container>
      <TabWrapper>
        {PRODUCT_CONTENT_TAB_TITLE.map((tab, index) => {
          return (
            <Tab key={tab} selected={index === selected} onClick={() => setSelected(index)}>
              <TabTitle>{tab}</TabTitle>
            </Tab>
          );
        })}
      </TabWrapper>
      <ContentWrapper>
        {selected === 0 && <Description />}
        {selected === 1 && <Review />}
        {selected === 2 && <Detail />}
      </ContentWrapper>
    </Container>
  );
};

export default ProductContent;

const Container = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.color.backgroundColor.default};
`;
const TabWrapper = styled.div`
  display: flex;
  border-bottom: 2px solid ${({ theme }) => theme.color.gray200};
  position: relative;
`;
const Tab = styled.button<{ selected?: boolean }>`
  background-color: ${({ theme }) => theme.color.gray00};
  width: 100%;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  border: none;
  position: relative;
  color: ${({ selected, theme }) => (selected ? theme.color.gray1000 : theme.color.gray600)};
  cursor: pointer;
  transition: 0.2s;

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${({ selected, theme }) => (selected ? theme.color.gray1000 : "transparent")};
    transition: background-color 0.2s;
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.gray100};
  }
`;
const TabTitle = styled.p`
  font: ${({ theme }) => theme.typography.body1Regular};
`;
const ContentWrapper = styled.div`
  min-height: 400px;
  padding: 1rem;
`;
