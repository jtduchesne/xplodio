import React from "react";
import styled from "styled-components";

const Track = ({ name, file, empty }) => {
  return (
    <>
      <Infos className="column">
        <span>{name}</span>
        <span>
          <button>M</button>
          <button>S</button>
        </span>
      </Infos>
      <Waveform>
        {empty ? "(Empty track)" : file}
      </Waveform>
    </>
  );
};

const Infos = styled.div`
  justify-content: space-evenly;
  padding: 0 1em;
  border-bottom: 1px solid #AAA;
  overflow: hidden;

  span {
    white-space: nowrap;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  span::-webkit-scrollbar { width: 0 !important; }
  
  button {
    font-size: .6em;
    padding: 2px;
  }
`;

const Waveform = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #888;
  background-color: #EEE;
  border-bottom: 1px solid #CCC;
`;

export default Track;
