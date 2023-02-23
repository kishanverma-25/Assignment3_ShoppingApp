import React from "react";

import Navigation from "./Navigation";
import classes from "./MainHeader.module.css";

const MainHeader = (props) => {
  return (
    <header className={classes["main-header"]}>
      <h1>AmazeKart</h1>
      <Navigation
        onShowCart={props.onShowCart}
        isLoggedIn={props.isAuthenticated}
        onLogout={props.onLogout}
        picture={props.picture}
      />
    </header>
  );
};

export default MainHeader;
