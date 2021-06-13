import styled from "styled-components";

const Artwork = styled.div`
  width: 150px;
  height: 150px;
  background-image: url('${p => p.src}');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  margin: 1em;
`;

export default Artwork;
