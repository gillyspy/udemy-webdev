import '../styles/styles.css'
import MobileMenu from './modules/MobileMenu.js'
import ScrollDetect from './modules/ScrollDetect.js'
import LockHeader from './modules/LockHeader.js';
import Modal from './modules/Modal.js';

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

    window.GMoney = new Modal('contactModal', '.modalTrigger', 'modal--top', 'modal--bottom')


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

    if (module.hot) {
        module.hot.accept();
    }

})