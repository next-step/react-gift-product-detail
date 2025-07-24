import {Card,ImageWrapper,ProductImage,RankBadge,Brand,ProductName,Price} from '@/components/gift-ranking/GiftItem.style'
import type { GiftItemProps } from '@/types/giftRankingTheme';

const GiftItem = ({ name, imageURL, brand, price, rank, onClick }: GiftItemProps) => {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      <Card>
        <ImageWrapper>
          <ProductImage src={imageURL} alt={name} />
          <RankBadge>{rank}</RankBadge>
        </ImageWrapper>
        <Brand>{brand}</Brand>
        <ProductName>{name}</ProductName>
        <Price>{price.toLocaleString()} 원</Price>
      </Card>
    </div>
  );
};

export default GiftItem;
