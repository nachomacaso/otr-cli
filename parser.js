var fs = require('fs');
var _  = require('lodash');

if (process.argv.length !== 3) {
    console.error('Exactly one argument required');
    process.exit(1);
}

var input = process.argv[2];
var output = './text_files/mock-data.txt';
var people =[];
var keys   = ['last', 'first', 'gender', 'color', 'dob'];

fs.readFile(input, 'utf-8', function (err, text) {
    if (err) throw err;
    var format = text.replace(/[\n]/g, ', ').replace(/[|,\n]/g, '').replace(/\s\s+/g, ' ');
    var values = format.split(' ');
    people = toObject(keys, values);
    fs.writeFile(output, JSON.stringify(people), function (err) {
        if (err) throw err;
    });
});

function toObject(keys, values) {
  var peopleArray = [];
  for (var i = 0; i < values.length;){
    var person = {};
    for(var j =0; j < keys.length; j++) {
      person[keys[j]] = values[i];
      i++;
    }
    peopleArray.push(person);
  }
  return peopleArray
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