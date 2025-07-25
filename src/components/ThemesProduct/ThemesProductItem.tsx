import StyledTopestDiv from '@src/styles/StyledTopesDiv';
import { usePresentThemeFetch } from './useThemesProductLabel';
import {
  StyledThemesProductGridContainer,
  StyledThemesProductPaddingContainer,
} from './StyledThemesProductItem';
import { useThemesProductItem } from './useThemesProductItem';
import { useNavigate } from 'react-router-dom';
import { useIntersectionObserver } from './useIntersectionObserver';
import PresentProductList from '../Home/PresentRanking/Item/PresentRankingItem';
import { ThemesProductionLabel } from './ThemesProductionLabel';

const ThemesProductItem = () => {
  const navigate = useNavigate();
  const { goods, isLoading, isError, loadItem, hasMore } = useThemesProductItem(navigate);
  const loaderRef = useIntersectionObserver({
    onIntersect: loadItem,
    canLoadMore: hasMore,
  });

  return (
    <StyledTopestDiv>
      <ThemesProductionLabel />
      <StyledThemesProductPaddingContainer className='padding-container'>
        <StyledThemesProductGridContainer className='theme-grid-container'>
          <PresentProductList goods={goods} isError={isError} isLoading={isLoading} />
          <div className='loader' ref={loaderRef}></div>
        </StyledThemesProductGridContainer>
      </StyledThemesProductPaddingContainer>
    </StyledTopestDiv>
  );
};
export default ThemesProductItem;
