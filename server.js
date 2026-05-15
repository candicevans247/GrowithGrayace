const express = require('express');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// ✅ Landing page — inject env vars into HTML at serve time
app.get('/', (req, res) => {
  const html = fs
    .readFileSync(path.join(__dirname, 'index.html'), 'utf8')
    .replace('%%BOT_SERVER_URL%%', process.env.BOT_SERVER_URL || '')
    .replace('%%PLAN_CODE%%', process.env.PLAN_CODE || 'PLN_y1cut9m3uwa6tfc');

  res.send(html);
});

// ✅ Thank you page — lives here, not on bot server
app.get('/thank-you', (req, res) => {
  res.sendFile(path.join(__dirname, 'thank-you.html'));
});

// ✅ Health check
app.get('/health', (req, res) => {
  res.send('Landing page running ✅');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Landing page running on port ${PORT}`);
});
