import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import NotFound from "../NotFound";
import Player from "../components/Player";
import Tracks from "../components/Tracks";

const Song = () => {
  const { artist: artistSlug, song: songSlug } = useParams();

  const [status, setStatus] = useState({loading: true});
  const [song, setSong] = useState({});

  const songUrl = useMemo(() => (
    `/artist/${artistSlug}/song/${songSlug}`
  ), [artistSlug, songSlug]);

  useEffect(() => {
    fetch(songUrl)
      .then((response) => response.json())
      .then(({status, data}) => {
        if (status === 200) {
          setSong(data);
          setStatus((status) => ({...status, loaded: true}));
        } else
          setStatus((status) => ({...status, notfound: true}));
      })
      .catch(console.log)
      .finally(() => setStatus((status) => ({...status, loading: false})));
  }, [songUrl]);

  return (
    <Wrapper className="column">
      { status.notfound ?
        <NotFound />
        :
        <>
          <Player loading={status.loading} song={song} />
          {
            status.loaded &&
            <Tracks tracks={song.tracks} />
          }
        </>
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: unset;
  height: calc(100vh - var(--header-height));
`;

export default Song;
