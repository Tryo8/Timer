let number = 0;
let hideClock = false;
const userJoinedClub = false;
 

document.getElementById("currentTime").textContent = number;

function getTime() {
    const now = new Date();
    const timeInHours = now.getHours().toString().padStart(2, '0');
    const hours = timeInHours % 12 || 12;
    let ampm = hours >= 12 ? 'Pm' : 'Am';
    const timeInMinutes = now.getMinutes().toString().padStart(2, '0');
    const timeInSecond = now.getSeconds().toString().padStart(2, '0');
    number = `${hours}:${timeInMinutes}:${timeInSecond} ${ampm}`;
    document.getElementById("currentTime").textContent = number;
}
setInterval(getTime, 1000);


let isRunning = false;
let elapsedTime = 0;
let startTime = 0;
let intervalId = null;

const display = document.getElementById("timerDisplay");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");


function formatTime(time) {
    let hours = Math.floor(time / (1000 * 60 * 60));
    let mins = Math.floor((time / (1000 * 60)) % 60);
    let sec = Math.floor((time / 1000) % 60);
    let milliSec = Math.floor((time % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    mins = String(mins).padStart(2, "0");
    sec = String(sec).padStart(2, "0");
    milliSec = String(milliSec).padStart(2, "0");

    return `${mins}:${sec}:${milliSec}`;
}

function updateTimer() {
    const now = Date.now();
    elapsedTime = now - startTime;
    display.textContent = formatTime(elapsedTime);
}

function start() {
    if (isRunning) return; 
    isRunning = true;
    startTime = Date.now() - elapsedTime; 
    intervalId = setInterval(updateTimer, 10);
}

function stop() {
    if (!isRunning) return;
    isRunning = false;
    clearInterval(intervalId);
}

function reset() {
    stop();
    elapsedTime = 0;
    display.textContent = formatTime(elapsedTime);
}

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);

display.textContent = formatTime(elapsedTime);

