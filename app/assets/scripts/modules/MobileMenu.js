class MobileMenu{

    constructor(iconSelector, contentSelector, toggleSelector,siteHeaderSelector, siteHeaderToggle,hookToggleX){
        this.menuHook = document.querySelector(iconSelector);
        this.menuContent = document.querySelector(contentSelector);
        this.siteHeader = document.querySelector(siteHeaderSelector);
        this.siteHeaderToggle = siteHeaderToggle;
        this.toggleSelector = toggleSelector;
        this.hookToggleX = hookToggleX;
        this.events();
    }

    toggleMenu(){
        this.menuContent.classList.toggle(this.toggleSelector);
        this.siteHeader.classList.toggle(this.siteHeaderToggle);
        this.menuHook.classList.toggle(this.hookToggleX);
    }
    events(){
        this.menuHook.addEventListener('click', ()=> this.toggleMenu() );
    }
}

export default MobileMenu;