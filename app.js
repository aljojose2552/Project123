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


//fetch all shifts

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

//creating new shifts

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

// deleteing shift

app.delete('/shifts/:name', (req, res) => {
  const shiftName = req.params.name;

  const query = 'DELETE FROM Shifts WHERE shift_name = ?';
  connection.query(query, [shiftName], (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: `No shift found with name "${shiftName}"` });
    }

    res.status(200).json({ message: `Shift "${shiftName}" deleted successfully` });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
