# react-gift-product-detail

## ✅4번째 미션 0단계

### 요구사항

- [x] 3차 과제 내용 담긴 나의 코드 불러와 업로드하기

## ✅4번째 미션 1단계

### 요구사항

- [ ] 본인만의 기준으로 일관된 코드를 작성해주세요.
- [ ] 기능 단위로 나누어 커밋을 해주세요.
- [ ] 기존에 작성했던 API를 React Query를 이용해서 리팩터링 해요. (GET, POST 모두)
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
