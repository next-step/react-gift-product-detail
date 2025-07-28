import styled from '@emotion/styled';

interface Props {
  html: string;
}

const ProductDescription = ({ html }: Props) => {
  return <Description dangerouslySetInnerHTML={{ __html: html }} />;
};

export default ProductDescription;

const Description = styled.div`
  ${({ theme }) => theme.typography.body.body2Regular};
  color: ${({ theme }) => theme.color.semantic.text.default};

  img {
    max-width: 100%;
    border-radius: 8px;
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing[3]};
  }
`;
