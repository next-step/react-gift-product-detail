import styled from '@emotion/styled';
import CardSection from './components/CardSection';
import GridSection from './components/GridSection';

const ThemesPage = () => {
  return (
    <Container>
      <CardSection />
      <GridSection />
    </Container>
  );
};
export default ThemesPage;

const Container = styled.section`
  width: 100%;
  height: 100%;
`;
