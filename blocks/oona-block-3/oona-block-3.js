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

export default function decorate(block) {
    document.addEventListener("DOMContentLoaded", function() {
        // Select all question-answer blocks inside the oona-block-3-wrapper
        const faqBlocks = block.querySelectorAll('.oona-block-3-wrapper .oona-block-3.block > div');

        // Loop through each FAQ block and add class names for easier access
        faqBlocks.forEach(function(item, index) {
            // Add classes to the question and answer divs for easier targeting
            const questionDiv = item.querySelector('div:nth-child(1)');
            const answerDiv = item.querySelector('div:nth-child(2)');
            
            // Assign class names to question and answer for easy targeting
            questionDiv.classList.add('faq-question');
            answerDiv.classList.add('faq-answer');

            // Add a unique ID to each FAQ block for easier access
            questionDiv.classList.add(`faq-question-${index + 1}`);
            answerDiv.classList.add(`faq-answer-${index + 1}`);

            // Initially hide all answers
            answerDiv.style.display = 'none';

            // Create a '+' icon and append it to the question
            const icon = document.createElement('span');
            icon.textContent = '+';
            icon.classList.add('faq-icon');
            questionDiv.appendChild(icon);

            // Add click event listener to toggle the answer visibility
            questionDiv.addEventListener('click', function() {
                // Toggle the visibility of the answer
                if (answerDiv.style.display === 'none') {
                    answerDiv.style.display = 'block';
                    icon.textContent = '-'; // Change icon to minus when answer is shown
                } else {
                    answerDiv.style.display = 'none';
                    icon.textContent = '+'; // Change icon back to plus when answer is hidden
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
        });
    });
}
