import { GiftThemeSection, ThemeGrid, ThemeImage, ThemeItem, ThemeLabel } from './GiftTheme.styled';
import { Gap, Title, TitleDiv } from '@/styles/CommomStyle/Common.styled';
import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import Loading from '../Loading';
import useGiftThemeListData from '@/hook/main/useGiftThemeListData';






const GiftThemeList = () => {
  const { data } = useGiftThemeListData();
  
  const navigate = useNavigate();
  return (
    <ThemeGrid>
      {data?.map(({ themeId, name, image }) => (

        <ThemeItem key={themeId} onClick={() => navigate(`Themes/${themeId}`)}>
          <ThemeImage src={image} alt={name} />
          <ThemeLabel>{name}</ThemeLabel>
        </ThemeItem>
      ))}
    </ThemeGrid>
  )
}


const GiftTheme = () => {


  return (
    <GiftThemeSection>
      <Gap height={24} />
      <TitleDiv><Title>선물 테마</Title></TitleDiv>
      <ErrorBoundary fallback={null}>
        <Suspense fallback={<Loading />}>
        <GiftThemeList />
        </Suspense>
        </ErrorBoundary>
        <Gap height={24} />

    </GiftThemeSection>
  );
};

export default GiftTheme;
