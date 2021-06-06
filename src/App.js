import React from "react";
import styled from "styled-components";

import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Header />
      <Main className="container">
        Xplodio
      </Main>
    </>
  );
};

const Main = styled.main`
  height: calc(100vh - var(--header-height));
  box-shadow: 0 0 50px var(--taupe);
`;

export default App;
