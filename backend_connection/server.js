var express = require('express');
var app = express();
var joinQuery = require('../knex/join');
var knex = require('../knex/knex');
var insertQuery = require('../knex/insert');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.get('/recipes',function(request, response){

joinQuery().then(function(result) {
      var currentElement={};
      var element = [];
      result.forEach(function (row) {
          if (currentElement.name !== row.name) {
              currentElement = { name: row.name, tags:[], steps:[] };
              element.push(currentElement);
          }
          if(!~currentElement.tags.indexOf(row.tag)) {
              currentElement.tags.push(row.tag);
          }
          if(!~currentElement.steps.indexOf(row.step)) {
              currentElement.steps.push(row.step);
          }
      });
        response.status(200).json(element);
        return knex.destroy(); 
    });
});

app.post('/recipes', jsonParser, function (req, res) {
    var objectInput = req.body.property;
    var tableInput = req.body.tableName;
    console.log(objectInput, tableInput);
    insertQuery(objectInput, tableInput)
    .then(function() {
        console.log('Post Complete');
        return knex.destroy();
    })
    res.status(201).json({});
});

app.listen(process.env.port || 8080, process.env.IP);


// var express = require('express');
// var app = express();
// var joinQuery = require('../knex/join')


// app.get('/recipes',function(request, response){

// joinQuery().then(function(result) {
//       var currentElement={};
//       var element = [];
//       result.forEach(function (row) {
//           if (currentElement.name !== row.name) {
//               currentElement = { name: row.name, tags:[], steps:[] };
//               element.push(currentElement);
//           }
//           if(!~currentElement.tags.indexOf(row.tag)) {
//               currentElement.tags.push(row.tag);
//           }
//           if(!~currentElement.steps.indexOf(row.step)) {
//               currentElement.steps.push(row.step);
//           }
//       });
//         return response.status(200).json(element);
//     });
    
// });

// app.listen(process.env.port || 8080, process.env.IP);
