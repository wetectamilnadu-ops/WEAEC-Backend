
// const Inquiry = require('../models/Inquiry');
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER || '', 
//     pass: process.env.EMAIL_PASS || '', 
//   },
// });

// // @desc    Submit an inquiry
// // @route   POST /api/inquiry
// // @access  Public
// const submitInquiry = async (req, res) => {
//     const { name, email, phone, service, plan, message } = req.body;

//     if (!name || !email || !phone || !service || !plan || !message) {
//         return res.status(400).json({ error: 'All fields are required' });
//     }

//     try {
//         const newInquiry = new Inquiry({
//             name,
//             email,
//             phone,
//             service,
//             plan,
//             message
//         });

//         await newInquiry.save();

//         if (process.env.EMAIL_USER) {
//             const mailOptions = {
//                 from: process.env.EMAIL_USER,
//                 to: 'wetectamilnadu@gmail.com',
//                 subject: `New Inquiry from ${name} for ${service} (${plan})`,
//                 text: `
//                     Name: ${name}
//                     Email: ${email}
//                     Phone: ${phone}
//                     Service: ${service}
//                     Plan: ${plan}
//                     Message: ${message}
//                 `,
//             };

//             try {
//                 await transporter.sendMail(mailOptions);
//                 return res.status(201).json({ message: 'Inquiry saved and email sent successfully!' });
//             } catch (emailError) {
//                 // Email failed, but we still return success because DB save was successful
//                 return res.status(201).json({ message: 'Inquiry saved successfully, but email notification failed' });
//             }
//         }

//         // Email user not set, so just return success after saving
//         return res.status(201).json({ message: 'Inquiry saved successfully' });
//     } catch (error) {
//         return res.status(500).json({ error: 'Failed to process inquiry' });
//     }
// };

// module.exports = {
//     submitInquiry
// };
const Inquiry = require('../models/Inquiry');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASS || '',
    },
});

// =========================
// @desc    Submit an inquiry
// @route   POST /api/inquiry
// =========================
const submitInquiry = async (req, res) => {
    const { name, email, phone, service, plan, message } = req.body;

    if (!name || !email || !phone || !service || !plan || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newInquiry = new Inquiry({
            name,
            email,
            phone,
            service,
            plan,
            message
        });

        await newInquiry.save();

        if (process.env.EMAIL_USER) {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: process.env.RECEIVER_EMAIL || 'srivatsan2910@gmail.com',
                subject: `New Inquiry from ${name} for ${service} (${plan})`,
                text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}
Plan: ${plan}
Message: ${message}
                `,
            };

            console.log('\n--- EMAIL SENDING ATTEMPT ---');
            console.log('Sending from (EMAIL_USER):', process.env.EMAIL_USER);
            console.log('Sending to (RECEIVER_EMAIL):', process.env.RECEIVER_EMAIL || 'srivatsan2910@gmail.com');
            console.log('Mail Options:', mailOptions);

            try {
                const info = await transporter.sendMail(mailOptions);
                console.log('SUCCESS: Email sent successfully!');
                console.log('Message ID:', info.messageId);
                console.log('-----------------------------\n');
                return res.status(201).json({
                    message: 'Inquiry saved and email sent successfully!'
                });
            } catch (emailError) {
                console.error('FAILED: Email sending error:', emailError);
                console.log('-----------------------------\n');
                return res.status(201).json({
                    message: 'Inquiry saved successfully, but email notification failed'
                });
            }
        }

        return res.status(201).json({ message: 'Inquiry saved successfully' });

    } catch (error) {
        return res.status(500).json({ error: 'Failed to process inquiry' });
    }
};

// =========================
// @desc    Get all inquiries
// @route   GET /api/inquiry
// =========================
const getInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.status(200).json(inquiries);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch inquiries' });
    }
};

module.exports = {
    submitInquiry,
    getInquiries
};