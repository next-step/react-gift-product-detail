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
- [ ] useQuery를 사용한 데이터 조회 로직 리팩토링
  - [ ] 상품 랭킹 조회 (`hooks/useProducts.ts`)
  - [ ] 테마 정보 조회 (`services/theme.ts`의 `getThemeInfo`)
  - [ ] 상품 요약 정보 조회 (`services/product.ts`의 `getProductSummary`)
- [ ] useInfiniteQuery를 사용한 무한 스크롤 리팩토링
  - [ ] 테마 상품 목록 조회 (`hooks/useThemeProducts.ts`)
- [ ] useMutation을 사용한 데이터 변경 로직 리팩토링
  - [ ] 로그인 (`services/login.ts`)
  - [ ] 주문 생성 (`services/order.ts`)
- [ ] 기존 코드 제거
  - [ ] `hooks/useHTTP.ts` 삭제
  - [ ] 컴포넌트 내 상태 관리 코드 정리