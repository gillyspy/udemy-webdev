class Modal {
    constructor(idForShow,
                selectorTrigger,
                classForShow,
                classForHide,
                escapeKeys
    ) {
        this.escapeKeys =  escapeKeys || [27]
        this.modal
        this.classForShow = classForShow
        this.classForHide = classForHide
        this.idForShow = idForShow
        this.selectorTrigger = selectorTrigger
        this.openIt = this.openModal
        this.init()
        //nothing yet
    }
    init(){
        this.insertHtml()
        this.modal = document.getElementById(this.idForShow)
        //this.toggleSelector(this.classForShow)
        this.beginEvents()
    }

    insertHtml(){
        document.body.insertAdjacentHTML('beforeend',
            `<div id="contactModal" class="modal">
  <div class="modal__inner">
    <h2 class="section-title section-title--blue section-title--less-margin"><img src="assets/images/icons/mail.svg" class="section-title__icon"> Get in <strong>Touch</strong></h2>\
    <div class="wrapper wrapper--narrow">
      <p class="modal__description">We will have an online order system in place soon. Until then, connect with us on any of the platforms below!</p>
    </div>
    <div class="social-icons">
      <a href="#" class="social-icons__icon"><img src="assets/images/icons/facebook.svg" alt="Facebook"></a>
      <a href="#" class="social-icons__icon"><img src="assets/images/icons/twitter.svg" alt="Twitter"></a>
      <a href="#" class="social-icons__icon"><img src="assets/images/icons/instagram.svg" alt="Instagram"></a>
      <a href="#" class="social-icons__icon"><img src="assets/images/icons/youtube.svg" alt="YouTube"></a>
    </div>
  </div>
  <div id="modalClose" class="modal__close modalTrigger">X</div>
</div>`);
    }

    openModal(){
        this.toggleSelector(this.classForShow)
        this.toggleSelector(this.classForHide)
    }
    beginEvents(){
        console.log('modalTrigger added')
        document.addEventListener('keyup',e => this.keyPressHandler(e))
        document.getElementById('modalClose').addEventListener('click',ev => {
            ev.preventDefault()
            this.openModal()
        })
    }

    keyPressHandler(e){
        if( this.escapeKeys.includes( e.keyCode) ){//when pressing escape key
            this.openModal()
        }
    }
    toggleSelector(classToToggle) {
        this.modal.classList.toggle(classToToggle)
    }
}

export default Modal