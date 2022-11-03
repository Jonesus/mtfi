// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');

module.exports = function registerHook({ env }) {
  return {
    'items.create': async function (data) {
      if (data.collection === 'contact_requests') {
        const payload = data.payload[0];

        var transporter = nodemailer.createTransport({
          host: env.EMAIL_SMTP_HOST,
          port: env.EMAIL_SMTP_PORT,
          secure: env.EMAIL_SMTP_SECURE,
          auth: {
            user: env.EMAIL_SMTP_USER,
            pass: env.EMAIL_SMTP_PASSWORD,
          },
        });

        await transporter.sendMail({
          to: env.EMAIL_NOTIFICATION_RECIPIENT,
          subject: `New contact from ${payload.email}`,
          html: payload.text.replace(/(\r\n|\n|\r)/gm, '<br>'),
        });
        return data;
      }
    },
  };
};
