require('dotenv').config();
const request = require('supertest');
const { app, connection } = require('../app');

let server;

beforeAll(() => {
  server = app.listen(3000, () => {
    console.log('Test server running on port 3000');
  });
});

afterAll(async () => {
  if (server) {
    server.close();
  }
  if (connection.end) {
    await connection.end(); // Ensure database connection is closed
  }
});

afterEach(() => {
  jest.resetAllMocks();
});

jest.mock('../db', () => ({
  query: jest.fn(),
}));

describe('Shift Management API', () => {
  describe('POST /shifts', () => {
    it('should create a new shift', async () => {
      const newShift = {
        shift_name: 'Morning Shift',
        start_time: '08:00:00',
        end_time: '12:00:00',
      };

      db.query.mockResolvedValueOnce({ insertId: 1 });

      const res = await request(app).post('/shifts').send(newShift);

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe('Shift created successfully');
      expect(res.body.shift_id).toBe(1);
    });

    // Other test cases...
  });
});
