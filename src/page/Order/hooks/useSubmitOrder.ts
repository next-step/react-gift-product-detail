import { requests } from '@/api/requests';
import { ROUTE_PATH } from '@/routes/routePath';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useSubmitOrder = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: requests.fetchOrder,
    onSuccess: () => {
      navigate(ROUTE_PATH.HOME);
    },
    onError: error => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        navigate(ROUTE_PATH.LOGIN);
      }
    },
  });
};

export default useSubmitOrder;
