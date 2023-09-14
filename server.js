const express = require('express');
const path = require('path');
const fs = require('fs');
const noteData = require('./db/db.json');

const PORT = 3001;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));

//html routes
app.get('/', (req, res) => 
 res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
 res.sendFile(path.join(__dirname, 'public/notes.html'))
);

//get and post route for data - modularize later
// add uuid functionality later for delete - activiity 17
app.get('/api/notes', (req, res) => res.json(noteData));

app.post('/api/notes', (req, res) => {
 console.info(`${req.method} request received to add a review`);

 const { title, text } = req.body;

 if (title && text) {
   const newNote = {
        title,
        text,
    };

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
     } else {
        const parsedNotes = JSON.parse(data);

        parsedNotes.push(newNote);

        fs.writeFile(
          './db/db.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (writeErr) =>
                      writeErr
                      ? console.error(writeErr)
                      : console.info('Successfully updated notes')
                );
            }
        });

    const response = {
        status: 'success',
        body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
    } else {
    res.status(500).json('Error in posting note')
    }
});

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

//get and post route for data - modularize later
// app.get('/api/notes', (req, res) => res.json(noteData));

// app.post('/api/notes', (req, res) => {
//     res.json(`${req.method} request received`);

//     let response;

//     if (req.body && req.body.title &&req.body.text) {
//         response = {
//             status: 'success',
//             data: req.body,
//         };
//         res.status(201).json(response);
//     } else {
//         res.status(400).json('Request body must contain title and text');
//     }

//     console.log(req.body);
// });

app.listen(PORT, () =>
    console.info(`Example app listening at http://localhost:${PORT}`)
);

