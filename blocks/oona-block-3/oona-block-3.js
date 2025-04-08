document.addEventListener("DOMContentLoaded", function() {
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
