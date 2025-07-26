#2단계 - 상품 상세 페이지 API 구현하기

###설명

1. 낙관적 업데이트 구현 관련

- wish(하트표시) 낙관적 업데이트 구현 관련해서, POST와 DELETE API가 존재한다는 가정하에 구현을 진행하였습니다.
- 이에, 지금은 하트버튼을 누르면 일정시간 이후 자동으로 롤백됩니다.
- 이것에 관해, 지금은 당연히 그렇게 되는 것이지만, 이것 때문에 토스트(에러바운더리, handleApiError) 가 뜨는건 이상할 수 있다는 생각이 들어,
  url이 /wish를 포함하면 handleApiError는 수행하지 않게 구현했습니다.

2. 서스펜스, 에러바운더리 관련

- 이전 과제에서 서스펜스와 에러바운더리도 step1과제인줄 알고 여러 블로그들을 찾아보며 구현 시도를 하고 pr요청을 드렸습니다.
- 이후 이것이 2단계 과제임을 깨닫고 멘토님 리뷰도 듣고, 다시 제대로 공식문서들을 찾아보니, 에러바운더리 라이브러리 사용만이 문제가 아니라 서스펜스도 잘못 구현한걸 깨달았습니다.
- suspense는 더이상 useQuery의 속성으로 들어가지 않고, 아예 따로 useSuspenseQuery라는 훅이 리액트쿼리v5부터 생긴걸 알았습니다..
- 속성으로 넣을때 어쩐지 오류가 나고 그래서 억지로 따로 요소로 집어넣어 구현했었고, 이에 구현했던 로딩중 UI도 잘 표시가 되었어서 이 방식이 잘못된줄 몰랐습니다. (속성으로 넣었을때 왜 잘 실행되었는지는 잘 모르겠습니다.. 속성값으로 들어가있을떄도 아직도 예전버전처럼 suspense속성을 래퍼가 인식하는것 같습니다..)
- 이에 먼저 suspense 파일 수정 및 에러바운더리도 라이브러리 제거 후 클래스 구현하였습니다.
- 번거로우실텐데 죄송합니다.. 앞으론 공식문서 꼭 잘 읽도록 하겠습니다.. :(

###질문

- 상품상세정보조회 API 에 대한 응답이 data":{"description":"<p>한 가득 올린 상큼한 딸기, 크런치 초코볼이 초코 생크림 사이사이 씹히는 투썸 베스트 생크림 케이크</p><p style=\"text-align: center;\"><img class=\"**cu_imgsize_800_2084\" src=\"https://st.kakaocdn.net/product/gift/editor/20240912093916_b5dfcffa4dfb47a4a3758a480c08ce67.jpg\"/><img class=\"**cu_imgsize_800_2635\" src=\"https://st.kakaocdn.net/product/gift/editor/20250328140806_106c3b4a39e446b8a84a94b80ec4b820.jpg\"/><img class=\"\_\_cu_imgsize_800_3427\" src=\"https://st.kakaocdn.net/product/gift/editor/20250328140813_08eb6709a2924491b8b511792881ab76.jpg\"/></p>"
- 위와 같은 구조, 즉 html요소들로 이루어져 있어서..
- dangerouslySetInnerHTML을 사용하였는데
- 이걸 사용하는게 거의 eval 급으로 위험할수 있지 않을까 생각이 들어서 혹시 다르게 구현하는 방법이 있을 지 궁금합니다..
- 구체적으로 질문으르 드리자면, 실제 현업에서도 이와같이 응답데이터가 html형식인 경우가 자주 있는지, 있다면 그 위험도가 그렇게 중요하지 않은 데이터면 innerHTML을 사용하는지, 아니면 절대로 이를 사용하지 않고 돌아온 응답 데이터를 문자열 조작을 직접 하여 하나하나 다시 데이터를 정제? 하고 다시 요소를 구현하는지 궁금합니다.(사실 데이터를 정제하고 다시 요소를 구현한다고 안전하게 되는 것인지도 확신이 안들긴 합니다..)

###commit

- 3afc853 (HEAD -> step2) refactor: 페이지 파일 리팩터링(파일분리)
- b5c9364 refactor: useProductDetail 리팩터링(파일분리)
- 87b94b9 feat: 낙관적 업데이트(post API 있다고 가정하에) 구현
- 40b519c feat: Heart API 연결
- 80a7852 feat: HearIcon UI 구현
- 14eb786 fix: 안쓰는 파일 제거, 파일명 오류 피드백 반영
- 510c449 feat: ProductDetailPage 에러바운더리, 서스펜스 적용
- fe96fb3 ThemeProductCard 링크 ProductDetail페이지로
- ba63d3d feat: 상세정보 UI 구현
- 21ecccb feat: 후기 API, UI 구현
- d232cd2 feat: 상품설명 탭 detail API 구현 & UI작업(dangerouslySetInnerHTML사용관련 위험도 질문하기)
- 3ce08cb feat: 상품 디테일 페이지 전체 UI 구현 & 상단 상품 정보 API 구현
- f8fa737 refactor: react-error-boundary 라이브러리 삭제, 클래스 직접 구현
- 1293ad3 refactor: 기존 suspense 속성 방식 제거, useSuspenseQueryApi 구현 및 수정(속성 제거 및 ? 제거)
