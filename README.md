## step1 구현 내용

- useApiRequest.ts를 useApiQuery.ts, useApiMutation.ts, useSuspenseApiQuery.ts 세개의 커스텀훅으로 분리하여 react-query방식으로 api를 다룰 수 있게 했습니다.
- useSuspenseApiQuery를 이용하여 Suspense, ErrorBoundary로직을 활성화했습니다.
- ErrorBoundary로직을 ErrorFallback 컴포넌트를 통해 정의하고, useQuery, useMutation이 사용된 컴포넌트에서 throw를 통해 에러핸들링을 할 수 있도록 리팩터링했습니다.

## step0 피드백 반영 내용

- OrderPage에서 인증이 없을 때 hook은 항상 호출하고, 렌더링만 분기할 수 있도록 선언적 방식 사용했습니다.
- 각 페이지 컴포넌트 폴더에 hooks/폴더를 만들어서 해당 컴포넌트에서 사용되는 훅을 관리합니다.
- OrderPage.tsx의 데이터 페칭, 폼 로직을 훅으로 분리 했습니다.
- MessageCardSection.tsx의 상태관리 useMessageCard 훅으로 분리했습니다.
- ThemeProductList.tsx 비즈니스로직 훅으로 분리했습니다.
- ThemeProductPage.tsx 데이터 페칭, themeId 파싱 로직 커스텀훅으로 분리했습니다.
- AuthContext.tsx에서 커스텀훅을 통한 상태, 스토리지 동기화 구현했습니다. 로그인 여부와 사용자 정보를 userInfo로 통합해서 관리할 수 있게 리팩터링했습니다.
- 기존의 useInfiniteScroll.ts는 intersectionobserver역할만 하기 때문에 useIntersectionObserver.ts로 이름을 바꾸고, useThemeInfiniteScroll.ts로 무한스크롤 로직을 구현하여 ThemeProductList에서 사용할 수 있도록 했습니다.
- navigationbar에서 handleBack -> gotoBack으로 변경했습니다.
