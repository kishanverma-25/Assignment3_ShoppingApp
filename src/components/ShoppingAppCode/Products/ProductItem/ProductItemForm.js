import React, { useRef, useState } from "react";
import AppInput from "../../UI/AppInput";

import classes from "./ProductItemForm.module.css";

const ProductItemForm = (props) => {
  const amountInputRef = useRef();
  const [size, setSize] = useState("");
  const [sizeIsValid, setSizeIsVaild] = useState(true);
  const [amountIsValid, setAmountIsValid] = useState(true);

  const selectChangeHandler = (event) => {
    setSize(event.target.value);
    setSizeIsVaild(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (!size) {
      setSizeIsVaild(false);
      return;
    }

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      return setAmountIsValid(false);
    }

    const formData = { amount: enteredAmountNumber, size };
    props.onAddToCart(formData);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div>
        <label>
          <b>Size: </b>
        </label>
        <select onChange={selectChangeHandler} className={classes.select}>
          <option>--select size--</option>
          {props.availableSizes.map((size) => (
            <option value={props.size}>{size}</option>
          ))}
          {/* <option>M</option>
          <option>L</option>
          <option>XL</option> */}
        </select>
      </div>
      <AppInput
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add </button>
      {!amountIsValid && <p>Please enter a valid amount(1-5)</p>}
      {!sizeIsValid && <p style={{ color: "red" }}>Please select the size</p>}
    </form>
  );
};

export default ProductItemForm;
