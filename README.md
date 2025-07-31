# react-gift-product-detail

## 1단계 - React Query 적용

### 요구사항

- [x] 기존에 작성했던 API를 React Query를 이용해서 리팩터링

## 2단계 - 상품 상세 페이지 API 구현하기

### 요구사항

#### 상품 상세 페이지

- [x] API 통신의 최적화, 선언적 구조, react query 등을 활용하여 기능을 구현
- [x] 상품 정보, 상품 세부 정보, 상품 주요 리뷰, 상품 관심 등록 수 API를 모두 사용
- [x] 상품 관심 등록 버튼 클릭 시 낙관적 업데이트를 통해 상품 관심 등록 수를 변경
- [x] ErrorBoundary와 Suspense를 사용하여 코드 구조 리팩터링 (단, ErrorBoundary는 관련 라이브러리를 사용하지 않고 구현)

## 3단계 - 테스트 코드 작성하기

### 요구사항

- [ ] src/components에 있는 Form Field와 Typography에 대한 테스트 코드를 작성
- [ ] 로그인 페이지에 대한 테스트 시나리오를 작성하고 테스트 코드를 작성
- [ ] MSW를 사용하여 선물하기 홈 페이지의 실시간 급상승 선물랭킹 섹션의 테스트 코드를 작성
- [ ] github action을 사용하여 PR 요청 및 Main 브렌치 머지 시 테스트 코드가 실행
