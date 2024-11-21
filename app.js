const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(express.static('public')); 
app.use(bodyParser.json()); 

// MySQL connection

const mysqlConnection = {
    host: 'localhost',
    user: 'root',
    password: 'Password@123',
    database: 'shiftmanagement',
    port: 3306,
};
app.get('/', (req, res) => {
    res.json({ info: 'Shift Management API' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});