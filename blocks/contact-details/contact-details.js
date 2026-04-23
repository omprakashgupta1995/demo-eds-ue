export default function decorate(block) {
  // Loop through the rows (cards)
  [...block.children].forEach((row) => {
    row.classList.add('contact-section');
    
    // Each row contains a div with the content
    const contentContainer = row.querySelector('div');
    if (contentContainer) {
      contentContainer.classList.add('contact-content');
      
      // Look for links and style them as 'action links'
      const links = contentContainer.querySelectorAll('a');
      links.forEach((a) => {
        if (!a.href.startsWith('mailto') && !a.href.startsWith('tel')) {
           a.classList.add('action-link');
        }
      });
    }
  });
}