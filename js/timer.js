const timeEl = document.getElementById('time');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const shortBtn = document.getElementById('short');
const longBtn = document.getElementById('long');
const count = document.getElementById('cycle-count');
const pomodoroBtn = document.getElementById('pomodoro');
const heartImg = document.getElementsByClassName('heart');


let pause;

let seconds = 0;
let minutes = 0;

let pomodoros = 1;
let shortRests = 1;
let longRests = 1;
let mode = 0;
let hearts = 0;
let cycles = 1;

count.innerText = "cycle: "+pomodoros;

window.addEventListener('load', ()=>{
    newPomodoro();
})

document.getElementById('modes').addEventListener('change', ()=>{
    newTimer();
});

function newPomodoro(){
    newTimer();
    pomodoroBtn.checked = true;
    mode = 0;
    minutes = 25;
    seconds = 0;
    timeEl.innerText = timeFormat(minutes,seconds);
}

function newShort(){
    newTimer();
    shortBtn.checked = true;
    mode = 1;
    minutes = 5;
    seconds = 0;
    timeEl.innerText = timeFormat(minutes,seconds);
}

function newLong() {
    newTimer();
    longBtn.checked = true;
    mode = 2;
    minutes = 15;
    seconds = 0;
    timeEl.innerText = timeFormat(minutes,seconds);
}

function newTimer(){
    startBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
    pause = true;
}

pomodoroBtn.addEventListener('click', newPomodoro)
shortBtn.addEventListener('click', newShort)
longBtn.addEventListener('click', newLong)

pomodoroBtn.addEventListener('click', playClick)
shortBtn.addEventListener('click', playClick)
longBtn.addEventListener('click', playClick)

let timer;

startBtn.addEventListener('click', ()=>{
    
    clearInterval(timer);
    pause = false;

    startBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
    playClick();

    timer = setInterval(() => {
        if(pause){
            return;
        }

        if (minutes < 0 || seconds < 0) {
            return;
        }else{
            if(minutes == 0 && seconds == 0){
                pause = true;
                document.getElementById('finish-sound').play();

                switch (mode) {
                    case 0:
                        pomodoros += 1;

                        if(hearts !== 4){
                            heartImg[hearts].src = 'img/heart-fill.png';
                            hearts += 1;
                        }
                        
                        if(Number.isInteger(pomodoros/5)){
                            cycles += 1;
                            hearts = 0;
                            for (const heart of heartImg) {
                            heart.src = 'img/heart-outlined.png';
                            }
                            count.innerText = "cycle: "+cycles;
                            newLong();
                        }else{
                            newShort();
                        }

                    break;

                    case 1:
                        shortRests += 1;
                        newPomodoro();

                    break;

                    case 2:
                        longRests += 1;
                        newPomodoro();

                    break;
                }

            }else{
                if(seconds == 0){
                    seconds = 60;
                    if(minutes > 0){
                        minutes -= 1;
                    }
                }

            seconds -= 1;
            }

        }
        timeEl.innerText = timeFormat(minutes,seconds);
    }, 1000);
})

pauseBtn.addEventListener('click', ()=>{
    clearInterval(timer);
    
    pause = true;

    startBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
    playClick();
})


function timeFormat(minutes, seconds){
    if(seconds < 10){
        seconds = '0'+seconds;
    }
    if(minutes < 10){
        minutes = '0'+minutes;
    }
    return `${minutes}:${seconds}`;
}

function playClick() {
    document.getElementById('click-sound').play();
}
