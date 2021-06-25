import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import NotFound from "../NotFound";

export const ArtistContext = React.createContext();

export const ArtistProvider = ({ children }) => {
  const { artist: slug } = useParams();

  const [status, setStatus] = useState({loading: true});
  const [songs, setSongs] = useState([]);

  const url    = useMemo(() => `/${slug}`,        [slug]);
  const apiUrl = useMemo(() => `/artist/${slug}`, [slug]);

  useEffect(() => {
    fetch(`${apiUrl}/songs`)
      .then((response) => response.json())
      .then(({status, data}) => {
        setStatus((status) => ({...status, loaded: true}));
        if (status === 200)
          setSongs(data);
        else
          setStatus((status) => ({...status, notfound: true}));
      })
      .catch(console.log)
      .finally(() => setStatus((status) => ({...status, loading: false})));
  }, [apiUrl]);

  const value = useMemo(() => ({
    state: {
      status,
      songs,
      url,
    },
  }), [status, songs, url]);

  return (
    <ArtistContext.Provider value={value}>
      { status.notfound ?
        <NotFound />
        :
        children
      }
    </ArtistContext.Provider>
  );
};

export default ArtistContext;
