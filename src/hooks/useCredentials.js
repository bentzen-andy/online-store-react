import { useState } from 'react';
import useCookie from './useCookie';
import { useNavigate } from 'react-router-dom';

// main function of functions (returns all functions in an object)
const useCredentials = () => {
  const navigate = useNavigate();
  const { getCookie, setCookie, deleteCookie } = useCookie();
  const [loginState, setLoginState] = useState('NOT_LOGGED_IN');
  const [email, setEmail] = useState(null);
  const [validationText, setValidationText] = useState(null);

  const handleSuccessfulAuth = (token) => {
    console.log('you are logged in!');
    // create a cookie to store the user's encrypted login credentials
    setCookie('accessToken', token, 1);
    setLoginState('LOGGED_IN');
    setValidationText(null);
    navigate('/');
  };
  const handleUnsuccessfulAuth = (response) => {
    console.log('something went wrong...');
    setValidationText(response.error);
  };

  const checkCredentials = async () => {
    const accessToken = getCookie('accessToken');
    // fetch('http://localhost:8080/login/check-username', {
    fetch('https://atb-online-store-api.herokuapp.com/login/check-username', {
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
        console.log('checkCredentials');
        console.log('response');
        console.log(response);
        if (response.status === 'LOGGED_IN') {
          setLoginState('LOGGED_IN');
          setEmail(response.email);
        } else {
          setLoginState('NOT_LOGGED_IN');
          setEmail('');
        }
      })
      .catch((err) => console.error(err));
  };

  const logOff = () => {
    deleteCookie('accessToken');
    setLoginState('NOT_LOGGED_IN');
    setEmail('');
    navigate('/');
  };

  const logIn = (email, password) => {
    // fetch('http://localhost:8080/login', {
    fetch('https://atb-online-store-api.herokuapp.com/login', {
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
  };

  const registerUser = (email, password, passwordConfirmation) => {
    // fetch('http://localhost:8080/registration', {
    fetch('https://atb-online-store-api.herokuapp.com/registration', {
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
