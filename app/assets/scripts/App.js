import '../styles/styles.css';
import MobileMenu from './modules/MobileMenu.js';
import LockHeader from './modules/LockHeader.js';

new LockHeader('.site-header','site-header--dark');

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

