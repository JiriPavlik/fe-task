import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
      font-size: 62.5%;
       height: 100%;
  }

  body {
      height: 100%;
      background: #ffffff;
      font-family: "Arial";
      font-size: 1.4rem;
  }

  #root {
    height: 100%;
  }

  button:focus {
      outline: none;
  }
`;

export default GlobalStyle;
