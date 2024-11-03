// List of images in the folder
const images = [
    '../src/images/about/Juan_Carlos.jpg',
    '../src/images/about/image1.jpg',
    '../src/images/about/image2.jpg',
    '../src/images/about/image3.jpg',
    '../src/images/about/image4.jpg',
    '../src/images/about/image5.jpg',
    '../src/images/about/image6.jpg',
];

let currentImageIndex = 0;
const slideshowImage = document.getElementById('slideshow-image');
// Preload images for smoother transitions
images.forEach((src) => {
    const img = new Image();
    img.src = src;
});

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    slideshowImage.src = images[currentImageIndex];
    slideshowImage.style.opacity = 1;
}

// Start the slideshow with the first image
slideshowImage.src = images[currentImageIndex];
slideshowImage.style.opacity = 1;
// Cycle through images every 3 seconds with a fade effect
setInterval(() => {
    // Fade out the current image
    slideshowImage.style.opacity = 0;
    // Wait 1 second for fade-out, then change the image and fade in
    setTimeout(() => {
        showNextImage();
    }, 1000); // 1 second fade-out time
}, 3000); // 3 seconds per image