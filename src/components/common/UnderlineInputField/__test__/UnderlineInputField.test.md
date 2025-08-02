# UnderlineInputField 컴포넌트 테스트 명세

## 목적

UnderlineInputField 컴포넌트가 전달받은 props에 따라 시각적 스타일 및 동작이 정확하게 반영되는지 검증한다.

## 시나리오

1. input 요소 및 placeholder가 정상 렌더링된다.
2. `message` prop이 있을 경우 에러 메시지가 렌더링된다.
3. `error=true`일 경우 하단 border 색상이 변경된다.
4. `type` prop에 따라 input type 속성이 반영된다.
5. 사용자 입력이 정상적으로 반영된다.
6. `name`, `id`, `aria-*` 등의 HTML 속성이 정상적으로 전달된다.
7. `disabled` 상태일 경우 입력이 차단되고 disabled 속성이 적용된다.
