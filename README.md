# Project123

Shift-Master


db.js for database connection and .env for db connection settings

created database named shiftmanagement and add table shifts
stared shift  module with create(POST), read(GET), DELETE

started employees module with create(POST)
ProjectRepository
created HTML file created base javascript file installed all the packages required json installed packages for node, mysql2 created a app.js file and express server is correctly set up and listens on port 3000 made port:3000 public created a mysql.createConnection instance for each endpoint login -> mysql -u root -p->password created table 'shiftmanagement' in mysql Backend API /shift (GET): Fetches all shifts from the shifts table /shifts (POST): Validates input and inserts a new shift into the shifts table in postman GET /search: Retrieves shifts based on search filters. DELETE /shift/:name: Deletes a shift by name.


#Technology Stack
Frontend -HTML -Javascript --HTML: The form for adding shifts and the container for displaying shifts. --JavaScript: fetchshift(): Fetches and displays all shift. searchshift(): Filters shift based on user input. addshift(): Adds a shift to the backend. deleteshift(name): Deletes a shift from the backend. Backend -Node.js Tool -Visual Studio Code (IDE) -Postman (API testing) -GitHub -MYSQL Workbench



#Reference
W3Schools. (2024). HTML Forms. Available at: https://www.w3schools.com/html/html_forms.asp 
Ahmed,J.,2023. CRUD REST API with Node.js, Express.js,
PostgressSQL.[online] DEV Community.https://dev.to/justahmed99/crud-rest-api-with-nodejs-expressjs-and-postgresql-57b2
CRUD with node.js  https://medium.com/@bipingiri27/crud-with-node-js-express-mysql-7ce1d4acb418
Postman beginer tutorial   https://youtube.com/playlist?list=PLhW3qG5bs-L9P22XSnRe4suiWL4acXG-g&si=B-McK0RCna7c9ABb 
