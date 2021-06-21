import React, { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Form } from "semantic-ui-react";

import ImageUpload from "../components/Upload/ImageUpload";
import Artist from "../components/Upload/Artist";
import Song from "../components/Upload/Song";

import UploadContext from "../contexts/UploadContext";

const Upload = () => {
  const {
    state: { artwork, artist, song },
  } = useContext(UploadContext);

  const history = useHistory();

  const handleSubmit = useCallback(() => {
    fetch("/songs", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        artwork: artwork._id,
        artist: artist._id,
        name: song.name,
        slug: song.slug,
      }),
    }).then((res) => res.json())
      .then(({status, data}) => {
        if (status === 201)
          history.push(`/${data.artist.slug}/${data.slug}`);
      })
      .catch(console.log);
  }, [artwork, artist, song, history]);

  return (
    <Wrapper className="column">
      <ImageUpload />
      <Artist />
      <Song />
      <Button primary
        disabled={!(artist.status.ready && song.name && song.status.valid)}
        onClick={handleSubmit}
      >
        Create song
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
`;

const Button = styled(Form.Button)`
  display: flex;
  justify-content: center;
  margin-top: 1em;
`;

export default Upload;
