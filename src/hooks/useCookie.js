/*
 * Andy Bentzen
 * 4/19/2022
 * Hooks contain all of the complex business logic for the application. These hooks
 * expose state variable and functions that act on those variables (similar to OOP style).
 *
 * This hook heavily borrowed from W3 Schools https://www.w3schools.com/js/js_cookies.asp.
 * The idea here is that all the logic for getting and setting cookie values is centralized here.
 * Cookies are used in this application to track JWT tokens for user authentication.
 */

const useCookie = () => {
  const getCookie = (cname) => {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  };

  const setCookie = (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  };

  const deleteCookie = (cname) => {
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  return {
    getCookie,
    setCookie,
    deleteCookie,
  };
};

export default useCookie;
