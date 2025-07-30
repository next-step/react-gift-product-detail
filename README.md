# react-gift-product-detail

## 1단계 과제 진행 요구사항

- [x] 기존에 작성한 API를 React Query를 이용해서 리팩터링(GET, POST 모두)

## 2단계 과제 진행 요구사항

- 상품 상세 페이지
  - [ ] API 통신의 최적화, 선언화 구조, react query등을 활용하여 기능 구현
  - [ ] 다음 참고 API 모두 사용
    - 상품 정보 API : /api/products/:productId
    - 상품 세부 정보 API: /api/products/:productId/detail
    - 상품 주요 리뷰 API: /api/products/:productId/highlight-review
    - 상품 관심 등록 수 API: /api/products/:productId/wish
  - [ ] 상품 관심 등록 버튼 클릭 시 낙관적 업데이트를 통해 상품 관심 등록 수를 변경(실제 API 반영은 없기 때문에, 새로고침하면 사라지는 것이 정상)
- [ ] ErrorBoundary와 Suspense를 사용하여 코드 구조를 리팩터링(ErrorBoundary는 관련 라이브러리를 사용하지 않고 구현)
