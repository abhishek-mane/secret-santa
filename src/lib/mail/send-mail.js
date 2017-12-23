const { transporter } = require('./nodemailer');

module.exports = (mailOptions, callback) => {

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, info);
    });
}