import React, { useCallback, useContext, useState, useRef } from "react";
import styled from "styled-components";

import Track from "./Track";
import UploadButton from "./UploadButton";

import SongContext from "../../contexts/SongContext";

import { prettifyTrackName, upload } from "../../utils";

const Tracks = () => {
  const {
    state: { song },
    actions: { linkTracks },
  } = useContext(SongContext);

  const [uploadInfos, setUploadInfos] = useState({ val: [] });

  const uploadInfosRef = useRef(null);

  const uploadFile = useCallback((file, index) => {
    let progress = [...uploadInfosRef.current.val];
    return upload(file, (e) => {
      progress[index].percentage = Math.round(
        (100 * e.loaded) / e.total
      );
      setUploadInfos({ val: progress });
    }).then((res) => {
        let response = JSON.parse(res);
        if (response.status < 300) {
          return fetch("/tracks", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: progress[index].name,
              length: 0,
              file: response.data._id,
            }),
          }).then((res) => res.json())
            .then(({status, data}) => {
              if (status < 300)
                return data.id;
              else
                throw new Error();
            })
            .catch(console.log);
        } else {
          console.log(response);
        }
      })
      .catch(() => {
        progress[index].percentage = 100;
        progress[index].error = true;
        setUploadInfos({ val: progress });
      });
  }, []);

  const uploadFiles = useCallback((e) => {
    const files = Array.from(e.target.files);

    setUploadInfos({ val: [] });
    uploadInfosRef.current = {
      val: files.map((file) => ({
        name: prettifyTrackName(file.name),
        percentage: 0,
        filename: file.name,
      })),
    };

    let promises = files.map(uploadFile);
    Promise.all(promises)
      .then(linkTracks)
      .catch(console.log);
  }, [uploadFile, linkTracks]);

  return (
    <Wrapper>
      {
        song.tracks && song.tracks.length > 0 ?
        song.tracks.map((track, index) => (
          <Track key={index} name={track.name} file={track.url} />
        ))
        :
        uploadInfos && uploadInfos.val.length > 0 ?
        uploadInfos.val.map((progressInfo, index) => (
          <Track key={index} name={progressInfo.name} progress={progressInfo} />
        ))
        :
        <UploadButton onChooseFiles={uploadFiles} />
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: fit-content(20%) 1fr;
  grid-auto-rows: 50px;
  overflow-y: scroll;
  border-top: 1px solid #CCC;
  border-bottom: 1px solid #CCC;
`;

export default Tracks;
