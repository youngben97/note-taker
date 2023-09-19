const express = require('express');
const path = require('path');

const api = require('./routes/index');

const PORT = 3001;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));

app.use('/api', api);

//html routes
app.get('/', (req, res) => 
 res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
 res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
    console.info(`Example app listening at http://localhost:${PORT}`)
);

