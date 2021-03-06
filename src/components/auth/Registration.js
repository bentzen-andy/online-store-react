import React, { useState, useEffect } from 'react';
import useCredentials from '../../hooks/useCredentials';
import css from './Registration.module.css';

/*
 * Andy Bentzen
 * 4/19/2022
 * The Registration component renders the login/sign up forms and handles communications
 * with the server to authenticate the user. This component uses the same form for the
 * login and the signup pages, (the only difference is that it conditionally renders the
 * password confirmation input at the bottom). The business logic that specifically handles
 * authentication is located in the "/src/hooks" directory.
 *
 */

const Registration = ({ registrationType, emptyShoppingCart }) => {
  const { validationText, logOff, logIn, registerUser, resetValidationText } =
    useCredentials();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enteredConfirmation, setPasswordConfirmation] = useState('');

  useEffect(() => {
    resetValidationText();
    if (registrationType === 'LOG_OUT') {
      emptyShoppingCart();
      logOff();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registrationType]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmationChange = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  const handleSubmitSignUp = (event) => {
    event.preventDefault();
    registerUser(email, password, enteredConfirmation);
    setEmail('');
    setPassword('');
    setPasswordConfirmation('');
  };

  const handleSubmitLogIn = (event) => {
    event.preventDefault();
    logIn(email, password);
    setEmail('');
    setPassword('');
  };

  return (
    <main className={css['registration']}>
      <div className="container">
        {registrationType === 'SIGN_UP' && <h1>Sign Up:</h1>}
        {registrationType === 'LOG_IN' && <h1>Log In:</h1>}
        <form>
          <div className={css['form-group']}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={css['form-control']}
              name="email"
              id="email"
              onChange={handleEmailChange}
              value={email}
              aria-describedby="emailHelp"
              placeholder="Email"
              required
            />
          </div>
          <div className={css['form-group']}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={css['form-control']}
              name="password"
              id="password"
              onChange={handlePasswordChange}
              value={password}
              aria-describedby="passwordHelp"
              placeholder="Password"
              required
            />
          </div>
          {registrationType === 'SIGN_UP' && (
            <div className={css['form-group']}>
              <label htmlFor="password-confirmation">
                Password Confirmation
              </label>
              <input
                type="password"
                className={css['form-control']}
                name="password-confirmation"
                id="password-confirmation"
                onChange={handlePasswordConfirmationChange}
                value={enteredConfirmation}
                aria-describedby="passwordConfirmationHelp"
                placeholder="Password Confirmation"
                required
              />
            </div>
          )}
          {validationText && (
            <div className={css['validation-text']}>{validationText}</div>
          )}
          {registrationType === 'SIGN_UP' && (
            <button onClick={handleSubmitSignUp} className="btn">
              Sign Up
            </button>
          )}
          {registrationType === 'LOG_IN' && (
            <button onClick={handleSubmitLogIn} className="btn">
              Log In
            </button>
          )}
        </form>
      </div>
    </main>
  );
};

export default Registration;
