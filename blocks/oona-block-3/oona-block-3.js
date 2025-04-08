export default function decorate(block) {
  const faqBlocks = block.querySelectorAll('.oona-block-3-wrapper .oona-block-3.block > div');


  const accordionWrapper = document.createElement('div');
  
  faqBlocks.forEach(function(item, index) {
    // Create a new div for each FAQ item (question + answer)
    const faqItem = document.createElement('div');
    faqItem.classList.add('faq-item');

    // Add question div (with a toggle icon)
    const questionDiv = item.querySelector('div:nth-child(1)');
    const answerDiv = item.querySelector('div:nth-child(2)');
    questionDiv.classList.add('faq-question');
    answerDiv.classList.add('faq-answer');
    answerDiv.style.display = 'none'; 

    // Add a '+' icon to the question (toggle icon)
    const icon = document.createElement('span');
    icon.textContent = '+';
    icon.classList.add('faq-icon');
    questionDiv.appendChild(icon);

    // Event listener for toggle functionality
    questionDiv.addEventListener('click', function() {
     
      if (answerDiv.style.display === 'none') {
        answerDiv.style.display = 'block';
        icon.textContent = '-'; 
        questionDiv.style.borderBottom = '1px solid #c8cdd1'; 
        questionDiv.style.paddingBottom = '10px';
      } else {
        answerDiv.style.display = 'none';
        icon.textContent = '+'; 
        questionDiv.style.borderBottom = ''; 
        questionDiv.style.paddingBottom = '';
      }

      // Close all other answers when a new question is clicked
      faqBlocks.forEach(function(otherItem) {
        if (otherItem !== item) {
          const otherAnswer = otherItem.querySelector('.faq-answer');
          const otherIcon = otherItem.querySelector('.faq-question span');
          if (otherAnswer && otherAnswer.style.display === 'block') {
            otherAnswer.style.display = 'none';
            otherIcon.textContent = '+'; 
          }
        }
      });
    });

    // Append the question and answer to the FAQ item
    faqItem.appendChild(questionDiv);
    faqItem.appendChild(answerDiv);

    // Append the FAQ item to the accordion wrapper
    accordionWrapper.appendChild(faqItem);
  });

  // Clear the existing content and append the new accordion
  block.textContent = ''; 
  block.append(accordionWrapper); 
}
