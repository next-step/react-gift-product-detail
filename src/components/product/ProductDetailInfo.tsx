import styled from '@emotion/styled';
import { useProductDetail } from '@/hooks/useProduct';

interface ProductDetailInfoProps {
  productId: number;
}

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.spacing5};
`;

const Item = styled.li``;

const Name = styled.div`
  ${({ theme }) => theme.typography.body2Bold};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  margin-bottom: ${({ theme }) => theme.spacing.spacing1};
`;

const Value = styled.p`
  ${({ theme }) => theme.typography.body1Regular};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  white-space: pre-line;
  line-height: 1.7;
`;

const Empty = styled.p`
  ${({ theme }) => theme.typography.body2Regular};
  color: ${({ theme }) => theme.colors.semantic.textSub};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.spacing6};
`;

const ProductDetailInfo = ({ productId }: ProductDetailInfoProps) => {
  const { data } = useProductDetail(productId);

  if (!data?.announcements || data.announcements.length === 0) {
    return <Empty>상품에 대한 상세정보가 아직 없어요.</Empty>;
  }

  const sorted = [...data.announcements].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <List>
      {sorted.map((item, idx) => (
        <Item key={idx}>
          <Name>{item.name}</Name>
          <Value>{item.value}</Value>
        </Item>
      ))}
    </List>
  );
};

export default ProductDetailInfo;
