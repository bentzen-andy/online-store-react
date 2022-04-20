import { useState } from 'react';
import useCookie from './useCookie';
import { useNavigate } from 'react-router-dom';

/*
 * Andy Bentzen
 * 4/19/2022
 * Hooks contain all of the complex business logic for the application. These hooks
 * expose state variable and functions that act on those variables (similar to OOP style).
 *
 * This hook is the business logic for the Registration component. This is basically a
 * list of functions that handle communications with the server for auth purposes. These
 * functions also handle responses back to the client and tell it what to do next. For
 * instance, if a user tries to register with an email that is already taken, the
 * server will complain and send an error message. This hook will store that validation
 * message and hand it over the the Registration component to be rendered to the user.
 * This hook might also redirect the URL if necessary.
 */

const useCredentials = () => {
  const navigate = useNavigate();
  const { getCookie, setCookie, deleteCookie } = useCookie();
  const [loginState, setLoginState] = useState('NOT_LOGGED_IN');
  const [email, setEmail] = useState(null);
  const [validationText, setValidationText] = useState(null);

  const handleSuccessfulAuth = (token) => {
    // create a cookie to store the user's encrypted login credentials
    setCookie('accessToken', token, 1);
    setLoginState('LOGGED_IN');
    setValidationText(null);
    navigate('/');
  };
  const handleUnsuccessfulAuth = (response) => {
    setValidationText(response.error);
  };

  const checkCredentials = async () => {
    const accessToken = getCookie('accessToken');
    fetch('http://localhost:8080/login/check-username', {
      // fetch('https://atb-online-store-api.herokuapp.com/login/check-username', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        accessToken,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === 'LOGGED_IN') {
          setLoginState('LOGGED_IN');
          setEmail(response.email);
        } else {
          setLoginState('NOT_LOGGED_IN');
          setEmail('');
        }
      });
  };

  const logOff = () => {
    deleteCookie('accessToken');
    setLoginState('NOT_LOGGED_IN');
    setEmail('');
    navigate('/');
  };

  const logIn = (email, password) => {
    fetch('http://localhost:8080/login', {
      // fetch('https://atb-online-store-api.herokuapp.com/login', {
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
        if (response.status === 'LOGGED_IN')
          handleSuccessfulAuth(response.token);
        else handleUnsuccessfulAuth(response);
      });
  };

  const registerUser = (email, password, passwordConfirmation) => {
    fetch('http://localhost:8080/registration', {
      // fetch('https://atb-online-store-api.herokuapp.com/registration', {
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
        if (response.status === 'created') handleSuccessfulAuth(response.token);
        else handleUnsuccessfulAuth(response);
      });
  };

  const resetValidationText = () => setValidationText(null);

  return {
    loginState,
    email,
    validationText,
    checkCredentials,
    logOff,
    logIn,
    registerUser,
    resetValidationText,
  };
};

// export
export default useCredentials;
