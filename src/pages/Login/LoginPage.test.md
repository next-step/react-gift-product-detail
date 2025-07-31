# LoginPage 테스트 시나리오

## 1. 로그인 페이지 렌더링
- LoginPage 컴포넌트가 에러 없이 마운트되어야 한다.

## 2. 로고 이미지 표시
- `alt="카카오 공식 로고"`가 세팅된 `<img>`가 화면에 보여야 한다.
- Jest mock(`fileMock.js`)으로 대체된 `src`가 `"test-file-stub"`을 포함한다.

## 3. 로그인 폼 컴포넌트 포함
- `data-testid="login-form"`가 달린 요소가 렌더링되어야 한다.

## 4. Wrapper 태그 확인
- 최상위 래퍼는 `<main>` 태그여야 한다.
