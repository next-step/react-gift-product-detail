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

## STEP 3

### 목표

- 상황에 맞는 테스트 코드 방식을 통해 테스트 코드 작성하기
- Github Action을 통해 매 PR에서 테스트 코드가 실행되도록 하기

### 과제 진행 요구사항

- [x] Typography에 대한 테스트 코드 작성하기
- [x] 로그인 페이지에 대한 테스트 시나리오를 작성하고 테스트 코드 작성하기
- [x] MSW를 사용하여 선물하기 홈 페이지의 실시간 급상승 선물랭킹 섹션의 테스트 코드 작성하기

- [x] github action을 사용하여 PR 요청 및 Main 브렌치 머지 시 테스트 코드가 실행되게 하기

- [x] 본인만의 기준으로 일관된 코드 작성하기
- [x] 기능 단위로 나누어 커밋 하기

## CI/CD 파이프라인

이 프로젝트는 GitHub Actions를 통해 자동화된 CI 파이프라인을 구축했습니다.

### 워크플로우 구성

#### CI Pipeline (`.github/workflows/ci.yml`)

- **Lint**: ESLint와 TypeScript 타입 검사
- **Test**: Vitest를 사용한 테스트 실행
- **Build**: 프로덕션 빌드 검증

### 실행 조건

- `main`, `develop` 브랜치에 push 시
- Pull Request 생성/업데이트 시

### 워크플로우 순서

1. **Lint** - 코드 품질 검사 (ESLint + TypeScript 타입 체크)
2. **Test** - 테스트 실행 (병렬로 실행)
3. **Build** - 빌드 검증 (lint, test 성공 후 실행)

## 테스트 코드 작성 현황

### 작성된 테스트 파일들

1. **Typography 컴포넌트 테스트** (`src/shared/components/ui/__tests__/Typography.test.tsx`)
   - 기본 렌더링 테스트 (30개 테스트)
   - variant별 스타일 적용 테스트
   - children 렌더링 테스트 (문자열, JSX, 숫자)
   - 유틸리티 함수 테스트 (getTypographyStyle, typographyMixin)
   - 접근성 테스트 (스크린 리더, heading 레벨)
   - 에러 케이스 테스트 (null children)

2. **Login 페이지 테스트** (`src/pages/__tests__/Login.test.tsx`)
   - 로그인 페이지 렌더링 테스트 (10개 테스트)
   - 폼 유효성 검사 테스트
   - 에러 메시지 표시 테스트
   - 로그인 API 호출 테스트
   - 키보드 접근성 테스트

3. **Trend 컴포넌트 테스트** (`src/features/product/components/trend/__tests__/Trend.test.tsx`)
   - 컴포넌트 기본 렌더링 테스트 (6개 테스트)
   - 상품 아이템 순위 렌더링 테스트
   - 필터 버튼 렌더링 테스트
   - URL 파라미터 업데이트 테스트
   - 키보드 접근성 테스트
   - 시맨틱 마크업 구조 테스트

### 테스트 작성 패턴

- **Given-When-Then 스타일**: 각 테스트에 시나리오 주석 추가
- **실제 컴포넌트 구조 기반**: data-testid 대신 실제 텍스트로 요소 찾기
- **모킹 전략**: React Query, React Router 등 필요한 의존성만 선택적으로 모킹
- **접근성 테스트**: 키보드 네비게이션 및 포커스 관리 확인
- **MSW 활용**: API 모킹을 위한 Mock Service Worker 사용

### 테스트 환경 설정

- **MSW 핸들러**: `src/test/handlers.ts`에서 API 모킹 설정
- **테스트 설정**: `src/test/setup.ts`에서 MSW 서버 설정
- **Vitest 설정**: `vitest.config.ts`에서 테스트 환경 구성
