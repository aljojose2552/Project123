const apiBaseUrl = "http://localhost:3000"; // Replace with your actual backend URL


function showResponse(message, type = 'success') {
  const responseDiv = document.getElementById('response');
  responseDiv.className = type === 'success' ? 'response' : 'response error';
  responseDiv.textContent = message;

  setTimeout(() => {
    responseDiv.textContent = '';
    responseDiv.className = '';
  }, 5000);
}

function fetchShifts() {
  console.log("Fetching all shifts...");
  fetch(`${apiBaseUrl}/shifts`)
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch shifts');
      return response.json();
    })
    .then(data => {
      console.log('Shifts Data:', data);
      const shiftsList = document.getElementById('shifts-list');
      shiftsList.innerHTML = '';

      if (data.length === 0) {
        shiftsList.innerHTML = `<p>No shifts available.</p>`;
        return;
      }

      data.forEach(shift => {
        const div = document.createElement('div');
        div.className = 'shift-item';
        div.innerHTML = `<strong>${shift.shift_name}</strong> (From ${shift.start_time} to ${shift.end_time})`;
        shiftsList.appendChild(div);
      });
    })
    .catch(error => showResponse("Error fetching shifts: " + error.message, 'error'));
}

function createShift() {
  const shiftName = document.getElementById('shift_name').value.trim();
  const startTime = document.getElementById('start_time').value;
  const endTime = document.getElementById('end_time').value;

  if (!shiftName || !startTime || !endTime) {
    return showResponse('Please fill out all fields for creating a shift', 'error');
  }

  console.log('Creating shift:', { shiftName, startTime, endTime });

  fetch(`${apiBaseUrl}/shifts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ shift_name: shiftName, start_time: startTime, end_time: endTime })
  })
    .then(response => {
      if (!response.ok) throw new Error('Failed to create shift');
      return response.json();
    })
    .then(data => {
      showResponse(data.message || 'Shift created successfully');
      fetchShifts(); // Refresh the shifts list
    })
    .catch(error => showResponse("Error creating shift: " + error.message, 'error'));
}


function updateShift() {
  const shiftName = document.getElementById('update_shift_name').value.trim();
  const newShiftName = document.getElementById('new_shift_name').value.trim();
  const newStartTime = document.getElementById('new_start_time').value;
  const newEndTime = document.getElementById('new_end_time').value;

  if (!shiftName) {
    return showResponse('Please provide the shift name to update', 'error');
  }

  const data = {};
  if (newShiftName) data.shift_name = newShiftName;
  if (newStartTime) data.start_time = newStartTime;
  if (newEndTime) data.end_time = newEndTime;

  console.log('Updating shift:', { shiftName, data });

  fetch(`${apiBaseUrl}/shifts/${encodeURIComponent(shiftName)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) throw new Error('Failed to update shift');
      return response.json();
    })
    .then(data => {
      showResponse(data.message || 'Shift updated successfully');
      fetchShifts(); // Refresh the shifts list
    })
    .catch(error => showResponse("Error updating shift: " + error.message, 'error'));
}

function deleteShift() {
  const shiftName = document.getElementById('delete_shift_name').value.trim();

  if (!shiftName) {
    return showResponse('Please provide the shift name to delete', 'error');
  }

  console.log('Deleting shift:', shiftName);

  fetch(`${apiBaseUrl}/shifts/${encodeURIComponent(shiftName)}`, { method: 'DELETE' })
    .then(response => {
      if (!response.ok) throw new Error('Failed to delete shift');
      return response.json();
    })
    .then(data => {
      showResponse(data.message || 'Shift deleted successfully');
      fetchShifts(); // Refresh the shifts list
    })
    .catch(error => showResponse("Error deleting shift: " + error.message, 'error'));
}

function searchShifts() {
  const shiftName = document.getElementById('search_shift_name').value.trim();
  const startTime = document.getElementById('search_start_time').value;
  const endTime = document.getElementById('search_end_time').value;

  const queryParams = [];
  if (shiftName) queryParams.push(`shift_name=${shiftName}`);
  if (startTime) queryParams.push(`start_time=${startTime}`);
  if (endTime) queryParams.push(`end_time=${endTime}`);

  const searchUrl = `${apiBaseUrl}/shifts/search?${queryParams.join('&')}`;
  console.log('Searching shifts with URL:', searchUrl);

  fetch(searchUrl)
    .then(response => {
      if (!response.ok) throw new Error('Failed to search shifts');
      return response.json();
    })
    .then(data => {
      const shiftsList = document.getElementById('shifts-list');
      shiftsList.innerHTML = '';

      if (data.length === 0) {
        shiftsList.innerHTML = `<p>No shifts found.</p>`;
        return;
      }

      data.forEach(shift => {
        const div = document.createElement('div');
        div.className = 'shift-item';
        div.innerHTML = `<strong>${shift.shift_name}</strong> (From ${shift.start_time} to ${shift.end_time})`;
        shiftsList.appendChild(div);
      });
    })
    .catch(error => showResponse("Error searching shifts: " + error.message, 'error'));
}
document.getElementById('fetchShifts').addEventListener('click', fetchShifts);
document.getElementById('createShift').addEventListener('click', createShift);
document.getElementById('updateShift').addEventListener('click', updateShift);
document.getElementById('deleteShift').addEventListener('click', deleteShift);
document.getElementById('searchShifts').addEventListener('click', searchShifts);
