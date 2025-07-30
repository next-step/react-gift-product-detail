import styled from '@emotion/styled';

interface DescriptionProps {
  description: string;
}

const Description = ({ description }: DescriptionProps) => {
  return <Content dangerouslySetInnerHTML={{ __html: description }} />;
};

export default Description;

const Content = styled.div`
  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  }
`;
