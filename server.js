const express = require('express');
const path = require('path');

const api = require('./routes/index');

const port = process.env.PORT || 3001;

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



app.listen(port, "0.0.0.0", function() {
 console.info(`App listening at http://localhost:${port}`)
});
