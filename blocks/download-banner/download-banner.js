export default function decorate(block) {
    if(window.location.pathname.includes('/mahesh/contact-us')) {
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
    let bannerQRContent = rows[1].children[0];
    bannerQRContent.classList.add('banner-qr-content');
    bannerQRContent.children[0].classList.add('banner-qr-image-wrapper');
    bannerQRContent.children[1].classList.add('banner-qr-description');
}
   
}