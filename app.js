const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());


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

// Search shifts
app.get('/shifts/search', (req, res) => {
  const { shift_name, start_time, end_time } = req.query;

 
  console.log('Query Params:', { shift_name, start_time, end_time });


  let query = 'SELECT * FROM Shifts WHERE 1=1';
  const params = [];

  if (shift_name) {
    query += ' AND shift_name LIKE ?';
    params.push(`%${shift_name}%`); 
  }
  if (start_time) {
    query += ' AND start_time = ?';
    params.push(start_time);
  }
  if (end_time) {
    query += ' AND end_time = ?';
    params.push(end_time);
  }

  
  console.log('SQL Query:', query);
  console.log('Query Params:', params);

 
  connection.query(query, params, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }

    
    if (results.length === 0) {
      return res.status(404).json({ message: 'No shifts found matching the criteria.' });
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

// update shifts

app.put('/shifts/:name', (req, res) => {
  const shiftName = req.params.name;
  const { shift_name, start_time, end_time } = req.body;

  if (!shift_name && !start_time && !end_time) {
    return res.status(400).json({ error: 'Please provide at least one field to update (shift_name, start_time, or end_time)' });
  }
  let query = 'UPDATE Shifts SET ';
  const updates = [];
  if (shift_name) updates.push(`shift_name = '${shift_name}'`);
  if (start_time) updates.push(`start_time = '${start_time}'`);
  if (end_time) updates.push(`end_time = '${end_time}'`);
  query += updates.join(', ');
  query += ' WHERE shift_name = ?';

  connection.query(query, [shiftName], (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: `No shift found with name "${shiftName}"` });
    }

    res.status(200).json({ message: `Shift "${shiftName}" updated successfully` });
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

//employees

app.get('/employees/:id', (req, res) => {
  const employeeId = req.params.id;

  const query = 'SELECT * FROM Employees WHERE id = ?';
  connection.query(query, [employeeId], (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: `No employee found with ID ${employeeId}` });
    }

    res.status(200).json(results[0]);
  });
});

//post employee

app.post('/employees', (req, res) => {
  const { name, email, position, phone } = req.body;

  if (!name || !email || !position || !phone) {
    return res.status(400).json({ error: 'Please provide name, email, position, and phone' });
  }

  const query = 'INSERT INTO Employees (name, email, position, phone) VALUES (?, ?, ?, ?)';

  connection.query(query, [name, email, position, phone], (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.status(201).json({
      message: 'Employee created successfully',
      employee_id: results.insertId
    });
  });
});

//put employee


app.put('/employees/:id', (req, res) => {
  const employeeId = req.params.id; 
  const { name, email, position, phone } = req.body; 

  
  if (!name && !email && !position && !phone) {
    return res.status(400).json({ error: 'Please provide at least one field to update (name, email, position, or phone)' });
  }


  let query = 'UPDATE Employees SET ';
  const updates = [];
  if (name) updates.push(`name = '${name}'`);
  if (email) updates.push(`email = '${email}'`);
  if (position) updates.push(`position = '${position}'`);
  if (phone) updates.push(`phone = '${phone}'`);
  query += updates.join(', '); 
  query += ' WHERE id = ?'; 


  connection.query(query, [employeeId], (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }

   
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: `No employee found with ID ${employeeId}` });
    }

  
    res.status(200).json({ message: `Employee with ID ${employeeId} updated successfully` });
  });
});



//delete employee


app.delete('/employees/:id', (req, res) => {
  const employeeId = req.params.id; 


  const query = 'DELETE FROM Employees WHERE id = ?';

  connection.query(query, [employeeId], (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }

   
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: `No employee found with ID ${employeeId}` });
    }

    
    res.status(200).json({ message: `Employee with ID ${employeeId} deleted successfully` });
  });
});






const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
