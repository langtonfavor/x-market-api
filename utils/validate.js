module.exports.validateRegisterInput = (
  firstName,
  lastName,
  email,
  password,
  contact
) => {
  const errors = {};
  if (firstName.trim() === '') {
    errors.firstName = 'firstName must not be empty';
  }
  if (lastName.trim() === '') {
    errors.lastName = 'lastName must not be empty';
  }
  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  }
  if (contact.trim() === '') {
    errors.contact = 'contact must not be empty';
  } 
  if (password.trim() === '') {
     errors.password = 'password cant be empty';
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