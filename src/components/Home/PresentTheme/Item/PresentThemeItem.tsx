import {
  StyledImage,
  StyledPresentThemeDiv,
  StyledPresentThemeItemDiv,
  StyledPresentThemeItemP,
} from '@src/components/Home/PresentTheme/Item/StyledPresnetThemeItem';
import { StyledPresentThemeCommonP } from '@src/components/Home/PresentTheme/Common/StyledPresentThemeCommonP';
import type { Theme } from './ThemeType';
import { usePresentThemeFetch } from '@src/components/Home/PresentTheme/Item/usePresentThemeFetch';

const PresentThemeItem = () => {
  const { data, isError, isLoading } = usePresentThemeFetch();

  if (isLoading) {
    return <div>Loading</div>;
  } else if (isError) {
    return <>{alert('에러 발생')}</>;
  } else {
    return (
      <>
        <StyledPresentThemeCommonP>선물 테마</StyledPresentThemeCommonP>
        <StyledPresentThemeDiv>
          {data &&
            data?.data.map((item: Theme) => (
              <a href={'/themes/' + item.themeId} key={item.themeId}>
                <StyledPresentThemeItemDiv key={item.themeId} className='border'>
                  <StyledImage src={item.image} alt={item.name} />
                  <StyledPresentThemeItemP>{item.name}</StyledPresentThemeItemP>
                </StyledPresentThemeItemDiv>
              </a>
            ))}
        </StyledPresentThemeDiv>
      </>
    );
  }
};

export default PresentThemeItem;
