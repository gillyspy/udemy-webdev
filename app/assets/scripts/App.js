import '../styles/styles.css'
import MobileMenu from './modules/MobileMenu.js'
import ScrollDetect from './modules/ScrollDetect.js'
import LockHeader from './modules/LockHeader.js';


function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1)
    } else {
        console.log('dom loaded')
        document.addEventListener("DOMContentLoaded", fn)
    }
}

docReady(function() {
    // DOM is loaded and ready for manipulation here
    new LockHeader('.site-header', 'site-header--dark',
        {
            sectionSelector: '.page-section',
            dataAttribute  : 'data-matching-link-id',
            highlightClass : 'primary-nav--link-highlight'
        }
    );
    new ScrollDetect('.feature-item', 'item-to-detect', 'item-to-detect--is-visible');
    new ScrollDetect('.testimonial', 'item-to-detect', 'item-to-detect--is-visible');
    new MobileMenu(
        '.site-header--menu-icon',
        '.site-header--menu-content',
        'site-header--menu-content--is-visible',
        '.site-header',
        'site-header--is-expanded',
        'site-header--menu-icon--close-x'
    );
    let modal;
    document.querySelectorAll( '.modalTrigger' ).forEach( el => {
        el.addEventListener( 'click', ev => {
            ev.preventDefault()
            let t = 1000;
            if( typeof modal === 'undefined' ) { //load if needed
                import(/* webpackChunkName: "modal" */ './modules/Modal.js').then( x => {
                    modal = new x.default('contactModal', '.modalTrigger', 'modal--top', 'modal--bottom')
                    setTimeout( ()=> {
                        modal.openModal();
                        //trigger modal 1st time
                    },t)
                }).catch((e) => {
                    console.log('there was a problem loading the JS for modal', e);
                })
            } else {
                modal.openModal();
            }

        })
    })

    if (module.hot) {
        module.hot.accept();
    }

})