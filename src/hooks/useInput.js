import { useState } from 'react';

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
