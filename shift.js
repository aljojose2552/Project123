const API_URL = 'http://localhost:3000'; // Backend URL

// Utility function to display response messages
const showMessage = (message, isError = false) => {
  const responseDiv = document.getElementById('response');
  responseDiv.textContent = message;
  responseDiv.style.color = isError ? 'red' : 'green';
  setTimeout(() => (responseDiv.textContent = ''), 5000);
};

// Fetch all shifts
document.getElementById('fetchShifts').addEventListener('click', async () => {
  try {
    const response = await fetch(`${API_URL}/shifts`);
    const data = await response.json();

    if (response.ok) {
      const shiftsList = document.getElementById('shifts-list');
      shiftsList.innerHTML = data
        .map((shift) => `<p>${shift.shift_name} - ${shift.start_time} to ${shift.end_time}</p>`)
        .join('');
    } else {
      showMessage(data.error || 'Failed to fetch shifts', true);
    }
  } catch (error) {
    console.error('Error fetching shifts:', error);
    showMessage('Error fetching shifts', true);
  }
});

// Search shifts
document.getElementById('searchShifts').addEventListener('click', async () => {
  const shiftName = document.getElementById('search_shift_name').value;

  try {
    const response = await fetch(`${API_URL}/shifts/search?shift_name=${shiftName}`);
    const data = await response.json();

    if (response.ok) {
      const shiftsList = document.getElementById('shifts-list');
      shiftsList.innerHTML = data
        .map((shift) => `<p>${shift.shift_name} - ${shift.start_time} to ${shift.end_time}</p>`)
        .join('');
    } else {
      showMessage(data.message || 'No shifts found', true);
    }
  } catch (error) {
    console.error('Error searching shifts:', error);
    showMessage('Error searching shifts', true);
  }
});

// Create a new shift
document.getElementById('createShift').addEventListener('click', async () => {
  const shiftName = document.getElementById('shift_name').value;
  const startTime = document.getElementById('start_time').value;
  const endTime = document.getElementById('end_time').value;

  try {
    const response = await fetch(`${API_URL}/shifts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ shift_name: shiftName, start_time: startTime, end_time: endTime }),
    });

    const data = await response.json();

    if (response.ok) {
      showMessage('Shift created successfully');
    } else {
      showMessage(data.error || 'Failed to create shift', true);
    }
  } catch (error) {
    console.error('Error creating shift:', error);
    showMessage('Error creating shift', true);
  }
});

// Update a shift
document.getElementById('updateShift').addEventListener('click', async () => {
  const currentShiftName = document.getElementById('update_shift_name').value;
  const newShiftName = document.getElementById('new_shift_name').value;
  const newStartTime = document.getElementById('new_start_time').value;
  const newEndTime = document.getElementById('new_end_time').value;

  try {
    const response = await fetch(`${API_URL}/shifts/${currentShiftName}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        shift_name: newShiftName,
        start_time: newStartTime,
        end_time: newEndTime,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      showMessage(`Shift "${currentShiftName}" updated successfully`);
    } else {
      showMessage(data.error || `Failed to update shift "${currentShiftName}"`, true);
    }
  } catch (error) {
    console.error('Error updating shift:', error);
    showMessage('Error updating shift', true);
  }
});

// Delete a shift
document.getElementById('deleteShift').addEventListener('click', async () => {
  const shiftName = document.getElementById('delete_shift_name').value;

  try {
    const response = await fetch(`${API_URL}/shifts/${shiftName}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (response.ok) {
      showMessage(`Shift "${shiftName}" deleted successfully`);
    } else {
      showMessage(data.error || `Failed to delete shift "${shiftName}"`, true);
    }
  } catch (error) {
    console.error('Error deleting shift:', error);
    showMessage('Error deleting shift', true);
  }
});
