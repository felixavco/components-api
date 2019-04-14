const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_OR_KEY } = require('../config/keys');

//* Models
const User = require('../models/User');

/**
 * @route /api/user/register
 * @method POST
 * @access Public
 * @description Register new users
 */
exports.RegisterController = async (req, res) => {
	const { errors } = req;
	try {
		const { name, email, password } = req.body;
		//Check if the email address already exist
		const user = await User.findOne({ email });

		if (user) {
			errors.email = 'Email is already in use';
			throw errors;
		}

		//* Creates new User instance
		const newUser = new User({ name, email, password });

		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, async (err, hash) => {
				try {
					if (err) throw err;
					//* Set hashed pwd to new user
					newUser.password = hash;
					//* Save new user in the DB
					const registeredUser = await newUser.save();
					const { name, email } = registeredUser;
					const responseData = { name, email };
					//* send the registered user name and email
					res.status(200).json(responseData);
				} catch (err) {
					res.status(500).json({ error: err.toString() });
				}
			});
		});
	} catch (error) {
		res.status(500).json(error);
	}
};

/**
 * @route /api/user/check-email
 * @method POST
 * @access Public
 * @description Checks if email address is already in use
 */
exports.CheckEmailController = async (req, res) => {
  const { errors } = req;

  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
			errors.email = 'Email is already in use, choose a different one!';
			throw errors;
    }
    
    res.status(200).json({message: "Email is correct and available"});

  } catch (error) {
    res.status(401).json(error);
  }
}
