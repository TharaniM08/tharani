const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const readFile = require('./readfile');

app.use(bodyParser.json());

app.listen(3000, function() {
    const dataPath = './db/student.json';

    app.get('/getstudentdata', (req, res) => {
        readFile(fs,res);
      });

    app.post('/addstudentdetails', (req, res) => { 

        fs.readFile(dataPath, 'utf8', (err, data) => {
          if (err) {
            throw err;
          }
    
          var result=JSON.parse(data);
          const newUserId = Object.keys(result).length + 1;

          result[newUserId.toString()] = req.body;
          console.log(result);
          fs.writeFile(dataPath, JSON.stringify(result, null, 2),'utf8', err => {          
            res.status(200).send('Student details Added');
            });
        });
      });

      app.put('/updatestudentdetails/:id', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
          if (err) {
            throw err;
          }
    
          var result=JSON.parse(data);
          
          const userId = req.params["id"];
          result[userId] = req.body;

          fs.writeFile(dataPath, JSON.stringify(result, null, 2),'utf8', err => {          
            res.status(200).send('Student details updated');
            });
        });
      });

      app.delete('/deletestudentdetails/:id', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
          if (err) {
            throw err;
          }    
          var result=JSON.parse(data);
          const userId = req.params["id"];
          delete result[userId];

          fs.writeFile(dataPath, JSON.stringify(result, null, 2),'utf8', err => {          
            res.status(200).send('Student details deleted');
            });
        });
      });
})