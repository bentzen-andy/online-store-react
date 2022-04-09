import React, { useState, useEffect } from 'react';
import css from './Registration.module.css';

const Registration = ({ registrationType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  useEffect(() => {
    if (registrationType === 'LOG_OUT') {
      console.log('logging out now.... ');
      // TODO see if I can delete the session/cookie from the server
      // onLogOut();

      fetch('http://localhost:8080/log-out', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
    }
  }, [registrationType]);

  const handleSuccessfulAuth = (user) => {
    console.log('you are logged in!');
    // console.log(location);
    // if (onLogIn) onLogIn(user); // TODO see if I can set the cookie directly wiht the server
    // if (onSignUp) onSignUp(user);
  };

  const handleUnsuccessfulAuth = (response) => {
    console.log('something went wrong...');
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
    fetch('http://localhost:8080/registrations', {
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
        if (response.status === 'created') handleSuccessfulAuth(response.nonce);
        else handleUnsuccessfulAuth(response);
      })
      .catch((err) => console.error(err));
    setEmail('');
    setPassword('');
    setPasswordConfirmation('');
  };

  const handleSubmitLogIn = (event) => {
    event.preventDefault();
    fetch('http://localhost:8080/sessions', {
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
        console.log(response);
        if (response.logged_in === 'IS_LOGGED_IN')
          handleSuccessfulAuth(response.nonce);
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
