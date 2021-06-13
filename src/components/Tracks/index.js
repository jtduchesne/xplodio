import React from "react";
import styled from "styled-components";

import Track from "./Track";

const Tracks = ({ tracks = [] }) => {
  return (
    <Wrapper>
      {
        tracks.length > 0 ?
        tracks.map((track) => (
          <Track key={track._id} name={track.name} file={track.url} />
        ))
        :
        <Track empty />
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: fit-content(20%) 1fr;
  grid-auto-rows: 50px;
  overflow-y: scroll;
  border-top: 1px solid #CCC;
`;

export default Tracks;
