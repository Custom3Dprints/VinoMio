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

async function displayEvents() {
    try {
        const snapshot = await getDocs(collection(db, 'Events'));

        // Create a section to hold the events
        const section = document.createElement('div');

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const endDate = new Date();
        // Get current date and date 7 days in the future
        endDate.setDate(today.getDate() + 6);
        endDate.setHours(23, 59, 59, 999);

        // Array to hold valid events
        const eventsArray = [];

        // Loop through each document in the snapshot
        snapshot.forEach(doc => {
            const eventData = doc.data();
            const getDate = new Date(eventData.date);

            // Adjust the date for time zone if necessary
            const adjustedDate = new Date(getDate.getTime() + getDate.getTimezoneOffset() * 60000);

            if (adjustedDate >= today && adjustedDate <= endDate) {
                // Push valid events to the array
                eventsArray.push({ ...eventData, adjustedDate });
            }
        });

        // Sort events by date
        eventsArray.sort((a, b) => a.adjustedDate - b.adjustedDate);

        // Loop through the sorted events array to create event cards
        eventsArray.forEach(eventData => {
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card');

            const eventImage = document.createElement('img');
            eventImage.src = eventData.imageUrl;
            eventImage.alt = 'Event Image';

            // Create a div to contain the p tags
            const pContainer = document.createElement('div');
            pContainer.classList.add('p-container');

            // Format the date from YYYY-MM-DD to MM/DD/YYYY
            const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
            const formattedDate = eventData.adjustedDate.toLocaleDateString('en-US', options);

            const eventDate = document.createElement('p');
            eventDate.textContent = `Date: ${formattedDate}`;

            const eventDescription = document.createElement('p');
            eventDescription.textContent = `Description: ${eventData.description}`;

            // Append the p tags to the p-container div
            pContainer.appendChild(eventDate);
            pContainer.appendChild(eventDescription);

            // Append elements to the event card
            eventCard.appendChild(eventImage);
            eventCard.appendChild(pContainer);

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
