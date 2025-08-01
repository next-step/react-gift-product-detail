# React Gift Product Detail

카카오 선물하기 상품 상세 페이지 프로젝트입니다.

## 🚀 시작하기

### 의존성 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

### 빌드
```bash
npm run build
```

## 🧪 테스트

### 테스트 실행
```bash
# 모든 테스트 실행
npm test

# 테스트 UI 실행
npm run test:ui

# 커버리지와 함께 테스트 실행
npm run test:coverage

# 테스트 한 번만 실행
npm run test:run
```

### 테스트 구조
```
src/test/
├── components/          # 컴포넌트 테스트
│   ├── Typography.test.tsx
│   ├── FormField.test.tsx
│   └── RankingSection.test.tsx
├── pages/              # 페이지 테스트
│   └── Login.test.tsx
├── mocks/              # MSW 모킹
│   ├── server.ts
│   └── handlers.ts
├── utils/              # 테스트 유틸리티
│   └── test-utils.tsx
└── setup.ts            # 테스트 설정
```

## 📋 테스트 시나리오

### 1. Typography 테스트
- 모든 타이포그래피 변형의 올바른 스타일 속성 확인
- 일관된 구조 검증
- 필수 타이포그래피 변형 존재 확인

### 2. Form Field 테스트
- 입력 유효성 검사
- 폼 제출 기능
- 접근성 검증
- 에러 메시지 표시

### 3. 로그인 페이지 테스트
- 기본 렌더링 확인
- 폼 상태 관리
- 에러 메시지 표시
- 사용자 상호작용
- 접근성 검증
- 반응형 디자인

### 4. 랭킹 섹션 테스트 (MSW 사용)
- 기본 렌더링 확인
- 필터 기능
- API 호출 및 데이터 표시
- 더보기 기능
- 상품 클릭 기능
- 반응형 디자인
- 접근성 검증

## 🔧 기술 스택

- **React 19**
- **TypeScript**
- **Vite**
- **Emotion** (스타일링)
- **React Query** (상태 관리)
- **React Router** (라우팅)
- **Zod** (폼 검증)
- **Vitest** (테스트 프레임워크)
- **MSW** (API 모킹)
- **Testing Library** (테스트 유틸리티)

## 📁 프로젝트 구조

```
src/
├── Components/         # 재사용 가능한 컴포넌트
├── pages/             # 페이지 컴포넌트
├── hooks/             # 커스텀 훅
├── api/               # API 관련 함수
├── contexts/          # React Context
├── styles/            # 스타일 관련 파일
├── types/             # TypeScript 타입 정의
├── utils/             # 유틸리티 함수
└── test/              # 테스트 파일
```

## 🚀 CI/CD

GitHub Actions를 통해 다음 작업이 자동으로 실행됩니다:

- **PR 생성 시**: 린트, 테스트, 타입 체크
- **Main 브랜치 머지 시**: 린트, 테스트, 타입 체크, 커버리지 업로드

## 📊 테스트 커버리지

테스트 커버리지는 Codecov를 통해 관리됩니다.
