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
