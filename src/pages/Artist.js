import React, { useContext } from "react";
import styled from "styled-components";

import SongCard from "../components/SongCard";
import ReactLoading from 'react-loading';

import ArtistContext from "../contexts/ArtistContext";

const Artist = () => {
  const {
    state: { status, songs }
  } = useContext(ArtistContext);

  return (
    <Wrapper>
      { status.loading ?
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
