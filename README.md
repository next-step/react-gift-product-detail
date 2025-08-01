# react-gift-product-list

! VITE_API_BASE_URL에 대한 예시는 .env.example에 작성해두었습니다.

## 구현할 기능 목록

- src/components에 있는 Form Field와 Typography에 대한 테스트 코드를 작성
- 로그인 페이지에 대한 테스트 시나리오를 작성하고 테스트 코드를 작성
- MSW를 사용하여 선물하기 홈 페이지의 실시간 급상승 선물랭킹 섹션의 테스트 코드를 작성
- github action을 사용하여 PR 요청 및 Main 브렌치 머지 시 테스트 코드가 실행되게 작성

## 구현한 내용

- Typography 컴포넌트 구현
- Form Field 컴포넌트 구현
- UnderlineInputField를 통해 Login 페이지 리팩토링
- Typography 테스트 코드 작성
- renderWithTheme 함수 제작후 리팩토링
- UnderlineInputField 테스트 코드 작성
- 로그인 페이지에 대한 테스트 시나리오를 작성하고 테스트 코드를 작성 (MSW X)
- 로그인 페이지에 대한 테스트에 MSW 적용
- RankingSection MSW 사용한 테스트 코드 작성
- github action을 사용하여 PR 요청 및 Main 브렌치 머지 시 테스트 코드가 실행되게 작성
- env.test 추가

## 2단계 리뷰 반영

- axios에 제네릭으로 전달
- 낙관적 업데이트 오류 수정
  - 진정할 해결을 위해선 invalidateQueries 써야할 것 같지만 일단 이 환경에서 사용하긴 어려울 것 같아 useRef를 사용하는 방식으로 구현해보았습니다
  - UX를 위해 버튼에 disabled 기능을 넣었는데 이러다 보니 낙관적 업데이트의 장점이 사라진것 같아 올바른 해결책은 아니라는 생각이듭니다.

---

## 테스트 시나리오

### Typograpsy

1. 렌더링 테스트
2. Props에 따른 스타일 테스트
3. 커스텀 HTML 속성 전달 테스트
4. 잘못된 colorkey 사용시 fallback 색상 적용 테스트
