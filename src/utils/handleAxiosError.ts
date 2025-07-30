import axios from 'axios';
import { toast } from 'react-toastify';

const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message =
      error.response?.data?.data?.message || '알 수 없는 에러가 발생했습니다.';

    if (status && status >= 400 && status < 500) {
      toast.error(message);
    } else {
      toast.error('서버 오류 또는 네트워크 문제 발생');
    }
  } else {
    toast.error('예상치 못한 에러 발생');
  }
};

export default handleAxiosError;
