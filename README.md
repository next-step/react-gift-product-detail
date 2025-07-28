## step2 구현 내용

- 상품 카드를 클릭하면 상품상세페이지로 이동하도록 로직을 변경했습니다.
- 상품 상세 페이지에 진입 시 useProductDetail 훅을 통해 필요한 정보를 api요청을 통해 받아옵니다.
- ProductDetailPage.tsx에서 필요한 정보를 prop으로 각 section에 전달합니다.
- 상품 상세 페이지에서 하단의 상품설명, 선물후기, 상세정보 탭을 통해 각 정보를 출력하도록 합니다.
- 하단의 좋아요 버튼을 클릭하면 낙관적 업데이트를 통해 wishcount수를 변경하고, UI를 업데이트합니다.
- 하단의 주문하기 버튼을 클릭하면 OrderPage로 이동합니다.
- HomePage.tsx를 만들어 페이지 컴포넌트간의 일관성을 높였습니다.
- ErrorBoundary를 통한 에러 핸들링 로직을 새로고침을 하는것에서 홈 화면으로 이동하는것으로 변경했습니다.

## step1 피드백 반영 내용

- 각종 함수 이름 기능에 맞게 바꾸고, 변수 이름을 일관성있게 통일했습니다.
- 최상위 레이어에 있던 필요없는 suspense 제거했습니다.
- RisingItem.tsx에서 prop으로 product를 받아 바로 요소를 분해하여 사용하는 방식으로 변경했습니다.
- RisingList.tsx에서 바로 사용하던 useSuspenseApiQuery를 useProducts 훅으로 한단계 추상화 했습니다.
- useOrderForm.ts에서 잘못사용되고 있던 try/catch 를 제거했습니다.
- IntersectionObserver에서 onIntersect에 entries를 넘기도록 변경했습니다.

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
