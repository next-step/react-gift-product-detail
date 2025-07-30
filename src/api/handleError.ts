import axios from 'axios';

interface ErrorBody {
  data: { message: string; status: string; statusCode: number };
}

const handleError = (error: unknown) => {
  if (axios.isAxiosError<ErrorBody>(error)) {
    const message = error.response?.data.data.message ?? '알 수 없는 오류가 발생했습니다.';
    error.message = message;
    throw error;
  } else {
    throw new Error('네트워크 오류가 발생했습니다.');
  }
};

export default handleError;
