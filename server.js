const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Handle form submission
app.post('/contact_process', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Log form data
    console.log('Form Data Received:', { name, email, subject, message });

    // Create a transporter object using Mailtrap SMTP transport
    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "e0ae801cad7069", // Replace with your Mailtrap username
            pass: "acb5a38e4354f3"  // Replace with your Mailtrap password
        }
    });

    // Email options
    const mailOptions = {
        from: email,
        to: 'bincybiju50@gmail.com', // Use any dummy email for testing
        subject: `Contact Form Submission: ${subject}`,
        text: `You have a new message from ${name} (${email}):\n\n${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send email' });
        }
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Email sent successfully' });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
