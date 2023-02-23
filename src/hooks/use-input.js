import { useReducer } from "react";

const defaultState = { value: "", inputIsTouched: false };

const inputReducer = (state, action) => {
  if (action.type === "INPUT_CHANGE") {
    return {
      value: action.value,
      inputIsTouched: true,
    };
  }
  if (action.type === "BLUR") {
    return { inputIsTouched: true, value: state.value };
  }
  if (action.type === "RESET") {
    return { inputIsTouched: false, value: "" };
  }
  return { inputReducer };
};

const useInput = (validateInput) => {
  const [inputState, dispatch] = useReducer(inputReducer, defaultState);

  const enteredInputIsValid = validateInput(inputState.value);
  const hasError = !enteredInputIsValid && inputState.inputIsTouched;

  const enteredInputChangeHandler = (event) => {
    dispatch({ type: "INPUT_CHANGE", value: event.target.value });
  };

  const enteredInputBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
  };
  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    hasError,
    enteredInputIsValid,
    enteredInputChangeHandler,
    enteredInputBlurHandler,
    reset,
  };
};

export default useInput;
