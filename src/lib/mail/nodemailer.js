const
    nodemailer = require('nodemailer'),
    transporter = nodemailer.createTransport({
        host: global.webconfig.smtp.host,
        port: global.webconfig.smtp.port,
        // secure: true,
        auth: {
            user: global.webconfig.smtp.user,
            pass: global.webconfig.smtp.pass
        }
    });

module.exports = {
    transporter: transporter
}