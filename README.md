# react-gift-product-detail

<상품 상세 - API 연동 심화, 테스트>

    [v] 1단계 - React Query 적용
        - React Query를 사용하여 API 사용 방식과 사용자 경험을 고도화 해요.
        - Suspense와 ErrorBoundary를 사용하여 선언적 구조의 API를 구현해보세요.
        - 본인만의 기준으로 일관된 코드를 작성해주세요.
        - 기능 단위로 나누어 커밋을 해주세요.
        - 기존에 작성했던 API를 React Query를 이용해서 리팩터링 해요. (GET, POST 모두)
            [v] theme.ts
            [v] raking.ts
            [v] product.ts
            [v] product_summary.ys
            [v] orders.ts
            [v] info.ts
            [v] auth.ts

    [v] 2단계 상품 상세 페이지 API 구현하기
        - 상품 상세 페이지를 구현하여 API 기능을 완성시켜보세요.
        - 본인만의 기준으로 일관된 코드를 작성해주세요.
        - 기능 단위로 나누어 커밋을 해주세요.

        [v] 상품 상세 페이지
         - 참고 URL 을 참고하여 상품 상세 페이지를 구현해주세요.
         - API 통신의 최적화, 선언적 구조, react query 등을 활용하여 기능을 구현하세요.
         - 아래 참고 API를 모두 사용해야 해요.
         - 상품 관심 등록 버튼 클릭 시 낙관적 업데이트를 통해 상품 관심 등록 수를 변경해보세요.
            (실제 API 반영은 없기 때문에, 새로고침 하면 사라지는 것이 정상이에요.)
        [v] ErrorBoundary와 Suspense를 사용하여 코드 구조를 리팩터링 해요. (단, ErrorBoundary는 관련 라이브러리를 사용하지 않고 구현해요)

        +) 참고
        상품 상세 페이지에서 사용되는 API는 총 4개에요. 자세한 내용은 API 명세 페이지에서 확인 할 수 있어요.
        - 상품 정보 API: /api/products/:productId
        - 상품 세부 정보 API: /api/products/:productId/detail
        - 상품 주요 리뷰 API: /api/products/:productId/highlight-review
        - 상품 관심 등록 수 API: /api/products/:productId/wish

    [ ] 3단계  테스트 코드 작성하기
        - 상황에 맞는 테스트 코드 방식을 통해 테스트 코드를 작성해봐요.
        - Github Action을 통해 매 PR에서 테스트 코드가 실행되도록 해요.
        - src/components에 있는 Form Field와 Typography에 대한 테스트 코드를 작성해주세요.
        - 로그인 페이지에 대한 테스트 시나리오를 작성하고 테스트 코드를 작성해주세요.
        - MSW를 사용하여 선물하기 홈 페이지의 실시간 급상승 선물랭킹 섹션의 테스트 코드를 작성해주세요.
        - github action을 사용하여 PR 요청 및 Main 브렌치 머지 시 테스트 코드가 실행되게 해주세요.

        (+) 로그인 페이지 테스트 시나리오
            - 시나리오 1: 로그인 폼 초기 렌더링
                - 목적: 로그인 페이지가 정상적으로 렌더링되는지 확인
                - 조건: 로그인 페이지 첫 진입
                - 예상 결과:
                    이메일 입력 필드가 화면에 표시된다.
                    비밀번호 입력 필드가 화면에 표시된다.
                    로그인 버튼이 화면에 표시되며 비활성화 상태다.

            - 시나리오 2: 유효한 입력 시 버튼 활성화
                - 목적: 입력값이 유효할 때 로그인 버튼이 활성화되는지 확인
                - 조건:
                    이메일에 "test@example.com" 입력
                    비밀번호에 "password123" 입력
                - 예상 결과:
                    이메일과 비밀번호가 유효한 상태로 인식된다.
                    로그인 버튼이 활성화된다.
                    로그인 버튼을 클릭하면 goToLogin 함수가 호출된다.
