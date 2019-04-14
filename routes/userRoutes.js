const express = require('express');
const passport = require('passport')
const router = express.Router();

//* Load Passport jwt authentication
const protected = passport.authenticate('jwt', { session: false });

//* Validation
const registerVal = require('../validation/user/registerVal')
const checkEmailVal = require('../validation/user/checkEmailVal')

//* Controllers 
const { RegisterController, CheckEmailController } = require('../controllers/userControllers')

/**
 * @route /api/user/register
 * @method POST
 * @access Public
 * @description Register new users
 */
router.post('/register', registerVal, RegisterController)

/**
 * @route /api/user/check-email
 * @method POST
 * @access Public
 * @description Checks if email address is already in use
 */
router.post('/check-email', checkEmailVal, CheckEmailController)


module.exports = router;