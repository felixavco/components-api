const sendMail = require('../mailer/sendMail');

/**
 * @route /api/admin/send-mail
 * @method POST
 * @access Public
 * @description Receives message from a contact form and sends an email 
 */
exports.SendMailController = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const msg = { name, email, subject, message };

    const info = await sendMail(msg);

    const data = {
      response: info.response,
      messageId: info.messageId,
      rejected: info.rejected.length > 0 ? true : false,
      accepted: info.accepted.length > 0 ? true : false,
      messageSize: info.messageSize,
      messageTime: info.messageTime,
      envelopeTime: info.envelopeTime,
      envelope: {
        from: email,
        to: "hey@felixavelar.com"
      }
    }

    res.status(200).json(data);

  } catch (error) {
    
  }
};