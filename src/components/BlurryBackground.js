import React from "react";
import styled from "styled-components";

const BlurryBackground = ({ src }) => (
  <Wrapper>
    <Background src={src} />
  </Wrapper>
);

const Wrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const Background = styled.div`
  position: absolute;
  height: calc(100% + 48px);
  width: calc(100% + 32px);
  top: -24px;
  left: -16px;
  background-image: url('${p => p.src}');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  filter: blur(16px) saturate(50%);
  z-index: -1;
`;

export default BlurryBackground;
