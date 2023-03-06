


// Get reference to location input and mechanic list
// const locationInput = document.getElementById('location');
// const mechanicList = document.getElementById('mechanic-list');

// function sortedMechanics(event) {
//     // Prevent form submission
//     event.preventDefault();

//     // Get user input location
//     const userLocation = locationInput.value;

//     // Filter mechanics based on location
//     const filteredMechanics = Array.from(mechanicList.children).filter(function (mechanic) {
//         const mechanicLocation = mechanic.querySelector('p:nth-of-type(3)').textContent;
//         return mechanicLocation.includes(userLocation);
//     });

//     // Clear list of mechanics
//     while (mechanicList.firstChild) {
//         mechanicList.removeChild(mechanicList.firstChild);
//     }

//     // Display filtered mechanics
//     filteredMechanics.forEach(function (mechanic) {
//         mechanicList.appendChild(mechanic);

//         // Navigate to new page
//         window.location.href = "/recommended-services.html";
//     });
// }

const findServiceButton = document.getElementById('find-service-button');

findServiceButton.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent form submission

    const locationInput = document.getElementById('location');
    const locationValue = locationInput.value.trim(); // Get input value and trim whitespace

    const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i; // Regular expression for British postcode format
    if (!postcodeRegex.test(locationValue)) {
        alert('Please enter a valid British postcode'); // Display error message if input is not a valid postcode
        return; // Exit the function
    }

    const numberPlateInput = document.getElementById('number-plate');
    const numberPlateValue = numberPlateInput.value.trim(); // Get input value and trim whitespace

    const numberPlateRegex = /^([A-HJ-PR-Y]{2}\d{2}\s?[A-Z]{3})|(([A-HJ-PR-Y]{1}[A-Z]{1}\d{1})|([A-HJ-PR-Y]{1}\d{1}[A-Z]{1})|([A-HJ-PR-Y]{1}[A-Z]{1}\d{1}[A-Z]{1})|([A-HJ-PR-Y]{1}\d{1}[A-Z]{1}[A-Z]{1}))\s?[A-HJ-PR-Z]{3}$/i; // Regular expression for British number plate format
    if (!numberPlateRegex.test(numberPlateValue)) {
        alert('Please enter a valid British number plate'); // Display error message if input is not a valid number plate
        return; // Exit the function
    }

    // Navigate to services page
    window.location.href = '/recommended-services.html';
});


// // Add event listener to form submit
// document.querySelector('.ServiceContainer form').addEventListener('submit', function (event) {

// window.location.href = "/recommended-services.html";
// }
// );


/***********************************************
 * Showing map of recommended services
 **********************************************/

let mapLink = document.getElementById('map-button');
let mapContainer = document.getElementById("map-container");
mapLink.addEventListener("click", function () {
    if (mapContainer.style.display === "none") {
        mapContainer.style.display = "block";
    } else {
        mapContainer.style.display = "none";
    }
});
