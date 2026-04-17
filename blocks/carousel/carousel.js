export default function decorate(block) {
  const items = [...block.children];
  
  items.forEach((item) => {
    item.classList.add('carousel-item');
    
    // Based on your model: 
    // Field 1: Image, Field 2: Alt, Field 3: Title, Field 4: TitleType, Field 5: Description
    const [imageWrapper, altText, title, titleType, description] = [...item.children];

    // Wrap text elements into a single container for easy positioning
    const textOverlay = document.createElement('div');
    textOverlay.classList.add('carousel-text-overlay');
    
    // Add title and description to the overlay
    if (title) textOverlay.append(title);
    if (description) textOverlay.append(description);
    
    // Clear the item and re-append image then overlay
    item.replaceChildren(imageWrapper, textOverlay);
    
    imageWrapper.classList.add('carousel-image-background');
  });
}