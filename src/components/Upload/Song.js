import React, { useCallback, useContext } from "react";
import styled from "styled-components";
import { Form, Input } from "semantic-ui-react";

import UploadContext from "../../contexts/UploadContext";

const Song = () => {
  const {
    state: { artist, song, song: { status } },
    actions: {
      setSongName: setName,
      setSongSlug: setSlug,
    },
  } = useContext(UploadContext);

  const handleChangeName = useCallback((e, {value}) => setName(value), [setName]);
  const handleChangeSlug = useCallback((e, {value}) => setSlug(value), [setSlug]);

  return (
    <Wrapper>
      <Form>
        <Form.Field required>
          <label htmlFor="song_name">Song name</label>
          <Form.Input
            id="song_name" name="name" placeholder="Name"
            value={song.name} onChange={handleChangeName} />
        </Form.Field>
        <Form.Field required
          error={status.conflict}
          title={status.conflict ? "This identifier has already been taken" : undefined}
        >
          <Input
            label={{
              content: `www.xplodio.com/${artist.slug || '...'}/`,
              style: status.conflict ? {border: "1px solid rgba(255,128,128, 0.5)", borderRight: "transparent"} : {},
            }}
            size="small"
            icon={
              status.conflict ? {name: "exclamation circle", color: "red"} :
              status.valid ? {name: "check", color: "green"} :
              {name: "circle outline", color: "grey"}
            }
            loading={status.checking}
            id="song_slug" name="slug" placeholder="Identifier"
            value={song.slug} onChange={handleChangeSlug}
          />
        </Form.Field>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: var(--max-form-width);
  margin: 0 auto;
`;

export default Song;
