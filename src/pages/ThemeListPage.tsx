import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import MobileLayout from '@/layouts/MobileLayout';
import NavBar from '@/components/NavBar';
import ThemeHero from '@/components/theme/ThemeHero';
import ThemeList from '@/components/theme/ThemeList';
import useThemeInfo from '@/hooks/useThemeInfo';
import { useGoToHome } from '@/hooks/useGoTo';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background-color: #fff;
`;

export default function ThemeListPage() {
  const { themeId } = useParams();
  const parsedId = Number(themeId);
  const goToHome = useGoToHome();

  const { data: themeInfo, isLoading, isError } = useThemeInfo(parsedId);

  useEffect(() => {
    if (isError) {
      goToHome();
    }
  }, [isError, goToHome]);
  if (isLoading) return <p>loading</p>;
  if (!themeInfo) return null;

  return (
    <MobileLayout>
      <Wrapper>
        <NavBar />

        <ThemeHero
          name={themeInfo.name}
          title={themeInfo.title}
          description={themeInfo.description}
          backgroundColor={themeInfo.backgroundColor}
        />

        <ThemeList />
      </Wrapper>
    </MobileLayout>
  );
}
