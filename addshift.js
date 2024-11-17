let shifts = []; // Store shifts

function displayShifts() {
    const shiftList = document.getElementById('shiftList');
    shiftList.innerHTML = ''; // Clear the list

    // Loop through shifts and display them
    shifts.forEach((shift, index) => {
        const shiftItem = document.createElement('div');
        shiftItem.classList.add('shift-item');
        shiftItem.innerHTML = `
            <strong>${shift.title}</strong><br>
            Date: ${shift.date}<br>
            Time: ${shift.startTime} - ${shift.endTime}<br>
            Assigned to: ${shift.employee} (${shift.designation})<br>
            <button onclick="deleteShift(${index})">Delete</button>
        `;
        shiftList.appendChild(shiftItem);
    });
}

// Add shift functionality
document.getElementById('add-shift').addEventListener('click', () => {
    const newShift = {
        title: document.getElementById('shift-title').value,
        date: document.getElementById('shift-date').value,
        startTime: document.getElementById('start-time').value,
        endTime: document.getElementById('end-time').value,
        employee: document.getElementById('employee-name').value,
        designation: document.getElementById('employee-designation').value,
    };

    // Add new shift to array and display
    shifts.push(newShift);
    displayShifts();

    // Clear the input fields
    document.getElementById('shift-title').value = '';
    document.getElementById('shift-date').value = '';
    document.getElementById('start-time').value = '';
    document.getElementById('end-time').value = '';
    document.getElementById('employee-name').value = '';
    document.getElementById('employee-designation').value = '';
});

// Delete shift functionality
function deleteShift(index) {
    shifts.splice(index, 1); // Remove the shift at the index
    displayShifts(); // Update the list
}
