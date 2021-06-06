import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle`
  :root {
    --orange: #E87A00;
    --taupe: #8C756A;

    --mist: #90AFC5;
    --teal: #0292b7;

    --white: #F8F8F8;
    --foam: #BEC6DA;
    --darkgray: #2F3136;
    --shadow: #24272B;
    --black: #111111;

    --max-width: 100%;
    --header-height: 40px;
  }

  @media screen and (min-width: 540px) {
    :root { --max-width: 540px; }
  }
  @media screen and (min-width: 768px) {
    :root { --max-width: 720px; }
  }
  @media screen and (min-width: 992px) {
    :root { --max-width: 960px; }
  }
  @media screen and (min-width: 1200px) {
    :root { --max-width: 1140px; }
  }
  @media screen and (min-width: 1400px) {
    :root { --max-width: 1320px; }
  }

  ${normalize}

  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .container {
    width: var(--max-width);
    margin-left: auto;
    margin-right: auto;
  }
`;

export default GlobalStyle;
