import React, { useState, useEffect } from "react";
import styled from "styled-components";

import NotFound from "../NotFound";
import ArtistCard from "../components/ArtistCard";
import ReactLoading from 'react-loading';

const Home = () => {
  const [status, setStatus] = useState({loading: true});
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetch(`/artists`)
      .then((response) => response.json())
      .then(({status, data}) => {
        if (status === 200) {
          setArtists(data);
          setStatus((status) => ({...status, loaded: true}));
        } else
          setStatus((status) => ({...status, notfound: true}));
      })
      .catch(console.log)
      .finally(() => setStatus((status) => ({...status, loading: false})));
  }, []);

  return (
    <Wrapper>
      {
        status.notfound ?
        <NotFound />
        :
        status.loading ?
        <Loading type="bars" color="#666" />
        :
        artists.map((artist) => (
          <ArtistCard key={artist._id} artist={artist} />
        ))
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
