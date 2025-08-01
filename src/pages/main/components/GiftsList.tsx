import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import GiftItem from "./GiftItem";
import { ROUTE_PATH } from "@/routes/paths";
import type { Gift } from "@/types/gift";

type GiftsListProps = {
  items: Gift[];
};

const GiftsList = ({ items }: GiftsListProps) => {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  const navigateToProduct = (giftId: number) => {
    navigate(`${ROUTE_PATH.PRODUCT.replace(":id", giftId.toString())}`);
  };

  useEffect(() => {
    setShowMore(false);
  }, [items]);

  const visibleItems = showMore ? items : items.slice(0, 6);

  return (
    <>
      <GiftsGrid>
        {visibleItems.map((item, index) => (
          <GiftItem
            key={item.id}
            imageURL={item.imageURL}
            name={item.name}
            brandName={item.brandInfo.name}
            price={item.price.sellingPrice}
            rank={index + 1}
            as="button"
            type="button"
            onClick={() => navigateToProduct(item.id)}
          />
        ))}
      </GiftsGrid>
      <GiftsToggle>
        <GiftsButton onClick={() => setShowMore(!showMore)}>
          {showMore ? "접기" : "더보기"}
        </GiftsButton>
      </GiftsToggle>
    </>
  );
};
export default GiftsList;

const GiftsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => `${theme.spacing.spacing6} ${theme.spacing.spacing2}`};
  padding: ${({ theme }) => `${theme.spacing.spacing4} 0`};
`;

const GiftsToggle = styled.p`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const GiftsButton = styled.button`
  max-width: 480px;
  width: 100%;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.spacing3};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.gray.gray400};
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.body2Regular.lineHeight};
  color: ${({ theme }) => theme.colors.semantic.text.default};
`;
