
/**********************
 * collapsible for mechanic booking
 **********************/
const coll = document.getElementsByClassName("green-collapsible");
for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        const content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}


/**********************
 appointment calendar
 **********************/

let calendarBody = document.getElementById('green-calendar-body');
let monthYear = document.getElementById('month-year');
let prevMonthBtn = document.getElementById('prev-month');
let nextMonthBtn = document.getElementById('next-month');
let bookBtn = document.getElementById('book-btn');
let selectedDateInput = document.getElementById('selected-date');
let selectedDate;


// function to generate calendar
function generateCalendar(month, year) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const calendarRows = Math.ceil((daysInMonth + firstDayOfMonth) / 7);

    let calendarHTML = '';
    let date = 1;

    for (let i = 0; i < calendarRows; i++) {
        calendarHTML += '<tr>';
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDayOfMonth) {
                calendarHTML += '<td></td>';
            } else if (date > daysInMonth) {
                calendarHTML += '<td></td>';
            } else {
                const dateString = `${year}-${month + 1}-${date}`;
                calendarHTML += `<td data-date="${dateString}">${date}</td>`;
                date++;
            }
        }
        calendarHTML += '</tr>';
    }

    calendarBody.innerHTML = calendarHTML;
    monthYear.textContent = `${new Date(year, month).toLocaleDateString('default', {
        month: 'long',
    })} ${year}`;
}

// initialize calendar with current month and year
let currentDate = new Date();
let currentDay = currentDate.getDay();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
generateCalendar(currentMonth, currentYear);


calendarBody.addEventListener('click', (e) => {
    const clickedDate = e.target.dataset.date;
    if (clickedDate) {
        selectedDate = clickedDate;
        const selectedCell = calendarBody.querySelector(`[data-date="${selectedDate}"]`);
        const selectedCells = calendarBody.querySelectorAll('.selected');
        selectedCells.forEach((cell) => cell.classList.remove('selected'));
        selectedCell.classList.add('selected');
        selectedDateInput.value = selectedDate;
        bookBtn.style.display = 'block';

        selectedCell.classList.add('selected-date');
    }
});


// add event listener to the book button
bookBtn.addEventListener('click', function () {
    if (selectedDate) {
        const selectedDateObj = new Date(selectedDate);
        const currentDateObj = new Date();

        if (selectedDateObj < currentDateObj) {
            alert('Selected date is in the past. Please select a future date to book an appointment');
        } else {
            showModal();
        }
    } else {
        alert('Please select a date first to book an appointment');
    }
});

// add event listener to the previous month button
prevMonthBtn.addEventListener('click', function () {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
});

// add event listener to the next month button
nextMonthBtn.addEventListener('click', function () {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
});

/**************************
 success modal
 *************************/

// Get the modal
const modal = document.getElementById('green-calendar-modal');

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('green-calendar-close')[0];

// Function to show the modal with success message
function showModal() {
    const successMessage = document.getElementById('success-message');
    successMessage.textContent = `Your appointment request on ${selectedDate} has been sent!`;
    modal.style.display = 'block';
}

// When the user clicks on <span> (x), close the modal
span.addEventListener('click', function () {
    modal.style.display = 'none';
    window.location.href = 'index.html'
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        window.location.href = 'index.html'
    }
});
