const nodemailer = require('nodemailer')


const sendEmail = async (req, res) => {
let testAccount = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'trycia.schroeder@ethereal.email',
        pass: 'mtBECqma3pjkUDVwT6'
    }
});


let info = await transporter.sendMail({
    from: '"Kumudhini" <gupthakumudhini@gmail.com>',
    to: 'humancloud@example.com',
    subject: 'Hello',
    html:'<h2>Sending emails with Express</h2>'
});

    res.json(info);

};

module.exports = sendEmail;