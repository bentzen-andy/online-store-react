import React from 'react';
import css from './InputMonth.module.css';

const InputMonth = ({
  creditCardExpireMonthChangeHandler,
  creditCardExpireMonthBlurHandler,
  creditCardExpireMonth,
  getValidationText,
  creditCardExpireMonthIsTouched,
  creditCardExpireMonthIsValid,
}) => {
  return (
    <div className={css['form-control']}>
      Expiration Month:
      <select
        name="month"
        id="month"
        onChange={creditCardExpireMonthChangeHandler}
        onBlur={creditCardExpireMonthBlurHandler}
        value={creditCardExpireMonth}
        aria-describedby="monthHelp"
      >
        <option value=""></option>
        <option value="01">Jan</option>
        <option value="02">Feb</option>
        <option value="03">Mar</option>
        <option value="04">Apr</option>
        <option value="05">May</option>
        <option value="06">Jue</option>
        <option value="07">Jul</option>
        <option value="08">Aug</option>
        <option value="09">Sep</option>
        <option value="10">Oct</option>
        <option value="11">Nov</option>
        <option value="12">Dec</option>
      </select>
      {getValidationText(
        creditCardExpireMonthIsTouched,
        creditCardExpireMonthIsValid
      )}
    </div>
  );
};

export default InputMonth;
