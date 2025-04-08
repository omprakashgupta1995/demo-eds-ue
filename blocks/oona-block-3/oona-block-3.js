document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll('.oona-block-3 .block > div');

    // Add 'answer' class dynamically and hide answers
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
            // Close all answers
            items.forEach(i => i.querySelector('.answer').style.display = 'none');
            items.forEach(i => i.querySelector('.toggle').textContent = '+');

            if (!isOpen) {
                answer.style.display = 'block';
                toggle.textContent = '-';
            }
        });
    });

    // Open the first question by default
    items[0].querySelector('.answer').style.display = 'block';
    items[0].querySelector('.toggle').textContent = '-';
});
