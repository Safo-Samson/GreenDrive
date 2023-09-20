

let modalSignUp = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target === modalSignUp) {
        modalSignUp.style.display = "none";
    }
}

// Get the login modal
let modalLogin = document.getElementById('id02');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target === modalLogin) {
        modalLogin.style.display = "none";
    }
}

/*************************************************
 *  To restrict access to the list of provider page
 * ***********************************************
 * This code assumes that you have a server-side endpoint at /check-login that returns a status code of 200 if the user is logged in,
 * and a different status code (e.g. 401) if the user is not logged in. You will need to implement this
 * endpoint on your server to check if the user is logged in or not.
 */


const links = document.querySelectorAll('.restricted-linkss'); /*meant to be .restricted-link, i added the double ss just to skip this process for the interview demo */

links.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // Send an AJAX request to check if the user is logged in
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/check-login');
        xhr.onload = function () {
            if (xhr.status === 200) {
                // If the user is logged in, allow the link to be clicked
                window.location.href = links.href;
            } else {
                // If the user is not logged in, show a login prompt or redirect them to the login page
                alert('Please login to access our service providers');
                window.location.href = '/login-page.html';
                // window.location.href = '/login.html';
            }
        };
        xhr.send();
    })
});


// const links = document.querySelectorAll('.restricted-link');

// links.forEach(link => {
//     link.addEventListener('click', async function (e) {
//         e.preventDefault();
//         const response = await fetch('/api/user-info');
//         console.log(response)
//         const data = await response.json();
//         if (response.status === 200) {
//             // user is authenticated, continue with the link action
//             window.location.href = link.href;
//         } else {
//             alert('Please login to access our service providers');
//             // user is not authenticated, redirect to login page
//             window.location.href = '/login.html';
//         }
//     })
// });