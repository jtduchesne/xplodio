import React from "react";
import styled from "styled-components";

import ReactLoading from 'react-loading';
import { FaTimesCircle } from "react-icons/fa";

const Artwork = ({ loading, src, onClose }) => {
  if (loading || !src)
    return <EmptyArtwork>{loading ? <ReactLoading type="spin" color="#AAA" /> : "No image"}</EmptyArtwork>;
  else if (onClose)
    return <LoadedArtwork src={src}><Close onClick={onClose} /></LoadedArtwork>;
  else
    return <LoadedArtwork src={src} />;
};

const EmptyArtwork = styled.div`
  color: #AAA;
  font-size: 2em;
  font-weight: bolder;
  width: 150px;
  height: 150px;
  border: 5px dashed #AAA;
  border-radius: 25px;
  margin: 1rem;
  padding: .5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const LoadedArtwork = styled.div`
  width: 150px;
  height: 150px;
  background-image: url('${p => p.src}');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  margin: 1rem;
  position: relative;
`;

const Close = styled(FaTimesCircle)`
  border-radius: 50%;
  position: absolute;
  top: -6px;
  right: -6px;
  font-size: 2em;
  transition: all .5s;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 2px 4px rgba(0,0,0, 0.5);
    transform: scale(1.1);
  }
`;

export default Artwork;
