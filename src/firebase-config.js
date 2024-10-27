import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

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


document.getElementById('submitBtn').addEventListener('click', () => {submitData()});

async function submitData() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const people = document.getElementById('people').value;
    const time = document.getElementById('time').value;
    const date = document.getElementById('date').value;

    if (!name || !email || !phone || !people || !time || !date){
        alert("Error! Try Again")
    }else{
        try {
            await addDoc(collection(db, "Reservations"), {
                name: name,
                email: email,
                phone: phone,
                people: people,
                time: time,
                date: date
            });
            console.log("Reservation added successfully!");
            setTimeout(function(){
                location.reload();
            }, 800);
            
            //redirect to confirmation page and send confirmation email
        } catch (error) {
            console.error("Error adding reservation: ", error);
        }
    
    }
}
window.submitData = submitData;

