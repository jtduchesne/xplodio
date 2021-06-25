import React, { useContext, useMemo } from "react";
import styled from "styled-components";

import BlurryBackground from "../BlurryBackground";
import Artwork from "../Artwork";
import Infos from "./Infos";

import SongContext from "../../contexts/SongContext";

const Player = () => {
  const {
    state: { status, song }
  } = useContext(SongContext);

  const artworkPath = useMemo(() => {
    if (song.artwork)
      return song.artwork.url;
    else
      return "/images/broken.png";
  }, [song]);

  return (
    <Wrapper className="row">
      <BlurryBackground loading={status.loading} src={artworkPath} />
      <Artwork loading={status.loading} src={artworkPath} />
      <Infos song={song} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  align-items: center;
`;

export default Player;
