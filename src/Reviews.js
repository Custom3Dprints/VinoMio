// Function to dynamically create and append images
function loadImages() {
    const reviewsContainer = document.getElementById('reviewsContainer');
    const totalImages = 9; // Change this to the total number of images you have

    for (let i = 1; i <= totalImages; i++) {
        const img = document.createElement('img');
        img.src = `../src/images/reviews/img${i}.png`; // Construct the image source dynamically
        img.alt = `Review Image ${i}`; // Customize alt text as needed
        img.className = "review-image"; // Add the class for styling

        reviewsContainer.appendChild(img); // Append image to the container
    }
}

// Call the function to load images when the page loads
window.onload = loadImages;
