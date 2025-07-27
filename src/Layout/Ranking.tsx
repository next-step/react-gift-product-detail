import SexContainer from '@/pages/SexContainer';
import CategoryContainer from '@/pages/CategoryContainer';
import ItemContainer from '@/pages/ItemContainer';
import { RankingContainer, RankingTitle } from '@/styles/RankingStyle.styles.ts';
import useRanking from '@/hooks/useRanking';

function Ranking() {
  const {
    isLoading,
    error,
    selectedSex,
    selectCategory,
    items,
    handleSelect,
    handleCategoryClick,
  } = useRanking();

  if (isLoading) return <div>로딩중입니다.</div>;
  if (error) return <p>{String(error)}</p>;

  return (
    <RankingContainer>
      <RankingTitle>실시간 급상승 선물랭킹</RankingTitle>
      <SexContainer selectedSex={selectedSex} handleSelect={handleSelect} />
      <CategoryContainer
        selectedCategory={selectCategory}
        handleCategoryClick={handleCategoryClick}
      />
      <ItemContainer itemList={items} />
    </RankingContainer>
  );
}

export default Ranking;
