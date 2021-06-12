import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Player from "../components/Player";
import Tracks from "../components/Tracks";

const Song = () => {
  const { artist, song } = useParams();

  return (
    <Wrapper className="column">
      <Player artworkPath="/images/artwork500x500.jpg" />
      <Tracks />
    </Wrapper>
  );
};

const Wrapper = styled.div`
`;

export default Song;
