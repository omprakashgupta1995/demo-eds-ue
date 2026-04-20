import swiper from "./swiper.min.js";

export default function decorate(block) {
    block.parentElement.classList.add("swiper");
    let blockParent = block.parentElement;
    block.classList.add("swiper-wrapper");
    Array.from([...block.children]).forEach((items) => {
        items.classList.add("swiper-slide");
    });
    let swiperPagination = document.createElement("div");
    swiperPagination.classList.add("swiper-pagination");
    blockParent.appendChild(swiperPagination);

    swiper(blockParent, {
        pagination: {
            el: ".swiper-pagination",
        },
        autoplay:{
            delay:3000,
        }
    });
}


