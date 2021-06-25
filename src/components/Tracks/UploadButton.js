import React, { useRef } from "react";
import styled from "styled-components";
import { Button, Icon } from "semantic-ui-react";

const UploadButton = ({ onChooseFiles }) => {
  const fileInputRef = useRef(null);

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
        onChange={onChooseFiles}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  grid-column: 1 / span 2;
  margin: auto;
`;

export default UploadButton;
