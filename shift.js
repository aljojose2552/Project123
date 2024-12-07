const apiBaseUrl = 'http://localhost:3000';

// Fetch and display shifts dynamically
function fetchShifts() {
  fetch(`${apiBaseUrl}/shifts`)
    .then(response => response.json())
    .then(data => {
      const shiftsList = document.getElementById('shifts-list');
      shiftsList.innerHTML = ''; // Clear the list before adding new shifts

      if (data.length === 0) {
        shiftsList.innerHTML = '<p>No shifts available</p>';
      }

      data.forEach(shift => {
        const div = document.createElement('div');
        div.className = 'shift-item';
        div.dataset.shiftId = shift.shift_id; // Store shift_id in a data attribute
        div.innerHTML = `
          <strong>${shift.shift_name}</strong> 
          (From ${shift.start_time} to ${shift.end_time}) 
          <button onclick="deleteShift(${shift.shift_id}, '${shift.shift_name}')">Delete</button>
          <button onclick="editShift(${shift.shift_id})">Edit</button>
        `;
        shiftsList.appendChild(div);
      });
    })
    .catch(error => console.error('Error fetching shifts:', error));
}

// Create a new shift
document.getElementById('create-shift-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const shiftName = document.getElementById('shift_name').value.trim();
  const startTime = document.getElementById('start_time').value;
  const endTime = document.getElementById('end_time').value;

  const shiftData = { shift_name: shiftName, start_time: startTime, end_time: endTime };

  fetch(`${apiBaseUrl}/shifts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(shiftData),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Shift created:', data);

      // Dynamically add new shift to the DOM
      const shiftsList = document.getElementById('shifts-list');
      const div = document.createElement('div');
      div.className = 'shift-item';
      div.dataset.shiftId = data.shift_id; // Store shift_id in a data attribute
      div.innerHTML = `
        <strong>${shiftName}</strong>
        (From ${startTime} to ${endTime}) 
        <button onclick="deleteShift(${data.shift_id}, '${shiftName}')">Delete</button>
        <button onclick="editShift(${data.shift_id})">Edit</button>
      `;
      shiftsList.appendChild(div);
    })
    .catch(error => console.error('Error creating shift:', error));
});

// Search for shifts by name and update DOM
document.getElementById('search-shift-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const shiftName = document.getElementById('shift_name_search').value.trim();

  if (!shiftName) {
    alert('Please enter a shift name to search.');
    return;
  }

  fetch(`${apiBaseUrl}/shifts/search?shift_name=${shiftName}`)
    .then(response => response.json())
    .then(data => {
      const shiftsList = document.getElementById('shifts-list');
      shiftsList.innerHTML = ''; // Clear the existing list

      if (data.length === 0) {
        shiftsList.innerHTML = '<p>No shifts found matching the name</p>';
      } else {
        data.forEach(shift => {
          const div = document.createElement('div');
          div.className = 'shift-item';
          div.dataset.shiftId = shift.shift_id;
          div.innerHTML = `
            <strong>${shift.shift_name}</strong>
            (From ${shift.start_time} to ${shift.end_time}) 
            <button onclick="deleteShift(${shift.shift_id}, '${shift.shift_name}')">Delete</button>
            <button onclick="editShift(${shift.shift_id})">Edit</button>
          `;
          shiftsList.appendChild(div);
        });
      }
    })
    .catch(error => console.error('Error searching shifts:', error));
});

// Delete a shift dynamically
function deleteShift(shiftId, shiftName) {
  fetch(`${apiBaseUrl}/shifts/${shiftName}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => {
      console.log('Shift deleted:', data);

      // Remove the shift from the DOM
      const shiftElement = document.querySelector(`[data-shift-id='${shiftId}']`);
      if (shiftElement) {
        shiftElement.remove();
      }
    })
    .catch(error => console.error('Error deleting shift:', error));
}

// Edit a shift (Optional: Example of editing)
function editShift(shiftId) {
  const shiftElement = document.querySelector(`[data-shift-id='${shiftId}']`);
  if (shiftElement) {
    const shiftName = shiftElement.querySelector('strong').textContent;

    // Simulate the edit form
    const newShiftName = prompt('Enter new shift name:', shiftName);
    if (newShiftName) {
      // Call backend API to update the shift
      fetch(`${apiBaseUrl}/shifts/${shiftName}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shift_name: newShiftName }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Shift updated:', data);
          shiftElement.querySelector('strong').textContent = newShiftName;
        })
        .catch(error => console.error('Error editing shift:', error));
    }
  }
}

// Initialize the app by fetching shifts and employees
fetchShifts();
