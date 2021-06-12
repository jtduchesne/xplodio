import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Artist = () => {
  const { artist } = useParams();

  return (
    <Wrapper>
      Artist: {artist}
    </Wrapper>
  );
};

const Wrapper = styled.div`
`;

export default Artist;
