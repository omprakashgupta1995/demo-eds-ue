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
    
}