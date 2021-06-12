import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import styled from "styled-components";

import Header from "./Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import Artist from "./pages/Artist";
import Song from "./pages/Song";

const App = () => {
  return (
    <Router>
      <Header />
      <Main className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/upload" component={Upload} />

          <Route exact path="/:artist" component={Artist} />
          <Route exact path="/:artist/:song" component={Song} />
        </Switch>
      </Main>
    </Router>
  );
};

const Main = styled.main`
  height: calc(100vh - var(--header-height));
  box-shadow: 0 0 50px var(--taupe);
`;

export default App;
