# react-gift-product-list

! VITE_API_BASE_URL에 대한 예시는 .env.example에 작성해두었습니다.

## 구현할 기능 목록

- post: 로그인 리팩토링
- post: 주문하기 리팩토링
- get: 상품 상세 정보
- get: Theme
- get: 랭킹 상품
- get: Theme Hero 정보
- get: theme 세부 상품 무한 스크롤

## 구현한 기능

- get: Theme
- get: 랭킹 상품
- get: 상품 상세 정보
- get: Theme Hero 정보
- post: 로그인 리팩토링
- post: 주문하기 리팩토링
- get: theme 세부 상품 무한 스크롤

## 리뷰 반영

- postRequest, useFetch에 JSDoc의 @deprecated 어노테이션을 추가
- mutations에 대한 전역 기본 설정 추가
- API 요청함수 타입 명시 및 useQuery 제네릭 주입 수정
