const apiBaseUrl = "http://localhost:3000";

// Show response messages
function showResponse(message, type = 'success') {
  const responseDiv = document.getElementById('response');
  responseDiv.classList.add(type === 'success' ? 'response' : 'error');
  responseDiv.textContent = message;
}

// Fetch all shifts
function fetchShifts() {
  fetch(`${apiBaseUrl}/shifts`)
    .then(response => response.json())
    .then(data => {
      let shiftsHtml = '';
      data.forEach(shift => {
        shiftsHtml += `<div><strong>${shift.shift_name}</strong> (From ${shift.start_time} to ${shift.end_time})</div>`;
      });
      document.getElementById('shifts-list').innerHTML = shiftsHtml;
    })
    .catch(error => showResponse("Error fetching shifts: " + error.message, 'error'));
}

// Create a new shift
function createShift() {
  const shiftName = document.getElementById('shift_name').value;
  const startTime = document.getElementById('start_time').value;
  const endTime = document.getElementById('end_time').value;

  if (!shiftName || !startTime || !endTime) {
    return showResponse('Please fill out all fields for creating a shift', 'error');
  }

  fetch(`${apiBaseUrl}/shifts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ shift_name: shiftName, start_time: startTime, end_time: endTime })
  })
    .then(response => response.json())
    .then(data => {
      showResponse(data.message);
      fetchShifts();
    })
    .catch(error => showResponse("Error creating shift: " + error.message, 'error'));
}

// Update a shift
function updateShift() {
  const shiftName = document.getElementById('update_shift_name').value;
  const newShiftName = document.getElementById('new_shift_name').value;
  const newStartTime = document.getElementById('new_start_time').value;
  const newEndTime = document.getElementById('new_end_time').value;

  if (!shiftName) {
    return showResponse('Please provide the shift name to update', 'error');
  }

  const data = {};
  if (newShiftName) data.shift_name = newShiftName;
  if (newStartTime) data.start_time = newStartTime;
  if (newEndTime) data.end_time = newEndTime;

  fetch(`${apiBaseUrl}/shifts/${shiftName}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      showResponse(data.message);
      fetchShifts();
    })
    .catch(error => showResponse("Error updating shift: " + error.message, 'error'));
}

// Delete a shift
function deleteShift() {
  const shiftName = document.getElementById('delete_shift_name').value;

  if (!shiftName) {
    return showResponse('Please provide the shift name to delete', 'error');
  }

  fetch(`${apiBaseUrl}/shifts/${shiftName}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(data => {
      showResponse(data.message);
      fetchShifts();
    })
    .catch(error => showResponse("Error deleting shift: " + error.message, 'error'));
}

// Search shifts
function searchShifts() {
  const shiftName = document.getElementById('search_shift_name').value;
  const startTime = document.getElementById('search_start_time').value;
  const endTime = document.getElementById('search_end_time').value;

  const queryParams = [];
  if (shiftName) queryParams.push(`shift_name=${shiftName}`);
  if (startTime) queryParams.push(`start_time=${startTime}`);
  if (endTime) queryParams.push(`end_time=${endTime}`);

  const searchUrl = `${apiBaseUrl}/shifts/search?${queryParams.join('&')}`;

  fetch(searchUrl)
    .then(response => response.json())
    .then(data => {
      let shiftsHtml = '';
      data.forEach(shift => {
        shiftsHtml += `<div><strong>${shift.shift_name}</strong> (From ${shift.start_time} to ${shift.end_time})</div>`;
      });
      document.getElementById('shifts-list').innerHTML = shiftsHtml;
    })
    .catch(error => showResponse("Error searching shifts: " + error.message, 'error'));
}