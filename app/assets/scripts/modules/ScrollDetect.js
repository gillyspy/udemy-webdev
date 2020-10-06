import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class ScrollDetect {

    constructor(selectorToHook, classForHiding, classForRevealing) {
        this.itemsToDetect = document.querySelectorAll(selectorToHook)
        this.hideByDefault(classForHiding)
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this); //backoff
        this.beginEvents()
        this.classForRevealing = classForRevealing
        this.revealedCt = 0
        //prevent browserHeight from being calculated constantly
        updateHeight()
    }

    updateHeight(){

        //check every 300 ms for new windowHeight
        setInterval( () => {
            this.browserHeight = window.innerHeight
        },300)
    }

    calcCaller() {
        console.log(this.itemsToDetect.length ,this.revealedCt );
        if(this.itemsToDetect.length > this.revealedCt ) {
            this.itemsToDetect.forEach(el => {
                console.log('calcCaller', el.isRevealed)
                if (!el.isRevealed) {
                    this.isScrolledTo(el);
                }
            })
        } else {
            window.removeEventListener('scroll', this.scrollThrottle);
            console.log('listener removed');
        }
    }

    isScrolledTo(el){
        /* an element has been scrolled to IF >= top 25% of the element is showing on the screen */
        /* this check is shown every X seconds; */
        let top = el.getBoundingClientRect().top;
        let position = (top / this.browserHeight);
        if(  position < .75 && position > 0 ) {
            //reveal
            el.isRevealed = true;
            this.revealedCt++;
            el.classList.add(this.classForRevealing); // feedback for client
        }
    }

    beginEvents(){
        console.log('beginEvents');
        window.addEventListener('scroll', this.scrollThrottle)
    }

    /* hide elements by default.  */
    hideByDefault(classForHiding) {
        this.itemsToDetect.forEach(el => {
            el.isRevealed = false;
            el.classList.add(classForHiding);
        });
    }
}

export default ScrollDetect