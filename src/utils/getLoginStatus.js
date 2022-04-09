// import { getCookie } from './cookieHandlers';

// const getLoginStatus = () => {

//   const accessToken = getCookie('accessToken');
//   fetch('http://localhost:8080/login/check-username', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//     },
//     body: JSON.stringify({
//       accessToken,
//     }),
//   })
//     .then((response) => response.json())
//     .then((response) => {
//       console.log('response');
//       console.log(response);
//       if (response.status === 'LOGGED_IN') setUser(response.email);
//       else setUser('Not logged in');
//     })
//     .catch((err) => console.error(err));
// };

// export default getLoginStatus;
