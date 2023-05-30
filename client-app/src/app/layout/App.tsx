import React from "react";
import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import { Outlet, useLocation } from "react-router-dom";

import NavBar from "./NavBar";
import HomePage from "../../features/home/HomePage";

function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container style={{ marginTop: "7em" }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default observer(App);
