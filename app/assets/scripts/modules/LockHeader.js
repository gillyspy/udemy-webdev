import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class LockHeader{
    constructor(headerSelector, styleModifierClass, linksData){
        this.header = document.querySelector(headerSelector)
        this.styleModifierClass = styleModifierClass
        this.linksData = linksData
        this.highlightedLinks = {}; // key value pairs. The values are an array indicating if highlighting is necessary and if state is changing
        this.scrollThrottle = throttle(this.checkSections, 400).bind(this) //backoff
        //this.sectionHeightUpdater = debounce( this.updateHeight, 150 ).bind(this)
        this.resizeCheck = debounce( this.checkSections, 200).bind(this)
        this.checkSections('init')
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

    highlightLinks(link, highlightClass) {
        //if el is in view then highlight the link
        highlightClass = highlightClass || this.linksData.highlightClass  //default value if not passed
        console.log({
            'this.highlightedLinks': this.highlightedLinks,
            link : link,
            highlightClass : highlightClass
        })
        try {
            console.log({
                link : link,
                highlightClass: highlightClass,
                highlightedlinks : this.highlightedLinks
            })
            if (!!this.highlightedLinks[link][0] ){
                console.log('highlighting with', highlightClass)
                document.getElementById(link).classList.add(highlightClass)
                this.highlightedLinks[link] = [1,0]
            } else {
                // remove class to highlight
                console.log('removing class to highlight',
                    document.getElementById(link),
                    this.highlightedLinks
                );
                document.getElementById(link).classList.remove(highlightClass)
                this.highlightedLinks[link]=[0,0]
            }
        }catch(e){
            console.log('error',e.message)
        }
    }

    checkSections(init){
        console.log('checkSections')
        var sections = document.querySelectorAll(this.linksData.sectionSelector)
        console.log(this.linksData.sectionSelector, sections.length)
        sections.forEach( (section)=>{
            //use the section
            var linkId = section.getAttribute(this.linksData.dataAttribute)
            if(init==='init'){
                this.highlightedLinks[linkId] = [0,1];
            } else if (typeof this.highlightedLinks[linkId] === 'undefined' && linkId !== null){
                //initialize
                console.log('initializing for ', linkId)
                this.highlightedLinks[linkId] = [0,1];
            }
            if( linkId !== null && typeof this.highlightedLinks[linkId] !== 'undefined'){
                this.linkView(section, linkId)
            }
        }) //forEach
    }

    linkView(section, newLink){
        /* an element has been scrolled to IF >= top X% of the element is showing on the screen */
        var yT = .5
        var yB = .7
        var top = section.getBoundingClientRect().top
        var bottom = top + section.getBoundingClientRect().height

        let positionTop = (top / window.innerHeight)
        let positionBottom = (bottom / window.innerHeight)
        console.log( {
            top : top ,
            bottom : bottom ,
            positionTop : positionTop,
            positionBottom : positionBottom,
            section : section
        })
        newLink = newLink || section.getAttribute(this.linksData.dataAttribute)
        let doChange = 0
        // combinations
        //1. should be highlighted cuz it's in sweet spot
        //2. should NOT be highlighted as it is too far away
        //3. should NOT be highlighted because it's too far up page
        switch(true){ //detect changes
            case (  positionTop > yT  ): //2
                doChange = ( this.highlightedLinks[newLink][0] === 1 )
                this.highlightedLinks[newLink][0] = 0;
                break;
            case (  positionTop < yT && positionBottom > yB ): //1
                doChange =( this.highlightedLinks[newLink][0] === 0 )
                this.highlightedLinks[newLink][0] = 1
                break;
            case (  positionTop < yT && positionBottom < yB ): //3
                doChange = ( this.highlightedLinks[newLink][0] === 1 )
                this.highlightedLinks[newLink][0] = 0
                break;
            default:

                break;
        }
        console.log({
            newLink : newLink,
            doChange : doChange
        })

        if( doChange ){
            this.highlightLinks(newLink)
        }
    }

    //determine
    beginEvents(){
        console.log('lockHeader events')
        window.addEventListener(
            'scroll',
            throttle( () => {
                    this.manipulateHeader()
                },
                200
            )
        )
        window.addEventListener( 'resize',this.resizeCheck )
        window.addEventListener( 'scroll', this.scrollThrottle)
    }

}

export default LockHeader


/* if an "page section" is scrolled to that means:

- the top of the boundingrect is greater than the window scroll bottom
- the bottom of the boundingrect is less than the window scroll top
- might accompany leaving another section

when scrolled to we want to:
- highlight the link for the newly visible section
- dim (return to default) the links for any other active sections


 */