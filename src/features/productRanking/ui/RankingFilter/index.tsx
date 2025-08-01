import { genderItems, actionItems } from '../../model/constants';
import * as S from './styles';

interface RankingFilterProps {
  selectedGender: string;
  selectedAction: string;
  onGenderChange: (gender: string) => void;
  onActionChange: (action: string) => void;
}

const RankingFilter = ({
  selectedGender,
  selectedAction,
  onGenderChange,
  onActionChange,
}: RankingFilterProps) => {
  return (
    <S.FilterContainer>
      <S.GenderFilterContainer>
        {genderItems.map(option => (
          <S.GenderButton key={option.key} onClick={() => onGenderChange(option.key)}>
            <S.GenderIconContainer isSelected={selectedGender === option.key}>
              {option.icon}
            </S.GenderIconContainer>
            <S.GenderText isSelected={selectedGender === option.key}>{option.label}</S.GenderText>
          </S.GenderButton>
        ))}
      </S.GenderFilterContainer>

      <S.ActionFilterContainer>
        {actionItems.map(action => (
          <S.ActionButton
            key={action.key}
            isSelected={selectedAction === action.key}
            onClick={() => onActionChange(action.key)}
          >
            {action.label}
          </S.ActionButton>
        ))}
      </S.ActionFilterContainer>
    </S.FilterContainer>
  );
};

export default RankingFilter;
