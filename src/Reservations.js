
//time
// Function to populate the time dropdown
function populateTimeDropdown() {
    const dropdown = document.getElementById('time');
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentTimeInMinutes = currentHours * 60 + currentMinutes;
    
    // Times available from 3:00 PM (15:00) to 10:00 PM (22:00) in 30-minute increments
    const timeOptions = [
        "15:30", "16:00", "16:30", "17:00", "17:30",
        "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"
    ];
    timeOptions.forEach(time => {
        const [hours, minutes] = time.split(':').map(Number);
        const timeInMinutes = hours * 60 + minutes;

        // Only add the option if the time has not passed
        if (timeInMinutes >= currentTimeInMinutes) {
            const option = document.createElement('option');
            option.value = time;
            option.textContent = `${hours > 12 ? hours - 12 : hours}:${minutes === 0 ? '00' : minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
            dropdown.appendChild(option);
        }
        
        /*
        //temp for testing
        const option = document.createElement('option');
        option.value = time;
        option.textContent = `${hours > 12 ? hours - 12 : hours}:${minutes === 0 ? '00' : minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
        dropdown.appendChild(option);
        */
    });
}
// Populate the dropdown on page load
window.onload = populateTimeDropdown;




// Set the minimum date to the current date
const today = new Date().toISOString().split('T')[0];
document.getElementById("date").setAttribute("min", today);

// Define which days are closed every week (Sunday: 0, Monday: 1)
const closedWeekDays = [0, 1];
// Function to check if a day is closed (Sunday or Monday)
function isClosedDay(dateString) {
  const date = new Date(dateString + "T00:00:00"); // Explicitly setting time to avoid timezone issues
  const day = date.getDay();
  return closedWeekDays.includes(day);
}
// Event listener to prevent selecting Sundays and Mondays
document.getElementById("date").addEventListener("input", (event) => {
  const selectedDate = event.target.value;
  if (isClosedDay(selectedDate)) {
    alert("The store is closed on Sundays and Mondays.");
    event.target.value = ""; // Clear the selection if it's a closed day
  }
});

