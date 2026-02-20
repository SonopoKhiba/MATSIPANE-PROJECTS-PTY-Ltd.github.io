const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.')); // serve your index.html

// POST endpoint for form submission
app.post('/send', (req, res) => {
    const { name, email, message } = req.body;

    // Use Gmail App Password (not your normal password)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'katlehokhiba20@gmail.com',
            pass: 'cutv bvqi ijjf uesq' // Replace with Gmail app password
        }
    });

    const mailOptions = {
        from: email,
        to: 'katlehokhiba20@gmail.com',
        subject: `New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("ERROR:", error);
            res.send('Failed to send message.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Message sent successfully!');
        }
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));