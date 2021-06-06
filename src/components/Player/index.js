import React from "react";
import styled from "styled-components";

import PlayButton from "./PlayButton";
import Infos from "./Infos";
import Progress from "./Progress";

const Player = ({ artworkPath }) => {
  return (
    <Wrapper className="row">
      <Background src={artworkPath} />
      <ArtWork src={artworkPath} alt="Artwork" />
      <div className="column">
        <div className="row">
          <PlayButton />
          <Infos song="Song name" artist="Artist" />
        </div>
        <Progress length={300} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  overflow: hidden;
  align-items: center;
  padding: 16px;
  color: white;
  text-shadow: 0 0 3px rgba(0,0,0, 0.9);
`;

const Background = styled.div`
  position: absolute;
  height: calc(100% + 48px);
  width: calc(100% + 32px);
  top: -24px;
  left: -16px;
  background-image: url('${p => p.src}');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  filter: blur(16px) saturate(50%);
  z-index: -1;
`;

const ArtWork = styled.img`
  width: auto;
  height: auto;
  max-width: 150px;
  max-height: 150px;
  margin-right: 16px;
`;

export default Player;
