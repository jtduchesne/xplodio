import React, { useCallback, useRef } from "react";
import styled from "styled-components";
import { Button, Icon } from "semantic-ui-react";

const UploadButton = ({ onChooseFiles }) => {
  const fileInputRef = useRef(null);

  const handleChooseFiles = useCallback((e) => {
    e.preventDefault();
    onChooseFiles(Array.from(e.target.files));
  }, [onChooseFiles]);

  return (
    <Wrapper>
      <Button compact icon
        color="orange" labelPosition="left"
        onClick={() => fileInputRef.current.click()}
      >
        <Icon name="plus" />
        Upload tracks
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        multiple
        hidden
        onChange={handleChooseFiles}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  grid-column: 1 / span 2;
  margin: auto;
`;

export default UploadButton;
