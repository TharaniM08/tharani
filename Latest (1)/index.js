const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const readFile = require('./readfile');
const KeyValidation = require('./KeyValidation');

app.use(bodyParser.json());

app.listen(3000, function() {
    const dbPath = './db/student.json';

    app.get('/getstudentdetails', (req, res) => {
        readFile(fs,res);
      });

    app.post('/addstudentdetails', (req, res) => { 

        fs.readFile(dbPath, 'utf8', (err,data) => {
          if (err) {
            throw err;
          }
         var result=JSON.parse(data);
         var keyExists = KeyValidation(req.body.id,result );

         if(!keyExists){
            const newId = req.body.id;
            result[newId.toString()] = req.body;            
            fs.writeFile(dbPath, JSON.stringify(result, null, 2),'utf8', err => {          
              res.status(200).send('Student details Added');
            });
          }
          else
          {          
             res.status(200).send('Student with same Id Exists');
          }        
        });

      });

      app.put('/updatestudentdetails/:id', (req, res) => {

        fs.readFile(dbPath, 'utf8', (err, data) => {
          if (err) {
            throw err;
          }    
          var result=JSON.parse(data);
          var keyExists = KeyValidation(req.params["id"],result );

          if(keyExists){
            const userId = req.params["id"];
            result[userId] = req.body;

            fs.writeFile(dbPath, JSON.stringify(result, null, 2),'utf8', err => {          
            res.status(200).send('Student details updated');
            });
          }
          else
          {          
             res.status(200).send('Student Id does not exist');
          }        
        });

      });

      app.delete('/deletestudentdetails/:id', (req, res) => {

        fs.readFile(dbPath, 'utf8', (err, data) => {
          if (err) {
            throw err;
          }              
          var result=JSON.parse(data);
          var keyExists = KeyValidation(req.params["id"],result );

          if(keyExists){
            const userId = req.params["id"];
            delete result[userId];

            fs.writeFile(dbPath, JSON.stringify(result, null, 2),'utf8', err => {          
              res.status(200).send('Student details deleted');
              });
          }
          else
          {          
             res.status(200).send('Student Id does not exist');
          } 

        });
      });
})