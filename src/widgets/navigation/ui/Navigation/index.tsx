import { useNavigate} from 'react-router-dom';
import * as S from './styles';
import { IconButton } from '@/shared/ui';
import { useAuth } from '@/entities/user/model/context';
import { ChevronLeft, User } from 'lucide-react';
import { ROUTES } from '@/shared/config';

const Navigation = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleBack = () => {
    navigate(-1); 
  };

  const handleLogoClick = () => {
    navigate(`/${ROUTES.HOME}`);
  };

  const handleLoginClick = () => {
    navigate(isLoggedIn ? `/${ROUTES.MYPAGE}` : `/${ROUTES.LOGIN}`);
  };

  return (
    <S.Nav>
      <IconButton onClick={handleBack}>
        <ChevronLeft />
      </IconButton>
      
      <S.Logo onClick={handleLogoClick}
        src="/카카오톡 선물하기.webp" 
        alt="카카오톡 선물하기" 
      />
      
      <IconButton onClick={handleLoginClick}>
        <User />
      </IconButton>
    </S.Nav>
  );
};

export default Navigation; 