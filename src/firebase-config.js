import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

let closedDaysCache = [];

// Fetch closed days when the page loads and store them in a variable
window.onload = async function() {
    closedDaysCache = await getClosedDays();
    console.log("Closed Days:", closedDaysCache); // Debugging line to check fetched closed days
};


// Add event listener to the submit button
document.getElementById('submitBtn').addEventListener('click', submitData);

// Function to submit reservation data
async function submitData() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const people = document.getElementById('people').value;
    const time = document.getElementById('time').value;
    const date = document.getElementById('date').value;

    if (!name || !email || !phone || !people || !time || !date) {
        alert("Error! Please fill in all fields.");
    } else {
        // Ensure the date format matches that in Firestore
        const formattedDate = new Date(date).toISOString().slice(0, 10); // Format to YYYY-MM-DD

        // Check for closed days and reservations before submitting
        const closedDays = await getClosedDays();
        const reservedTimes = await getReservations(formattedDate);

        // Check if the selected date is a closed day
        if (closedDays.includes(formattedDate)) {
            alert("Appoligies for the inconvience, Vino Mío is Closed this day. Please choose another date.");
            return;
        }

        // Check if the selected time is already reserved
        if (reservedTimes.includes(time)) {
            alert("The selected time is unavailable. Please choose another time.");
            return;
        }

        try {
            // Add the reservation to Firestore
            await addDoc(collection(db, "Reservations"), {
                name,
                email,
                phone,
                people,
                time,
                date: formattedDate
            });
            console.log("Reservation added successfully!");
            window.location.href = '../public/SucessPage.html';
        } catch (error) {
            console.error("Error adding reservation: ", error);
        }
    }
}


// Add event listener to check date on selection
document.getElementById('date').addEventListener('change', function() {
    const selectedDate = new Date(this.value).toISOString().slice(0, 10); // Format to YYYY-MM-DD
    console.log("Selected Date:", selectedDate); // Debugging line to check selected date format

    if (closedDaysCache.includes(selectedDate)) {
        alert("Appoligies for the inconvience, Vino Mío is Closed this day. Please choose another date.");
        this.value = ""; // Clear the selected date
    }
});
// Function to fetch closed days
async function getClosedDays() {
    const closedDaysSnapshot = await getDocs(collection(db, "DaysClosed"));
    return closedDaysSnapshot.docs.map(doc => doc.data().date);
}

// Function to fetch reservations for a specific date
async function getReservations(date) {
    const reservationsSnapshot = await getDocs(query(collection(db, "Reservations"), where("date", "==", date)));
    const reservedTimes = reservationsSnapshot.docs.map(doc => doc.data().time);
    return reservedTimes;
}

// Event listener for date selection
document.getElementById("date").addEventListener("change", async function() {
    await DaysOpen.call(this);
});

// Function to check open days and populate time options
async function DaysOpen() {
    const selectedDate = this.value;

    // Fetch closed days and reservations
    const closedDays = await getClosedDays();
    const reservedTimes = await getReservations(selectedDate);

    // Check if the selected date is a closed day
    if (closedDays.includes(selectedDate)) {
        alert("Apologies for the inconvience, Vino Mío is Closed this day. Please choose another date.");
        this.value = ""; // Clear the selected date
        document.getElementById("time").innerHTML = ""; // Clear time options
        return;
    }

    // Populate the time dropdown based on reserved times
    const timeDropdown = document.getElementById("time");
    timeDropdown.innerHTML = ""; // Clear previous options

    const availableTimes = [
        "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
        "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
        "21:00", "21:30", "22:00"
    ];

    availableTimes.forEach(time => {
        if (!reservedTimes.includes(time)) {
            const [hours, minutes] = time.split(':').map(Number);
            const option = document.createElement("option");
            option.value = time;
            option.textContent = `${hours > 12 ? hours - 12 : hours}:${minutes === 0 ? '00' : minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
            timeDropdown.appendChild(option);
        }
    });
}

