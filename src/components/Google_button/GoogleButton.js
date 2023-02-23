import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import classes from "./GoogleButton.module.css";
//import jwt_decode from "jwt-decode";
import axios from "axios";
import googlelogo from "./googlelogo.jpg";

const GoogleButton = (props) => {
  const login = useGoogleLogin({
    onSuccess: async (respose) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${respose.access_token}`,
            },
          }
        );

        console.log(res.data);
        if (res.data.email_verified) {
          props.onAccess(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className={classes.actions}>
      <button className={classes.button} onClick={login}>
        <img
          src={googlelogo}
          alt="buttonpng"
          border="0"
          width="25"
          height="25"
        />
        <i className="fa-brands fa-google"></i>
        Continue with google
      </button>
    </div>
  );
};
export default GoogleButton;
