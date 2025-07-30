# react-gift-product-list

! VITE_API_BASE_URL에 대한 예시는 .env.example에 작성해두었습니다.

## 구현할 기능 목록

- 상품 상세 페이지
- API 통신 구현 조건
  - 최적화
  - 선언적 구조
  - react query
- 상품 관심 등록 버튼 클릭 시 낙관적 업데이트를 통해 상품 관심 등록 수를 변경 (실제 API 반영은 없기 때문에, 새로고침 하면 사라지는 것이 정상)
- ErrorBoundary와 Suspense를 사용하여 코드 구조를 리팩터링 (단, ErrorBoundary는 관련 라이브러리를 사용하지 않고 구현)

## 구현한 내용

- 초기 프로젝트 세팅
- ProductInfo UI 구현
- TabMenu 구현
- 각 Tab 세부 UI 구현
- 하단 고정 버튼 바 구현

## 리뷰 반영
