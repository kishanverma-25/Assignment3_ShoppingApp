import { useContext, useState } from "react";

import React from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../../store/cart-context";
import CheckoutForm from "./CheckoutForm";

import classes from "./Cart.module.css";

const Cart = (props) => {
  const [CheckoutState, setCheckoutState] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const orderHandler = () => {
    setCheckoutState(true);
  };

  const submitOrderHandler = (userData) => {
    console.log(userData);
    fetch("https://shoppingapp-61438-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      }),
    });
    cartCtx.clearCart();
    setIsOrderPlaced(true);
  };

  const cartCtx = useContext(CartContext);

  const totalAmount = `$ ${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (item) => {
    cartCtx.removeItem(item);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartIems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id + item.size}
          name={item.name}
          price={item.price}
          amount={item.amount}
          size={item.size}
          onRemove={cartItemRemoveHandler.bind(null, item)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalcontent = (
    <React.Fragment>
      {cartIems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClick}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={orderHandler}>
            Order
          </button>
        )}
      </div>
    </React.Fragment>
  );

  const address = (
    <React.Fragment>
      <CheckoutForm onCancel={props.onClick} onConfirm={submitOrderHandler} />
    </React.Fragment>
  );
  return (
    <Modal onClick={props.onClick}>
      {!CheckoutState && modalcontent}
      {CheckoutState && !isOrderPlaced && address}
      {isOrderPlaced && (
        <div>
          <p>
            Congratulations!!!! <br />
            Your order is successfully placed
          </p>
          <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onClick}>
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default Cart;
