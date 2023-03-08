

let modalSignUp = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target === modal) {
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