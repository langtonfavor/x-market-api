module.exports.validRegistrationInput = (
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
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }
  if (password === '') {
    errors.password = 'Password must not empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};
