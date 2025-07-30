# 미션 4 - 2단계 - 상품 상세 페이지 API 구현하기

4단계 미션까지 완성 되었을 때의 결과물 링크에요.

해당 링크를 참고하여 2단계 미션을 완성시켜보세요.

> 참고 URL: https://kakaotech-mission4-api-advanced.pages.dev/

## **목표**

- 상품 상세 페이지를 구현하여 API 기능을 완성시켜보세요.

## **과제 진행 요구사항**

- 본인만의 기준으로 일관된 코드를 작성해주세요.
- 기능 단위로 나누어 커밋을 해주세요.
- 상품 상세 페이지
  - [참고 URL](https://kakaotech-mission4-api-advanced.pages.dev/) 을 참고하여 상품 상세 페이지를 구현해주세요.
  - API 통신의 최적화, 선언적 구조, react query 등을 활용하여 기능을 구현하세요.
  - 아래 참고 API를 모두 사용해야 해요.
  - 상품 관심 등록 버튼 클릭 시 낙관적 업데이트를 통해 상품 관심 등록 수를 변경해보세요. (실제 API 반영은 없기 때문에, 새로고침 하면 사라지는 것이 정상이에요.)
- ErrorBoundary와 Suspense를 사용하여 코드 구조를 리팩터링 해요. (단, ErrorBoundary는 관련 라이브러리를 사용하지 않고 구현해요)

### **참고**

상품 상세 페이지에서 사용되는 API는 총 4개에요. 자세한 내용은 [API 명세 페이지](https://edu.nextstep.camp/s/0eoNzeZS/ls/zJw3ijiQ)에서 확인 할 수 있어요.

1. 상품 정보 API: **`/api/products/:productId`**
2. 상품 세부 정보 API: **`/api/products/:productId/detail`**
3. 상품 주요 리뷰 API: **`/api/products/:productId/highlight-review`**
4. 상품 관심 등록 수 API: **`/api/products/:productId/wish`**
