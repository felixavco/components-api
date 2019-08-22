const MailGun = require('mailgun-js');
const { MG_API_KEY } = require('../config/keys');


const Mailer = ({ from, to, subject }, template) => {

	const mailgun = MailGun({ apiKey: MG_API_KEY, domain: 'mail.felixavelar.com' });
	const message = { from, to, subject, html: template }
	mailgun.messages().send(message);

}


module.exports = Mailer;