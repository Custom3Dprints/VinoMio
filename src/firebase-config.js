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
        // Check for closed days and reservations before submitting
        const closedDays = await getClosedDays();
        const reservedTimes = await getReservations(date);

        // Check if the selected date is a closed day
        if (closedDays.includes(date)) {
            alert("The selected date is closed. Please choose another date.");
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
                date
            });
            console.log("Reservation added successfully!");
            setTimeout(() => {
                location.reload();
            }, 800);
        } catch (error) {
            console.error("Error adding reservation: ", error);
        }
    }
}

// Function to fetch closed days
async function getClosedDays() {
    const closedDaysSnapshot = await getDocs(collection(db, "ClosedDays"));
    const closedDays = closedDaysSnapshot.docs.map(doc => doc.data().date);
    return closedDays;
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
        alert("The selected date is closed. Please choose another date.");
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

