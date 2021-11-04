'use strict';
// pop-up에 관련된 로직만 구현
//onClick, show, hide
export default class PopUp{
    constructor(){
        this.popUp = document.querySelector('.pop-up');
        this.popUpText = document.querySelector('.pop-up__message');
        this.popUpRefresh = document.querySelector('.pop-up__refresh');
        this.popUpRefresh.addEventListener('click',()=>{
            this.onClick && this.onClick();
            this.hide();
        })
    }
    setClickListener(onClick){
        this.onClick=onClick;
    }
    showWithText(text) {
        this.popUpText.innerText = text;
        this.popUp.classList.remove('pop-up--hide');
    }

    hide(){
        this.popUp.classList.add('pop-up--hide');
    }

}