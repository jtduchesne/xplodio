import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import { formatTime } from "../utils";

const SongCard = ({ song }) => {
  const { pathname } = useLocation();

  const artworkPath = useMemo(() => {
    if (song.artwork)
      return song.artwork.url;
    else
      return "/images/broken.png";
  }, [song]);

  return (
    <Wrapper to={`${pathname}/${song.slug}`}>
      <Image src={artworkPath} />
      <div className="infos">
        <span className="name">{song.name}</span>
        <span className="length">{formatTime(song.length)}</span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled(Link)`
  display: flex;
  flex-direction: row;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0,0,0, 0.125);
  border-radius: 0.5rem;
  box-shadow: 0 5px 3px rgba(0, 0, 0, 0.1),
              0 10px 25px rgba(0, 0, 0, 0.1);

  color: var(--black);
  text-decoration: none;

  &:hover span.name, &:focus span.name {
    text-decoration: underline;
  }

  div.infos {
    min-width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;

    .length {
      color: var(--foam);
      font-weight: 500;
      margin-top: 3px;
    }
  }
`;

const Image = styled.div`
  height: 150px;
  width: 150px;
  flex-shrink: 0;
  background-image: url('${p => p.src}');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  border-top-left-radius: calc(0.5rem - 1px);
  border-bottom-left-radius: calc(0.5rem - 1px);
  border-right: 1px solid rgba(0,0,0, 0.125);
`;

export default SongCard;
