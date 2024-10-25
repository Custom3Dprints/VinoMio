

//navbar.html in Home.html
// Fetch navbar.html and insert its content into #navbar
fetch('../public/navbar.html')
	.then(response => response.text())
	.then(html => {
		document.getElementById('navbar').innerHTML = html;
		
		// Attach event listeners
		document.getElementById('home-link').addEventListener('click', () => window.location.href = "../public/Home.html");
		document.getElementById('menu-link').addEventListener('click', () => window.location.href = "../public/Menu.html");
		document.getElementById('reservations-link').addEventListener('click', () => window.location.href = "../public/Reservations.html");
		document.getElementById('events-link').addEventListener('click', () => window.location.href = "../public/Events.html");
		document.getElementById('about-link').addEventListener('click', () => window.location.href = "../public/About.html");
		document.getElementById('reviews-link').addEventListener('click', () => window.location.href = "../public/Reviews.html");
		
		// Mobile menu toggle
		const menu = document.querySelector('#mobile-menu');
		const menuLinks = document.querySelector('.navbar__menu');
		menu.addEventListener('click', function(){
			menu.classList.toggle('is-active');
			menuLinks.classList.toggle('active');
		});
	});

