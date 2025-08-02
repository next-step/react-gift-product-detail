import styled from '@emotion/styled';
import Text from '@/common/Text';
import type { ProductDescription } from '@/types/product';

interface ProductDetailInfoTabProps {
  description: ProductDescription | undefined;
}

const ProductDetailInfoTab = ({ description }: ProductDetailInfoTabProps) => {
  return (
    <Layout>
      {description?.announcements && description?.announcements.length > 0 ? (
        description.announcements.map((announcement) => (
          <DetailItem key={announcement.displayOrder}>
            <Text size="label1" weight="bold">
              {announcement.name}
            </Text>
            <Text>{announcement.value}</Text>
          </DetailItem>
        ))
      ) : (
        <Text>선물 후기가 없습니다.</Text>
      )}
    </Layout>
  );
};

export default ProductDetailInfoTab;

const Layout = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing6};
`;

const DetailItem = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  padding-bottom: ${({ theme }) => theme.spacing.spacing4};
  margin-bottom: ${({ theme }) => theme.spacing.spacing4};
  line-height: 1.6;
`;
