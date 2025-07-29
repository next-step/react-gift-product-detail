import styled from "@emotion/styled";

interface DescriptionProps {
  data: string;
}

const Description = ({ data }: DescriptionProps) => {
  return <Container dangerouslySetInnerHTML={{ __html: data }}></Container>;
};

export default Description;

const Container = styled.div`
  max-width: 100%;
  width: 100%;
  overflow: hidden;
  font: ${({ theme }) => theme.typography.body1Regular};

  * {
    max-width: 100%;
    width: 100%;
  }
`;
