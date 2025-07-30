import type { GiftAnnouncement } from "@/types/gift";
import ContentItem from "./ContentItem";
import styled from "@emotion/styled";

type ProductDetailSectionProps = {
  announcements: GiftAnnouncement[];
};

const ProductDetailSection = ({ announcements }: ProductDetailSectionProps) => {
  return (
    <Container>
      {announcements.map(announcement => (
        <ContentItem
          key={announcement.displayOrder}
          title={announcement.name}
          content={announcement.value}
        />
      ))}
    </Container>
  );
};

export default ProductDetailSection;

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing4};
  background-color: ${({ theme }) => theme.colors.gray.gray00};
`;
