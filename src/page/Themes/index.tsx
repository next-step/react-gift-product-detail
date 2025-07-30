import styled from '@emotion/styled';
import CardSection from './components/CardSection';
import GridSection from './components/GridSection';
import useThemeInfo from './hooks/useThemeInfo';

const ThemesPage = () => {
  const { themeIdInfo } = useThemeInfo();

  if (!themeIdInfo) return null;

  return (
    <Container>
      <CardSection themeIdInfo={themeIdInfo} />
      <GridSection />
    </Container>
  );
};
export default ThemesPage;

const Container = styled.section`
  width: 100%;
  height: 100%;
`;
