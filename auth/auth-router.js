const router = require('express').Router();
const bcrypt = require('bcrypt');
const db = require('../database/userData');
const authenticate = require('./authenticate-middleware');

router.post('/register', (req, res) => {
  // implement registration
  const { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 8);

  db.create({ username, password: hash })
    .then(dbRes => {
      res.status(201).json(dbRes);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post('/login', authenticate, (req, res) => {
  // implement login
  const { username, password } = req.body;

});

module.exports = router;
