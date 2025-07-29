import styled from "@emotion/styled";
import type { ProductDetailAnnouncement } from "@/types/ProductType";

interface DetailProps {
  data: ProductDetailAnnouncement[];
}

const Detail = ({ data }: DetailProps) => {
  return (
    <Container>
      {data.map((announcement) => (
        <Wrapper key={announcement.name}>
          <Label>{announcement.name}</Label>
          <Content>{announcement.value}</Content>
        </Wrapper>
      ))}
    </Container>
  );
};

export default Detail;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.spacing8};
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.spacing2};
`;
const Label = styled.p`
  font: ${({ theme }) => theme.typography.label1Bold};
  text-align: left;
`;
const Content = styled.p`
  font: ${({ theme }) => theme.typography.body1Regular};
`;
