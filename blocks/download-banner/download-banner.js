export default function decorate(block) {
    
    
    let rows = [...block.children];
    let bannerContentWrapper = rows[0];
    bannerContentWrapper.classList.add('banner-content-wrapper');
    let bannerContent = bannerContentWrapper.children[0];
    bannerContent.classList.add('banner-content');
    let bannerImageWrapper = bannerContent.children[0];
    bannerImageWrapper.classList.add('banner-image-wrapper');
    bannerContent.children[1].classList.add('banner-heading');
    bannerContent.children[2].classList.add('banner-description');
    rows[1].classList.add('banner-qr-wrapper');
   
}