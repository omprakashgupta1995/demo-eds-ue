export default function decorate(block) {
 
}export default function decorate(block) {
  // Get the two main divs
  const cols = [...block.children];
  
  // First column - background image
  const col1 = cols[0];
  col1.className = 'whatsapp-banner-col whatsapp-banner-col-image';
  
  // Second column - content
  const col2 = cols[1];
  col2.className = 'whatsapp-banner-col whatsapp-banner-col-content';
  
  // Process content column
  const contentElements = [...col2.children];
  
  // Title (first element)
  if (contentElements[0]) {
    const titleWrapper = contentElements[0];
    const titleElement = titleWrapper.querySelector('h1, h2, h3, h4, h5, h6');
    if (titleElement) {
      titleWrapper.className = 'whatsapp-banner-title';
    }
  }
  
  // Process icon-text pairs
  for (let i = 1; i < contentElements.length - 1; i++) {
    const element = contentElements[i];
    if (element.querySelector('picture')) {
      // This is an icon with text paragraph
      element.className = 'whatsapp-banner-feature';
      
      // Ensure the structure is correct
      const picture = element.querySelector('picture');
      const textNode = element.lastChild;
      
      if (textNode && textNode.nodeType === Node.TEXT_NODE) {
        // Wrap text in a span for better styling
        const textSpan = document.createElement('span');
        textSpan.className = 'whatsapp-banner-feature-text';
        textSpan.textContent = textNode.textContent;
        element.replaceChild(textSpan, textNode);
      }
    }
  }
  
  // Button container (last element)
  const lastElement = contentElements[contentElements.length - 1];
  if (lastElement && lastElement.querySelector('.button-container')) {
    lastElement.className = 'whatsapp-banner-cta';
  }
  
  // Add loading animation
  block.classList.add('whatsapp-banner-loaded');
}