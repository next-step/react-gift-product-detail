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
- [ ] 피드백 반영
  - [x] WithApiUi의 isEmpty -> defaultIsEmpty로 변경 후 emptyPredicate의 함수로 지정해주었습니다.
  - [x] WithApiUi를 사용하는 4개의 컴포넌트들에 대해 변경된 구조에 맞는지 한 번 더 점검하여주었습니다.
  - [x] 단일 객체를 data로 넘기는 ThemeHero의 경우 컴포넌트 파일 내에서 prop를 통해 대응하도록 나머지 3개는 배열을 data로 넘기기에 defaultIsEmpty를 사용하도록 해주었습니다.
  - [x] handleOrderSubmit.ts에 navigate 부분에 'window'를 추가해주었습니다.
  - [x] rankingParams.ts를 만들어서 Ranking 부분과 관련있는 하드코딩된 부분과 타입을 상수처리해주었습니다.
  - [x] RankingSort, RankingFilter에서 rankingParams에 정의된 상수를 가져와 사용하도록 해주었습니다.
  - [x] useRankingParams.ts에서도 타입 정의 과정을 수행했습니다.
  - [x] themeId가 없는 경우를 명시적으로 처리하도록 수정해주었습니다.
