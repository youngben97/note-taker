const notes = require('express').Router();

//Helper function to generate unique ids
const { v4: uuidv4 } = require('uuid');

//Helper function for reading and writing to JSON file
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');


notes.get('/', (req, res) => {
    console.info(`${req.method} request received for note`);

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
 console.info(`${req.method} request received to add a note`);

 const { title, text, id } = req.body;

 if (title && text) {
   const newNote = {
        title,
        text,
        id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully.`)
    } else {
    res.error();('Error in adding note')
    }
});

module.exports = notes;