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

	const template = `
		<h4>${data.name} "${data.email}" </h4>
		<p>${data.message}</p>
	`
	

	const email = {
		from: `${data.name} <${data.email}>`,
		to: 'hey@felixavelar.com',
		bcc: 'felixavco@gmail.com',
		replyTo: data.email,
		subject: `[Contact Form] ${data.subject}`,
		text: data.message,
		html: template
	};

	return transporter.sendMail(email);
};

module.exports = sendMail;
