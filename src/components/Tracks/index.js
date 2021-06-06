import React from "react";
import styled from "styled-components";

import Track from "./Track";

const Tracks = () => {
  return (
    <Wrapper>
      <Track name="Vocal" />
      <Track name="Guitar" />
      <Track name="Percussions" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: fit-content(20%) 1fr;
  grid-auto-rows: 50px;
  overflow-y: scroll;
`;

export default Tracks;
