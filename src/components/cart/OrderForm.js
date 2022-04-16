import React from 'react';
import useInput from '../../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import css from './OrderForm.module.css';

const OrderForm = ({ cartContents, email, emptyShoppingCart }) => {
  const navigate = useNavigate();

  const handleSubmitOrder = () => {
    console.log('submitting order now... ');
    const products = cartContents;
    const customerInfo = {};
    customerInfo.email = email;
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
    console.log('cartContents');
    console.log(cartContents);
    console.log('customerInfo');
    console.log(customerInfo);

    fetch('https://atb-online-store-api.herokuapp.com/order', {
      // fetch('http://localhost:8080/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        withCredentials: true,
      },
      body: JSON.stringify({
        order: {
          products,
          customerInfo,
        },
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response');
        console.log(response);
        emptyShoppingCart();
        navigate('/order-confirmation');
      })
      .catch((err) => console.error(err));

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
  } = useInput((value) => value.length === 5);

  const {
    value: creditCard,
    isTouched: creditCardIsTouched,
    isValid: creditCardIsValid,
    valueChangeHandler: creditCardChangeHandler,
    valueBlurHandler: creditCardBlurHandler,
    reset: creditCardReset,
  } = useInput((value) => value.length === 16);

  const {
    value: creditCardExpireMonth,
    isTouched: creditCardExpireMonthIsTouched,
    isValid: creditCardExpireMonthIsValid,
    valueChangeHandler: creditCardExpireMonthChangeHandler,
    valueBlurHandler: creditCardExpireMonthBlurHandler,
    reset: creditCardExpireMonthReset,
  } = useInput((value) => value.length <= 2);

  const {
    value: creditCardExpireYear,
    isTouched: creditCardExpireYearIsTouched,
    isValid: creditCardExpireYearIsValid,
    valueChangeHandler: creditCardExpireYearChangeHandler,
    valueBlurHandler: creditCardExpireYearBlurHandler,
    reset: creditCardExpireYearReset,
  } = useInput((value) => value.length === 4);

  const {
    value: creditCardCVV,
    isTouched: creditCardCVVIsTouched,
    isValid: creditCardCVVIsValid,
    valueChangeHandler: creditCardCVVChangeHandler,
    valueBlurHandler: creditCardCVVBlurHandler,
    reset: creditCardCVVReset,
  } = useInput((value) => value.length === 3);

  return (
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
      </div>

      <div className={css['form-group']}>
        <label htmlFor="state">State</label>
        <input
          type="text"
          className={css['form-control']}
          name="state"
          id="state"
          onChange={stateChangeHandler}
          onBlur={stateBlurHandler}
          value={state}
          aria-describedby="stateHelp"
          placeholder="State"
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
      </div>

      <div className={css['form-group']}>
        <label htmlFor="credit-card-expiration-month">
          Credit Card Expiration Month
        </label>
        <input
          type="text"
          className={css['form-control']}
          name="credit-card-expiration-month"
          id="credit-card-expiration-month"
          onChange={creditCardExpireMonthChangeHandler}
          onBlur={creditCardExpireMonthBlurHandler}
          value={creditCardExpireMonth}
          aria-describedby="creditCardExpireMonthHelp"
          placeholder="Month"
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
      </div>

      <button onClick={handleSubmitOrder} className={css['btn']}>
        Submit Order
      </button>
    </form>
  );
};

export default OrderForm;
