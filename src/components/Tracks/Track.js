import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { Progress } from "semantic-ui-react";

import WaveSurfer from "wavesurfer.js";
import ReactLoading from "react-loading";

import SongContext from "../../contexts/SongContext";

import { toParam } from "../../utils";

const Track = ({ name, file, progress }) => {
  const {
    actions: { adjustLength },
  } = useContext(SongContext);

  const [status, setStatus] = useState({loading: true});
  const id = useMemo(() => toParam(file), [file]);

  const waveform = useRef(null);

  useEffect(() => {
    if (file && id && !waveform.current) {
      waveform.current = WaveSurfer.create({
        container: `#${id}`,
        height: 50,
        progressColor: "#2D5BFF",
      });
      waveform.current.load(file);

      waveform.current.on('ready', function() {
        setStatus({ready: true});
        adjustLength(waveform.current.getDuration());
      });
    }
  }, [id, file, adjustLength]);

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
        { status.loading && <Loading type="bars" color="#777" heigth={32} width={32} /> }
        { file && id ?
          <div style={{width: "100%"}} id={id}></div>
          :
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

const Loading = styled(ReactLoading)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProgressBar = styled(Progress)`
  width: 98%;
`;

export default Track;
