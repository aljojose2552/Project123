const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password@123',
  database: 'shiftmanagement' 
});


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to MySQL!');
});

app.use(bodyParser.json());




app.get('/', (req, res) => {
  res.json({ info: 'Shift Management API is running.' });
});


app.get('/shifts', (req, res) => {
  connection.query('SELECT * FROM Shifts', (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }

   
    res.status(200).json(results);
  });
});


app.post('/shifts', (req, res) => {
  const { shift_name, start_time, end_time } = req.body;

  
  if (!shift_name || !start_time || !end_time) {
    return res.status(400).json({ error: 'Please provide shift_name, start_time, and end_time' });
  }

 
  const query = 'INSERT INTO Shifts (shift_name, start_time, end_time) VALUES (?, ?, ?)';

  connection.query(query, [shift_name, start_time, end_time], (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }

   
    res.status(201).json({
      message: 'Shift created successfully',
      shift_id: results.insertId
    });
  });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
