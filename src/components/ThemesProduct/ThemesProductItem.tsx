import StyledTopestDiv from '@src/styles/StyledTopesDiv';
import {
  StyledThemesProductGridContainer,
  StyledThemesProductPaddingContainer,
} from './StyledThemesProductItem';
import { usePresentThemeFetch } from './useThemesProductItem';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
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
          <PresentProductList data={data} />
          <div className='loader' ref={loaderRef}></div>
        </StyledThemesProductGridContainer>
      </StyledThemesProductPaddingContainer>
    </StyledTopestDiv>
  );
};
export default ThemesProductItem;
