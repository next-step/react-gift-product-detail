import { Global, css } from '@emotion/react';

export const GlobalStyle = () => (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html {
        font-size: 16px;
        line-height: 1.5;
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif;
        background-color: #fff;
        color: #222;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-tap-highlight-color: transparent;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      button {
        background: none;
        border: none;
        cursor: pointer;
        font-family: inherit;
      }

      input, textarea, select {
        font-family: inherit;
        border: none;
        outline: none;
      }

      img {
        max-width: 100%;
        height: auto;
      }

      /* 스크롤바 스타일링 */
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
      * {
        scrollbar-width: thin;
        scrollbar-color: #c1c1c1 #f1f1f1;
      }
    `}
  />
);

