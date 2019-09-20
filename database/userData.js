const db = require('./dbConfig');

function create(user) {
  return db('users').insert(user);
}

module.exports = {
  create
};
