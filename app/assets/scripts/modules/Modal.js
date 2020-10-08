class Modal {
    constructor(idForShow,
                selectorTrigger,
                classForShow,
                classForHide,
                escapeKeys
    ) {
        this.escapeKeys =  escapeKeys || [27]
        this.modal = document.getElementById(idForShow)
        this.classForShow = classForShow
        this.classForHide = classForHide
        this.selectorTrigger = selectorTrigger
        this.init()
        //nothing yet
    }
    init(){
        this.toggleSelector(this.classForHide)
        this.beginEvents()
    }

    beginEvents(){
        console.log('modalTrigger added')
        document.querySelectorAll( this.selectorTrigger ).forEach( (el) => {
            el.addEventListener('click', (ev) => {
                this.toggleSelector(this.classForShow)
                this.toggleSelector(this.classForHide)
                ev.preventDefault()
            })
        })

        document.addEventListener('keyup',e => this.keyPressHandler(e))

    }

    keyPressHandler(e){
        if( this.escapeKeys.includes( e.keyCode) ){//when pressing escape key
            this.toggleSelector(this.classForShow)
            this.toggleSelector(this.classForHide)
        }
    }
    toggleSelector(classToToggle) {
        this.modal.classList.toggle(classToToggle)
    }
}

export default Modal