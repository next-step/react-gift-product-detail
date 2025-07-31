## step3 과제 수행 내용

- Form Field를 테스트하기 위해 ReceiverFormItem.test.tsx 파일을 만들어 테스트 코드를 만들었습니다.
- Typography를 테스트하기 위해 Typography.tsx 파일을 만들어 기본적인 컴포넌트를 생성해, Typography.test.tsx파일을 만들어 테스트했습니다.

## step2 피드백 반영 내용

- suspense와 errorboundary로 반복되던 코드를 hoc를 정의하여 리팩터링했습니다.
- MyPage.tsx에서 로그아웃버튼이 눌리면 useAuth내부에서 로그아웃을 한 뒤, onLogout을 통해 Mypage로 로그아웃됨을 알려 navigate 로직이 실행되도록 했습니다.
- ReceiverModal.tsx에서 받는 사람의 목록을 편집하는 UI를 제공하고, 입력된 데이터를 검증하여 외부에 알리는 것에만 집중하도록 관심사를 분리했습니다. props를 통해 전달받은 콜백 함수를 통해 완료 버튼이 눌리면 onSubmit(data)를 호출하여 보고하고, 취소 버튼이 눌리면 onClose()를 호출하여 취소했다고 보고하는 형식으로 리팩터링했습니다.
- ReceiverModal.tsx는 이제 스스로를 닫지 않습니다. onClose, onSubmit을 호출 하기만 합니다. onSubmit으로 넘겨지는 데이터에 대해서 관심을 가지지 않도록 유지했습니다.
- ReceiverInfoSection.tsx는 모달을 여는 함수를 실행해 isModalOpen을 true로 변경하고, onSubmit, onClose 보고를 받으면 함수를 실행해 데이터를 업데이트하거나 모달을 닫습니다.
- ProductDetailTabs에서는 onTabClick이라는 prop을 받고, 어떤 탭이 클릭되었는지에 대한 정보만 담아서 onTabClick을 호출합니다.
- ProductDetailPage에서는 onTabClick 이벤트를 받아서, activeTab 상태를 변경하는 로직을 수행합니다.
- useThemeinfiniteScroll.ts에서 useInitialThemeQuery, useThemeData, useNextThemeQuery, useInterSectionObserver 훅으로 추상화 시켜 각각 최초 데이터 펫칭, 데이터 기록, 새로운 데이터 펫칭, 페이지 감시의 역할을 수행할 수 있게 한 뒤 useThemeinfiniteScroll.ts에서 조합하여 사용할 수 있도록 리팩터링했습니다. 이제 더이상 useSuspenseApiQuery, useApiQuery처럼 1차 추상화된 훅을 직접적으로 사용하지 않습니다.

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
