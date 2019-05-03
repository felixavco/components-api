const express = require('express');
const router = express.Router();


//* Validation
const messageVal = require('../validation/email/messageVal');

//* Controllers 
const { SendMailController } = require('../controllers/adminController');

/**
 * @route /api/admin/send-mail
 * @method POST
 * @access Public
 * @description Receives message from a contact form and sends an email 
 */
router.post('/send-mail', messageVal, SendMailController)

