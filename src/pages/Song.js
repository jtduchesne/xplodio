import React, { useContext } from "react";
import styled from "styled-components";

import Player from "../components/Player";
import Tracks from "../components/Tracks";

import SongContext from "../contexts/SongContext";

const Song = () => {
  const {
    state: { status }
  } = useContext(SongContext);

  return (
    <Wrapper className="column">
      <Player />
      { status.loaded && <Tracks /> }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: calc(100vh - var(--header-height));
`;

export default Song;
