import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ArtistCard = ({ artist }) => {
  const avatarPath = useMemo(() => {
    if (artist.avatar)
      return artist.avatar.url;
    else
      return "/images/broken.png";
  }, [artist]);

  return (
    <Wrapper to={artist.slug}>
      <Image src={avatarPath} />
      <div className="infos">
        <span className="name">{artist.name}</span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled(Link)`
  display: flex;
  flex-direction: column;
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
  height: 200px;
  width: 200px;
  flex-shrink: 0;
  background-image: url('${p => p.src}');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  border-top-left-radius: calc(0.5rem - 1px);
  border-top-right-radius: calc(0.5rem - 1px);
  border-bottom: 1px solid rgba(0,0,0, 0.125);
`;

export default ArtistCard;
