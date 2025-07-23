## step1 구현 내용

- useApiRequest.ts를 useApiQuery.ts, useApiMutation.ts, useSuspenseApiQuery.ts 세개의 커스텀훅으로 분리하여 react-query방식으로 api를 다룰 수 있게 했습니다.
- useSuspenseApiQuery를 이용하여 Suspense, ErrorBoundary로직을 활성화했습니다.
- ErrorBoundary로직을 ErrorFallback 컴포넌트를 통해 정의하고, useQuery, useMutation이 사용된 컴포넌트에서 throw를 통해 에러핸들링을 할 수 있도록 리팩터링했습니다.

## step0 피드백 반영 내용

- OrderPage에서 인증이 없을 때 hook은 항상 호출하고, 렌더링만 분기할 수 있도록 선언적 방식 사용했습니다.
