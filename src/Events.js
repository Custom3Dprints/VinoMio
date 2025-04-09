// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// Initialize Firebase
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
const storage = getStorage(app);

const events_container = document.getElementById("events-container");
events_container.innerHTML = '<h2>Eventos</h2>';

async function displayEvents() {
    try {
        const snapshot = await getDocs(collection(db, 'Events'));

        // Verify if any documents were fetched
        console.log("Number of events fetched:", snapshot.size);

        // Create a section to hold the events
        const section = document.createElement('div');

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setDate(today.getDate() + 6);
        endDate.setHours(23, 59, 59, 999);

        const eventsArray = [];

        for (const doc of snapshot.docs) {
            const eventData = doc.data();
            console.log("Event data:", eventData);

            const getDate = new Date(eventData.date);
            const adjustedDate = new Date(getDate.getTime() + getDate.getTimezoneOffset() * 60000);

            if (adjustedDate >= today && adjustedDate <= endDate) {
                let imageUrl = eventData.imageUrl;
                if (!imageUrl.startsWith("http")) {
                    const imageRef = ref(storage, imageUrl);
                    imageUrl = await getDownloadURL(imageRef);
                }

                eventsArray.push({ ...eventData, adjustedDate, imageUrl });
            }
        }

        // Sort and log sorted events
        eventsArray.sort((a, b) => a.adjustedDate - b.adjustedDate);
        console.log("Sorted events:", eventsArray);

        if (eventsArray.length === 0) {
            console.log("No events found in the specified date range.");
            section.innerHTML = "<p>No hay eventos próximos.</p>";
        } else {
            eventsArray.forEach(eventData => {
                const eventCard = document.createElement('div');
                eventCard.classList.add('event-card');

                const eventImage = document.createElement('img');
                eventImage.src = eventData.imageUrl;
                eventImage.alt = 'Event Image';

                const pContainer = document.createElement('div');
                pContainer.classList.add('p-container');

                const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
                const formattedDate = eventData.adjustedDate.toLocaleDateString('en-US', options);

                const eventDate = document.createElement('p');
                eventDate.textContent = `Fecha: ${formattedDate}`;

                const eventDescription = document.createElement('p');
                eventDescription.textContent = `\n${eventData.description}`;

                pContainer.appendChild(eventDate);
                pContainer.appendChild(eventDescription);
                eventCard.appendChild(eventImage);
                eventCard.appendChild(pContainer);

                section.appendChild(eventCard);
            });
        }

        // Append the section to the events container
        events_container.appendChild(section);
        console.log("Events added to container.");

    } catch (error) {
        console.error("Error fetching events:", error);
    }
}

document.addEventListener("DOMContentLoaded", displayEvents);
