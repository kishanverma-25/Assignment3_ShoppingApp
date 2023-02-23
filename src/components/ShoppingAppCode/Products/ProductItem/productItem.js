import React, { useContext } from "react";

import classes from "./ProductItem.module.css";
import Card from "../../../UI/Card/Card";
import ProductItemForm from "./ProductItemForm";
import CartContext from "../../../../store/cart-context";

const ProductItem = (props) => {
  const cartctx = useContext(CartContext);
  const addToCartHandler = (formData) => {
    cartctx.addItem({
      id: props.id,
      name: props.name,
      amount: formData.amount,
      price: props.price,
      size: formData.size,
    });
  };

  return (
    <Card>
      <li className={classes.product}>
        <div>
          <h3>{props.name}</h3>
          <div>Style:{props.style}</div>
          <div className={classes.description}>{props.description}</div>
          <div className={classes.price}>
            {props.currency}
            {props.price}
          </div>

          <div>
            {props.isFreeShipping ? "Free Delivery" : " Delivery Charge : $1"}
          </div>
        </div>

        <div>
          <ProductItemForm
            id={props.id}
            onAddToCart={addToCartHandler}
            availableSizes={props.availableSizes}
          />
        </div>
      </li>
    </Card>
  );
};

export default ProductItem;
