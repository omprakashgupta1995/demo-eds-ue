export default function decorate() {
    console.log('Hello World');

    let bannerWrapper = document.getElementsByClassName('whatsapp-banner')
    bannerWrapper.parentElement.children[1].secondChild.classList.add('banner-content')
}