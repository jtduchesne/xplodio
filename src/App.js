import React from "react";
import styled from "styled-components";

const App = () => {
  return (
    <Wrapper className="container">
      Xplodio
    </Wrapper>
  );
};

const Wrapper = styled.main`
  height: 100vh;
  box-shadow: 0 0 50px var(--taupe);
`;

export default App;
