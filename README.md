# React-gift-product-detail

## Step 0. 기본 코드 준비

- [x] 기본 코드 준비
- [x] 이전 과제 피드백 : 절대 경로로 수정
  - TimeRanking.tsx의 import Spacing from "../Spacing";
  - LoginPage.tsx의 import { useLoginForm } from "../hooks/useLoginForm";

## Step 1. React Query 적용

- [x] 기존에 작성했던 API를 React Query를 이용해 리팩터링 (GET, POST 모두)

## Step 2. 상품 상세 페이지 API 구현

- 상품 상세 페이지
  - [x] 상품 상세 페이지 UI 구현
  - [x] API 통신의 최적화, 선언적 구조, react query 등을 활용해 기능 구현
  - [x] 상품 관심 등록 버튼 클릭 시 낙관적 업데이트 이용해 상품 관심 등록 수 변경

- ErrorBoundary와 Suspense 사용해 리팩터링

## Step 3. 테스트 코드 작성하기

- [x] src/components에 있는 Form Field와 Typography에 대한 테스트 코드 작성
- [x] 로그인 페이지에 대한 테스트 시나리오 작성 및테스트 코드 작성
- [x] MSW를 사용하여 선물하기 홈 페이지의 실시간 급상승 선물랭킹 섹션의 테스트 코드 작성
- [x] github action을 사용하여 PR 요청 및 Main 브렌치 머지 시 테스트 코드가 실행되게 작성
