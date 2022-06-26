const express = require('express');
var cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static('imgs'));
const routes = require('./routes')(app);

const API_PORT = process.env.PORT || 3001

const server = app.listen(API_PORT, () => {
  console.log('Listening on port %s...', server.address().port);
});
