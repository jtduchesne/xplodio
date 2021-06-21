import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Form, Input } from "semantic-ui-react";

import UploadContext from "../../contexts/UploadContext";

const NEW = "!new";

const Artist = () => {
  const {
    state: { artist, artist: { status } },
    actions: {
      chooseArtist: choose,
      initializeArtist: initialize,
      setArtistName: setName,
      setArtistSlug: setSlug,
      createArtist: create
    },
  } = useContext(UploadContext);

  const [artistList, setArtistList] = useState([]);

  const handleChoose = useCallback((e, {value}) => {
    if (value === NEW)
      initialize();
    else
      choose(value);
  }, [initialize, choose]);

  const handleChangeName = useCallback((e, {value}) => setName(value), [setName]);
  const handleChangeSlug = useCallback((e, {value}) => setSlug(value), [setSlug]);
  const handleSubmit = useCallback(() => create(), [create]);

  useEffect(() => {
    if (status.created || (!status.chosen && !status.new)) {
      fetch("/artists")
        .then((res) => res.json())
        .then((res) => setArtistList(res.data))
        .catch(console.log);
    }
  }, [status]);

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Form.Field required>
          <label htmlFor="artist">Artist</label>
          <Form.Select
            id="artist"
            value={status.new ? NEW : artist.slug}
            onChange={handleChoose}
            options={artistList.map(({name, slug}) => (
              {key: slug, value: slug, text: name}
            )).concat({key: NEW, value: NEW, text: "Create new..."})}
          />
        </Form.Field>
        <NewArtistGroup className={status.new && "visible"}>
          <Form.Field>
            <label htmlFor="new_artist_name">New artist name</label>
            <Form.Input
              id="new_artist_name" name="artist_name" placeholder="Name"
              value={artist.name} onChange={handleChangeName} />
          </Form.Field>
          <Form.Field
            error={status.conflict}
            title={status.conflict ? "This identifier has already been taken" : undefined}
          >
            <Input
              label={{
                content: "www.xplodio.com/",
                style: status.conflict ? {border: "1px solid rgba(255,128,128, 0.5)", borderRight: "transparent"} : {},
              }}
              size="small"
              icon={
                status.conflict ? {name: "exclamation circle", color: "red"} :
                status.valid ? {name: "check", color: "green"} :
                {name: "circle outline", color: "grey"}
              }
              loading={status.checking}
              id="new_artist_slug" name="artist_slug" placeholder="Identifier"
              value={artist.slug} onChange={handleChangeSlug}
            />
          </Form.Field>
          <Form.Button primary disabled={!(artist.name && status.valid)}>Create</Form.Button>
        </NewArtistGroup>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: var(--max-form-width);
  margin: 0 auto;
`;

const NewArtistGroup = styled.div`
  background: #F9FAFB;
  border-color: rgba(34,36,38, .15);
  box-shadow: 0 2px 25px 0 rgba(34,36,38, .05) inset;

  transform: scaleY(0) translateY(-50%);
  position: relative;
  height: 0;
  opacity: 0;
  transition: all .5s;

  &.visible {
    padding: 1em;
    transform: none;
    height: unset;
    opacity: 1;
  }
`;

export default Artist;
