import React, { useContext } from "react";
import styled from "styled-components";

import Track from "./Track";

import SongContext from "../../contexts/SongContext";

const Tracks = () => {
  const {
    state: { song }
  } = useContext(SongContext);

  return (
    <Wrapper>
      {
        song.tracks && song.tracks.length > 0 ?
        song.tracks.map((track, index) => (
          <Track key={index} name={track.name} file={track.url} />
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
