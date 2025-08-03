# react-gift-product-detail

## 1단계 과제 진행 요구사항

- [x] 기존에 작성한 API를 React Query를 이용해서 리팩터링(GET, POST 모두)

## 2단계 과제 진행 요구사항

- 상품 상세 페이지
  - [x] API 통신의 최적화, 선언화 구조, react query등을 활용하여 기능 구현
  - [x] 다음 참고 API 모두 사용
    - 상품 정보 API : /api/products/:productId
    - 상품 세부 정보 API: /api/products/:productId/detail
    - 상품 주요 리뷰 API: /api/products/:productId/highlight-review
    - 상품 관심 등록 수 API: /api/products/:productId/wish
  - [x] 상품 관심 등록 버튼 클릭 시 낙관적 업데이트를 통해 상품 관심 등록 수를 변경(실제 API 반영은 없기 때문에, 새로고침하면 사라지는 것이 정상)
- [x] ErrorBoundary와 Suspense를 사용하여 코드 구조를 리팩터링(ErrorBoundary는 관련 라이브러리를 사용하지 않고 구현)

## 3단계 과제 진행 요구사항

- [ ] src/components 에 있는 Form Field와 Typography에 대한 테스트 코드 작성
- [ ] 로그인 페이지에 대한 테스트 시나리오를 작성하고 테스트 코드 작성
- [ ] MSW를 사용하여 선물하기 홈 페이지의 실시간 급상승 선물랭킹 섹션의 테스트 코드 작성
- [ ] github action을 사용하여 PR 요청 및 Main 브랜치 머지 시 테스트 코드가 실행
