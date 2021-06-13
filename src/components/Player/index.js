import React, { useMemo } from "react";
import styled from "styled-components";

import BlurryBackground from "../BlurryBackground";
import Artwork from "./Artwork";
import Infos from "./Infos";

const Player = ({ song }) => {
  const artworkPath = useMemo(() => {
    if (song.artwork)
      return song.artwork.url;
    else
      return "/images/broken.png";
  }, [song]);

  return (
    <Wrapper className="row">
      <BlurryBackground src={artworkPath} />
      <Artwork src={artworkPath} />
      <Infos song={song} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  align-items: center;
`;

export default Player;
