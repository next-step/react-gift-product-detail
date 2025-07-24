import type { ErrorInfo } from '@/types/error';
import axios from 'axios';
import { useState } from 'react';

type Props = {
  fetcher: (body: any, token?: string) => Promise<any>;
};

const usePost = ({ fetcher }: Props) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<ErrorInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const post = async (body: any, token?: string) => {
    setIsLoading(true);
    try {
      const res = await fetcher(body, token);
      setData(res);
      return res.data;
    } catch (e) {
      let errorInfo: ErrorInfo = { message: '알 수 없는 오류 발생' };

      //axios 에서 발생한 에러이면 response 객체에 안전하게 접근이 가능하다.
      if (axios.isAxiosError(e)) {
        errorInfo = {
          message: e.response?.data?.data.message || '요청 오류가 발생했어요.',
          status: e.response?.data.data.status,
          statusCode: e.response?.data.data.statusCode,
        };
        //일단 js 런타임 에러!  e.message는 Error 객체의 기본 메시지
      } else if (e instanceof Error) {
        errorInfo = { message: e.message };
      }
      setError(errorInfo);
      throw errorInfo; // 이걸 안 던지면 posr 함수 호출 한 쪽에서 에러가 난 줄 모름
      //이렇게 던져야지만 try catch로 잡을 수 있다!
    } finally {
      setIsLoading(false);
    }
  };
  return { data, error, isLoading, post };
};
export default usePost;
