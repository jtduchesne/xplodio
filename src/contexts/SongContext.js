import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import NotFound from "../NotFound";

export const SongContext = React.createContext();

export const SongProvider = ({ children }) => {
  const { artist: artistSlug, song: slug } = useParams();

  const [status, setStatus] = useState({loading: true});
  const [song, setSong] = useState({});
  const [length, setLength] = useState(0);
  const [position, setPosition] = useState(0);
  const [soloMode, setSoloMode] = useState(false);

  const [trackRefs, setTrackRefs] = useState([]);

  const url    = useMemo(() => `/${artistSlug}/${slug}`,             [artistSlug, slug]);
  const apiUrl = useMemo(() => `/artist/${artistSlug}/song/${slug}`, [artistSlug, slug]);

  const adjustLength = useCallback((newLength) => {
    if (newLength > length) setLength(Math.round(newLength));
  }, [length, setLength]);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then(({status, data}) => {
        setStatus((status) => ({...status, loaded: true}));
        if (status === 200) {
          setSong(data);
          adjustLength(data.length);
        } else
          setStatus((status) => ({...status, notfound: true}));
      })
      .catch(console.log)
      .finally(() => setStatus((status) => ({...status, loading: false})));
  }, [apiUrl, adjustLength]);

  const linkTracks = useCallback((trackIds) => {
    fetch(apiUrl, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tracks: trackIds.filter(id => id) }),
    }).then((res) => res.json())
      .then((res) => {
        if (res.status === 200)
          setSong(res.data);
        else
          console.log(res);
      })
      .catch(console.log);
  }, [apiUrl]);

  const bindTrackRef = useCallback((newTrackRef) => {
    setTrackRefs((trackRefs) => ([...trackRefs, newTrackRef]));
  }, []);

  const playPause = useCallback(() => {
    setStatus((status) => ({...status, playing: !status.playing}));
    trackRefs.forEach((track) => track.current.playPause());
  }, [trackRefs]);

  const seek = useCallback((progress) => {
    trackRefs.forEach((track) => track.current.seekTo(progress));
    setPosition(Math.round(trackRefs[0].current.getCurrentTime()));
  }, [trackRefs]);

  useEffect(() => {
    if (status.playing) {
      let interval = setInterval(() => {
        setPosition(Math.round(trackRefs[0].current.getCurrentTime()));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [status.playing, trackRefs]);

  const value = useMemo(() => ({
    state: {
      status,
      song,
      length,
      position,
      soloMode,
      url,
    },
    actions: {
      linkTracks,
      bindTrackRef,
      adjustLength,
      playPause,
      seek,
      setSoloMode,
    }
  }), [
    status, song, length, position, soloMode, url,
    linkTracks, bindTrackRef, adjustLength, playPause, seek,
  ]);

  return (
    <SongContext.Provider value={value}>
      { status.notfound ?
        <NotFound />
        :
        children
      }
    </SongContext.Provider>
  );
};

export default SongContext;
