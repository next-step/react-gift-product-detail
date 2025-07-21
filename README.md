# react-gift-product-detail

## 0단계

- [x] README 수정
- [x] 불필요한 api delay 로직 삭제
- [x] useEffect dependency array 값 수정 (필요 종속 변수 추가, 불필요한 변수 제거)

## 실행 가이드

1. 프론트엔드 프로젝트 루트에 .env 파일을 구성해주세요

```
VITE_REACT_GIFT_MOCK_SERVER_ENDPOINT=서버 엔드포인트(프로토콜 제외)

e.g.
localhost:3000(o)
http://localhost:3000(x)
```

2. 해당 프로젝트는 백엔드 mock 서버를 submodule로 포함하고 있습니다. git clone 후 아래 명령어를 실행해 주세요.

```
git submodule update --init --recursive
```

3. 프로젝트 실행에 필요한 패키지를 설치해주세요.
   **백엔드 mock 서버에 필요한 패키지는 postinstall 스크립트로 자동 설치됩니다.**

```
npm install
```

4. concurrently 라이브러리를 사용해 BE, FE 서버를 동시에 실행 하려면 다음 명령어를 사용하세요

```
npm run dev:all
```
