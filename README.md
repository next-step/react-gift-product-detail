# react-gift-product-detail

## step1

- step0 피드백 반영
  - 함수의 이름을 함수의 역할과 동일하게 변경
  - 함수를 리턴타입 없이 추론되는 타입을 이용하도록 수정
  - props의 이름을 의미에 맞게 변경
  - props의 depth를 1단계로 유지하도록 변경
  - storage 사용을 유틸함수를 사용해서 분리
  - 컴포넌트 내부 useEffect 부분 커스텀 훅으로 역할 분리
  - svgr 플러그인 사용하여 svg 사용
  - 로그인 페이지 react hook form 적용
  - usePreservedCallback을 사용할 수 있는 곳에서 사용하도록 리팩토링
- 기존의 API를 React Query를 이용해서 리팩토링
