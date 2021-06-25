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

import { UploadProvider } from "./contexts/UploadContext";
import { ArtistProvider } from "./contexts/ArtistContext";

const App = () => {
  return (
    <Router>
      <Header />
      <Main className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/upload">
            <UploadProvider>
              <Upload />
            </UploadProvider>
          </Route>

          <Route path="/:artist"
            render={({ match: { path } }) => (
              <ArtistProvider>
                <Switch>
                  <Route exact path={path} component={Artist} />
                  <Route exact path={path+"/:song"} component={Song} />
                </Switch>
              </ArtistProvider>
            )}
          />
        </Switch>
      </Main>
    </Router>
  );
};

const Main = styled.main`
  min-height: calc(100vh - var(--header-height));
  box-shadow: 0 0 50px var(--taupe);
`;

export default App;
