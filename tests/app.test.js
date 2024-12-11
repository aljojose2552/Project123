const request = require('supertest');
const { app, connection } = require('../app'); 
const mysql = require('mysql2'); // Import mysql2


jest.mock('mysql2', () => ({
  createConnection: jest.fn().mockReturnValue({
    connect: jest.fn((cb) => cb(null)),  
    query: jest.fn(),   
    end: jest.fn(),     
  }),
}));

let server;

beforeAll(() => {
  
  server = app.listen(3001, () => {
    console.log('Test server running on port 3001');
  });
});

afterAll(async () => {
  
  if (server) {
    await new Promise(resolve => server.close(resolve));
    console.log('Test server closed');
  }
  if (connection && connection.end) {
    await new Promise(resolve => connection.end(resolve));
    console.log('Database connection closed');
  }
});

afterEach(() => {
  
  jest.resetAllMocks();
});


jest.setTimeout(10000);

describe('Shift Management API', () => {
  describe('POST /shifts', () => {
    it('should create a new shift', async () => {
      const newShift = {
        shift_name: 'Morning Shift',
        start_time: '08:00:00',
        end_time: '12:00:00',
      };

      
      connection.query.mockResolvedValueOnce({ insertId: 1 });

      
      const res = await request(app).post('/shifts').send(newShift);

     
      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe('Shift created successfully');
      expect(res.body.shift_id).toBe(1);
    }, 10000); 

    it('should return an error if required fields are missing', async () => {
      const incompleteShift = {
        shift_name: 'Morning Shift',
      };

     
      const res = await request(app).post('/shifts').send(incompleteShift);

      
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Please provide shift_name, start_time, and end_time');
    });

    it('should handle database errors gracefully', async () => {
      const newShift = {
        shift_name: 'Morning Shift',
        start_time: '08:00:00',
        end_time: '12:00:00',
      };

      
      connection.query.mockRejectedValueOnce(new Error('Database error'));

      
      const res = await request(app).post('/shifts').send(newShift);

      
      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe('Internal server error');
    }, 10000); 
  });
});
