import styled from '@emotion/styled';
import {
  TARGET_TYPE_META,
  TARGET_TYPE_VALUES,
  type TargetType,
} from '@/constants/rankingParams';

interface RankingFilterProps {
  selectedFilter: TargetType;
  onSelect: (value: TargetType) => void;
}

const filters = TARGET_TYPE_VALUES.map(value => ({
  value,
  emoji: TARGET_TYPE_META[value].emoji,
  label: TARGET_TYPE_META[value].label,
}));

const RankingFilter = ({ selectedFilter, onSelect }: RankingFilterProps) => {
  return (
    <FilterWrapper>
      {filters.map(filter => {
        const isSelected = selectedFilter === filter.value;
        return (
          <FilterButton
            key={filter.value}
            onClick={() => onSelect(filter.value)}
          >
            <Emoji isSelected={isSelected}>{filter.emoji}</Emoji>
            <Label isSelected={isSelected}>{filter.label}</Label>
          </FilterButton>
        );
      })}
    </FilterWrapper>
  );
};

export default RankingFilter;

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const FilterButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  border: none;
  background-color: ${({ theme }) => theme.color.semantic.background.default};
  cursor: pointer;
`;

const Emoji = styled.div<{ isSelected: boolean }>`
  background: ${({ theme, isSelected }) =>
    isSelected ? theme.color.blue[700] : theme.color.blue[200]};
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.color.gray[0] : theme.color.blue[400]};
  border-radius: 16px;
  width: 2.75rem;
  height: 2.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.typography.subtitle.subtitle2Bold};
`;

const Label = styled.p<{ isSelected: boolean }>`
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.color.blue[700] : theme.color.semantic.text.sub};
  ${({ theme, isSelected }) =>
    isSelected
      ? theme.typography.subtitle.subtitle2Bold
      : theme.typography.subtitle.subtitle2Regular};
  margin: 0;
  text-align: left;
`;
