#상품 상세 - API 연동 심화, 테스트

#질문

- 로그인 기능을 구현할 때에는 일부러 SuspenseWrapper와 ErrorBoundary를 적용하지 않았습니다.
- Suspense와 ErrorBoundary는 Mutation이 아닌 Query(GET)에서 어느정도 의미가 있는, 즉 자동 데이터 페칭에 최적화 되어있다고 생각하여 그렇게 구현했습니다.
- 다만 이렇게 구분하는 것이 맞는지 의문이 듭니다.
- 위와 같은 근거로 지금 useOrderForm에서 useMutation을 사용할때 (onSubmit) 따로 오류에 대해 직접 분기처리를 진행했습니다. (loading은 일단 굳이 하지 않았습니다.)
- 그리고 OrderPage에서는 최종적으로 전체 컨텐츠에 대해 errorboundary와 suspensewrapper를 감싸놓았습니다. (ProductSummary가 get이므로)
- 이렇게 진행했을때 자동으로 post에 대한 오류는 분기처리한 내용으로 적용되고 errorboundary fallback은 발생하지 않는 것인지,
- 아니면 지금 전체를 감싼게 잘못된 방식이고 errorboundary와 suspensewrapper를 감쌀때 의도적으로 get메서드가 적용된 부분만 감싸고 다른 부분은 제외를 해야하는 것인지 궁금합니다.

#commit
-ed9be44 refactor: ThemeProductsPage Products 리팩터링
-da301c8 refactor: ThemeProductsPage Info 리팩터링
-ce9f643 refactor: OrderPage Submit 리팩토링
-9dcab51 refactor: useGetProductSummary 리팩터링
-b5092be refactor: 로그인 기능 useMutationApi 사용
-164065c refactor: GiftRanking tanstack-query 적용 & UX를 위한 목록 부분만 SuspenseWrapper, ApiErrorBoundary 적용
-db4e3a7 refactor: useQueryApi suspense옵셥 추가 & GitftTheme 리팩터링
-6514778 feat: tanstack-query, Suspense, ErrorBoundary 세팅
