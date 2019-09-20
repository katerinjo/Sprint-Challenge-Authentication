const db = require('./dbConfig');

function create(user) {
  return db('users').insert(user);
}

function read(username) {
  return db('users').select().where({ username }).first();
}

module.exports = {
  create,
  read
};
