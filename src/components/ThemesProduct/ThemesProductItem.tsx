import StyledTopestDiv from '@src/styles/StyledTopesDiv';
import {
  StyledThemesProductGridContainer,
  StyledThemesProductPaddingContainer,
} from './StyledThemesProductItem';
import { usePresentThemeFetch } from './useThemesProductItem';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { ThemesProductionLabel } from './ThemesProductionLabel';
import PresentProductList from '../Home/PresentRanking/Item/PresentProductList';
import type { Goods } from '@src/types/Goods';

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
            data={{ data: data } as Goods}
            isLoading={isLoading}
            isError={isError}
          />
          <div className='loader' ref={loaderRef}></div>
        </StyledThemesProductGridContainer>
      </StyledThemesProductPaddingContainer>
    </StyledTopestDiv>
  );
};
export default ThemesProductItem;
