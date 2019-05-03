const Validator = require('validator');
const isEmpty = require('../isEmpty');

module.exports = (req, res, next) => {
	let { email, name, subject, message } = req.body;
	let errors = {};

  email = !isEmpty(email) ? email : '';
  name = !isEmpty(name) ? name : '';
  subject = !isEmpty(subject) ? subject : '';
  message = !isEmpty(message) ? message : '';


	//* Email Validation
	if (Validator.isEmpty(email)) {
		errors.email = 'Email is required';
	} else if (!Validator.isEmail(email)) {
		errors.email = 'Invaild Email format';
  }
  
  //* Name Validation
	if (Validator.isEmpty(name)) {
		errors.name = 'Name is required';
	} else if (!Validator.isLength(name, { min: 3, max: 50 })) {
		errors.name = 'Name must have between 3 and 50 characters';
  }
  
   //* subject Validation
	if (Validator.isEmpty(subject)) {
		errors.subject = 'Subject is required';
	} else if (!Validator.isLength(subject, { min: 10, max: 60 })) {
		errors.subject = 'Name must have between 10 and 60 characters';
  }
  
     //* message Validation
	if (Validator.isEmpty(message)) {
		errors.message = 'Message is required';
	} else if (!Validator.isLength(message, { min: 25, max: 500 })) {
		errors.message = 'Message must have between 25 and 500 characters';
	}

	if (!isEmpty(errors)) {
		return res.status(400).json(errors);
	}
	
	req.errors = errors;
  
	next();
};
