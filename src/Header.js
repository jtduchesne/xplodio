import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  return (
    <Wrapper>
      <Container className="container">
        <img src="/favicon-32x32.png" alt="Speaker" />
        <span className="brand">Xplodio<sub>beta</sub></span>
        <Link exact to="/login" color="orange">Login</Link>
        <Link exact to="/upload" color="foam">Upload</Link>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  background-color: black;
  color: var(--white);
  position: relative;
`;

const Container = styled.div`
  height: var(--header-height);
  display: flex;
  align-items: center;

  .brand {
    font-size: 1.35em;
    font-weight: bold;
    margin-left: .25em;
    margin-right: auto;

    sub {
      font-size: .5em;
      margin-left: .3em;
    }
  }
`;

const Link = styled(NavLink)`
  color: var(--${p => p.color});
  text-decoration: none;
  border: 1px solid var(--${p => p.color});
  border-radius: 3px;
  padding: 4px .5em;
  margin-left: .25em;
  transition: all .3s;

  &.active, &:hover, &:focus {
    color: white;
    text-shadow: 0 0 5px rgba(0,0,0, 0.7);
    background-color: var(--${p => p.color});
  }
`;

export default Header;
