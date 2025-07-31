import { theme } from '@/theme/theme';
import styled from '@emotion/styled';
import Tab from './Tab';
import Content from './Content';

const Section = styled.section`
  width: 100%;
  background-color: ${theme.semanticColors.background.default};
`;

const Container = styled.div`
  width: 100%;
`;
const DetailSection = () => {
  return (
    <>
      <Section>
        <Container>
          <Tab />
          <Content />
        </Container>
      </Section>
    </>
  );
};

export default DetailSection;
