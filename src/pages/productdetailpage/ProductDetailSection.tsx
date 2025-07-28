/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import type { ProductDetail } from "@/types/api_types";

interface ProductDetailSectionProps {
  productDetail: ProductDetail;
}

const ProductDetailSection = ({ productDetail }: ProductDetailSectionProps) => {
  return (
    <Container>
      {productDetail.announcements &&
        productDetail.announcements.length > 0 && (
          <AnnouncementsWrapper>
            {productDetail.announcements
              .sort((a, b) => a.displayOrder - b.displayOrder) // displayOrder에 따라 정렬
              .map((announcement, index) => (
                <AnnouncementItem key={index}>
                  <AnnouncementName>{announcement.name}</AnnouncementName>
                  <AnnouncementValue>{announcement.value}</AnnouncementValue>
                </AnnouncementItem>
              ))}
          </AnnouncementsWrapper>
        )}
    </Container>
  );
};

const Container = styled.div`
  padding: 10px;
  text-align: left;
`;

const AnnouncementsWrapper = styled.div`
  margin-top: 20px;
  padding: 10px;
`;

const AnnouncementItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const AnnouncementName = styled.div`
  font-weight: bold;
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  margin-bottom: 10px;
`;

const AnnouncementValue = styled.div`
  font-size: ${({ theme }) => theme.typography.subtitle1Regular.fontSize};
`;

export default ProductDetailSection;
