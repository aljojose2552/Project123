const apiBaseUrl = 'http://localhost:3000/employees';

   
    async function fetchEmployees() {
      try {
        const response = await fetch(apiBaseUrl);
        const employees = await response.json();

        const tableBody = document.querySelector('#employee-table tbody');
        tableBody.innerHTML = ''; 

        employees.forEach(employee => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>${employee.position}</td>
            <td>${employee.phone}</td>
            <td>
              <button onclick="editEmployee(${employee.id})">Edit</button>
              <button onclick="deleteEmployee(${employee.id})">Delete</button>
            </td>
          `;
          tableBody.appendChild(row);
        });
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    }

    // new or edited employee
    async function saveEmployee() {
      const id = document.getElementById('employee-id').value;
      const name = document.getElementById('employee-name').value;
      const email = document.getElementById('employee-email').value;
      const position = document.getElementById('employee-position').value;
      const phone = document.getElementById('employee-phone').value;

      if (!name || !email || !position || !phone) {
        alert('Please fill out all fields.');
        return;
      }

      const employee = { name, email, position, phone };
      const method = id ? 'PUT' : 'POST';
      const url = id ? `${apiBaseUrl}/${id}` : apiBaseUrl;

      try {
        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(employee)
        });

        const result = await response.json();

        if (response.ok) {
          alert(result.message || 'Employee saved successfully.');
          resetForm();
          fetchEmployees();
        } else {
          alert(result.error || 'Failed to save employee.');
        }
      } catch (error) {
        console.error('Error saving employee:', error);
      }
    }

    // Edit an employee
    async function editEmployee(id) {
      try {
        const response = await fetch(`${apiBaseUrl}/${id}`);
        const employee = await response.json();

        document.getElementById('employee-id').value = employee.id;
        document.getElementById('employee-name').value = employee.name;
        document.getElementById('employee-email').value = employee.email;
        document.getElementById('employee-position').value = employee.position;
        document.getElementById('employee-phone').value = employee.phone;

        document.getElementById('form-title').textContent = 'Edit Employee';
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    }

    // Delete an employee
    async function deleteEmployee(id) {
      if (!confirm('Are you sure you want to delete this employee?')) return;

      try {
        const response = await fetch(`${apiBaseUrl}/${id}`, { method: 'DELETE' });
        const result = await response.json();

        if (response.ok) {
          alert(result.message || 'Employee deleted successfully.');
          fetchEmployees();
        } else {
          alert(result.error || 'Failed to delete employee.');
        }
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }

    // Reset the form
    function resetForm() {
      document.getElementById('employee-id').value = '';
      document.getElementById('employee-name').value = '';
      document.getElementById('employee-email').value = '';
      document.getElementById('employee-position').value = '';
      document.getElementById('employee-phone').value = '';
      document.getElementById('form-title').textContent = 'Add Employee';
    }

    // Initial fetch of employees
    fetchEmployees();