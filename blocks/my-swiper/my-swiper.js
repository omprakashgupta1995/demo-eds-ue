import Swipper from '../../scripts/swiper-bundle.min.js'
import {div} from '../../scripts/dom-helpers.js';

export default function decorate(block){
    const swipperEl=div({
        class:'swiper'
    },
    div(
        {class:'swiper-wrapper'},
        ...Array.from(block.children).map((child)=>{
            child.classList.add('swiper-slide');
            return child;
        })
    )
)


block.appendChild(swipperEl);
Swipper(swipperEl,{
    //optional Parameter
    // direction:'verticle',
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop:true
})
}


// export default function decorate(block) {
//     block.classList.add('swiper');
    
//     const swiperWrapper = div(
//         { class: 'swiper-wrapper' },
//         ...Array.from(block.children).map((child) => {
//             child.classList.add('swiper-slide');
//             return child;
//         })
//     );
    
//     block.innerHTML = '';
//     block.appendChild(swiperWrapper);
    
//     new Swiper(block, {
//         direction: 'vertical',
//         loop: true
//     });
// }