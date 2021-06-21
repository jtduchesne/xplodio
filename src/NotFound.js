import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Segment, Header, Icon } from "semantic-ui-react";

const NotFound = () => {
  const { artist, song } = useParams();
  return (
    <Wrapper>
      <Segment placeholder textAlign='center' color='red'>
        <Header icon>
          <Icon name='file excel outline' />
          404 - Not Found
        </Header>
        { song ?
          <span>
            <strong><em>{artist}</em></strong> doesn't seem to have any song called <strong><em>{song}</em></strong>...
          </span>
          :
          artist ?
          <span>
            <strong><em>{artist}</em></strong> doesn't seem to be in our collection...
          </span>
          :
          undefined
        }
      </Segment>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 2em;
`;

export default NotFound;
