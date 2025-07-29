import { Global, css } from "@emotion/react";

const GlobalStyle = () => (
  <Global
    styles={css`
      @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css");

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html,
      body {
        font-family: "Pretendard", "Apple SD Gothic Neo", Arial, sans-serif;
        background-color: #fff;
        color: #222;
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
        min-height: 100vh;
        width: 100%;
        overscroll-behavior-y: none;
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
      }

      #root {
        min-height: 100vh;
        width: 100vw;
        background: #fff;
      }

      button,
      input,
      textarea {
        font-family: inherit;
      }

      /* 스크롤바 스타일링 (개발 환경에서만 표시) */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: #a8a8a8;
      }
      
      /* Firefox 스크롤바 */
      body {
        scrollbar-width: thin;
        scrollbar-color: #c1c1c1 #f1f1f1;
      }
    `}
  />
);

export default GlobalStyle;
