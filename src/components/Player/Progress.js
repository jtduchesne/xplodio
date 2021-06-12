import React from "react";
import styled from "styled-components";

import { formatTime } from "../../utils";

const Progress = ({ length }) => {
  return (
    <Wrapper className="row">
      <span>0:00</span>
      <input type="range" min="1" max={length} value="1" />
      <span>{formatTime(length)}</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-items: center;
  margin-top: 10px;

  span {
    font-family: monospace;
    font-size: 1em;
    text-shadow: 0 0 1px rgba(0,0,0, 0.9);
    flex-shrink: 1;
  }
  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    outline: none;
    margin: 0 .5em;
    height: 2px;
    background: #D3D3D3;
    box-shadow: 0 0 2px rgba(0,0,0, 0.8);
    flex-grow: 1;
    opacity: 80%;
    transition: opacity .3s;

    &:hover, &:focus {
      opacity: 100%;
    }
    &::-webkit-slider-thumb, &::-moz-range-thumb {
      cursor: pointer;
    }
  }
`;

export default Progress;
