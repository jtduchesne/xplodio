import React, { useContext } from "react";
import styled from "styled-components";

import { CgPlayButtonO, CgPlayPauseO } from "react-icons/cg";

import SongContext from "../../contexts/SongContext";

const PlayButton = () => {
  const {
    state: { status },
    actions: { playPause },
  } = useContext(SongContext);

  return (
    <Wrapper onClick={() => playPause()}>
      {
        status.playing ?
        <PauseButtonSvg size="3em" />
        :
        <PlayButtonSvg size="3em" />
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  color: var(--orange);
  margin-right: .5em;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    background-color: rgba(255,255,255, .9);
    top: 0.2em;
    left: 0.2em;
    height: 2.6em;
    width: 2.6em;
    border-radius: 1.3em;
  }
`;

const PlayButtonSvg = styled(CgPlayButtonO)`
  position: relative;
  filter: drop-shadow(0 0 1px rgba(0,0,0, 0.5));
`;
const PauseButtonSvg = styled(CgPlayPauseO)`
  position: relative;
  filter: drop-shadow(0 0 1px rgba(0,0,0, 0.5));
`;

export default PlayButton;
