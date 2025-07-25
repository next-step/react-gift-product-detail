import StyledTopestDiv from '@src/styles/StyledTopesDiv';
import {
  StyledThemesProductGridContainer,
  StyledThemesProductPaddingContainer,
} from './StyledThemesProductItem';
import { usePresentThemeFetch } from './useThemesProductItem';
import { useIntersectionObserver } from './useIntersectionObserver';
import PresentProductList from '../Home/PresentRanking/Item/PresentRankingItem';
import { ThemesProductionLabel } from './ThemesProductionLabel';

const ThemesProductItem = () => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } = usePresentThemeFetch();

  const loaderRef = useIntersectionObserver({
    onIntersect: fetchNextPage,
    canLoadMore: hasNextPage,
  });

  return (
    <StyledTopestDiv>
      <ThemesProductionLabel />
      <StyledThemesProductPaddingContainer className='padding-container'>
        <StyledThemesProductGridContainer className='theme-grid-container'>
          <PresentProductList
            goods={(data?.pages ?? []).flatMap((page) => page.list)}
            isError={isError}
            isLoading={isLoading}
          />
          <div className='loader' ref={loaderRef}></div>
        </StyledThemesProductGridContainer>
      </StyledThemesProductPaddingContainer>
    </StyledTopestDiv>
  );
};

export default ThemesProductItem;
