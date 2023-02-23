import React, { useContext } from "react";

import AuthContext from "../../store/auth-context";
import HeaderCartButton from "../ShoppingAppCode/Layout/HeaderCartButton";
import classes from "./Navigation.module.css";

const Navigation = (props) => {
  const ctx = useContext(AuthContext);
  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && <HeaderCartButton onClick={props.onShowCart} />}
        {ctx.isLoggedIn && (
          <li>
            {props.picture && (
              <button onClick={ctx.onLogout}>
                <span>
                  <img src={props.picture} width="40" height="40" alt="" />
                </span>
                <b>Logout</b>
              </button>
            )}
            {!props.picture && <button onClick={ctx.onLogout}>Logout</button>}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
