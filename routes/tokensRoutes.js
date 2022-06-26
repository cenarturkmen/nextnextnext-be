const fs = require('fs');
const path = require('path');

const { v4: uuidv4 } = require('uuid');
const upload = require('../config/uploadConfig');

const tokensRoutes = (app) => {
  const dbFile = path.resolve(__dirname, 'db.json');
  const db = fs.readFileSync(dbFile, 'utf8');
  const tokens = JSON.parse(db);

  app.post('/tokens', upload.single('img'), (req, res) => {
    const { filename } = req.file;
    const { tokenId, name, description, price } = req.body;
    console.log(price)
    tokens[tokenId] = {
      name,
      description,
      image: req.protocol + '://' + req.get('host') + "/images/" + filename,
      price
    };

    fs.writeFileSync(dbFile, JSON.stringify(tokens));

    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl + '/' + tokenId;

    res.status(201).json({ message: fullUrl });
  });

  app.get('/tokens/:tokenID', (req, res) => {
    const { tokenID } = req.params;
    
    res.status(200).json(tokens[tokenID]);
  });

  app.get('/healthcheck', (req, res) => {
    
    res.status(200).json("OK");
  });
};

module.exports = tokensRoutes;

