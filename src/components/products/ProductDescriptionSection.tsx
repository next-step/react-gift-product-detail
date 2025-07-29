import styled from "@emotion/styled";

type ProductDescriptionSectionProps = {
  description: string;
};

const ProductDescriptionSection = ({
  description,
}: ProductDescriptionSectionProps) => {
  return (
    <Container>
      <Description dangerouslySetInnerHTML={{ __html: description }} />
    </Container>
  );
};

export default ProductDescriptionSection;

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 400px;
  padding: ${({ theme }) => theme.spacing.spacing4};
  background-color: ${({ theme }) => theme.colors.gray.gray00};
`;

const Description = styled.div`
  white-space: pre-wrap;
  font-size: ${({ theme }) => theme.typography.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.body1Regular.lineHeight};
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
`;
