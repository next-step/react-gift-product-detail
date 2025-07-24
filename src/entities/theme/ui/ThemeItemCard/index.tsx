import { useNavigate } from 'react-router-dom';
import * as S from './styles';

interface ThemeItemCardProps {
  themeId: number;
  imageUrl: string;
  title: string;
}

const ThemeItemCard = (props: ThemeItemCardProps) => {
  const { themeId, imageUrl, title } = props;
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/themes/${themeId}`);
  };
  
  return (
    <S.Card onClick={handleClick}>
      <S.Image src={imageUrl} alt={title} />
      <S.Title>{title}</S.Title>
    </S.Card>
  );
};

export default ThemeItemCard; 