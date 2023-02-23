import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";
import FinalShoppingApp from "./components/ShoppingAppCode/FinalShoppingApp";

function App() {
  const [user, setUser] = useState("");
  const [image, setImage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInfo = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedInInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const nameHandler = (data) => {
    setUser(data.given_name);
    setImage(data.picture);
  };
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler }}
    >
      <MainHeader picture={image} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} onName={nameHandler} />}
        {isLoggedIn && <FinalShoppingApp name={user} picture={image} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
