const Validator = require('validator');
const isEmpty = require('../isEmpty');

module.exports = (req, res, next) => {
	let { name, email, password } = req.body;
	let errors = {};

	name = !isEmpty(name) ? name : '';
	email = !isEmpty(email) ? email : '';
	password = !isEmpty(password) ? password : '';

	//* Name Validation
	if (Validator.isEmpty(name)) {
		errors.name = 'Name is required';
	} else if (!Validator.isLength(name, { min: 3, max: 50 })) {
		errors.name = 'Name must have between 3 and 50 characters';
	}

	//* Email Validation
	if (Validator.isEmpty(email)) {
		errors.email = 'Email is required';
	} else if (!Validator.isEmail(email)) {
		errors.email = 'Invaild Email format';
	}

	//* Password Validation
	if (Validator.isEmpty(password)) {
		errors.password = 'Password is required ';
	} else if (!Validator.isLength(password, { min: 6, max: 30 })) {
		errors.password = 'Passwords must be at least 6 characters long';
	}

	if (!isEmpty(errors)) {
		return res.status(400).json(errors);
	}
	
	req.errors = errors;
  
	next();
};
