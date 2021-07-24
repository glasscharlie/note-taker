const express = require('express');
const path = require('path');
const db = require('./Develop/db/db.json');
const fs = require('fs')
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('Develop/public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/./index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(db));
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a review`);
    // let response;

    if (req.body.title && req.body.text) {
      response = {
        status: 'success',
        data: req.body,

      };
      var data =fs.readFileSync('Develop/db/db.json')
      const json = JSON.parse(data)
      obj = req.body
      obj.id = uuid()
      json.push(obj)
      fs.writeFile('Develop/db/db.json', JSON.stringify(json), (err) => 
        err ? console.error(err) : console.log('Commit logged!')); 
        
    res.json(JSON.stringify(obj));
    } else {
        res.json('Please fill out the required fields!');
    }
});

// app.delete('/api/notes/:id', function (req, res) {
//         console.info(`${req.method} request received`);
//         console.log(req.body)
//         for (let i = 0; i < db.length; i++) {
//           const currentId = req.params.id[i];
//           console.log(currentId)
//           if (db.id === currentId) {
//             res.json(currentId);
//             return;
//           }
//         }
//         res.json('Review ID not found');
//   });







app.listen(PORT, () => console.log(`listening on port: ${PORT}`));