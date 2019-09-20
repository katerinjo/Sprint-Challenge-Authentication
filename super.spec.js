const request = require('supertest');

const server = require('./api/server');

const db = require('./database/userData');

const testUser = {username: 'bub', password: 'swordbub'};

describe('auth', () => {
  describe('register', () => {
    it('register returns status 201', async () => {
      const dbRes = await db.destroy('bub');
      const res = await request(server)
        .post('/api/auth/register')
        .send(testUser);
      expect(res.status).toBe(201);
      await db.destroy('bub');
    });
  });

  describe('login', () => {
    it('returns status 200', async () => {
      const regRes = await request(server)
          .post('/api/auth/register')
          .send(testUser);
      const res = await request(server)
            .post('/api/auth/login')
            .send(testUser);
      expect(res.status).toBe(200);
      db.destroy('bub');
    });
    it('returns JSON', async () => {
      const regRes = await request(server)
            .post('/api/auth/register')
            .send(testUser);
      const res = await request(server)
            .post('/api/auth/login')
            .send(testUser);
      expect(res.type).toMatch(/json/i);
      db.destroy('bub');
    });
  });

  describe('get jokes', () => {
    it('returns 200 OK', async () => {
      const regRes = await request(server)
            .post('/api/auth/register')
            .send(testUser);
      const logRes = await request(server)
          .post('/api/auth/login')
          .send(testUser);
      const res = await request(server)
            .get('/api/jokes')
            .set('authorization', logRes.body.token);
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });
});
