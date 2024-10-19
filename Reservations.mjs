// Submit data to Firestore
document.getElementById('submitBtn').addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const people = document.getElementById('people').value;
    const time = document.getElementById('time').value;
    const date = document.getElementById('date').value;

    try {
        await db.collection('Reservations').add({
            name: name,
            email: email,
            phone: phone,
            people: people,
            time: time,
            date: date
        });
        console.log("Reservation added successfully!");
    } catch (error) {
        console.error("Error adding reservation: ", error);
    }
});