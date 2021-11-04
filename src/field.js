'use strict';
//Game Field
import * as sound from './sound.js';
export const ItemType=Object.freeze({
    carrot:'carrot',
    bug:'bug',
});
export class Field{
    constructor(carrotCount,bugCount,size){
        this.carrotCount=carrotCount;
        this.bugCount=bugCount;
        this.size=size;
        this.field=document.querySelector('.game__field');
        this.fieldRect=this.field.getBoundingClientRect();
        //this.onClick=this.onClick.bind(this);
        this.field.addEventListener('click',this.onClick);
    }
    setClickListener(onItemClick){
        this.onItemClick=onItemClick;
    }
    init(){
        this.field.innerHTML='';
        this._addItem(ItemType.carrot, this.carrotCount, 'img/carrot.png');
        this._addItem(ItemType.bug, this.bugCount, 'img/bug.png');
    }
    _addItem(className, count,imgPath) {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - this.size;
        const y2 = this.fieldRect.height - this.size;
        for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        this.field.appendChild(item);
        }
    }
    
    onClick=event=>{
        const target = event.target;
        if (target.matches('.carrot')) {
        // 당근!!
            target.remove();
            sound.playCarrot();
            this.onItemClick&&this.onItemClick(ItemType.carrot);
        }else if (target.matches('.bug')){
            target.remove();
            this.onItemClick&&this.onItemClick(ItemType.bug);
        }
    }
    
}
function randomNumber(min,max){
    return Math.random() * (max - min) + min;
}