import styled from "@emotion/styled";
import type { ProductAnnouncement as AnnouncementItem } from "@/types/product";

type Props = {
  announcements: AnnouncementItem[];
};

const ProductAnnouncement = ({ announcements }: Props) => {
  return (
    <Wrapper>
      {announcements.map((item) => (
        <Row key={item.name}>
          <Label>{item.name}</Label>
          <Value>{item.value}</Value>
        </Row>
      ))}
    </Wrapper>
  );
};

export default ProductAnnouncement;

const Wrapper = styled.section`
  padding: ${({ theme }) => theme.spacing.spacing5};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.spacing5};
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid
    ${({ theme }) => theme.colors.semantic.border.default};
  padding-bottom: ${({ theme }) => theme.spacing.spacing5};
`;

const Label = styled.span`
  ${({ theme }) => theme.typography.body2Bold};
  color: ${({ theme }) => theme.colors.semantic.text.sub};
  margin-bottom: ${({ theme }) => theme.spacing.spacing1};
`;

const Value = styled.span`
  ${({ theme }) => theme.typography.body2Regular};
  color: ${({ theme }) => theme.colors.semantic.text.default};
  white-space: pre-wrap;
  line-height: 1.5;
`;
