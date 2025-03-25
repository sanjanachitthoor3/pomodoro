
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const statusDisplay = document.getElementById('status');


let isRunning = false;
let isPaused = false;
let timer;
let minutes; 
minutes = parseInt(prompt("Enter pomodoro duration:", "25"));
if (isNaN(minutes) || minutes <= 0) {
    minutes = 25; // Default to 25 minutes if the input is invalid
}
let seconds = 0;
let timeRemaining = minutes * 60 + seconds; 
updateDisplay();




function ringbell(){
    bell=document.getElementById('bell');
    bell.play()
}

function updateDisplay() {
    minutesDisplay.textContent = String(minutes).padStart(2, '0');           //adds a padding-value till certain length of str - padstart(length, padval)
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}


function startTimer() {
    if (!isRunning && !isPaused) {   //didnt start timer at all
        timer=setInterval(countdown,1000)                                    //builtin fx used to call "countdown" fx every 1s
        statusDisplay.textContent = "Keep going Sanjana!!";
        startBtn.textContent = "Pause";
        ringbell();
    }  
    else if (isPaused) {         //if paused
        timer = setInterval(countdown, 1000);     // Continue countdown from where it left off
        statusDisplay.textContent = "Keep going Sanjana!!";
        startBtn.textContent = "Pause"; 
        isPaused = false; //we started timer bc it was paused, so no longer true
        ringbell();
    }
    isRunning = true //this fx is to start the timer
}


function pauseTimer() {
    clearInterval(timer);                                                     //built in fx used to end setinterval fx execution
    statusDisplay.textContent = "Timer Paused"; 
    startBtn.textContent = "Resume"; 
    isRunning = false; 
    isPaused = true;
}


function countdown() {
    if (timeRemaining <= 0) {
        clearInterval(timer); // Stop the timer when the time is up
        isRunning = false;

        // Check if it's a break or not
        if (minutes === 0 && seconds === 0) {
            ringbell();
            statusDisplay.textContent = "Break Time!"; 

            document.body.style.backgroundColor = "#d1b3ff"; 
            timerContainer.style.backgroundColor = "#d1b3ff"; 
            timerContainer.style.border = "3px solid #9c66cc"; 
            
            startBtn.textContent = "..."; 

            timeRemaining = 5 * 60; // Set break time (5 minutes)
            minutes = Math.floor(timeRemaining / 60); // Convert seconds to minutes
            seconds = timeRemaining % 60; 
            updateDisplay(); 

            isRunning = true;
            timer = setInterval(countdown, 1000); 
        }
    } else {
        timeRemaining--;
        minutes = Math.floor(timeRemaining / 60);
        seconds = timeRemaining % 60;
        updateDisplay();
    }
}


// Event Listeners
startBtn.addEventListener('click', function() {
    if (isRunning) {
        pauseTimer(); 
    } 
    else if (isPaused) {
        startTimer();
    } 
    else {
        startTimer();
    }
});

pauseBtn.addEventListener('click', pauseTimer);

// Initial display update
updateDisplay();