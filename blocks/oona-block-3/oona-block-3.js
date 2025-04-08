/* document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll('.oona-block-3 .block > div');
    
    
    items.forEach(item => {
        const answer = item.querySelector('div:nth-child(2)');
        answer.classList.add('answer');
        answer.style.display = 'none'; 
        
        const question = item.querySelector('div:first-child');
        const toggle = document.createElement('span');
        toggle.classList.add('toggle');
        toggle.textContent = '+'; 
        question.appendChild(toggle); 
        
        question.addEventListener('click', function() {
            const isOpen = answer.style.display === 'block';
            
          
            items.forEach(i => {
                i.querySelector('.answer').style.display = 'none';
                i.querySelector('.toggle').textContent = '+';
            });

            
            if (!isOpen) {
                answer.style.display = 'block';
                toggle.textContent = '-';
            }
        });
    });

    
    const firstItem = items[0];
    const firstAnswer = firstItem.querySelector('.answer');
    const firstToggle = firstItem.querySelector('.toggle');
    
    firstAnswer.style.display = 'block';
    firstToggle.textContent = '-';
});
 */

/* document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll('.oona-block-3 .block > div');

    items.forEach(item => {
        const answer = item.querySelector('div:nth-child(2)');
        const question = item.querySelector('div:first-child');
        const toggle = document.createElement('span');
        toggle.classList.add('toggle');
        toggle.textContent = '+'; // Default toggle state
        question.appendChild(toggle);

        // Initially, hide the answer (just for clarity)
        answer.style.display = 'none';

        // Handle click event on the question
        question.addEventListener('click', function () {
            const isOpen = answer.style.display === 'block';

            // Close all answers and reset the toggle button text
            items.forEach(i => {
                i.querySelector('div:nth-child(2)').style.display = 'none'; // Hide the answer
                i.querySelector('.toggle').textContent = '+'; // Reset toggle to '+'
            });

            // If the clicked question wasn't open, open it and change toggle to '-'
            if (!isOpen) {
                answer.style.display = 'block'; // Show the answer
                toggle.textContent = '-'; // Change toggle to '-'
            }
        });
    });

    // Open the first question by default
    const firstItem = items[0];
    const firstAnswer = firstItem.querySelector('div:nth-child(2)');
    const firstToggle = firstItem.querySelector('.toggle');
    
    firstAnswer.style.display = 'block'; // Show the first answer
    firstToggle.textContent = '-'; // Change first toggle to '-'
}); */

import { createOptimizedPicture } from '../../scripts/aem.js'; // Import necessary utility functions (if needed)
import { moveInstrumentation } from '../../scripts/scripts.js'; // Import utility functions for instrumentation

export default function decorate(block) {
  // Select all question-answer blocks inside the oona-block-3-wrapper
  const faqBlocks = block.querySelectorAll('.oona-block-3-wrapper .oona-block-3.block > div');

  // Create a wrapper for the accordion items (you could use ul or div depending on the layout)
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
    answerDiv.style.display = 'none'; // Initially hide the answer

    // Add a '+' icon to the question (toggle icon)
    const icon = document.createElement('span');
    icon.textContent = '+';
    icon.classList.add('faq-icon');
    questionDiv.appendChild(icon);

    // Event listener for toggle functionality
    questionDiv.addEventListener('click', function() {
      // Toggle visibility of the answer
      if (answerDiv.style.display === 'none') {
        answerDiv.style.display = 'block';
        icon.textContent = '-'; // Change icon to minus
      } else {
        answerDiv.style.display = 'none';
        icon.textContent = '+'; // Change icon to plus
      }

      // Close all other answers when a new question is clicked
      faqBlocks.forEach(function(otherItem) {
        if (otherItem !== item) {
          const otherAnswer = otherItem.querySelector('.faq-answer');
          const otherIcon = otherItem.querySelector('.faq-question span');
          if (otherAnswer && otherAnswer.style.display === 'block') {
            otherAnswer.style.display = 'none';
            otherIcon.textContent = '+'; // Reset icon for other questions
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
  block.textContent = ''; // Clear the existing content of the block
  block.append(accordionWrapper); // Append the accordion
}
