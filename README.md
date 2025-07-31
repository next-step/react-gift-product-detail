# 카카오 선물하기 페이지 클론코딩 프로젝트

# MISSION 1

- 홈과 로그인 구현하기 (https://kakaotech-mission1-home.pages.dev/)

# MISSION 2

- 주문 폼 처리 구현하기 (https://kakaotech-mission2-order-step2.pages.dev/)

# MISSION 3

- 상품 목록 - API 연동 하기 (기초) (https://kakaotech-mission3-api-foundation.pages.dev/)

# MISSION 4

- 상품 상세 - API 연동 심화, 테스트 (https://kakaotech-mission4-api-advanced.pages.dev/)

---

## STEP 1

### 목표

- React Query를 사용하여 API 사용 방식과 사용자 경험을 고도화 하기
- Suspense와 ErrorBoundary를 사용하여 선언적 구조의 API를 구현하기

## STEP 2

### 목표

- 상품 상세 페이지를 구현하여 API 기능을 완성시키기

### 과제 진행 요구사항

- 상품 상세 페이지
  - [x] 참고 URL 을 참고하여 상품 상세 페이지 구현
  - [x] API 통신의 최적화, 선언적 구조, react query 등을 활용하여 기능 구현
  - [x] 아래 참고 API를 모두 사용하여 구현하기
    - 상품 상세 페이지에서 사용되는 API는 총 4개 ([API 명세](https://edu.nextstep.camp/s/0eoNzeZS/ls/zJw3ijiQ))
      - [x] 상품 정보 API: /api/products/:productId
      - [x] 상품 세부 정보 API: /api/products/:productId/detail
      - [x] 상품 주요 리뷰 API: /api/products/:productId/highlight-review
      - [x] 상품 관심 등록 수 API: /api/products/:productId/wish

  - [x] 상품 관심 등록 버튼 클릭 시 낙관적 업데이트를 통해 상품 관심 등록 수를 변경할 수 있도록 구현
        (실제 API 반영은 없기 때문에, 새로고침 하면 사라지는 것이 정상)

- [x] ErrorBoundary와 Suspense를 사용하여 코드 구조 리팩터링 하기
      (단, ErrorBoundary는 관련 라이브러리를 사용하지 않고 구현)

- [x] 본인만의 기준으로 일관된 코드 작성하기
- [x] 기능 단위로 나누어 커밋 하기
