const nodemailer = require('nodemailer');
const { SMTP, SMTP_USER, SMTP_PWD, SMTP_PORT } = require('../config/keys');

const sendMail = (data) => {
	const transporter = nodemailer.createTransport({
		host: SMTP,
		port: SMTP_PORT,
		secure: SMTP_PORT === 465 ? true : false,
		auth: {
			user: SMTP_USER,
			pass: SMTP_PWD
		}
	});

	const email = {
		from: `${data.name} <${data.email}>`,
		to: 'felixavco@gmail.com, hey@felixavelar.com',
		subject: `[Contact Form] ${data.subject}`,
		text: data.message,
		html: `<p>${data.message}</p>`
	};

	return transporter.sendMail(email);
};

export default sendMail;
