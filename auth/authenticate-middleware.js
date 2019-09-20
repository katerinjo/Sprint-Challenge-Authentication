/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const db = require('../database/userData');
const bcrypt = require('bcrypt');

module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    const { username, password } = req.session.user;
    db.readUser(username)
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: 'invalid credentials' });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  } else {
    res.status(401).json({ message: 'please log in' });
  }
};
