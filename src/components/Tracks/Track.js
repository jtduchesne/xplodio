import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { Progress } from "semantic-ui-react";

import WaveSurfer from "wavesurfer.js";
import ReactLoading from "react-loading";

import SongContext from "../../contexts/SongContext";

import { toParam } from "../../utils";

const Track = ({ name, file, progress }) => {
  const {
    state: { soloMode },
    actions: { adjustLength, bindTrackRef, setSoloMode },
  } = useContext(SongContext);

  const [status, setStatus] = useState({loading: true});
  const [muted, setMuted] = useState(false);
  const [mute, setMute] = useState(false);
  const [solo, setSolo] = useState(false);
  
  const id = useMemo(() => toParam(file), [file]);

  const waveform = useRef(null);

  useEffect(() => {
    if (file && id && !waveform.current) {
      waveform.current = WaveSurfer.create({
        container: `#${id}`,
        height: 50,
        progressColor: "#2D5BFF",
        interact: false,
      });
      waveform.current.load(file);

      waveform.current.on('ready', function() {
        setStatus({ready: true});
        adjustLength(waveform.current.getDuration());
      });
      bindTrackRef(waveform);
    }
  }, [id, file, adjustLength, bindTrackRef]);

  const toggleMute = useCallback(() => {
    setMute(currentState => !currentState);
  }, []);
  const toggleSolo = useCallback(() => {
    setSolo(currentState => {
      setSoloMode(!currentState);
      return !currentState;
    });
  }, [setSoloMode]);

  useEffect(() => {
    if (waveform.current) {
      let muted = mute || (soloMode && !solo);
      setMuted(muted);
      waveform.current.setMute(muted);
    }
  }, [mute, soloMode, solo]);

  return (
    <>
      <Infos className="column">
        <span>{name}</span>
        <span>
          <MuteButton className={mute && "active"} onClick={toggleMute}>M</MuteButton>
          <SoloButton className={solo && "active"} onClick={toggleSolo}>S</SoloButton>
        </span>
      </Infos>
      <Waveform className={muted && "muted"}>
        { status.loading && <Loading type="cylon" color="#777" heigth={32} width={32} /> }
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
`;

const Button = styled.button`
  font-size: .6em;
  padding: 2px;
  width: 18px;
  height: 18px;
  border: 1px solid #888;
  border-radius: 3px;
  background-color: #DDD;
`;
const MuteButton = styled(Button)`
  &.active {
    background-color: #AA0;
  }
`;
const SoloButton = styled(Button)`
  &.active {
    background-color: #A50;
  }
`;

const Waveform = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #888;
  background-color: #EEE;
  border-bottom: 1px solid #CCC;

  &.muted { opacity: .5; }
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
