import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { useProductDetail } from '@/hooks/useProductDetail';
import { loading } from '@/components/common/Loading';
import { ERROR_MESSAGES } from '@/constants/validation';

const ProductAnnouncements = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data: detail, isLoading, isError } = useProductDetail(productId);

  if (isLoading) return loading;
  if (isError || !detail) {
    return <ErrorText>{ERROR_MESSAGES.LOAD_PRODUCT_FAIL}</ErrorText>;
  }

  const announcements = detail.announcements ?? [];

  if (announcements.length === 0) {
    return <EmptyText>상세 정보가 없습니다.</EmptyText>;
  }

  return (
    <InfoList>
      {announcements.map(({ name, value, displayOrder }) => (
        <li key={displayOrder}>
          <InfoTitle>{name}</InfoTitle>
          <InfoContent>{value}</InfoContent>
        </li>
      ))}
    </InfoList>
  );
};

export default ProductAnnouncements;

const InfoList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
  padding: 0;
`;

const InfoTitle = styled.p`
  ${({ theme }) => theme.typography.label.label1Bold};
  color: ${({ theme }) => theme.color.semantic.text.default};
`;

const InfoContent = styled.p`
  ${({ theme }) => theme.typography.body.body1Regular};
  color: ${({ theme }) => theme.color.semantic.text.default};
  white-space: pre-wrap;
  margin-top: ${({ theme }) => theme.spacing[1]};
`;

const EmptyText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.color.gray[500]};
  ${({ theme }) => theme.typography.body.body2Regular};
`;

const ErrorText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.color.semantic.text.default};
  padding: ${({ theme }) => theme.spacing[6]};
  ${({ theme }) => theme.typography.body.body2Regular};
`;
