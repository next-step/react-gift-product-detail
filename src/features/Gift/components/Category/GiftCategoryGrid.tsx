import { useNavigate } from 'react-router-dom';
import { useThemes } from '@/features/Gift/hooks/useThemes';
import * as S from './GiftCategory.styles';

const GiftCategoryGrid = () => {
  const { themes } = useThemes();
  const navigate = useNavigate();

  const handleSelect = (themeId: number) => {
    navigate(`/themes/${themeId}`);
  };

  return (
    <S.Grid>
      {themes.map((theme) => (
        <S.Item key={theme.themeId} onClick={() => handleSelect(theme.themeId)}>
          <S.ItemImage src={theme.image} alt={theme.name} />
          <S.ItemName>{theme.name}</S.ItemName>
        </S.Item>
      ))}
    </S.Grid>
  );
};

export default GiftCategoryGrid;
