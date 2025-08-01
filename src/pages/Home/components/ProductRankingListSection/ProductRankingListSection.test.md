# ProductRankingListSection 테스트 시나리오

이 문서는 `ProductRankingListSection` 컴포넌트의 핵심 동작을 검증하기 위한 테스트 시나리오를 정리합니다.

---

## 1. 로딩 상태 표시

- **목적**  
  네트워크 응답이 지연될 때 사용자가 로딩 인디케이터를 볼 수 있는지 확인합니다.

- **초기 설정**  
  - MSW 핸들러가 `/api/products/ranking` 엔드포인트에 100ms 지연 후 빈 배열(`[]`)을 반환하도록 설정

- **테스트 단계**  
  1. 다음 MSW 핸들러를 등록  
     ```ts
     rest.get(/\/api\/products\/ranking.*/, (_req, res, ctx) =>
       res(ctx.delay(100), ctx.json([]))
     )
     ```  
  2. `renderWithProviders()`를 호출하여 컴포넌트를 렌더링  
  3. 즉시 `screen.getByText('로딩 중…')` 가 존재하는지 확인

- **기대 결과**  
  - 컴포넌트가 마운트된 직후 화면에 “로딩 중…” 텍스트가 표시된다

---

## 2. 에러 상태 표시

- **목적**  
  서버 에러 발생 시 사용자에게 에러 메시지를 보여주는지 확인합니다.

- **초기 설정**  
  - MSW 핸들러가 `/api/products/ranking` 엔드포인트에 HTTP 500 상태 코드를 반환하도록 설정

- **테스트 단계**  
  1. 다음 MSW 핸들러를 등록  
     ```ts
     rest.get(/\/api\/products\/ranking.*/, (_req, res, ctx) =>
       res(ctx.status(500))
     )
     ```  
  2. `renderWithProviders()`를 호출하여 컴포넌트를 렌더링  
  3. `await waitFor(() => screen.getByText('랭킹을 불러오는 중 오류가 발생했습니다.'))` 를 실행하여 에러 텍스트를 확인

- **기대 결과**  
  - 쿼리 실행 실패 후 화면에 “랭킹을 불러오는 중 오류가 발생했습니다.” 텍스트가 표시된다

---
