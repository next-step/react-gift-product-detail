# Typograpsy 컴포넌트 테스트 명세

## 목적

텍스트 스타일링 UI 컴포넌트의 props 기반 스타일 및 렌더링 동작을 보장한다

## 시나리오

1. 렌더링 테스트
   - children이 텍스트로 정상 렌더링 된다.

2. Props에 따른 스타일 테스트
   - variant/color/textAlign/width등 props가 스타일에 반영된다.

3. 커스텀 HTML 속성 전달 테스트
   - data-testid등 커스텀 HTML 속성이 DOM에 전달된다

4. 잘못된 colorkey 사용시 fallback 색상 적용 테스트
   - 정의되지 않은 colorkey 사용 시 fallback 색상 적용된다.
