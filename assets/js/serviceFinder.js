

(function () {
    "use strict";
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
            alert('Please enter a valid British postcode, like SE1 6RN'); // Display error message if input is not a valid postcode
            return; // Exit the function
        }

        const numberPlateInput = document.getElementById('number-plate');
        const numberPlateValue = numberPlateInput.value.trim(); // Get input value and trim whitespace

        const numberPlateRegex = /^([A-HJ-PR-Y]{2}\d{2}\s?[A-Z]{3})|(([A-HJ-PR-Y]{1}[A-Z]{1}\d{1})|([A-HJ-PR-Y]{1}\d{1}[A-Z]{1})|([A-HJ-PR-Y]{1}[A-Z]{1}\d{1}[A-Z]{1})|([A-HJ-PR-Y]{1}\d{1}[A-Z]{1}[A-Z]{1}))\s?[A-HJ-PR-Z]{3}$/i; // Regular expression for British number plate format
        if (!numberPlateRegex.test(numberPlateValue)) {
            alert('Please enter a valid British number plate, like AA11 AAA'); // Display error message if input is not a valid number plate
            return; // Exit the function
        }

        // Send the registration number to the vehicleEnquiry.js file using an HTTP POST request
        const xhr = new XMLHttpRequest();
        const url = '/backend/vehicle-enquiry.js'; // URL of the vehicle-enquiry.js file
        const data = JSON.stringify({ registrationNumber: numberPlateValue });// Data to send in the request

        xhr.open('GET', url, true); //GTP gave POST but browser said method not allowed
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (this.status === 200) {
                console.log(data + ' is being sent to ' + url)

                // console.log(this.responseText)
                // // Parse the response JSON object and display the make, colour, and yearOfManufacture
                // const response = JSON.parse(this.responseText);
                // console.log('Make:', response.make);
                // console.log('Colour:', response.colour);
                // console.log('Year of Manufacture:', response.yearOfManufacture);
            }
            else {
                console.log(this.status)
            }
        };

        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.staus == 200) {
                console.log('success!!');
            }
        }

        xhr.onerror = function () {
            console.error('Error:', xhr.statusText);
        };

        xhr.send(data);// Send the request


        // Navigate to services page
        window.location.href = '/repair-conversion.html';
    });



    /***********************************************
     * Showing map of recommended services,, doenst work atm, I use the inline JS script on that page
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


    /***********************************************
     * button to book mechanic
     **********************************************/

    // const bookButtons = document.getElementsByClassName('book-mechanic');
    const bookButtons = document.querySelectorAll('.book-mechanic');

    bookButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.location.href = '/appointment.html';
        });
    });
})()