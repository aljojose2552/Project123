# Project123

Assignment Cover Sheet

Student  Name and Number as per student card: Aljo Jose (20033528)

Programme: Msc Information with computing

Lecturer Name: Paul Laird

Module/Subject Title: Programming for Information Systems

Assignment Title: Shift Master

#Shift-Master
#ProjectRepository
created HTML file created base javascript file installed all the packages required json installed packages for node, mysql2 created a app.js file and express server is correctly set up and listens on port 3000 made port:3000 public created a mysql.createConnection instance for each endpoint login -> mysql -u root -p->password created table 'shiftmanagement' in mysql Backend API /shift (GET): Fetches all shifts from the shifts table /shifts (POST): Validates input and inserts a new shift into the shifts table in postman GET /search: Retrieves shifts based on search filters. DELETE /shift/:name: Deletes a shift by name.

1. Introduction

The Shift Management System is a web-based application designed to manage employee shifts. The application allows users to perform CRUD operations (Create, Read, Update, Delete) on shifts and employee data. It utilizes a combination of Node.js for the backend, HTML and CSS for the frontend, JavaScript for connection handling, Postman for API testing, and Jest for unit testing.

2. Technologies Used

Backend
Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine. It is used to build the server and handle API requests.
Express.js: A web framework for Node.js to manage routes and middleware.
MySQL: A relational database management system used to store shifts and employee data.
dotenv: A module used to load environment variables from a .env file for database credentials and other sensitive configurations.
CORS: A package to enable Cross-Origin Resource Sharing (CORS) so the frontend can communicate with the backend across different domains.

Frontend
HTML: The structure and content of the web pages are built using HTML.
CSS: Styling and layout for the web pages are handled using CSS.
JavaScript: Responsible for managing API requests (fetching and sending data) from the frontend to the backend.

API Testing
Postman: A tool for testing API endpoints. It is used to send requests and inspect the responses to ensure the backend functions correctly.

Testing
Jest: A JavaScript testing framework used to write unit tests for the backend API to ensure correctness and reliability.

3. System Overview

Backend (Node.js)
The backend provides a RESTful API that exposes various endpoints to manage shifts and employee data. The backend performs CRUD operations on the MySQL database, handling requests such as fetching shifts, creating shifts, updating shift details, and deleting shifts. Similarly, employee data is managed with similar functionalities.

Shifts Management:

GET /shifts: Retrieves all shifts from the database.
GET /shifts/search: Allows searching shifts by shift_name, start_time, or end_time.
POST /shifts: Creates a new shift.
PUT /shifts/:name: Updates an existing shift by shift_name.
DELETE /shifts/:name: Deletes a shift by shift_name.

Employee Management:

GET /employees: Retrieves all employees.
POST /employees: Adds a new employee to the system.
PUT /employees/:name: Updates an employee’s details (name, email, phone, etc.).
DELETE /employees/:name: Deletes an employee by name.

Shift Assignment:

POST /employeeshifts: Assigns a shift to an employee, linking the employee, shift, and time.

Frontend (HTML, CSS, JavaScript)
The frontend consists of various sections that interact with the backend to display and modify shift and employee data.
Fetch Shifts: Displays a list of all shifts.
Search Shifts: Provides an input box to search shifts based on the shift name.
Create Shift: Allows the user to create a new shift by entering the shift name and time.
Update Shift: Allows the user to update an existing shift by specifying the shift name and new data.
Delete Shift: Deletes a shift based on the shift name.

4. How it Works

Fetching Data:

When the user clicks the "Fetch All Shifts" button, a GET request is made to the /shifts endpoint, which retrieves all shifts from the MySQL database and displays them on the frontend.
Searching Data:

The user can search for shifts using the "Search Shifts" section. A GET request is made to /shifts/search with query parameters (shift_name, start_time, end_time) to filter the shifts.

Creating a New Shift:

When the user enters the shift details and clicks the "Create Shift" button, a POST request is made to the /shifts endpoint, which inserts the new shift into the database.

Updating a Shift:

A PUT request is made to /shifts/:name to update the shift details for the specified shift name.

Deleting a Shift:

A DELETE request is made to /shifts/:name to remove the specified shift from the database.

Employee and Shift Assignment:

Employees are managed similarly to shifts. Employees can be created, updated, or deleted via corresponding API routes.
The user can assign a shift to an employee by sending a POST request to /employeeshifts, which stores the shift assignment in the database.

5. Testing and Validation

Postman API Testing
Postman is used to manually test all API endpoints.
Test cases are written for each API route to check if the requests are correctly handled, the data is returned as expected, and the status codes are correct.
For example, when creating a new shift, the POST request to /shifts should return a 201 status with a success message. If any required fields are missing, it should return a 400 status.

Jest Unit Testing
Jest is used to write automated unit tests for backend functionality.
Tests are written to check if the server responds correctly to valid and invalid inputs.
For example, tests are written to ensure that the server correctly creates, updates, and deletes shifts and employees, and that the correct error messages are shown for invalid operations.

6. Frontend Implementation

The frontend HTML page provides a user-friendly interface to interact with the Shift Management System. It includes sections for:
Viewing all shifts.
Searching shifts by name.
Creating, updating, and deleting shifts.
The JavaScript file (shift.js) handles the logic of making requests to the backend and updating the UI with the responses.

7. Conclusion

The Shift Management System is a robust application for managing employee shifts, allowing for easy CRUD operations on shifts and employees. The backend is built using Node.js with Express.js to provide a RESTful API, while the frontend is designed with HTML and CSS for user interaction. Postman is used to test the API, and Jest is used for automated testing.
This system streamlines shift management and provides a centralized interface for managing both shifts and employees effectively.


8.Reference

W3Schools. (2024). HTML Forms. Available at: https://www.w3schools.com/html/html_forms.asp 
Ahmed,J.,2023. CRUD REST API with Node.js, Express.js,
PostgressSQL.[online] DEV Community.https://dev.to/justahmed99/crud-rest-api-with-nodejs-expressjs-and-postgresql-57b2
CRUD with node.js  https://medium.com/@bipingiri27/crud-with-node-js-express-mysql-7ce1d4acb418
Postman beginer tutorial   https://youtube.com/playlist?list=PLhW3qG5bs-L9P22XSnRe4suiWL4acXG-g&si=B-McK0RCna7c9ABb 
