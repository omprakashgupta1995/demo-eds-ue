export default function decorate(block) {
    const homeSection = document.querySelector('.section.home');

    if (homeSection) {

        // Add class names to default content wrappers
        const defaultWrappers = homeSection.querySelectorAll('.default-content-wrapper');
        defaultWrappers.forEach((wrapper, index) => {
            if (index === 0) {
                wrapper.classList.add('home-header-logos');
                // Add classes to images within this wrapper
                const images = wrapper.querySelectorAll('img');
                images.forEach((img, imgIndex) => {
                    if (imgIndex === 0) {
                        img.classList.add('login-logo');
                    } else if (imgIndex === 1) {
                        img.classList.add('header-logo');
                    }
                });
            } else if (index === 1) {
                wrapper.classList.add('home-bottom-content');
                // Add class to the cartoon image
                const cartoonImg = wrapper.querySelector('img[alt="cartoon"]');
                if (cartoonImg) {
                    cartoonImg.classList.add('cartoon-image');
                }
            }
        });

        // Add class names to cards wrapper and its contents
        const cardsWrappers = homeSection.querySelectorAll('.cards-wrapper');
        cardsWrappers.forEach((cardsWrapper) => {
            cardsWrapper.classList.add('home-cards-wrapper');

            // Add classes to card elements
            const cardItems = cardsWrapper.querySelectorAll('.cards ul li');
            cardItems.forEach((item, index) => {
                item.classList.add('home-card-item');

                const cardImage = item.querySelector('.cards-card-image');
                const cardBody = item.querySelector('.cards-card-body');

                if (cardImage) {
                    cardImage.classList.add('home-card-image');
                }
                if (cardBody) {
                    cardBody.classList.add('home-card-body');
                    // Add specific classes based on content
                    const text = cardBody.textContent.trim().toLowerCase();
                    if (text.includes('years')) {
                        cardBody.classList.add('age-category');
                    } else if (text === 'teacher') {
                        cardBody.classList.add('teacher-category');
                    } else if (text === 'school') {
                        cardBody.classList.add('school-category');
                    }
                }

                // Add click functionality to each card
                item.style.cursor = 'pointer';
                item.addEventListener('click', function () {
                    const cardText = cardBody ? cardBody.textContent.trim().toLowerCase() : '';
                    let targetUrl = '';

                    // Define URLs based on card content
                    if (cardText.includes('3 to 5 years')) {
                        targetUrl = '/karishmagosalia/fragement/three-five-years';
                    } else if (cardText.includes('6 to 8 years')) {
                        targetUrl = '/karishmagosalia/fragement/six-eight-years';
                    } else if (cardText.includes('9 to 14 years')) {
                        targetUrl = '/karishmagosalia/fragement/nine-fourteen-years';
                    } else if (cardText === 'teacher') {
                        targetUrl = '/karishmagosalia/fragement/teacher';
                    } else if (cardText === 'school') {
                        targetUrl = '/karishmagosalia/fragement/school';
                    }

                    if (targetUrl) {
                        window.location.href = targetUrl;
                    }
                });
            });
        });

        // Add classes to all pictures and images within home section
        const pictures = homeSection.querySelectorAll('picture');
        pictures.forEach((picture) => {
            picture.classList.add('home-picture');
        });

        const allImages = homeSection.querySelectorAll('img');
        allImages.forEach((img) => {
            if (!img.classList.length) {
                img.classList.add('home-image');
            }
        });

        // Add classes to paragraphs
        const paragraphs = homeSection.querySelectorAll('p');
        paragraphs.forEach((p) => {
            p.classList.add('home-paragraph');
        });
    }
    if (window.location.href.includes('/karishmagosalia/fevicreatepoc/')){
        // Hide header and footer for this specific URL
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        
        if (header) {
            header.style.display = 'none';
        }
        
        if (footer) {
            footer.style.display = 'none';
        }
    }
}
