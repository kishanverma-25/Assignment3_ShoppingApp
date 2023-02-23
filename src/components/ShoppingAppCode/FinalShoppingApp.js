import React, { useState } from "react";
import Cart from "./Cart/Cart";

import AvailableProducts from "./Products/AvailableProducts";
import CartProvider from "../../store/CartProvider";
import MainHeader from "../MainHeader/MainHeader";

function FinalShoppingApp(props) {
  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  const name = `Welcome to AmazeKart ${props.name} !`;

  return (
    <CartProvider>
      {cartIsShown && <Cart onClick={hideCartHandler} />}
      <MainHeader onShowCart={showCartHandler} picture={props.picture} />
      <main>
        <AvailableProducts name={name} />
      </main>
    </CartProvider>
  );
}

export default FinalShoppingApp;
