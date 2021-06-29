import React, { useContext } from "react";
import styled from "styled-components";

import PlayButton from "./PlayButton";
import Progress from "./Progress";

import SongContext from "../../contexts/SongContext";

const Infos = () => {
  const {
    state: { song, position, length },
    actions: { seek }
  } = useContext(SongContext);

  return (
    <Wrapper className="column">
      <div className="row">
        <PlayButton />
        <SongInfos>
          <span className="song">{song.name}</span>
          { !!song.artist &&
            <span className="artist">
              by <strong><a href={`/${song.artist.slug}`}>{song.artist.name}</a></strong>
            </span>
          }
        </SongInfos>
      </div>
      <Progress position={position} length={song.length || length} onChange={seek} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-width: calc(50% - 150px - 2em);
  color: white;
  text-shadow: 0 0 3px rgba(0,0,0, 0.9);
`;

const SongInfos = styled.div`
  span {
    display: block;
  }
  a {
    color: inherit;
    &:hover { text-decoration: underline; }
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
