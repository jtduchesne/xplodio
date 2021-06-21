import React, { useCallback, useEffect, useMemo, useReducer } from "react";

import { toParam, upload } from "../utils";

export const UploadContext = React.createContext();

// Artwork statuses:
// ------------------------------------------------------------------------------------------//
//   processing: Artwork is either being uploaded to server, or deleted from server.
//   uploaded:   Artwork is uploaded, but not quite ready yet.
//
//   ready:      Artwork is ready. That is, state.artwork._id is set.
// ------------------------------------------------------------------------------------------//

const initialArtwork = {
  _id: "", url: "", status: {}
};
function artworkReducer(state, {type, payload}) {
  switch (type) {
  case "start-upload":
    return {...state, status: {...state.status, processing: true}};
  case "finish-upload":
    return {...state, status: {...state.status, uploaded: true}};

  case "start-delete":
    return {...state, status: {...state.status, processing: true}};
  case "finish-delete":
    return initialArtwork;

  case "create":
    return {...state, ...payload, status: {ready: (!!payload._id)}};

  default:
    throw new Error("Unrecognized action type: " + type);
  }
}

// Artist statuses:
// ------------------------------------------------------------------------------------------//
//   chosen:    An Artist has been chosen from the list, be it valid or not.
//              If `chosen` is set but `ready` is not, it means something went wrong...
//   new:       A new Artist is being created but is not yet considered valid.
//   created:   The new Artist has been successfully created.
//
//   checking:  The `slug` is currently being checked for availability.
//   conflict:  The chosen `slug` is already taken.
//   valid:     The chosen `slug` is available.
//
//   ready:     Artist is ready. That is, state.artist._id is set.
// ------------------------------------------------------------------------------------------//

const initialArtist = {
  _id: "", name: "", slug: "", status: {}
};
function artistReducer(state, {type, payload}) {
  switch (type) {
  case "choose":
    return {...state, ...payload, status: {chosen: true, ready: (!!payload._id)}};
  case "initialize":
    return {...initialArtist, ...payload, status: {new: true}};

  case "update":
    if (payload.slug !== undefined)
      return {...state, ...payload, status: {...state.status, conflict: false, valid: false}};
    else
      return {...state, ...payload};

  case "start-check":
    return {...state, status: {...state.status, checking: true}};
  case "finish-check":
    return {...state, status: {...state.status, checking: false}};
  case "flag-conflict":
    return {...state, status: {...state.status, conflict: true, valid: false}};
  case "flag-valid":
    return {...state, status: {...state.status, conflict: false, valid: true}};

  case "create":
    return {...state, ...payload, status: {created: true}};

  default:
    throw new Error("Unrecognized action type: " + type);
  }
}

// Song statuses:
// ------------------------------------------------------------------------------------------//
//   checking:  The `slug` is currently being checked for availability.
//   conflict:  The chosen `slug` is already taken.
//   valid:     The chosen `slug` is available.
// ------------------------------------------------------------------------------------------//

const initialSong = {
  name: "", slug: "", status: {}
};
function songReducer(state, {type, payload}) {
  switch (type) {
  case "update":
    if (payload.slug !== undefined)
      return {...state, ...payload, status: {...state.status, conflict: false, valid: false}};
    else
      return {...state, ...payload};

  case "start-check":
    return {...state, status: {...state.status, checking: true}};
  case "finish-check":
    return {...state, status: {...state.status, checking: false}};
  case "flag-conflict":
    return {...state, status: {...state.status, conflict: true, valid: false}};
  case "flag-valid":
    return {...state, status: {...state.status, conflict: false, valid: true}};

  default:
    throw new Error("Unrecognized action type: " + type);
  }
}

// ------------------------------------------------------------------------------------------//

export const UploadProvider = ({ children }) => {
  const [artwork, artworkDispatch] = useReducer(artworkReducer, initialArtwork);

  const uploadArtwork = useCallback((file) => {
    artworkDispatch({type: 'start-upload'});
    upload(file)
      .then((res) => {
        let response = JSON.parse(res);
        if (response.status < 300) {
          fetch("/images", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              upload: response.data._id
            }),
          }).then((res) => res.json())
            .then((res) => artworkDispatch({type: 'create', payload: res.data}))
            .catch(console.log);
        } else {
          console.log(response);
        }
      })
      .catch(console.log)
      .finally(() => artworkDispatch({type: 'finish-upload'}));
  }, []);

  const deleteArtwork = useCallback(() => {
    if (artwork._id) {
      artworkDispatch({type: 'start-delete'});
      fetch(`/image/${artwork._id}`, { method: 'DELETE' })
        .catch(console.log)
        .finally(() => artworkDispatch({type: 'finish-delete'}));
    }
  }, [artwork]);

  //-----------------------------------------------------------------------------------------//

  const [artist, artistDispatch] = useReducer(artistReducer, initialArtist);

  useEffect(() => {
    let status = artist.status;
    if (status.new &&
        !(status.valid || status.conflict) &&
        artist.slug.length > 2) {
      const timer = setTimeout(() => {
        artistDispatch({type: 'start-check'});
        fetch(`/check/artist/${artist.slug}`)
          .then((res) => res.json())
          .then((res) => artistDispatch({type: (res.data.exists ? 'flag-conflict' : 'flag-valid')}))
          .catch(console.log)
          .finally(() => artistDispatch({type: 'finish-check'}));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [artist.status, artist.slug]);

  const chooseArtist = useCallback((slug) => {
    fetch(`/artist/${slug}`)
      .then((res) => res.json())
      .then((res) => artistDispatch({type: 'choose', payload: res.data}));
  }, []);

  const initializeArtist = useCallback(() => {
    artistDispatch({type: 'initialize'});
  }, []);

  const setArtistName = useCallback((name) => {
    if (toParam(artist.name) === artist.slug)
      artistDispatch({type: 'update', payload: {name, slug: toParam(name)}});
    else
      artistDispatch({type: 'update', payload: {name}});
  }, [artist.name, artist.slug]);

  const setArtistSlug = useCallback((slug) => {
    artistDispatch({type: 'update', payload: {slug: toParam(slug)}});
  }, []);

  const createArtist = useCallback((attr) => {
    if (artist.status.valid) {
      let {name, slug} = attr || artist;
      fetch("/artists", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name, slug}),
      }).then((res) => res.json())
        .then((res) => {
          if (res.status === 201)
            artistDispatch({type: 'create', payload: res.data});
        })
        .catch(console.log);
    }
  }, [artist]);

  //-----------------------------------------------------------------------------------------//

  const [song, songDispatch] = useReducer(songReducer, initialSong);

  useEffect(() => {
    let status = song.status;
    if (!(status.valid || status.conflict) &&
        song.slug.length > 2) {
      const timer = setTimeout(() => {
        songDispatch({type: 'start-check'});
        fetch(`/check/song/${song.slug}`)
          .then((res) => res.json())
          .then((res) => songDispatch({type: (res.data.exists ? 'flag-conflict' : 'flag-valid')}))
          .catch(console.log)
          .finally(() => songDispatch({type: 'finish-check'}));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [song.status, song.slug]);

  const setSongName = useCallback((name) => {
    if (toParam(song.name) === song.slug)
      songDispatch({type: 'update', payload: {name, slug: toParam(name)}});
    else
      songDispatch({type: 'update', payload: {name}});
  }, [song.name, song.slug]);

  const setSongSlug = useCallback((slug) => {
    songDispatch({type: 'update', payload: {slug: toParam(slug)}});
  }, []);

  //-----------------------------------------------------------------------------------------//

  const memo = useMemo(() => ({
    state: {
      artwork,
      artist,
      song,
    },
    actions: {
      uploadArtwork,
      deleteArtwork,

      chooseArtist,
      initializeArtist,
      setArtistName,
      setArtistSlug,
      createArtist,

      setSongName,
      setSongSlug,
    },
  }), [artwork, artist, song]); //eslint-disable-line

  return (
    <UploadContext.Provider value={memo}>
      {children}
    </UploadContext.Provider>
  );
};

export default UploadContext;
