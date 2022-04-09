import React, { useState, useEffect } from 'react';
import css from './Registration.module.css';
import { setCookie, deleteCookie } from '../../utils/cookieHandlers';
import { useNavigate } from 'react-router-dom';

const Registration = ({ registrationType, onLoginChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();

  const loginChangeHandler = (status) => {
    onLoginChange(status);
  };

  useEffect(() => {
    if (registrationType === 'LOG_OUT') {
      console.log('logging out now.... ');
      deleteCookie('accessToken');
      loginChangeHandler('NOT_LOGGED_IN');
      navigate('/');
    }
  }, [registrationType]);

  const handleSuccessfulAuth = (token) => {
    console.log('you are logged in!');
    // create a cookie to store the user's encrypted login credentials
    setCookie('accessToken', token, 1);
    loginChangeHandler('LOGGED_IN');
    navigate('/');
  };

  const handleUnsuccessfulAuth = (response) => {
    console.log('something went wrong...');
    navigate('/');
  };

  const handleEmailChange = (event) => {
    // console.log(event.target.value);
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    // console.log(event.target.value);
    setPassword(event.target.value);
  };

  const handlePasswordConfirmationChange = (event) => {
    // console.log(event.target.value);
    setPasswordConfirmation(event.target.value);
  };

  const handleSubmitSignUp = (event) => {
    event.preventDefault();
    console.log('handleSubmitSignUp');
    fetch('http://localhost:8080/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
          passwordConfirmation: passwordConfirmation,
        },
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response');
        console.log(response);
        if (response.status === 'created') handleSuccessfulAuth(response.token);
        else handleUnsuccessfulAuth(response);
      })
      .catch((err) => console.error(err));
    setEmail('');
    setPassword('');
    setPasswordConfirmation('');
  };

  const handleSubmitLogIn = (event) => {
    event.preventDefault();
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        withCredentials: true,
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response');
        console.log(response);
        if (response.status === 'LOGGED_IN')
          handleSuccessfulAuth(response.token);
        else handleUnsuccessfulAuth(response);
      })
      .catch((err) => console.error(err));
    setEmail('');
    setPassword('');
  };

  return (
    <main className={css['registration']}>
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
            <label htmlFor="password-confirmation">Password Confirmation</label>
            <input
              type="password"
              className={css['form-control']}
              name="password-confirmation"
              id="password-confirmation"
              onChange={handlePasswordConfirmationChange}
              value={passwordConfirmation}
              aria-describedby="passwordConfirmationHelp"
              placeholder="Password Confirmation"
              required
            />
          </div>
        )}
        {registrationType === 'SIGN_UP' && (
          <button onClick={handleSubmitSignUp} className={css['btn']}>
            Sign Up
          </button>
        )}
        {registrationType === 'LOG_IN' && (
          <button onClick={handleSubmitLogIn} className={css['btn']}>
            Log In
          </button>
        )}
      </form>
    </main>
  );
};

export default Registration;
