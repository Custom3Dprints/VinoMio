// Set the minimum date to the current date
const today = new Date().toISOString().split('T')[0];
document.getElementById("date").setAttribute("min", today);
