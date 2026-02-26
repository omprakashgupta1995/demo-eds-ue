function loadSwiperCSS() {
    if (document.querySelector('link[data-swiper]')) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
    link.setAttribute('data-swiper', 'true');
    document.head.appendChild(link);
}

function loadSwiperJS() {
    return new Promise((resolve) => {
        if (window.Swiper) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
        script.onload = resolve;
        document.body.appendChild(script);
    });
}

export default async function decorate(block) {

    loadSwiperCSS();
    await loadSwiperJS();
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

    slides.forEach((slide) => {
        swiperWrapper.appendChild(slide);
    });

    block.innerHTML = "";
    block.appendChild(swiperWrapper);
    block.appendChild(pagination);
    console.log(block)

    new Swiper(block, {
        loop: true,
        pagination: {
            el: pagination,
            clickable: true,
            initialSlide: 0,
            slidesPerView: 1,
            slidesPerGroup: 1,
            loop: false,
        },
    });
}