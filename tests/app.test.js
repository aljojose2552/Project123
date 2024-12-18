const request = require('supertest');
const { app, connection } = require('../app');
const mysql = require('mysql2'); // Import mysql2

jest.mock('mysql2', () => ({
  createConnection: jest.fn().mockReturnValue({
    connect: jest.fn(cb => cb(null)),
    query: jest.fn(),
    end: jest.fn(),
  }),
}));

let server;
let originalConsoleError;

beforeAll(() => {
  server = app.listen(3001, () => {
    console.log('Test server running on port 3001');
  });
});

beforeEach(() => {
  originalConsoleError = console.error;
  console.error = jest.fn(); 
});

afterEach(() => {
  jest.resetAllMocks();
  console.error = originalConsoleError; 
});

jest.setTimeout(30000); 

describe('Shift Management API', () => {
  describe('DELETE /shifts/:name', () => {
    it('should delete a shift successfully', async () => {
      const shiftName = 'Morning Shift';

      connection.query.mockImplementationOnce((query, params, callback) => {
        expect(query).toBe('DELETE FROM Shifts WHERE shift_name = ?');
        expect(params).toEqual([shiftName]);
        callback(null, { affectedRows: 1 });
      });

      const res = await request(app).delete(`/shifts/${shiftName}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe(`Shift "${shiftName}" deleted successfully`);
    });

    it('should return 404 if no shift is found with the given name', async () => {
      const shiftName = 'NonExistentShift';

      connection.query.mockImplementationOnce((query, params, callback) => {
        expect(query).toBe('DELETE FROM Shifts WHERE shift_name = ?');
        expect(params).toEqual([shiftName]);
        callback(null, { affectedRows: 0 });
      });

      const res = await request(app).delete(`/shifts/${shiftName}`);

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe(`No shift found with name "${shiftName}"`);
    });

    it('should handle database errors gracefully', async () => {
      const shiftName = 'Morning Shift';

      connection.query.mockImplementationOnce((query, params, callback) => {
        expect(query).toBe('DELETE FROM Shifts WHERE shift_name = ?');
        expect(params).toEqual([shiftName]);
        callback(new Error('Database error'));
      });

      const res = await request(app).delete(`/shifts/${shiftName}`);

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe('Internal server error');
    });
  });
});
