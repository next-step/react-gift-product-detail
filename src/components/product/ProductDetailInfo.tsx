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

const ProductDetailInfo = ({ productId }: ProductDetailInfoProps) => {
  const { data } = useProductDetail(productId);

  if (!data?.announcements || data.announcements.length === 0) {
    return null;
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
