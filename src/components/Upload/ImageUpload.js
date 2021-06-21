import React, { useCallback, useContext, useRef } from "react";
import styled from "styled-components";

import BlurryBackground from "../BlurryBackground";
import Artwork from "../Artwork";

import UploadContext from "../../contexts/UploadContext";

const ImageUpload = () => {
  const {
    state: { artwork, artwork: { status } },
    actions: { uploadArtwork, deleteArtwork },
  } = useContext(UploadContext);

  const fileInputRef = useRef(null);

  const handleFileChange = useCallback((e) => {
    if (e.target.files[0]) {
      deleteArtwork();
      uploadArtwork(e.target.files[0]);
    }
  }, [deleteArtwork, uploadArtwork]);

  const handleFileDelete = useCallback(() => {
    fileInputRef.current.value = "";
    deleteArtwork();
  }, [deleteArtwork]);

  return (
    <Wrapper className="row">
      <BlurryBackground src={artwork.url} />
      <Artwork
        loading={status.processing}
        src={artwork.url}
        onClose={status.ready && handleFileDelete} />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #DDD;
  margin-bottom: 1em;

  input[type="file"] {
    color: white;
    text-shadow: 0 0 2px rgba(0,0,0, 0.7);
  }
`;

export default ImageUpload;
