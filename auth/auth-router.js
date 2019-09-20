const router = require('express').Router();
const bcrypt = require('bcrypt');
const db = require('../database/userData');

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

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
