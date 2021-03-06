const validateEmail = require('validate-email-node-js');

module.exports.validateRegisterInput = (
  firstName,
  lastName,
  email,
  password,
  contact
) => {
  const errors = {};
  if (firstName.trim() === '') {
    errors.firstName = 'firstName not be empty';
  }
  if (lastName.trim() === '') {
    errors.lastName = 'last name not be empty';
  }
  if (contact.trim() === '') {
    errors.contact = 'contact not be empty';
  }
  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  }
  
  if (password === '') {
    errors.password = 'Password must not empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateLoginInput = (email, password) => {
  const errors = {};
  if (email.trim() === '') {
    errors.email = 'email must not be empty';
  }
  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};
