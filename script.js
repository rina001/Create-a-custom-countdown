const countdownForm = document.getElementById('countdownForm');
const inputContainer = document.getElementById('input-container');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let saveCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min & Value with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('minute', today);

//Populate Countdown / Complete UI
 function updateDOM() {
    countdownActive= setInterval(()  => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance  % day) / hour);
        const minutes = Math.floor((distance  % hour) / minute);
        const seconds = Math.floor((distance  % minute) / second);
       
    
// Hide input
    inputContainer.hidden = true;
// If the countdown has ended, show complete
if (distance < 0) {
    countdownEl.hidden = true;
    clearInterval(countdownEl);
    completeElInfo.textContent = '${countdownTitle} finished on ${countdownDate}';
    completeEl.hidden = false;
} esle 
{
    // Else, show the countdown in progress
    countdownElTitle.textContent = '${countdownTitle}';
    timeElements[0].textContent = '${days}';
    timeElements[1].textContent = '${hours}';
    timeElements[2].textContent = '${minutes}';
    timeElements[3].textContent = '${seconds}';
    completeEl.hidden = true;
    countdownEl.hidden = false;
  } 
},  second);

}

// Take Values from Form Input
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle =e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    saveCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };

    localStorage.setItem('countdown', JSON.stringify(saveCountdown));
    //Check for valid date
    if (countdownDate === '') {
        alert('Please select a date for the countdown.');
    } else {
        // Get number version of current Date, updateDom
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}


// Reset All Values
function reset() {
    // Hide Countdowns, show input
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    // Stop the countdown
    clearInterval(countdownActive);
    // Reset values
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}

function restorePreviousCountdown() {
    // Get countdown from localstorage if available
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        saveCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = saveCountdown.title;
        countdownDate = saveCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Event Listeners
countdownForm.addEventListener('submit',updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// On load, check localstorage
restorePreviousCountdown();
