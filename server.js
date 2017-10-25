const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname)));
app.use('/build', express.static(path.join(__dirname, 'build')));

// noinspection JSUnresolvedFunction
app.get('/', (req, res) => {
  res.sendFile(path.join(path.join(__dirname, '/index.html')));
});

app.listen(process.env.PORT || 8080);
