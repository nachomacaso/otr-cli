const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sous-chef'
});

connection.connect(err => {
  if(err) {
    return err;
  }
});

app.use(cors());

app.get('/', (req, res) => {
  const html = `
    <div>
      <h1>Welcome to the OTR Coding Challenge Server</h1>
    </div>
  `;
  res.send(html);
});

app.listen(4000, () => {
  console.log('Backend listening on port 4000')
});