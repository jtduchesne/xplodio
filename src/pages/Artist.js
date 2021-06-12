import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import SongCard from "../components/SongCard";
import ReactLoading from 'react-loading';

const Artist = () => {
  const { artist: artistSlug } = useParams();
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch(`/artist/${artistSlug}/songs`)
      .then((response) => response.json())
      .then(({status, data}) => {
        if (status === 200)
          setSongs(data);
      });
  }, [artistSlug]);

  return (
    <Wrapper>
      {
        songs.length > 0 ?
        songs.map((song) => (
          <SongCard key={song._id} song={song} />
        ))
        :
        <Loading type="bars" color="#666" />
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 2em;
  padding: 2em;
`;

const Loading = styled(ReactLoading)`
  margin: 2em auto;
`;

export default Artist;
