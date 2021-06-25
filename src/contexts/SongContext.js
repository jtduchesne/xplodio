import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import NotFound from "../NotFound";

export const SongContext = React.createContext();

export const SongProvider = ({ children }) => {
  const { artist: artistSlug, song: slug } = useParams();

  const [status, setStatus] = useState({loading: true});
  const [song, setSong] = useState([]);

  const url    = useMemo(() => `/${artistSlug}/${slug}`,             [artistSlug, slug]);
  const apiUrl = useMemo(() => `/artist/${artistSlug}/song/${slug}`, [artistSlug, slug]);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then(({status, data}) => {
        setStatus((status) => ({...status, loaded: true}));
        if (status === 200)
          setSong(data);
        else
          setStatus((status) => ({...status, notfound: true}));
      })
      .catch(console.log)
      .finally(() => setStatus((status) => ({...status, loading: false})));
  }, [apiUrl]);

  const value = useMemo(() => ({
    state: {
      status,
      song,
      url,
    },
  }), [status, song, url]);

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
