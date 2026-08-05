export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row, index) => {
    row.classList.add('program-card');
    
    // 1. Isolate the background image
    const picDiv = row.firstElementChild;
    if (picDiv) picDiv.classList.add('program-card-bg');

    // 2. Create a unified content container
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('program-card-content');

    
    // Move all remaining sibling divs into the content container
    while (picDiv.nextElementSibling) {
      contentDiv.append(picDiv.nextElementSibling);
    }
    row.append(contentDiv);


    // 3. Normalize messy <p> tags with <br> inside them (without innerHTML)
    contentDiv.querySelectorAll('p').forEach(p => {
      const children = Array.from(p.childNodes);
      
      // If the paragraph contains line breaks, split it into separate paragraphs
      if (children.some(n => n.nodeName === 'BR')) {
        const frag = document.createDocumentFragment();
        let newP = document.createElement('p');
        
        children.forEach(node => {
          if (node.nodeName === 'BR') {
            if (newP.childNodes.length > 0) {
              frag.append(newP);
              newP = document.createElement('p'); // Start a fresh paragraph
            }
          } else {
            // Ignore empty text nodes created by formatting
            if (node.nodeType === 3 && node.textContent.trim() === '' && newP.childNodes.length === 0) return;
            newP.append(node); // Move node safely
          }
        });

        
        if (newP.childNodes.length > 0) frag.append(newP);
        p.replaceWith(frag); // Replace the messy <p> with clean individual <p>s
      }
    });


    // 4. Assign semantic classes for CSS targeting
    const allP = Array.from(contentDiv.querySelectorAll('p'));

    if ((index === 1 || index === 2) && allP.length >= 2) {
      const copyWrap = document.createElement('div');
      copyWrap.classList.add('program-card-copy');

      const firstP = allP[0];
      const secondP = allP[1];

      contentDiv.insertBefore(copyWrap, firstP);
      copyWrap.appendChild(firstP);
      copyWrap.appendChild(secondP);
    }

    const updatedP = Array.from(contentDiv.querySelectorAll('p'));
    if (updatedP.length > 0) updatedP[0].classList.add('program-card-title');
    if (updatedP.length > 1) updatedP[1].classList.add('program-card-desc');

    const knowMore = contentDiv.querySelector('a, button, .icon-arrow');
    if (knowMore) {
      knowMore.classList.add('know-more');
    }
    
    // Find the icon and format the Action row
    const icon = contentDiv.querySelector('.icon-arrow');
    if (icon) {
      const actionContainer = icon.closest('p');
      if (actionContainer) {
        actionContainer.classList.remove('program-card-desc'); // Ensure it isn't styled as a description
        actionContainer.classList.add('program-card-action');
      }
    }
  });
}