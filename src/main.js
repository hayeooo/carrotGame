'use strict';
import PopUp from './popup.js';
import {Field,ItemType} from './field.js';
import * as sound from './sound.js';
import {GameBuilder, Reason } from './game.js';

const CARROT_SIZE = 80;
const CARROT_COUNT = 20;
const BUG_COUNT = 20;
const GAME_DURATION_SEC = 20;

const game=new GameBuilder()
.withgameDuration(5)
.withcarrotCount(3)
.withbugCount(3)
.build();
const gameFinishBanner=new PopUp();


game.setGameStopListener((reason)=>{
  let message;
  switch(reason){
    case Reason.cancel:
      message='Replay❓';
      sound.playalert();
      break;
    case Reason.win:
      //message='YOU WON🎉';
      //sound.playwin();
      break;
    case Reason.lose:
      message='YOU LOST😅';
      sound.playbug();
      break;
    default:
      throw new Error('not valid reason');
  }
gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(()=>{
  game.initScoreAndCount();
  game.start();
});
