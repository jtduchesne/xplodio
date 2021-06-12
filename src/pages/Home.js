import React, { useState, useEffect } from "react";
import styled from "styled-components";

import ArtistCard from "../components/ArtistCard";
import ReactLoading from 'react-loading';

const Home = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetch(`/artists`)
      .then((response) => response.json())
      .then(({status, data}) => {
        if (status === 200)
          setArtists(data);
      });
  }, []);

  return (
    <Wrapper>
      {
        artists.length > 0 ?
        artists.map((artist) => (
          <ArtistCard key={artist._id} artist={artist} />
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

export default Home;
