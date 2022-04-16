exports.validateCreditCard = (creditCardNumber) => {
  let visaPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  let mastPattern = /^(?:5[1-5][0-9]{14})$/;
  let amexPattern = /^(?:3[47][0-9]{13})$/;
  let discPattern = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
  let isValid = false;

  if (visaPattern.test(creditCardNumber)) {
    isValid = true;
  } else if (mastPattern.test(creditCardNumber)) {
    isValid = true;
  } else if (amexPattern.test(creditCardNumber)) {
    isValid = true;
  } else if (discPattern.test(creditCardNumber)) {
    isValid = true;
  }

  return isValid;
};
