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

document.addEventListener("DOMContentLoaded", function() {
    // Wait until the DOM is fully loaded
    setTimeout(function() {
        // Select all question blocks (each question-answer pair is inside a div)
        const questions = document.querySelectorAll('.oona-block-3-wrapper .oona-block-3.block > div');

        // Loop through each question block
        questions.forEach(function(item) {
            const question = item.querySelector('div p:first-of-type'); // Select the question text
            const answer = item.querySelector('div p:last-of-type');   // Select the answer text
            
            if (!question || !answer) return; // Make sure both question and answer exist
            
            const icon = document.createElement('span');
            icon.textContent = '+';  // Set initial icon as "+"
            icon.style.fontWeight = 'bold';
            icon.style.marginLeft = '10px';
            question.appendChild(icon); // Append icon to the question text

            // Initially hide the answer text
            answer.style.display = 'none';

            // Add click event to toggle the accordion
            question.addEventListener('click', function() {
                // Toggle the answer visibility
                if (answer.style.display === 'none') {
                    answer.style.display = 'block';  // Show the answer
                    icon.textContent = '-';  // Change the icon to "-"
                } else {
                    answer.style.display = 'none';  // Hide the answer
                    icon.textContent = '+';  // Change the icon back to "+"
                }

                // Close all other answers (ensuring only one is open at a time)
                questions.forEach(function(otherItem) {
                    if (otherItem !== item) {
                        const otherAnswer = otherItem.querySelector('div p:last-of-type');
                        const otherIcon = otherItem.querySelector('div p:first-of-type').querySelector('span');
                        if (otherAnswer && otherAnswer.style.display === 'block') {
                            otherAnswer.style.display = 'none';
                            otherIcon.textContent = '+';  // Reset the icon for other questions
                        }
                    }
                });
            });
        });
    }, 100); // Set a small delay (100ms) to ensure DOM elements are fully loaded
});
