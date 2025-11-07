export default function decorate(block) {
  // Add classes to all sections within main
  const mainElement = document.querySelector('main');
  if (!mainElement) return;

  const sections = mainElement.querySelectorAll('.section');
  
  sections.forEach((section, sectionIndex) => {
    // Add section-specific classes
    section.classList.add(`section-${sectionIndex + 1}`);
    
    // Handle image sections
    if (section.classList.contains('image1')) {
      decorateImageSection(section);
    }
    
    // Handle cards sections
    if (section.classList.contains('cards-container')) {
      decorateCardsSection(section);
    }
    
    // Handle existing ul.product-card structures
    normalizeExistingCards(section);
    
    // Add generic classes to common elements
    decorateCommonElements(section);
  });
}

function normalizeExistingCards(section) {
  // Handle existing ul structures to normalize all li elements - look for both ul.product-card and ul.card-content
  const productCardUl = section.querySelector('ul.product-card, ul.card-content');
  if (productCardUl) {
    productCardUl.classList.add('product-grid', 'owl-carousel', 'owl-theme');
    
    const cardItems = productCardUl.querySelectorAll('li');
    cardItems.forEach((cardItem, index) => {
      // Ensure all li elements have consistent classes
      cardItem.classList.add('card-content', `card-item-${index + 1}`, 'item');
      
      // Handle image container
      const imageDiv = cardItem.querySelector('.cards-card-image, div:first-child');
      if (imageDiv) {
        imageDiv.classList.add('card-image-container');
        
        const picture = imageDiv.querySelector('picture');
        if (picture) {
          picture.classList.add('card-picture');
          
          const img = picture.querySelector('img');
          if (img) {
            if (!img.classList.contains('card-image')) {
              img.classList.add('card-image', 'product-image');
            }
          }
          
          const sources = picture.querySelectorAll('source');
          sources.forEach((source, sourceIndex) => {
            source.classList.add(`card-source-${sourceIndex + 1}`);
          });
        }
      }
      
      // Handle content container
      const contentDiv = cardItem.querySelector('.cards-card-body, div:last-child');
      if (contentDiv) {
        contentDiv.classList.add('card-body-content');
        
        const paragraphs = contentDiv.querySelectorAll('p');
        const heading = contentDiv.querySelector('h3');
        const list = contentDiv.querySelector('ul');
        
        // Normalize paragraph classes - remove inconsistent classes first
        paragraphs.forEach((p, pIndex) => {
          // Remove any existing inconsistent classes
          const classesToRemove = Array.from(p.classList).filter(cls => 
            cls.startsWith('section-paragraph') || cls.startsWith('paragraph-')
          );
          classesToRemove.forEach(cls => p.classList.remove(cls));
          
          if (pIndex === 0) {
            p.classList.add('age-range', 'product-meta');
          } else if (p.textContent.trim() === 'VIEW') {
            p.classList.add('view-button', 'action-button');
          }
        });
        
        // Normalize heading classes
        if (heading) {
          heading.classList.add('product-title', 'card-heading');
        }
        
        // Normalize price list classes
        if (list) {
          list.classList.add('product-info', 'price-action-list');
          
          const listItems = list.querySelectorAll('li');
          listItems.forEach((li, liIndex) => {
            if (liIndex === 0) {
              li.classList.add('product-price', 'price');
            } else if (liIndex === 1) {
              li.classList.add('buy-button', 'action-button');
            }
          });
        }
      }
    });
    
    // Initialize Owl Carousel after normalizing all cards
    initializeOwlCarousel(productCardUl).then(() => {
      // Setup custom navigation for the carousel after initialization
      setupCustomNavigation(section, productCardUl);
    }).catch(() => {
      // Fallback: setup navigation even if carousel initialization fails
      setupCustomNavigation(section, productCardUl);
    });
  }
}

function initializeOwlCarousel(carousel) {
  // Check if Owl Carousel library is available
  if (typeof window.jQuery !== 'undefined' && window.jQuery.fn.owlCarousel) {
    const $carousel = window.jQuery(carousel);
    $carousel.owlCarousel({
      loop: true,
      margin: 20,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      navText: [
        '<i class="fas fa-caret-left"></i>',
        '<i class="fas fa-caret-right"></i>'
      ],
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        1000: {
          items: 3
        },
        1200: {
          items: 4
        }
      }
    });
    
    // Hide default Owl Carousel navigation since we have custom navigation
    const owlNav = carousel.parentElement.querySelector('.owl-nav');
    if (owlNav) {
      owlNav.style.display = 'none';
    }
    
    return Promise.resolve();
  } else {
    // Fallback: Load Owl Carousel if not available
    return loadOwlCarousel().then(() => {
      if (window.jQuery && window.jQuery.fn.owlCarousel) {
        const $carousel = window.jQuery(carousel);
        $carousel.owlCarousel({
          loop: true,
          margin: 20,
          nav: true,
          dots: true,
        //   autoplay: true,
        //   autoplayTimeout: 3000,
          autoplayHoverPause: true,
          navText: [
            '<i class="fas fa-caret-left"></i>',
            '<i class="fas fa-caret-right"></i>'
          ],
          responsive: {
            0: {
              items: 1
            },
            600: {
              items: 2
            },
            1000: {
              items: 3
            },
            1200: {
              items: 4
            }
          }
        });
        
        // Hide default Owl Carousel navigation since we have custom navigation
        const owlNav = carousel.parentElement.querySelector('.owl-nav');
        if (owlNav) {
          owlNav.style.display = 'none';
        }
      }
    });
  }
}

function loadOwlCarousel() {
  return new Promise((resolve) => {
    // Load jQuery if not available
    if (!window.jQuery) {
      const jqueryScript = document.createElement('script');
      jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
      jqueryScript.onload = () => {
        loadOwlCarouselLibrary(resolve);
      };
      document.head.appendChild(jqueryScript);
    } else {
      loadOwlCarouselLibrary(resolve);
    }
  });
}

function loadOwlCarouselLibrary(resolve) {
  // Load Owl Carousel CSS
  const owlCSS = document.createElement('link');
  owlCSS.rel = 'stylesheet';
  owlCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css';
  document.head.appendChild(owlCSS);
  
  const owlThemeCSS = document.createElement('link');
  owlThemeCSS.rel = 'stylesheet';
  owlThemeCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css';
  document.head.appendChild(owlThemeCSS);
  
  // Load Owl Carousel JS
  const owlScript = document.createElement('script');
  owlScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js';
  owlScript.onload = resolve;
  document.head.appendChild(owlScript);
}

function decorateImageSection(section) {
  // Add classes to image section elements
  const defaultWrapper = section.querySelector('.default-content-wrapper');
  if (defaultWrapper) {
    defaultWrapper.classList.add('hero-image-wrapper');
    
    const picture = defaultWrapper.querySelector('picture');
    if (picture) {
      picture.classList.add('hero-picture');
      
      const img = picture.querySelector('img');
      if (img) {
        img.classList.add('hero-image', 'responsive-image');
      }
      
      // Add classes to source elements
      const sources = picture.querySelectorAll('source');
      sources.forEach((source, index) => {
        source.classList.add(`source-${index + 1}`, 'responsive-source');
      });
    }
  }
}

function decorateCardsSection(section) {
  // Add classes to cards section elements
  const defaultWrapper = section.querySelector('.default-content-wrapper');
  if (defaultWrapper) {
    defaultWrapper.classList.add('section-header');
    
    const paragraphs = defaultWrapper.querySelectorAll('p');
    paragraphs.forEach((p, index) => {
      switch (index) {
        case 0:
          p.classList.add('section-title', 'featured-title');
          break;
        case 1:
          p.classList.add('view-all-link');
          break;
        case 2:
          p.classList.add('nav-arrow', 'nav-prev');
          break;
        case 3:
          p.classList.add('nav-arrow', 'nav-next');
          break;
      }
    });
  }
  
  // Add classes to cards wrapper
  const cardsWrapper = section.querySelector('.cards-wrapper');
  if (cardsWrapper) {
    cardsWrapper.classList.add('products-container');
    
    // Handle both structures: cards.block or ul.product-card
    const cardsBlock = cardsWrapper.querySelector('.cards.block') || cardsWrapper.querySelector('ul.product-card');
    if (cardsBlock) {
      cardsBlock.classList.add('product-grid');
      
      // Add classes to each card (li elements)
      const cardItems = cardsBlock.children;
      Array.from(cardItems).forEach((card, cardIndex) => {
        decorateCardItem(card, cardIndex);
      });
      
      // Setup custom navigation for the carousel
      setupCustomNavigation(section, cardsBlock);
    }
  }
}

function decorateCardItem(cardItem, index) {
  // Add classes to the li element
  cardItem.classList.add('card-content', `card-item-${index + 1}`);
  
  // Find the image container (div with class cards-card-image)
  const imageDiv = cardItem.querySelector('.cards-card-image, div:first-child');
  if (imageDiv) {
    imageDiv.classList.add('card-image-container');
    
    const picture = imageDiv.querySelector('picture');
    if (picture) {
      picture.classList.add('card-picture');
      
      const img = picture.querySelector('img');
      if (img) {
        if (!img.classList.contains('card-image')) {
          img.classList.add('card-image', 'product-image');
        }
      }
      
      const sources = picture.querySelectorAll('source');
      sources.forEach((source, sourceIndex) => {
        source.classList.add(`card-source-${sourceIndex + 1}`);
      });
    }
  }
  
  // Find the content container (div with class cards-card-body)
  const contentDiv = cardItem.querySelector('.cards-card-body, div:last-child');
  if (contentDiv) {
    contentDiv.classList.add('card-body-content');
    
    const paragraphs = contentDiv.querySelectorAll('p');
    const heading = contentDiv.querySelector('h3');
    const list = contentDiv.querySelector('ul');
    
    // Add classes to paragraphs
    paragraphs.forEach((p, pIndex) => {
      if (pIndex === 0) {
        p.classList.add('age-range', 'product-meta');
      } else if (p.textContent.trim() === 'VIEW') {
        p.classList.add('view-button', 'action-button');
      }
    });
    
    // Add classes to heading
    if (heading) {
      heading.classList.add('product-title', 'card-heading');
    }
    
    // Add classes to price list
    if (list) {
      list.classList.add('product-info', 'price-action-list');
      
      const listItems = list.querySelectorAll('li');
      listItems.forEach((li, liIndex) => {
        if (liIndex === 0) {
          li.classList.add('product-price', 'price');
        } else if (liIndex === 1) {
          li.classList.add('buy-button', 'action-button');
        }
      });
    }
  }
}

function decorateCommonElements(section) {
  // Add classes to common elements across all sections
  
  // All images get responsive class
  const images = section.querySelectorAll('img');
  images.forEach((img, index) => {
    if (!img.classList.contains('responsive-image')) {
      img.classList.add('responsive-image');
    }
    img.classList.add(`image-${index + 1}`);
  });
  
  // All links get link class
  const links = section.querySelectorAll('a');
  links.forEach((link, index) => {
    link.classList.add('section-link', `link-${index + 1}`);
  });
  
  // All buttons get button class
  const buttons = section.querySelectorAll('button');
  buttons.forEach((button, index) => {
    button.classList.add('section-button', `button-${index + 1}`);
  });
  
  // All headings get heading classes
  const headings = section.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headings.forEach((heading, index) => {
    heading.classList.add('section-heading', `heading-${index + 1}`);
  });
  
  // All paragraphs get paragraph class if they don't already have specific classes
  // Exclude paragraphs that are inside card structures
  const paragraphs = section.querySelectorAll('p');
  paragraphs.forEach((p, index) => {
    const isInsideCard = p.closest('ul.card-content, ul.product-card, .cards-card-body');
    if (p.classList.length === 0 && !isInsideCard) {
      p.classList.add('section-paragraph', `paragraph-${index + 1}`);
    }
  });
}

function setupCustomNavigation(section, carousel) {
  // Find the custom navigation buttons in the section header
  const navPrev = section.querySelector('.nav-prev');
  const navNext = section.querySelector('.nav-next');
  
  if (!navPrev || !navNext) {
    return; // Exit if navigation buttons are not found
  }
  
  // Add click handlers for custom navigation
  const handleNavigation = () => {
    if (typeof window.jQuery !== 'undefined' && window.jQuery.fn.owlCarousel) {
      const $carousel = window.jQuery(carousel);
      
      navPrev.addEventListener('click', function() {
        $carousel.trigger('prev.owl.carousel');
      });
      
      navNext.addEventListener('click', function() {
        $carousel.trigger('next.owl.carousel');
      });
      
      // Add hover effects for better UX
      navPrev.style.cursor = 'pointer';
      navNext.style.cursor = 'pointer';
      
      navPrev.addEventListener('mouseenter', function() {
        this.style.opacity = '0.7';
      });
      
      navPrev.addEventListener('mouseleave', function() {
        this.style.opacity = '1';
      });
      
      navNext.addEventListener('mouseenter', function() {
        this.style.opacity = '0.7';
      });
      
      navNext.addEventListener('mouseleave', function() {
        this.style.opacity = '1';
      });
    } else {
      // If jQuery/Owl Carousel isn't loaded yet, wait and try again
      setTimeout(handleNavigation, 500);
    }
  };
  
  // Setup navigation after a short delay to ensure carousel is initialized
  setTimeout(handleNavigation, 100);
}