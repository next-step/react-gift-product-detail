# react-gift-product-detail

## ✅4번째 미션 0단계

### 요구사항

- [x] 3차 과제 내용 담긴 나의 코드 불러와 업로드하기

## ✅4번째 미션 1단계

### 요구사항

- [x] 본인만의 기준으로 일관된 코드를 작성해주세요.
  - [x] WithApiUi를 통해 조건별 UI 분기에 대해 작성을 해두었기에 해당 컴포넌트를 적용할 수 있는 CategoryContent, RankingContent, ThemeProductList에 대해 수정 작업을 진행했습니다.\
  - [x] WithApiUi에서 T를 기존에는 배열만 지원했다면 단일 객체 역시 지원하게 하여 ThemeHero.tsx에도 WithApiUi를 적용하여주었습니다.
- [x] 기능 단위로 나누어 커밋을 해주세요.
- [x] 기존에 작성했던 API를 React Query를 이용해서 리팩터링 해요. (GET, POST 모두)
  - [x] npm install을 통해 react-query를 설치했습니다.
  - [x] queryClient.ts를 통해 전역 QueryClient 인스턴스를 생성했습니다.
  - [x] App.tsx에 QueryClientProvider로 전체 구조를 감싸주었습니다.
  - [x] useCategoryThemes에서 useFetch 기반을 useQuery 기반으로 변경해주었습니다. (GET)
  - [x] CategoryContent에서 변경된 구조에 맞게 pending, error 제거 및 data = [] 구조로 단순화 작업을 했습니다.
  - [x] useProductRanking.ts 역시 useFetch -> useQuery로 변경해주었습니다. (GET)
  - [x] RankingGroup, RankingContent를 변경된 hook에 맞게 바꿔주었습니다.
  - [x] useThemeProduct.ts에 useFetch를 이용하던 무한 스크롤을 useInfiniteQuery로 대체하였습니다.
  - [x] ThemeProductList.tsx에서 변경된 구조에 맞게 호출 방식을 수정해주었습니다.
  - [x] useLoginMutation.ts를 통해 useMutation을 사용하여주었습니다. (POST)
  - [x] AuthProvider에서는 login 함수 내부에 mutateAsync 사용을 통해 비동기를 바탕으로 로그인 처리를 해주었습니다.
  - [x] QueryClientProvider, AuthProvider의 호출 순서, 중복 호출 문제를 해결하기 위해 App.tsx, main.tsx의 구조를 수정해주었습니다.
  - [x] useOrderMutation을 생성해서 login과 마찬가지로 useMutation을 사용하도록 해주었습니다. (POST)
  - [x] OrderPage에서 추가된 훅을 사용하며 로직을 분리해주어 조금 더 간결해지도록 해주었습니다.
  - [x] useProductSummary에서 useFetch를 이용해 상품 요약 정보를 가져오던 것을 useQuery로 변경해주었습니다. (GET)
  - [x] useThemeInfo 역시 useQuery를 사용하여 정보를 얻어오도록 변경해주었습니다.
- [x] 피드백 반영
  - [x] WithApiUi의 isEmpty -> defaultIsEmpty로 변경 후 emptyPredicate의 함수로 지정해주었습니다.
  - [x] WithApiUi를 사용하는 4개의 컴포넌트들에 대해 변경된 구조에 맞는지 한 번 더 점검하여주었습니다.
  - [x] 단일 객체를 data로 넘기는 ThemeHero의 경우 컴포넌트 파일 내에서 prop를 통해 대응하도록 나머지 3개는 배열을 data로 넘기기에 defaultIsEmpty를 사용하도록 해주었습니다.
  - [x] handleOrderSubmit.ts에 navigate 부분에 'window'를 추가해주었습니다.
  - [x] rankingParams.ts를 만들어서 Ranking 부분과 관련있는 하드코딩된 부분과 타입을 상수처리해주었습니다.
  - [x] RankingSort, RankingFilter에서 rankingParams에 정의된 상수를 가져와 사용하도록 해주었습니다.
  - [x] useRankingParams.ts에서도 타입 정의 과정을 수행했습니다.
  - [x] themeId가 없는 경우를 명시적으로 처리하도록 수정해주었습니다.
  - [x] AuthContext 파일 세분화 작업을 진행했습니다.
    - [x] createContext -> AuthContext.tsx
    - [x] Provider 로직 → AuthProvider.tsx
    - [x] useContext 호출 → useAuth.ts로 이동
    - [x] 관련 타입 정의 → types/auth.ts로 분리
  - [x] lint 관련 에러 해결
- [x] npm run build, npm run lint 성공적 동작 확인

## ✅4번째 미션 2단계

### 요구사항

- [x] scroll jump 현상을 BaseStyle에 스크롤에 필요한 너비를 확보하는 속성을 추가해주는 것으로 해결하였습니다.
- [x] 본인만의 기준으로 일관된 코드를 작성해주세요.
  - [x] hook들이 한 파일에 너무 많은 역할을 하고 있지는 않은지, 상수 처리할 수 있는 부분이 있는지 등을 점검했습니다.
  - [x] 하나의 컴포넌트에 너무 많은 요소들이 들어가지는 않았는지 분리할 수 있는 컴포넌트가 있지는 않은지를 기준으로 삼아 ProductDetailPage에 있던 요소들을 여러 컴포넌트로 나누어주었습늬다.
  - [x] prop drilling이 될수도 있을 것 같아 ProductDetailInfo에서 일괄적으로 진행하던 API 요청을 하위 단계 컴포넌트들에서 각각 본인에게 필요한 요청만 하도록 로직을 분리하여 작성해주었습니다.
- [x] 기능 단위로 나누어 커밋을 해주세요.
- [x] 상품 상세 페이지
  - [x] [참고 URL](https://kakaotech-mission4-api-advanced.pages.dev/) 을 참고하여 상품 상세 페이지를 구현해주세요.
    - [x] ProductDetailPage.tsx를 만들어 상품 상세 정보 페이지를 위한 틀을 생성해두었습니다.
    - [x] 로그인이 되어있지 않으면 로그인 후에 상품 상세 정보 페이지에 접근할 수 있도록 App.tsx에서 PrivateRoute 안에 ProductDetailPage로 이동하는 Route를 추가해주었습니다.
    - [x] routes.ts에 url 관련 변수를 상수로 추가해주었습니다.
    - [x] 화면에 표시해야 하는 모든 요소들을 api를 통해 성공적으로 받아오는 것을 확인했습니다.
    - [x] 기본적인 UI 작업을 완료했습니다.
    - [x] "주문하기" 버튼을 누르면 OrderPage로 이동하도록 해주었습니다.
    - [x] 상품 카드를 누르면 ProductDetailPage로 연결되도록 해주었습니다.
  - [x] API 통신의 최적화, 선언적 구조, react query 등을 활용하여 기능을 구현하세요.
  - [x] 아래 참고 API를 모두 사용해야 해요.
    - [x] 상품 정보 API: **`/api/products/:productId`**
      - [x] useProductInfo.ts를 만들어 해당 api에 대한 요청을 처리하는 로직을 작성했습니다.
      - [x] api.ts에 api 경로와 관련된 변수를 상수 처리해주었습니다.
    - [x] 상품 세부 정보 API: **`/api/products/:productId/detail`**
      - [x] useProductDetail.ts를 만들어 해당 api에 대한 요청을 처리하는 로직을 작성했습니다.
      - [x] api.ts에 api 경로와 관련된 변수를 상수 처리해주었습니다.
    - [x] 상품 주요 리뷰 API: **`/api/products/:productId/highlight-review`**
      - [x] useHighlightReview.ts를 만들어 해당 api에 대한 요청을 처리하는 로직을 작성했습니다.
      - [x] api.ts에 api 경로와 관련된 변수를 상수 처리해주었습니다.
    - [x] 상품 관심 등록 수 API: **`/api/products/:productId/wish`**
      - [x] useProductWish.ts를 만들어 해당 api에 대한 요청을 처리하는 로직을 작성했습니다.
      - [x] api.ts에 api 경로와 관련된 변수를 상수 처리해주었습니다.
  - [x] 상품 관심 등록 버튼 클릭 시 낙관적 업데이트를 통해 상품 관심 등록 수를 변경해보세요. (실제 API 반영은 없기 때문에, 새로고침 하면 사라지는 것이 정상이에요.)
    - [x] handleWishClick를 통해서 "찜 버튼"을 누르면 하트가 채워지고 위시 수가 +1이 되는 로직을 다루도록 해주었습니다.
    - [x] useProductWish에 staleTime을 추가해주어서 일정 시간 동안은 서버에 post하지 않았더라도 isWished가 반영된 상태를 유지하도록 해주었습니다.
- [x] ErrorBoundary와 Suspense를 사용하여 코드 구조를 리팩터링 해요. (단, ErrorBoundary는 관련 라이브러리를 사용하지 않고 구현해요)
  - [x] useSuspenseQuery를 사용해서 기존 isError, isPending으로 다루던 코드를 대체해주었습니다.
  - [x] 이번에 새로 작업한 "상품 상세 정보 화면"에 관련한 hook, component들에도 suspense + ErrorBoundary 작업을 진행해주었습니다.
- [x] npm run build 성공하기
- [x] npm run lint 성공하기
- [ ] 피드백 반영
  - [x] validation.ts에 사용하지 않는 변수 제거 및 조금 더 적절한 에러 메시지 문구 추가했습니다.
  - [x] ErrorBoundary + Suspense 구조를 TabPanel.tsx로 추출해 낸다음 기존에 ErrorBoundary + Suspense 구조를 활용하는 부분들을 TabPanel로 대체해주었습니다.
