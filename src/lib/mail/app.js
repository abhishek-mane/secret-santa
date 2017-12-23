global.webconfig = require('../../web.config')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const
    WEBSITE = global.webconfig.WEBSITE,
    { sendMail } = require('../mail'),
    mailOptions = {
        from: global.webconfig.smtp.from,
        to: '',
        subject: 'Merry Christmas | Secret Santa',
        html: `
            <br/>
            <img src='cid:hey@unique.value'/><br/>
            <img src='cid:participate@unique.value'/>
        `,
        attachments: [
            {
                filename: 'hey.jpg',
                path: '../../public/img/hey.jpg',
                cid: 'hey@unique.value'
            },
            {
                filename: 'participate.jpg',
                path: '../../public/img/participate.jpg',
                cid: 'participate@unique.value'
            },
        ]
    },
    RECIPIENTS = require('./recipients');

RECIPIENTS.forEach((recepient) => {
    const
        encrypt = Buffer.from(recepient.name).toString('base64'),
        options = Object.assign({}, mailOptions);

    options.to = recepient.mail;
    options.html = `
        <br/>
        <img src='cid:hey@unique.value'/><br/>
        <a href="${WEBSITE}/${encrypt}" target="_blank"><img src='cid:participate@unique.value'/></a>
    `;

    sendMail(options, (err, info) => {
        if (err) {
            throw err;
        }
        console.log(`Mail has been sent to ${recepient.mail}`);
    });
});