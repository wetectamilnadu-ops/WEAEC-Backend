require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

console.log('Testing email configuration...');
console.log('User:', process.env.EMAIL_USER);

transporter.verify(function (error, success) {
    if (error) {
        console.error('Connection error:', error);
    } else {
        console.log('Server is ready to take our messages');
    }
});
