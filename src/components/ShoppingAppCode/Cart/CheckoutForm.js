import { useState } from "react";
import useInput from "../../../hooks/use-input";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() !== "";
const pinCheck = (value) => value.trim().length === 6;

const CheckoutForm = (props) => {
  const [formIsInvalid, setFormIsInvalid] = useState(false);
  const {
    value: nameInput,
    hasError: nameHasError,
    enteredInputChangeHandler: nameInputChangeHandler,
    enteredInputBlurHandler: nameInputBlurHandler,
    reset: nameReset,
  } = useInput(isEmpty);

  const {
    value: streetInput,
    hasError: streetHasError,
    enteredInputChangeHandler: streetInputChangeHandler,
    enteredInputBlurHandler: streetInputBlurHandler,
    reset: streetReset,
  } = useInput(isEmpty);

  const {
    value: cityInput,
    hasError: cityHasError,
    enteredInputChangeHandler: cityInputChangeHandler,
    enteredInputBlurHandler: cityInputBlurHandler,
    reset: cityReset,
  } = useInput(isEmpty);

  const {
    value: PINCodeInput,
    hasError: PINCodeHasError,
    enteredInputChangeHandler: PINCodeInputChangeHandler,
    enteredInputBlurHandler: PINCodeInputBlurHandler,
    reset: PINCodeReset,
  } = useInput(pinCheck);

  const confirmHandler = (event) => {
    event.preventDefault();
    if (
      nameInput.trim().length === 0 ||
      streetInput.trim().length === 0 ||
      cityInput.trim().length === 0 ||
      PINCodeInput.trim().length !== 6
    ) {
      return setFormIsInvalid(true);
    }
    props.onConfirm({
      name: nameInput,
      street: streetInput,
      city: cityInput,
      PINCode: PINCodeInput,
    });
    nameReset();
    streetReset();
    cityReset();
    PINCodeReset();
  };

  const nameClass = `${classes.control} ${
    !nameHasError ? "" : classes.invalid
  }`;
  const streetClass = `${classes.control} ${
    !streetHasError ? "" : classes.invalid
  }`;
  const cityClass = `${classes.control} ${
    !cityHasError ? "" : classes.invalid
  }`;
  const PINCodeClass = `${classes.control} ${
    !PINCodeHasError ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClass}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={nameInput}
        />
      </div>
      <div className={streetClass}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetInputChangeHandler}
          onBlur={streetInputBlurHandler}
          value={streetInput}
        />
      </div>
      <div className={PINCodeClass}>
        <label htmlFor="pin">PIN Code</label>
        <input
          type="text"
          id="pin"
          onChange={PINCodeInputChangeHandler}
          onBlur={PINCodeInputBlurHandler}
          value={PINCodeInput}
        />
      </div>
      <div className={cityClass}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityInputChangeHandler}
          onBlur={cityInputBlurHandler}
          value={cityInput}
        />
        {formIsInvalid && (
          <p style={{ color: "red" }}>Fields must not be empty</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit" className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
