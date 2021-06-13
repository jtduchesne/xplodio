import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Player from "../components/Player";
import Tracks from "../components/Tracks";

const Song = () => {
  const { artist: artistSlug, song: songSlug } = useParams();
  const [song, setSong] = useState({});

  useEffect(() => {
    fetch(`/artist/${artistSlug}/song/${songSlug}`)
      .then((response) => response.json())
      .then(({status, data}) => {
        if (status === 200)
          setSong(data);
      });
  }, [artistSlug, songSlug]);

  return (
    <Wrapper className="column">
      <Player song={song} />
      <Tracks tracks={song.tracks} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
`;

export default Song;
