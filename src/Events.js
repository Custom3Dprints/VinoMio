import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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
const db = getFirestore(app);

const events_container = document.getElementById("events-container");
events_container.innerHTML = '<h2>Events</h2>';

async function displayEvents() {
    try {
        const snapshot = await getDocs(collection(db, 'Events'));

        // Create a section to hold the events
        const section = document.createElement('div');

        // Loop through each document in the snapshot
        snapshot.forEach(doc => {
            const eventData = doc.data();

            // Create elements to display the event data
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card');

            const eventDate = document.createElement('p');
            eventDate.textContent = `Date: ${eventData.date}`;

            const eventDescription = document.createElement('p');
            eventDescription.textContent = `Description: ${eventData.description}`;

            const eventImage = document.createElement('img');
            eventImage.src = eventData.imageUrl;
            eventImage.alt = 'Event Image';

            // Append the elements to the event card
            eventCard.appendChild(eventDate);
            eventCard.appendChild(eventDescription);
            eventCard.appendChild(eventImage);

            // Append each event card to the section
            section.appendChild(eventCard);
        });

        // Append the section to the events container
        events_container.appendChild(section);

    } catch (error) {
        console.error("Error fetching events:", error);
    }
}

document.addEventListener("DOMContentLoaded", displayEvents);




