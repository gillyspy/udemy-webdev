import throttle from 'lodash/throttle'

class LockHeader{
    constructor(headerSelector, styleModifierClass){
        this.header = document.querySelector(headerSelector)
        this.styleModifierClass = styleModifierClass
        this.beginEvents()
    }

    //on scroll we want to manipulate the header
    manipulateHeader(){
        //if the user has scrolled down
        if( window.scrollY > 59 ){
            this.header.classList.add(this.styleModifierClass)
        } else {
            this.header.classList.remove(this.styleModifierClass)
        }
    }

    beginEvents(){
        window.addEventListener( 'scroll', throttle(() => {
            this.manipulateHeader()
        }, 200) )// TODO: add function that runs on scroll
    }
}

export default LockHeader