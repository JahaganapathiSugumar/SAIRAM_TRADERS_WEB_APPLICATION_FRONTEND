const express = require('express');
const fs = require('fs');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 5000;

const DATA_FILE = './visitors.json';

app.use(cors());
app.use(express.json());

// Visitor Counter Helpers
function getVisitorCount() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ count: 0 }));
  }
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data).count;
}

function setVisitorCount(count) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ count }));
}

// GET visitor count
app.get('/api/visitors', (req, res) => {
  const count = getVisitorCount();
  res.json({ count });
});

// POST increment visitor count
app.post('/api/visitors/increment', (req, res) => {
  let count = getVisitorCount();
  count += 1;
  setVisitorCount(count);
  res.json({ count });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Configure your transporter (use your real email and app password)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '', // <-- replace with your Gmail address
      pass: 'your-app-password',   // <-- replace with your Gmail App Password
    },
  });

  const mailOptions = {
    from: email,
    to: 'jahaganapathi1@gmail.com', // <-- where you want to receive the contact form messages
    subject: `New Contact Form Submission from ${name}`,
    text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`VisitorCounter backend running on http://localhost:${PORT}`);
});