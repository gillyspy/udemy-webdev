import '../styles/styles.css'
import MobileMenu from './modules/MobileMenu.js'
import ScrollDetect from './modules/ScrollDetect.js'
import LockHeader from './modules/LockHeader.js';

new LockHeader('.site-header','site-header--dark');
new ScrollDetect( '.feature-item', 'item-to-detect', 'item-to-detect--is-visible');
new ScrollDetect( '.testimonial', 'item-to-detect', 'item-to-detect--is-visible');


let mobileMenu = new MobileMenu(
    '.site-header--menu-icon',
    '.site-header--menu-content',
    'site-header--menu-content--is-visible',
    '.site-header',
    'site-header--is-expanded',
    'site-header--menu-icon--close-x'
);

if(module.hot){
    module.hot.accept();
}

