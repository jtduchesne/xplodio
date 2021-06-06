import React from "react";
import styled from "styled-components";

import Header from "./components/Header";
import Player from "./components/Player";
import Tracks from "./components/Tracks";

const App = () => {
  return (
    <>
      <Header />
      <Main className="container column">
        <Player artworkPath="images/artwork500x500.jpg" />
        <Tracks />
      </Main>
    </>
  );
};

const Main = styled.main`
  height: calc(100vh - var(--header-height));
  box-shadow: 0 0 50px var(--taupe);
`;

export default App;
