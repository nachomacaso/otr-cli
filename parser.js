var program = require('commander');
var fs = require('file-system');
var readline = require('readline');
var _ = require('lodash');

var people = [];
var keys = ['last', 'first', 'gender', 'color', 'dob'];

program
  .version('0.0.1')
  .option('-p, --parse', 'Text file parser')
  .parse(process.argv)

var rd = readline.createInterface({
  input: fs.createReadStream('./text_files/pipe.txt'),
  console: false
});

rd.on('line', function(line) {
  var values= line.split(' | ');
  var obj = toObject(keys, values);
  people.push(obj);
});

var rd2 = readline.createInterface({
  input: fs.createReadStream('./text_files/comma.txt'),
  console: false
});

rd2.on('line', function(line) {
  var values= line.split(', ');
  var obj = toObject(keys, values);
  people.push(obj);
});

var rd3 = readline.createInterface({
  input: fs.createReadStream('./text_files/space.txt'),
  console: false
});

rd3.on('line', function(line) {
  var values= line.split(' ');
  var obj = toObject(keys, values);
  people.push(obj);
});

function toObject(keys, values) {
  var result = {};
  for (var i = 0; i < values.length; i++)
    result[keys[i]] = values[i];
  return result;
}

function sortByGenderAndLast() {
  var sorted = _.sortBy(people, ['gender', 'last']);
  console.log('******************************');
  console.log('SORTED BY FEMALE AND LAST NAME');
  console.log(sorted);
  console.log('******************************');
}

function sortByDoB() {
  // convert date string to date obj
  people.forEach((person) => {
    if(person.dob) {
      var dateString = person.dob;
      person.dob = new Date(dateString);
    }
  });
  var sorted = _.sortBy(people, ['dob']);
  // convert date obj to format mm/dd/yyyy
  sorted.forEach((person) => {
    if(person.dob) {
      var date = person.dob;
      person.dob = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
    }
  });
  console.log('******SORTED BY BIRTHDATE*****');
  console.log(sorted);
  console.log('******************************');
}

function sortLastNameDesc() {
  var sorted = _.sortBy(people, ['last']);
  console.log('SORTED BY LAST NAME DESCENDING');
  console.log(sorted.reverse());
  console.log('******************************');
}

setTimeout(function(){
  sortByGenderAndLast();
  sortByDoB();
  sortLastNameDesc();
}, 1000);