const Mailer = require('../mailer/sendMail');

/**
 * @route /api/admin/send-mail
 * @method POST
 * @access Public
 * @description Receives message from a contact form and sends an email 
 */
exports.SendMailController = (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const data = { 
      from: `${name} <${email}>`,
      to: 'felixavco@gmail.com',
      subject: `[Contact Form - felixavelar.com] ${subject}`
    }

    const template = `
      <h3>${name} <${email}> </h3>
      <hr/>
      <p>${message}</p>
    `;

    Mailer(data, template);

    res.status(200).json({message: "Sent", body: req.body});

  } catch (error) {
    res.status(500).json({Error: error.toString()})
  }
};