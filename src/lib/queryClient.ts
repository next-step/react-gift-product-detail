import { type Query, QueryClient, QueryCache, MutationCache, type Mutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

// meta 타입을 정의합니다.
interface CustomMeta {
  showToast?: boolean;
}

// 에러 응답 타입을 정의합니다.
interface ErrorResponse {
  message?: string;
}

// 전역 에러 핸들러는 쿼리/뮤테이션의 meta 정보를 확인합니다.
const handleGlobalError = (
  error: unknown,
  queryOrMutation: Query<unknown, unknown, unknown, readonly unknown[]> | Mutation<unknown, unknown, unknown, unknown>,
) => {
  const meta = queryOrMutation.options.meta as CustomMeta | undefined;

  // meta.showToast가 false로 명시된 경우, 전역 토스트를 띄우지 않습니다.
  if (meta?.showToast === false) {
    return;
  }

  let errorMessage = '예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';

  if (error instanceof AxiosError) {
    const responseData = error.response?.data as ErrorResponse;
    if (responseData?.message) {
      errorMessage = responseData.message;
    }
  }

  // 기본적으로 토스트 메시지를 표시합니다.
  toast.error(errorMessage);
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => handleGlobalError(error, query),
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => handleGlobalError(error, mutation),
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 60,
      meta: {
        showToast: true, // 기본적으로 토스트를 보여주도록 설정
      },
    },
    mutations: {
      retry: 0,
      meta: {
        showToast: true, // 기본적으로 토스트를 보여주도록 설정
      },
    },
  },
});
