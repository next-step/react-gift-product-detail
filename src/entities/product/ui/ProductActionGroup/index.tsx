import * as S from './styles';
import IconButton from '@/shared/ui/atoms/IconButton';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/config';
import { useParams } from 'react-router-dom';

export const ProductActionGroup = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const numericProductId = productId ? parseInt(productId, 10) : undefined;

  if (!numericProductId) {
    return null;
  }

  return (
    <S.Container>
      <IconButton onClick={() => {}}>
        <Heart />
      </IconButton>
      <S.OrderButton onClick={() => navigate(`/${ROUTES.ORDER}/${numericProductId}`)}>
        주문하기
      </S.OrderButton>
    </S.Container>
  );
};