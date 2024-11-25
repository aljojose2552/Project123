const apiBaseUrl = "http://localhost:3000/shifts";

//display shift

async function fetchShifts() {
    try {
      const response = await fetch(apiBaseUrl);
      const shifts = await response.json();
      const tableBody = document.querySelector("#shiftTable tbody");
      tableBody.innerHTML = ""; 

      shifts.forEach(shift => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${shift.shift_name}</td>
          <td>${shift.start_time}</td>
          <td>${shift.end_time}</td>
          <td>
            <button onclick="populateForm('${shift.shift_name}', '${shift.start_time}', '${shift.end_time}')">Edit</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Error fetching shifts:", error);
    }
  }

  function populateForm(shiftName, startTime, endTime) {
    document.getElementById("shiftName").value = shiftName;
    document.getElementById("startTime").value = startTime;
    document.getElementById("endTime").value = endTime;
  }