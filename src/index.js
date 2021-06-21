import React from "react";
import ReactDOM from "react-dom";

import GlobalStyle from "./GlobalStyle";

import App from "./App";

import { UploadProvider } from "./contexts/UploadContext";

ReactDOM.render(
  <React.StrictMode>
    <UploadProvider>
      <GlobalStyle />
      <App />
    </UploadProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
