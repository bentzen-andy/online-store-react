import { useState } from 'react';
import useCookie from './useCookie';
import { useNavigate } from 'react-router-dom';

// main function of functions (returns all functions in an object)
const useCredentials = () => {
  const { getCookie, setCookie, deleteCookie } = useCookie();
  const [loginState, setLoginState] = useState('NOT_LOGGED_IN');
  const [email, setEmail] = useState(null);
  const [shoppingCart, setShoppingCart] = useState([]);

  const navigate = useNavigate();
  const handleSuccessfulAuth = (token) => {
    console.log('you are logged in!');
    // create a cookie to store the user's encrypted login credentials
    setCookie('accessToken', token, 1);
    setLoginState('LOGGED_IN');
    navigate('/');
  };
  const handleUnsuccessfulAuth = (response) => {
    console.log('something went wrong...');
  };

  const checkCredentials = async () => {
    const accessToken = getCookie('accessToken');
    fetch('http://localhost:8080/login/check-username', {
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
          // setShoppingCart(response.products);
        } else setLoginState('NOT_LOGGED_IN');
      })
      .catch((err) => console.error(err));
  };

  const logOff = () => {
    deleteCookie('accessToken');
    setLoginState('NOT_LOGGED_IN');
    setEmail(null);
    // setShoppingCart([]);
    navigate('/');
  };

  const logIn = (email, password) => {
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
  };

  const registerUser = (email, password, passwordConfirmation) => {
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
  };

  const addToCart = (productID) => {
    console.log('addToCart - productID');
    console.log(productID);
    const accessToken = getCookie('accessToken');
    fetch('http://localhost:8080/add-to-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ accessToken, productID }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  const getShoppingCart = () => {
    console.log('getShoppingCart');
    const accessToken = getCookie('accessToken');
    fetch('http://localhost:8080/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ accessToken }),
    })
      .then((res) => res.json())
      .then((res) => setShoppingCart(res.products));
  };

  return {
    loginState,
    email,
    shoppingCart,
    checkCredentials,
    logOff,
    logIn,
    registerUser,
    addToCart,
    getShoppingCart,
  };
};

// export
export default useCredentials;
