import styled from '@emotion/styled';
import { ERROR_MESSAGES } from '@/constants/validation';
import { useCategoryThemes } from '@/hooks/useCategoryThemes';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { loading } from '@/components/common/Loading';
import WithApiUi from '@/components/common/WithApiUi';

const CategoryContent = () => {
  const { data: themes, isError } = useCategoryThemes();
  const navigate = useNavigate();

  return (
    <WithApiUi
      data={themes ?? null}
      error={isError}
      loading={loading}
      errorFallback={
        <EmptyText>{ERROR_MESSAGES.FAILED_TO_LOAD_THEMES}</EmptyText>
      }
    >
      <Grid>
        {themes?.map(theme => (
          <Item
            key={theme.themeId}
            onClick={() => navigate(ROUTES.THEME(theme.themeId))}
          >
            <CategoryImage src={theme.image} alt={theme.name} />
            <CategoryText>{theme.name}</CategoryText>
          </Item>
        ))}
      </Grid>
    </WithApiUi>
  );
};

export default CategoryContent;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => `${theme.spacing[5]} ${theme.spacing[1]}`};
  min-height: 250px;
`;

const EmptyText = styled.p`
  ${({ theme }) => theme.typography.body.body2Regular};
  color: ${({ theme }) => theme.color.gray[500]};
  text-align: center;
  padding: ${({ theme }) => theme.spacing[6]};
`;

const Item = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[1]};
  cursor: pointer;
`;

const CategoryImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 40%;
  object-fit: cover;
`;

const CategoryText = styled.p`
  ${({ theme }) => theme.typography.label.label2Regular};
  color: ${({ theme }) => theme.color.semantic.text.default};
`;
