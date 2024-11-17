let shifts = [];

function displayShifts() {
    const shiftList = document.getElementById('shiftList');
    shiftList.innerHTML = ''; // Clear the current list

    shifts.forEach((shift, index) => {
        const shiftDiv = document.createElement('div');
        shiftDiv.innerHTML = `
            <strong>${shift.title}</strong> - 
            ${shift.date} - 
            ${shift.startTime} to ${shift.endTime} - 
            Assigned to: ${shift.employee} (${shift.designation})
            <button onclick="deleteShift(${index})">Delete</button>
        `;
        shiftList.append(shiftDiv); // Add to the DOM
    });
}

document.getElementById('add_shift').addEventListener('click', () => {
    // Create a new shift from form inputs
    const newShift = {
        title: document.getElementById('shift-title').value,
        date: document.getElementById('shift-date').value,
        startTime: document.getElementById('start-time').value,
        endTime: document.getElementById('end-time').value,
        employee: document.getElementById('employee-name').value,
        designation: document.getElementById('employee-designation').value
    };

    shifts.push(newShift); // Add the new shift to the array
    displayShifts(); // Update the displayed list
});

function deleteShift(index) {
    shifts.splice(index, 1); // Remove the shift at the specified index
    displayShifts(); // Update the displayed list
}
