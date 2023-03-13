
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

let slideshowTimeout;

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("Green-mySlides");
    let dots = document.getElementsByClassName("Green-dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" Green-active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " Green-active";

    // Clear the timeout when the mouse is over the current slide
    let currentSlide = slides[slideIndex - 1];
    currentSlide.addEventListener("mouseover", function () {
        clearTimeout(slideshowTimeout);
    });

    // Set the timeout again when the mouse moves away from the current slide
    currentSlide.addEventListener("mouseout", function () {
        slideshowTimeout = setTimeout(function () {
            plusSlides(1);
        }, 2000);
    });

    // Clear the timeout when the mouse is over the previous/next symbols
    let prevSymbol = document.getElementsByClassName("Green-prev")[0];
    let nextSymbol = document.getElementsByClassName("Green-next")[0];
    prevSymbol.addEventListener("mouseover", function () {
        clearTimeout(slideshowTimeout);
    });
    nextSymbol.addEventListener("mouseover", function () {
        clearTimeout(slideshowTimeout);
    });

    // Set the timeout again when the mouse moves away from the previous/next symbols
    prevSymbol.addEventListener("mouseout", function () {
        slideshowTimeout = setTimeout(function () {
            plusSlides(-1);
        }, 2000);
    });
    nextSymbol.addEventListener("mouseout", function () {
        slideshowTimeout = setTimeout(function () {
            plusSlides(1);
        }, 2000);
    });
}

function plusSlides(n) {
    clearTimeout(slideshowTimeout); // clear the timeout when the symbols are clicked
    showSlides(slideIndex += n);
    slideshowTimeout = setTimeout(function () {
        plusSlides(1);
    }, 2000);
}

