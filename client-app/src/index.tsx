import "semantic-ui-css/semantic.min.css";
import "react-calendar/dist/Calendar.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./app/layout/styles.css";
import App from "./app/layout/App";
import { store, StoreContext } from "./app/stores/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StoreContext.Provider value={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreContext.Provider>
);
