import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import NotFound from "../NotFound";
import SongCard from "../components/SongCard";
import ReactLoading from 'react-loading';

const Artist = () => {
  const { artist: artistSlug } = useParams();

  const [status, setStatus] = useState({loading: true});
  const [songs, setSongs] = useState([]);

  const artistUrl = useMemo(() => (
    `/artist/${artistSlug}`
  ), [artistSlug]);

  useEffect(() => {
    fetch(`${artistUrl}/songs`)
      .then((response) => response.json())
      .then(({status, data}) => {
        if (status === 200) {
          setSongs(data);
          setStatus((status) => ({...status, loaded: true}));
        } else
          setStatus((status) => ({...status, notfound: true}));
      })
      .catch(console.log)
      .finally(() => setStatus((status) => ({...status, loading: false})));
  }, [artistUrl]);

  return (
    <Wrapper>
      { status.notfound ?
        <NotFound />
        :
        status.loading ?
        <Loading type="bars" color="#666" />
        :
        songs.map((song) => (
          <SongCard key={song._id} song={song} />
        ))
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  gap: 2em;
  padding: 2em;
`;

const Loading = styled(ReactLoading)`
  margin: 2em auto;
`;

export default Artist;
