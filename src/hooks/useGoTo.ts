import { useNavigate } from 'react-router-dom';

export function useGoToHome() {
  const navigate = useNavigate();
  return () => {
    navigate('/');
  };
}

export function useGoToLogin() {
  const navigate = useNavigate();
  return () => {
    navigate('/my');
  };
}

export function useGoToOrder(productId: number | string) {
  const navigate = useNavigate();
  return () => {
    navigate(`/order/${productId}`);
  };
}

export function useGoToTheme(themeId: number | string) {
  const navigate = useNavigate();
  return () => {
    navigate(`/themes/${themeId}`);
  };
}

export function useGoBack() {
  const navigate = useNavigate();
  return () => {
    navigate(-1);
  };
}
