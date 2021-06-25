import React from "react";
import styled from "styled-components";
import { Progress } from "semantic-ui-react";

const Track = ({ name, file, progress }) => {
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
        { file ||
          <ProgressBar
            percent={progress.percentage}
            autoSuccess error={progress.error}
            size='small' color='olive' progress active
          >
            { progress.error ? "Problem uploading" :
              progress.percentage === 100 ? "Successfully uploaded" :
              progress.percentage ? "Uploading file" :
              "Waiting for"
            }
            &nbsp;
            <em>{progress.filename}</em>
          </ProgressBar>
        }
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
    width: 18px;
    height: 18px;
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

const ProgressBar = styled(Progress)`
  width: 98%;
`;

export default Track;
