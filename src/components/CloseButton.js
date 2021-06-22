import styled from "styled-components";
import { FaTimesCircle } from "react-icons/fa";

const Close = styled(FaTimesCircle)`
  background-color: white;
  border: 1px solid white;
  border-radius: 50%;
  position: absolute;
  top: -6px;
  right: -6px;
  font-size: 1.8em;
  transition: all .5s;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 2px 4px rgba(0,0,0, 0.5);
    transform: scale(1.1);
  }
`;

export default Close;
