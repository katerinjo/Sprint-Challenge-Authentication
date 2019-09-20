const router = require('express').Router();
const bcrypt = require('bcrypt');
const db = require('../database/userData');
const jwt = require('jsonwebtoken');

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
  const { username, password } = req.body;

  db.read(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const payload = {username};
        const secret = "it's a secret";
        const options = {expiresIn: '1d'};
        const token = jwt.sign(payload, secret, options);
        res.status(200).json({ message: 'logged in', token });
      } else {
        res.status(401).json({ message: 'invalid credentials' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
