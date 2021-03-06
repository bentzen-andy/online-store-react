import React from 'react';
import useInput from '../../hooks/useInput';
import InputUsStates from './InputUsStates';
import InputMonth from './InputMonth';
import { useNavigate } from 'react-router-dom';
import css from './OrderForm.module.css';
import { validateCreditCard } from '../../utils/validations';
import useCookie from '../../hooks/useCookie';

/*
 * Andy Bentzen
 * 4/19/2022
 * The OrderForm is in charge of rendering the order form, conducting client-side
 * validations on the inputs, and sending the orders up the server to be processed.
 * This is a very long, but conceptually simple component.
 */

const OrderForm = ({ cartContents, email, emptyShoppingCart }) => {
  const navigate = useNavigate();
  const { getCookie } = useCookie();

  const handleSubmitOrder = () => {
    const accessToken = getCookie('accessToken');
    const products = cartContents;
    const customerInfo = {};

    customerInfo.email = email; // TODO change this so that it pulls 'email' from the server not from state variable. or maybe instead, I'll send the JWT to the server and let the sever decide whether the email matches.

    customerInfo.firstName = firstName;
    customerInfo.lastName = lastName;
    customerInfo.street = street;
    customerInfo.city = city;
    customerInfo.state = state;
    customerInfo.zip = zip;
    customerInfo.creditCard = creditCard;
    customerInfo.creditCardExpireMonth = creditCardExpireMonth;
    customerInfo.creditCardExpireYear = creditCardExpireYear;
    customerInfo.creditCardCVV = creditCardCVV;

    // fetch('http://localhost:8080/order', {
    fetch('https://atb-online-store-api.herokuapp.com/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        withCredentials: true,
      },
      body: JSON.stringify({
        accessToken,
        order: {
          products,
          customerInfo,
        },
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        navigate('/order-confirmation');
        emptyShoppingCart();
      });

    firstNameReset();
    lastNameReset();
    streetReset();
    cityReset();
    stateReset();
    zipReset();
    creditCardReset();
    creditCardExpireMonthReset();
    creditCardExpireYearReset();
    creditCardCVVReset();
  };

  const {
    value: firstName,
    isTouched: firstNameIsTouched,
    isValid: firstNameIsValid,
    valueChangeHandler: firstNameChangeHandler,
    valueBlurHandler: firstNameBlurHandler,
    reset: firstNameReset,
  } = useInput((value) => value.length > 0);

  const {
    value: lastName,
    isTouched: lastNameIsTouched,
    isValid: lastNameIsValid,
    valueChangeHandler: lastNameChangeHandler,
    valueBlurHandler: lastNameBlurHandler,
    reset: lastNameReset,
  } = useInput((value) => value.length > 0);

  const {
    value: street,
    isTouched: streetIsTouched,
    isValid: streetIsValid,
    valueChangeHandler: streetChangeHandler,
    valueBlurHandler: streetBlurHandler,
    reset: streetReset,
  } = useInput((value) => value.length > 0);

  const {
    value: city,
    isTouched: cityIsTouched,
    isValid: cityIsValid,
    valueChangeHandler: cityChangeHandler,
    valueBlurHandler: cityBlurHandler,
    reset: cityReset,
  } = useInput((value) => value.length > 0);

  const {
    value: state,
    isTouched: stateIsTouched,
    isValid: stateIsValid,
    valueChangeHandler: stateChangeHandler,
    valueBlurHandler: stateBlurHandler,
    reset: stateReset,
  } = useInput((value) => value.length === 2);

  const {
    value: zip,
    isTouched: zipIsTouched,
    isValid: zipIsValid,
    valueChangeHandler: zipChangeHandler,
    valueBlurHandler: zipBlurHandler,
    reset: zipReset,
  } = useInput((value) => value.length === 5 && !isNaN(value));

  const {
    value: creditCard,
    isTouched: creditCardIsTouched,
    isValid: creditCardIsValid,
    valueChangeHandler: creditCardChangeHandler,
    valueBlurHandler: creditCardBlurHandler,
    reset: creditCardReset,
  } = useInput((value) => validateCreditCard(value));

  const {
    value: creditCardExpireMonth,
    isTouched: creditCardExpireMonthIsTouched,
    isValid: creditCardExpireMonthIsValid,
    valueChangeHandler: creditCardExpireMonthChangeHandler,
    valueBlurHandler: creditCardExpireMonthBlurHandler,
    reset: creditCardExpireMonthReset,
  } = useInput(
    (value) => value.length > 0 && value.length <= 2 && !isNaN(value)
  );

  const {
    value: creditCardExpireYear,
    isTouched: creditCardExpireYearIsTouched,
    isValid: creditCardExpireYearIsValid,
    valueChangeHandler: creditCardExpireYearChangeHandler,
    valueBlurHandler: creditCardExpireYearBlurHandler,
    reset: creditCardExpireYearReset,
  } = useInput((value) => value.length === 4 && !isNaN(value));

  const {
    value: creditCardCVV,
    isTouched: creditCardCVVIsTouched,
    isValid: creditCardCVVIsValid,
    valueChangeHandler: creditCardCVVChangeHandler,
    valueBlurHandler: creditCardCVVBlurHandler,
    reset: creditCardCVVReset,
  } = useInput((value) => value.length === 3 && !isNaN(value));

  const getValidationText = (inputIsTouched, inputIsValid) => {
    return (
      inputIsTouched &&
      !inputIsValid && (
        <span className={css['validation-text']}>*Invalid entry.</span>
      )
    );
  };

  const allInputsValid =
    firstNameIsValid &&
    lastNameIsValid &&
    streetIsValid &&
    cityIsValid &&
    stateIsValid &&
    zipIsValid &&
    creditCardIsValid &&
    creditCardExpireMonthIsValid &&
    creditCardExpireYearIsValid &&
    creditCardCVVIsValid;

  return (
    <div className={css['order-form']}>
      <form>
        <div className={css['form-group']}>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            className={css['form-control']}
            name="first-name"
            id="first-name"
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
            value={firstName}
            aria-describedby="firstNameHelp"
            placeholder="First Name"
          />
          {getValidationText(firstNameIsTouched, firstNameIsValid)}
        </div>

        <div className={css['form-group']}>
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            className={css['form-control']}
            name="last-name"
            id="last-name"
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            value={lastName}
            aria-describedby="lastNameHelp"
            placeholder="Last Name"
          />
          {getValidationText(lastNameIsTouched, lastNameIsValid)}
        </div>

        <div className={css['form-group']}>
          <label htmlFor="street">Street</label>
          <input
            type="text"
            className={css['form-control']}
            name="street"
            id="street"
            onChange={streetChangeHandler}
            onBlur={streetBlurHandler}
            value={street}
            aria-describedby="streetHelp"
            placeholder="Street"
          />
          {getValidationText(streetIsTouched, streetIsValid)}
        </div>

        <div className={css['form-group']}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            className={css['form-control']}
            name="city"
            id="city"
            onChange={cityChangeHandler}
            onBlur={cityBlurHandler}
            value={city}
            aria-describedby="cityHelp"
            placeholder="City"
          />
          {getValidationText(cityIsTouched, cityIsValid)}
        </div>

        <div className={css['form-group']}>
          <label htmlFor="state">State</label>
          <InputUsStates
            className={css['form-group']}
            stateChangeHandler={stateChangeHandler}
            stateBlurHandler={stateBlurHandler}
            state={state}
            getValidationText={getValidationText}
            stateIsValid={stateIsValid}
            stateIsTouched={stateIsTouched}
          />
        </div>

        <div className={css['form-group']}>
          <label htmlFor="zip-code">Zip Code</label>
          <input
            type="text"
            className={css['form-control']}
            name="zip-code"
            id="zip-code"
            onChange={zipChangeHandler}
            onBlur={zipBlurHandler}
            value={zip}
            aria-describedby="zipHelp"
            placeholder="Zip Code"
          />
          {getValidationText(zipIsTouched, zipIsValid)}
        </div>

        <div className={css['form-group']}>
          <label htmlFor="credit-card-number">Credit Card Number</label>
          <input
            type="text"
            className={css['form-control']}
            name="credit-card-number"
            id="credit-card-number"
            onChange={creditCardChangeHandler}
            onBlur={creditCardBlurHandler}
            value={creditCard}
            aria-describedby="creditCardHelp"
            placeholder="Credit Card Number"
          />
          {getValidationText(creditCardIsTouched, creditCardIsValid)}
        </div>

        <div className={css['form-group']}>
          <label htmlFor="credit-card-expiration-month">Expiration Month</label>
          <InputMonth
            className={css['form-group']}
            creditCardExpireMonthChangeHandler={
              creditCardExpireMonthChangeHandler
            }
            creditCardExpireMonthBlurHandler={creditCardExpireMonthBlurHandler}
            creditCardExpireMonth={creditCardExpireMonth}
            getValidationText={getValidationText}
            creditCardExpireMonthIsValid={creditCardExpireMonthIsValid}
            creditCardExpireMonthIsTouched={creditCardExpireMonthIsTouched}
          />
        </div>

        <div className={css['form-group']}>
          <label htmlFor="credit-card-expiration-year">
            Credit Card Expiration Year
          </label>
          <input
            type="text"
            className={css['form-control']}
            name="credit-card-expiration-year"
            id="credit-card-expiration-year"
            onChange={creditCardExpireYearChangeHandler}
            onBlur={creditCardExpireYearBlurHandler}
            value={creditCardExpireYear}
            aria-describedby="creditCardExpireYearHelp"
            placeholder="Year"
          />
          {getValidationText(
            creditCardExpireYearIsTouched,
            creditCardExpireYearIsValid
          )}
        </div>

        <div className={css['form-group']}>
          <label htmlFor="credit-card-cvv">Credit Card CVV Code</label>
          <input
            type="text"
            className={css['form-control']}
            name="credit-card-cvv"
            id="credit-card-cvv"
            onChange={creditCardCVVChangeHandler}
            onBlur={creditCardCVVBlurHandler}
            value={creditCardCVV}
            aria-describedby="creditCardCVVHelp"
            placeholder="CVV"
          />
          {getValidationText(creditCardCVVIsTouched, creditCardCVVIsValid)}
        </div>
      </form>

      {allInputsValid && (
        <button onClick={handleSubmitOrder} className="btn">
          Submit Order
        </button>
      )}
      {!allInputsValid && (
        <button onClick={handleSubmitOrder} className="btn-disabled" disabled>
          Submit Order
        </button>
      )}
    </div>
  );
};

export default OrderForm;
