const express = require('express');
const cors = require('cors');
var _  = require('lodash');
var fs = require('fs');

const app = express();

var mockData = [];
var output = './text_files/mock-data.txt';

fs.readFile('./text_files/mock-data.txt', "utf8", function (err, data) {
  if (err) throw err;
  mockData = JSON.parse(data);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const html = `
    <div>
      <h1>Welcome to the OTR Coding Challenge Server</h1>
    </div>
  `;
  res.send(html);
});

app.post('/records', (req, res) => {
  if(!mockData){
    return res.send('Error processing request');
  } else {
    if(req.body.length) {
      req.body.forEach((item) => mockData.push(item));
    } else {
      mockData.push(req.body);
    }
    fs.writeFile(output, JSON.stringify(mockData), function (err) {
      if (err) throw err;
    });
    return res.send(mockData);
  }
});

app.get('/records/gender', (req, res) => {
  if(!mockData){
    return res.send('Error processing request');
  } else {
    var results = _.sortBy(mockData, ['gender']);
    return res.json({
      data: results
    });
  }
});

app.get('/records/birthdate', (req, res) => {
  if(!mockData){
    return res.send('Error processing request');
  } else {
    mockData.forEach((person) => {
      if(person.dob) {
        var dateString = person.dob;
        person.dob = new Date(dateString);
      }
    });
    var results = _.sortBy(mockData, ['dob']);
    // convert date obj to format mm/dd/yyyy
    results.forEach((person) => {
      if(person.dob) {
        var date = person.dob;
        person.dob = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
      }
    });
    return res.json({
      data: results
    });
  }
});

app.get('/records/name', (req, res) => {
  if(!mockData){
    return res.send('Error processing request');
  } else {
    var results = _.sortBy(mockData, ['last']);
    return res.json({
      data: results
    });
  }
});

app.listen(4000, () => {
  console.log('Backend listening on port 4000')
});