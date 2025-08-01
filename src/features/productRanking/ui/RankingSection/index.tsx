import { useRankingSection } from '../../model/useRankingSection';
import RankingFilter from '../RankingFilter';
import RankingGrid from '../RankingGrid';
import * as S from './styles';

const RankingSection = () => {
  const {
    data,
    isExpanded,
    selectedGender,
    selectedAction,
    handleGenderChange,
    handleActionChange,
    handleItemCardClick,
    handleToggleExpand,
  } = useRankingSection();

  return (
    <S.Section>
      <S.Title>실시간 급상승 선물랭킹</S.Title>

      <RankingFilter
        selectedGender={selectedGender}
        selectedAction={selectedAction}
        onGenderChange={handleGenderChange}
        onActionChange={handleActionChange}
      />

      <RankingGrid
        data={data}
        isExpanded={isExpanded}
        onToggleExpand={handleToggleExpand}
        onItemClick={handleItemCardClick}
      />
    </S.Section>
  );
};

export default RankingSection;
