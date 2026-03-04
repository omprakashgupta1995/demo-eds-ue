export default function decorate(block) {

  const link = block.querySelector('.know_more_btn a');

  if (link) {

    // Add class to link
    link.classList.add('know-more-btn');

    // Prevent duplicate icon if reloaded
    if (!link.querySelector('img')) {

      const icon = document.createElement('img');
      icon.src = '/content/dam/ifiwebsite/icons/arrow-right-circle.png';
      icon.alt = 'arrow';
      icon.className = 'arrow-icon';

      link.appendChild(icon);
    }
  }

}