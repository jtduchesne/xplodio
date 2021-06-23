import React from "react";
import styled from "styled-components";

const BlurryBackground = ({ loading, src }) => (
  <Wrapper>
    <Background src={src} />
    <WhiteCurtain visible={loading} />
  </Wrapper>
);

const Wrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
  z-index: -1;
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
`;

const WhiteCurtain = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background: white;
  opacity: ${p => p.visible ? 1 : 0};
  transition: opacity .5s;
`;

export default BlurryBackground;
