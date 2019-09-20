const db = require('./dbConfig');

function create(user) {
  return db('users').insert(user);
}

function read(username) {
  return db('users').select().where({ username }).first();
}

function all() {
  return db('users').select();
}

function destroy(username) {
  return db('users').where({ username }).del();
}

module.exports = {
  create,
  read,
  all,
  destroy
};
