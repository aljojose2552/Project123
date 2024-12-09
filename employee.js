const EMPLOYEE_API_URL = 'http://localhost:3000'; // Base API URL for employees

// Fetch All Employees
document.getElementById('fetchEmployees').addEventListener('click', async () => {
  try {
    const response = await fetch(`${EMPLOYEE_API_URL}/employees`);
    const employees = await response.json();
    displayEmployees(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    document.getElementById('employee-list').innerHTML = 'Error fetching employees.';
  }
});

// Display Employees
function displayEmployees(employees) {
  const list = document.getElementById('employee-list');
  list.innerHTML = '';
  if (employees.length === 0) {
    list.innerHTML = 'No employees found.';
    return;
  }

  const table = document.createElement('table');
  table.innerHTML = `
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Position</th>
      <th>Phone</th>
    </tr>
  `;
  employees.forEach((employee) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${employee.employee_id}</td>
      <td>${employee.name}</td>
      <td>${employee.email}</td>
      <td>${employee.position}</td>
      <td>${employee.phone}</td>
    `;
    table.appendChild(row);
  });
  list.appendChild(table);
}

// Create Employee
document.getElementById('createEmployee').addEventListener('click', async () => {
  const name = document.getElementById('employee_name').value;
  const email = document.getElementById('employee_email').value;
  const position = document.getElementById('employee_position').value;
  const phone = document.getElementById('employee_phone').value;

  try {
    const response = await fetch(`${EMPLOYEE_API_URL}/employees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, position, phone }),
    });
    const result = await response.json();
    alert(result.message || 'Employee created successfully!');
  } catch (error) {
    console.error('Error creating employee:', error);
  }
});

//update

document.getElementById('updateEmployee').addEventListener('click', async () => {
  const id = document.getElementById('update_employee_id').value.trim();
  const name = document.getElementById('new_employee_name').value.trim();
  const email = document.getElementById('new_employee_email').value.trim();
  const position = document.getElementById('new_employee_position').value.trim();
  const phone = document.getElementById('new_employee_phone').value.trim();

  // Validate inputs
  if (!id || !name || !email || !position || !phone) {
    alert('Please fill out all fields before updating the employee.');
    return;
  }

  try {
    const response = await fetch(`${EMPLOYEE_API_URL}/employees/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, position, phone }),
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message || 'Employee updated successfully!');
    } else {
      alert(result.error || 'Failed to update employee. Please try again.');
    }
  } catch (error) {
    console.error('Error updating employee:', error);
    alert('An error occurred while updating the employee. Please try again later.');
  }
});


// Delete Employee
document.getElementById('deleteEmployee').addEventListener('click', async () => {
  const name = document.getElementById('delete_employee_name').value; 

  try {
    const response = await fetch(`${EMPLOYEE_API_URL}/employees/${name}`, { method: 'DELETE' });
    const result = await response.json();
    alert(result.message || 'Employee deleted successfully!');
  } catch (error) {
    console.error('Error deleting employee:', error);
    alert('Error deleting employee');
  }
});

