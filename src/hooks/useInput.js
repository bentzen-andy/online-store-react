import { useState } from 'react';

/*
 * Andy Bentzen
 * 4/19/2022
 * Hooks contain all of the complex business logic for the application. These hooks
 * expose state variable and functions that act on those variables (similar to OOP style).
 *
 * This hook handles simple client-side validation for text inputs.
 */

const useInput = (checkValidity) => {
  const [value, setValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const isValid = checkValidity(value);

  const valueChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const valueBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue('');
    setIsTouched(false);
  };

  return {
    value,
    isTouched,
    isValid,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};

export default useInput;
