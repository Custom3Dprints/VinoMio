const googleApiKey = process.env.GOOGLE_API_KEY;
const googlePlaceID = process.env.GOOGLE_PLACE_ID;

console.log('Google API Key:', process.env.GOOGLE_API_KEY);
console.log('Google Place ID:', process.env.GOOGLE_PLACE_ID);


fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${googlePlaceID}&key=${googleApiKey}`)
    .then(response => response.json())
    .then(data => {
        const reviews = data.result.reviews;  // Extract reviews from response
        let reviewsHtml = '';  // Variable to store reviews in HTML format
        reviews.forEach(review => {
            // Add review details to the HTML string
            reviewsHtml += `
                <div class="review">
                    <h4>${review.author_name} - ${review.rating} stars</h4>
                    <p>${review.text}</p>
                </div>`;
        });
        // Insert the HTML string into the 'reviews-container' div
        document.getElementById('reviews-container').innerHTML = reviewsHtml;
    })
    .catch(error => console.error('Error fetching reviews:', error));  // Handle errors

