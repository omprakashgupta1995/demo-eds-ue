export default function decorate(block) {
    let blockChildren = block.children;
    let childrenClassName = Array.from(blockChildren).forEach((divElement,index) =>
    {
        divElement.classList.add(`div-container-${index+1}`);
    })  
    console.log(childrenClassName);

    let ifbProductFeatureSection = document.getElementsByClassName('ifb-product-feature-container');
    console.log(ifbProductFeatureSection);
    let ifbProductFeatureSectionClassName = Array.from(ifbProductFeatureSection).forEach((divElement, index) =>{
        divElement.classList.add(`ifb-product-feature-container-${index+1}`)
    }) 
    
    
    //IFB-Hero-Banner
    let ifbHeroBannerContainer = document.querySelector('.ifb-hero-banner div').children
    console.log('HERO-Container',ifbHeroBannerContainer);
    
    ifbHeroBannerContainer[0].classList.add('ifb-hero-image')
    ifbHeroBannerContainer[1].classList.add('ifb-hero-heading-text')
    ifbHeroBannerContainer[2].classList.add('ifb-hero-btn-text-info')
    ifbHeroBannerContainer[3].classList.add('ifb-hero-btn')




}