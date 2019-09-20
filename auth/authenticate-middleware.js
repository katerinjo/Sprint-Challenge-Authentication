/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

// const db = require('../database/userData');
// const bcrypt = require('bcrypt');

// module.exports = (req, res, next) => {
//   console.log(req.session)
//   if (req.session && req.session.user) {
//     const { username, password } = req.session.user;
//     db.readUser(username)
//       .then(user => {
//         console.log('middleware db user:', user)
//         if (user && bcrypt.compareSync(password, user.password)) {
//           next();
//         } else {
//           res.status(401).json({ message: 'invalid credentials' });
//         }
//       })
//       .catch(err => {
//         res.status(500).json(err);
//       });
//   } else {
//     res.status(401).json({ message: 'please log in' });
//   }
// };

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, "it's a secret", (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'You shall not pass!' });
      } else {
        req.user = { username: decodedToken.username };
        next();
      }
    });
  } else {
    res.status(400).json({ message: 'no credentials provided' });
  }
};
