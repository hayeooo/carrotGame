'use strict';
import PopUp from './popup.js';
import {Field,ItemType} from './field.js';
import * as sound from './sound.js';

export const Reason=Object.freeze({
    win:'win',
    lose:'lose',
    cancel:'cancel',
});
//클래스 내에서 다른 클래스의 함수 호출 시 game.js 내에서 클래스 선언하고 실행?
const CARROT_SIZE=80;
const CARROT_COUNT=20;
const BUG_COUNT=20;
const GAME_DURATION_SEC=20;

// Builder Pattern
export class GameBuilder{
    withgameDuration(duration){
        this.gameDuration=duration;
        return this;
    }
    withcarrotCount(num){
        this.carrotCount=num;
        return this;
    }
    withbugCount(num){
        this.bugCount=num;
        return this;
    }
    build(){
        return new Game(
            this.gameDuration,
            this.carrotCount,
            this.bugCount
        );
    }
}

class Game{
    constructor(gameDuration,carrotCount,bugCount){
        this.gameDuration=gameDuration;
        this.carrotCount=carrotCount;
        this.bugCount=bugCount;
        this.level=1;
        this.totalScore=0;

        this.initcarrot=carrotCount;
        this.initbug=bugCount;
        this.initDuration=gameDuration;

        this.totalScoreText=document.querySelector('.totalScore');
        this.levelText=document.querySelector('.level');

        this.gameBtn=document.querySelector('.game__button');
        this.gameBtn.addEventListener('click',()=>{
            if (this.started){
                this.stop(Reason.cancel);
            }else{
                this.start();
            }
        });
        this.timerIndicator=document.querySelector('.game__timer');
        this.gameScore=document.querySelector('.game__score');
        
        this.started=false;
        this.score=0;
        this.timer=undefined;
        this.win=false;

        this.gameField=new Field(carrotCount,bugCount,CARROT_SIZE);
        this.gameField.setClickListener(this.onItemClick);

    }
    setGameStopListener(onGameStop){
        this.onGameStop=onGameStop;
    }

    initGame(){
        this.score=0;
        this.carrotCount=this.gameField.carrotCount;
        this.bugCount=this.gameField.bugCount;
        this.gameField.init(this.carrotCount,this.bugCount,this.size);
        this.gameScore.innerText=this.carrotCount-this.score;

    }
    start=event=>{
        this.started=true;
        this.initGame();
        this.showStopButton();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playbg();
    }
    stop(reason){
        this.started=false;
        this.stopGameTimer();
        this.hideGameButton();
        sound.stopbg();
        this.onGameStop&&this.onGameStop(reason);
    }
    nextLevel(){
        this.gameDuration+=10;
        this.gameField.carrotCount+=5;
        this.gameField.bugCount+=7;
    }
    showStopButton(){
        const icon=this.gameBtn.querySelector('.fas');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.gameBtn.style.visibility = 'visible';
    }
    hideGameButton(){
        this.gameBtn.style.visibility='hidden';
    }
    showTimerAndScore(){
        this.timerIndicator.style.visibility='visible';
        this.gameScore.style.visibility='visible';
    }
    startGameTimer(){
        let remainingTimeSec=this.gameDuration;
        this.updateTimerText(remainingTimeSec);
        this.timer=setInterval(()=>{
            if (remainingTimeSec<=0){
                clearInterval(this.timer);
                this.stop(this.score===this.carrotCount?Reason.win:Reason.lose);
                return;
            }
            this.updateTimerText(--remainingTimeSec);
        },1000);
    }
    stopGameTimer(){
        clearInterval(this.timer);
    }
    updateTimerText(time){
        const minutes=Math.floor(time/60);
        const seconds=time%60;
        this.timerIndicator.innerHTML= `${minutes}:${seconds}`;
    }
    updateScoreText(totalscore){
        this.totalScoreText.innerText=`TotalScore: ${totalscore}`;
    }
    updateLevelText(level){
        this.levelText.innerText=`Level: ${level}`;
    }
    initScoreAndCount(){
        this.level=1;
        this.totalScore=0;
        //this.carrotCount=this.initcarrot;
        //this.bugCount=this.initbug;
        this.gameField.carrotCount=this.initcarrot;
        this.gameField.bugCount=this.initbug;
        this.gameDuration=this.initDuration;

        this.updateScoreText(this.totalScore);
        this.updateLevelText(this.level);

    }
    onItemClick=item=> {
        if (!this.started) {
            return;
        }
        if (item==='carrot') {
            this.totalScore+=1*this.level;
            this.score+=1;
            this.updateScoreBoard();
            this.updateScoreText(this.totalScore);
            if (this.score === this.carrotCount) {
                console.log('nextLevel');
                this.win=true;
                this.level+=1;
                this.updateLevelText(this.level);
                this.nextLevel();
                this.stopGameTimer();
                this.start();
                //this.stop(Reason.win);
            }
        } else if (item==='bug') {
            this.win=false;
            this.stop(Reason.lose);
        }
    }
    updateScoreBoard(){
        this.gameScore.innerText=this.carrotCount-this.score;
    }
}
