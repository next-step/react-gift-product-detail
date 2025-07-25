import SegmentedControl from '@/components/common/SegmentedControl';
import {
  RANK_TYPE_META,
  RANK_TYPE_VALUES,
  type RankType,
} from '@/constants/rankingParams';

interface RankingSortProps {
  selectedSort: RankType;
  onSelect: (value: RankType) => void;
}

const options = RANK_TYPE_VALUES.map(value => ({
  value,
  label: RANK_TYPE_META[value].label,
}));

const RankingSort = ({ selectedSort, onSelect }: RankingSortProps) => {
  return (
    <SegmentedControl
      options={options}
      selectedValue={selectedSort}
      onSelect={onSelect}
    />
  );
};

export default RankingSort;
