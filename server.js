const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
  try {
    const html = fs
      .readFileSync(path.join(__dirname, 'index.html'), 'utf8')
      .replace('%%BOT_SERVER_URL%%', process.env.BOT_SERVER_URL || '')
      .replace('%%PLAN_CODE%%', process.env.PLAN_CODE || 'PLN_y1cut9m3uwa6tfc');

    console.log('BOT_SERVER_URL:', process.env.BOT_SERVER_URL);
    console.log('PLAN_CODE:', process.env.PLAN_CODE);

    res.send(html);
  } catch (err) {
    console.error('Error reading index.html:', err);
    res.status(500).send('Server error');
  }
});

app.get('/thank-you', (req, res) => {
  res.sendFile(path.join(__dirname, 'thank-you.html'));
});

app.get('/health', (req, res) => {
  res.send('Landing page running ✅');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Landing page running on port ${PORT}`);
  console.log(`BOT_SERVER_URL: ${process.env.BOT_SERVER_URL}`);
  console.log(`PLAN_CODE: ${process.env.PLAN_CODE}`);
});
