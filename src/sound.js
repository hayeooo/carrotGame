'use strict';
//Sound that is used at playing Game
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
bgSound.loop=true;

const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

export function playCarrot(){
    playSound(carrotSound);
}
export function playbug(){
    playSound(bugSound);
}
export function playbg(){
    playSound(bgSound);
}
export function stopbg(){
    stopSound(bgSound);
}
export function playalert(){
    playSound(alertSound);
}
export function playwin(){
    playSound(winSound);
}
function playSound(sound) {
    sound.currentTime=0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}