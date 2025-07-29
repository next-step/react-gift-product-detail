import styled from '@emotion/styled';
import { filters, generations } from '@/data/categoryDatas';
import useSearchParamState from '../../hooks/useSearchParamState';
import RankList from './RankList';

interface ButtonProps {
  isActive: boolean;
}

const GiftRankingSection = () => {
  const {
    handleGenerationGroupClick,
    handleFilterGroupClick,
    activeGenerationButton,
    activeFilterButton,
  } = useSearchParamState();

  return (
    <Section>
      <Title>실시간 급상승 선물랭킹</Title>

      <CatContainer>
        <GenerationGroup>
          {generations.map(({ id, emoji, label }) => (
            <Button
              key={id}
              isActive={activeGenerationButton === id}
              onClick={() => handleGenerationGroupClick(id)}
            >
              <div>{emoji}</div>
              <p>{label}</p>
            </Button>
          ))}
        </GenerationGroup>

        <FilterGroup>
          {filters.map(({ id, label }) => (
            <Button
              key={id}
              isActive={activeFilterButton === id}
              onClick={() => handleFilterGroupClick(id)}
            >
              <p>{label}</p>
            </Button>
          ))}
        </FilterGroup>
      </CatContainer>
      <RankList
        activeGenerationButton={activeGenerationButton}
        activeFilterButton={activeFilterButton}
      />
    </Section>
  );
};

export default GiftRankingSection;

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.spacing4} ${({ theme }) => theme.spacing.spacing3};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.semantic.background.default};
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.typography.title2Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title2Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title2Bold.lineHeight};
  color: ${({ theme }) => theme.colors.semantic.text.default};
  margin: 0px;
  width: 100%;
  text-align: left;
`;

const CatContainer = styled.div`
  border-radius: ${({ theme }) => theme.spacing.spacing2};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GenerationGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.spacing2};
  margin-bottom: ${({ theme }) => theme.spacing.spacing6};
`;

const FilterGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.spacing2};
  margin-bottom: ${({ theme }) => theme.spacing.spacing6};
`;

const Button = styled.button<ButtonProps>`
  padding: ${({ theme }) => theme.spacing.spacing3};
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.colorScale.blue[700] : theme.colors.colorScale.gray[100]};
  border: 1px solid ${({ theme }) => theme.colors.colorScale.gray[300]};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
