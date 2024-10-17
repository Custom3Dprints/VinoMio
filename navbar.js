

//navbar.html in Home.html
fetch('navbar.html')
    .then(response => response.text())
    .then(html => document.getElementById('navbar').innerHTML = html);


function Home() {
    window.location.href = "Home.html";
}
function Menu() {
    window.location.href = "Menu.html";
}
function Reservations() {
    window.location.href = "Reservations.html";
}
function Events() {
    window.location.href = "Events.html";
}
function About() {
    window.location.href = "About.html";
}
function Reviews() {
    window.location.href = "Reviews.html";
}

