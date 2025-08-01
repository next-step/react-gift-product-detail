# react-gift-product-detail

## 4. 상품 상세 - API 연동 심화, 테스트

### 0단계 :

- [x] 상품 상세 저장소 포크, 클론
- [x] step0를 위한 브랜치 생성
- [x] 요구사항 기록을 위한 requirements.md 파일 준비, .gitignore로 등록
- [x] mock server, 참고자료를 위한 디렉토리 생성, .gitignore로 등록
- [x] '3. 상품 목록' 미션의 코드 가져오기 → 테스트

### 1단계 :

- [x] 환경 설정
  - [x] react-query 설치
- [x] useQuery를 사용한 데이터 조회 로직 리팩토링
  - [x] 상품 랭킹 조회 (`hooks/useProducts.ts`)
  - [x] 테마 정보 조회 (`services/theme.ts`의 `getThemeInfo`)
  - [x] 상품 요약 정보 조회 (`services/product.ts`의 `getProductSummary`)
- [x] useInfiniteQuery를 사용한 무한 스크롤 리팩토링
  - [x] 테마 상품 목록 조회 (`hooks/useThemeProducts.ts`)
- [x] useMutation을 사용한 데이터 변경 로직 리팩토링
  - [x] 로그인 (`services/login.ts`)
  - [x] 주문 생성 (`services/order.ts`)
- [x] 기존 코드 제거
  - [x] `hooks/useHTTP.ts` 삭제
  - [x] 컴포넌트 내 상태 관리 코드 정리

### 2단계 :

- [x] 상품 상세 페이지 구현
  - [x] 아래의 API를 전부 사용 
    - [x] 상품 정보 API:        /api/products/:productId 
    - [x] 상품 세부 정보 API:    /api/products/:productId/detail
    - [x] 상품 주요 리뷰 API:    /api/products/:productId/highlight-review
    - [x] 상품 관심 등록 수 API: /api/products/:productId/wish
  - [x] API 통신의 최적화, 선언적 구조, react query 등을 활용하여 기능 구현
  - [x] 상품 관심 등록 버튼 클릭 시 낙관적 업데이트를 통해 상품 관심 등록 수 변경
    - 실제 API 반영은 없기 때문에, 새로고침 하면 사라지는 것이 정상
- [x] ErrorBoundary와 Suspense를 사용하여 코드 구조 리팩터링
  - [x] ErrorBoundary는 관련 라이브러리를 사용하지 않고 구현