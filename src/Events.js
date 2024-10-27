import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.AMDID,
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

        // Create an array to hold the events
        const eventsArray = [];

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const endDate = new Date();
        // Get current date and date 7 days in the future
        endDate.setDate(today.getDate() + 6);
        endDate.setHours(23, 59, 59, 999);
        
        // Loop through each document in the snapshot
        snapshot.forEach(doc => {
            const eventData = doc.data();
            const eventDate = new Date(eventData.date);

            // Check if the event is within the next 7 days
            if (eventDate >= today && eventDate <= endDate) {
                // Add the event data and date to the events array
                eventsArray.push({ ...eventData, date: eventDate });
            }
        });

        // Sort the events array by date
        eventsArray.sort((a, b) => a.date - b.date);

        // Create a section to hold the events
        const section = document.createElement('div');

        // Loop through the sorted events array to create event cards
        eventsArray.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card');

            const eventImage = document.createElement('img');
            eventImage.src = event.imageUrl;
            eventImage.alt = 'Event Image';

            const eventDate = document.createElement('p');
            eventDate.className = "event-card_name";
            eventDate.textContent = `Date: ${event.date.toLocaleDateString()}`; // Format the date
            
            const eventDescription = document.createElement('p');
            eventDescription.className = "event-card_description";
            eventDescription.textContent = `Description: ${event.description}`;

            // Append the elements to the event card
            eventCard.appendChild(eventImage);
            eventCard.appendChild(eventDate);
            eventCard.appendChild(eventDescription);

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




