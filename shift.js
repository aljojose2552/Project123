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

    // adding or updating shift
    document.getElementById("shiftForm").addEventListener("submit", async (event) => {
        event.preventDefault();
    
        const shiftName = document.getElementById("shiftName").value;
        const startTime = document.getElementById("startTime").value;
        const endTime = document.getElementById("endTime").value;
    
        try {
          const response = await fetch(`${apiBaseUrl}/${shiftName}`, {
            method: "PUT", // PUT for update
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ shift_name: shiftName, start_time: startTime, end_time: endTime })
          });
    
          if (!response.ok && response.status === 404) {
            // shift dnot exist, create new 
            await fetch(apiBaseUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ shift_name: shiftName, start_time: startTime, end_time: endTime })
            });
          }
          
          alert("Shift saved successfully!");
          document.getElementById("shiftForm").reset();
          fetchShifts(); 
        } catch (error) {
          console.error("Error saving shift:", error);
        }
      });