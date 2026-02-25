export default function decorate(block) {
    console.log(block);
    block.classList.add("banner-section");
    [...block.children].forEach((slide) => {
        slide?.classList.add("swiper-slide")
        let [imgWrapper, contentWrapper] = [...slide.children];
        imgWrapper?.classList.add("banner-img-wrapper");
        contentWrapper?.classList.add("banner-cnt-wrapper");
        let [title, pretitle, cta, description] = [...contentWrapper.children];
        title?.classList.add("banner-title");
        pretitle?.classList.add("banner-pretitle");
        cta?.classList.add("banner-cta-wrapper");
        description?.classList.add("banner-description")
    })
    let blockChildren = [...block.children];

    let swiperWrapper = document.createElement("div");
    swiperWrapper.classList.add("swiper-wrapper");

    let pagination = document.createElement("div");
    pagination.classList.add("swiper-pagination");

    swiperWrapper.appendChild(blockChildren)
    block.innerHTML = "";
    block.appendChild(swiperWrapper)
    block.appendChild(pagination)
}