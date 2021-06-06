import React from "react";
import styled from "styled-components";

const Infos = ({ song, artist }) => {
  return (
    <Wrapper>
      <span className="song">{song}</span>
      <span className="artist">by <strong>{artist}</strong></span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  span {
    display: block;
  }
  .song {
    font-size: 1.5em;
    font-weight: bold;
    text-shadow: 0 0 5px rgba(0,0,0, 0.7);
  }
  .artist {
    opacity: 85%;
  }
`;

export default Infos;
