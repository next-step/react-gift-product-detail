import styled from "@emotion/styled";

type Props = {
  description: string;
};

const ProductDetail = ({ description }: Props) => {
  return (
    <Wrapper>
      <Description dangerouslySetInnerHTML={{ __html: description }} />
    </Wrapper>
  );
};

export default ProductDetail;

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing5};
  background-color: ${({ theme }) => theme.colors.semantic.background.default};
`;

const Description = styled.div`
  ${({ theme }) => theme.typography.body1Regular};
  color: ${({ theme }) => theme.colors.semantic.text.default};
  line-height: 1.6;

  img {
    width: 100%;
    max-width: 100%;
    height: auto;
    display: block;
    margin-top: ${({ theme }) => theme.spacing.spacing5};
    border-radius: 8px;
  }
`;
