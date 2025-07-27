import { GiftThemeSection, ThemeGrid, ThemeImage, ThemeItem, ThemeLabel } from './GiftTheme.styled';
import { Gap, Spinner, SpinnerWrapper, Title, TitleDiv } from '@/styles/CommomStyle/Common.styled';
import { useNavigate } from 'react-router-dom';
import useFetchFromUrlT from '@/hook/useFetchFromUrlT';
import { themeUrl } from '@/constant/api';
import { getFromUrl } from '@/utils/getFromUrl';




const GiftThemeList = () => {
  const { item, loading, error } = useFetchFromUrlT<[]>(themeUrl, getFromUrl, []);
  const navigate = useNavigate();

  if (error) return null

  if (loading) return (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  )

  return (
    <ThemeGrid>
      {item.map(({ themeId, name, image }) => (

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
      <Gap height={24}  />
      <TitleDiv><Title>선물 테마</Title></TitleDiv>
      <GiftThemeList />
      <Gap height={24}  />
    </GiftThemeSection>
  );
};

export default GiftTheme;
