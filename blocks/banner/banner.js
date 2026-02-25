export default function decorate(block) {
    block.classList.add("banner-section");

    const slides = [...block.children];

    slides.forEach((slide) => {
        slide.classList.add("swiper-slide");

        let [imgWrapper, contentWrapper] = [...slide.children];
        imgWrapper?.classList.add("banner-img-wrapper");
        contentWrapper?.classList.add("banner-cnt-wrapper");

        if (contentWrapper) {
            let [title, pretitle, cta, description] = [...contentWrapper.children];
            title?.classList.add("banner-title");
            pretitle?.classList.add("banner-pretitle");
            cta?.classList.add("banner-cta-wrapper");
            description?.classList.add("banner-description");
        }
    });

    const swiperWrapper = document.createElement("div");
    swiperWrapper.classList.add("swiper-wrapper");

    const pagination = document.createElement("div");
    pagination.classList.add("swiper-pagination");

    // Move slides into wrapper
    slides.forEach((slide) => {
        swiperWrapper.appendChild(slide);
    });
    
    block.innerHTML = "";
    block.appendChild(swiperWrapper);
    block.appendChild(pagination);

    // // Initialize Swiper
    // new Swiper(block, {
    //     loop: true,
    //     pagination: {
    //         el: pagination,
    //         clickable: true,
    //     },
    // });
}