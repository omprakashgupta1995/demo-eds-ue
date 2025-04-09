/* import buildAccordianBlock from '../accordion/accordion.js';
import { ul, li, div } from '../../scripts/domhelper.js';

export default async function decorate(block) {
    console.log(block);
    const path = block.textContent.trim();
    const resp = await fetch(path);
    const respData = await resp.json();
    const data = respData.data;
    
    block.textContent = '';
    
    const list = [li('All')]; // Add "All" option at the start
    
    // Create an accordion block with category-based content
    const accordianBlock = div({ class: 'block accordion' }, 
        ...data.map(function (eachdata) {
            list.push(li(eachdata.category)); // Add categories as list items
            // You can add divs with content in the format you already have in your data
            return div(
                div({class: 'accordion-item'}, eachdata.title), 
                div({class: 'accordion-description'}, eachdata.description)
            );
        })
    );

    block.append(ul(...list)); // Append the list of categories
    buildAccordianBlock(accordianBlock); // Initialize the accordion functionality
    block.append(accordianBlock); // Append the initial empty accordion block
    
    let selectLi = document.querySelectorAll('li');
    console.log(selectLi);

    // Loop over each <li> element and add event listeners
    selectLi.forEach((liElement, index) => {
        liElement.addEventListener('click', (event) => {
            console.log(event.currentTarget.textContent);

            // Clear the content of the accordion block
            accordianBlock.innerHTML = '';

            if (event.currentTarget.textContent === 'All') {
                // If "All" is clicked, display all data with the original HTML structure
                data.forEach((elem) => {
                    const divCreation = document.createElement('div');
                    divCreation.innerHTML = `${elem.title} ${elem.description}`; // Use HTML content directly
                    accordianBlock.append(divCreation);
                });
            } else {
                // Display only matching category data with original HTML structure
                data.forEach((elem) => {
                    if (elem.category === event.currentTarget.textContent) {
                        const divCreation = document.createElement('div');
                        divCreation.innerHTML = `${elem.title} ${elem.description}`; // Use HTML content directly
                        accordianBlock.append(divCreation);
                    }
                });
            }
        });
    });
}
 */



import buildAccordianBlock from '../accordion/accordion.js';
import { ul, li, div } from '../../scripts/domhelper.js';

export default async function decorate(block) {
    console.log(block);
    const path = block.textContent.trim();
    const resp = await fetch(path);
    const respData = await resp.json();
    const data = respData.data;

    block.textContent = '';

    const list = [li('All')]; // Add "All" option at the start

    // Create an accordion block with category-based content
    const accordianBlock = div({ class: 'block accordion' },
        ...data.map(function (eachdata) {
            list.push(li(eachdata.category)); 
            return div(
                { class: 'accordion-item' },
                div({ class: 'accordion-title' }, eachdata.title),
                div({ class: 'accordion-description' }, eachdata.description)
            );
        })
    );

    block.append(ul(...list)); 
    block.append(accordianBlock); 

    buildAccordianBlock(accordianBlock);

    // Handle click event on each category
    let selectLi = document.querySelectorAll('li');
    console.log(selectLi);

    // Loop over each <li> element and add event listeners
    selectLi.forEach((liElement) => {
        liElement.addEventListener('click', (event) => {
            console.log(event.currentTarget.textContent);

            // Loop through each accordion item to show/hide based on category
            const accordionItems = accordianBlock.querySelectorAll('.accordion-item');

            accordionItems.forEach((item) => {
                // Hide all items initially
                item.style.display = 'none';
            });

            if (event.currentTarget.textContent === 'All') {
                // Show all items if "All" is clicked
                accordionItems.forEach((item) => {
                    item.style.display = ''; // Reset to default display style (show all)
                });
            } else {
                // Only show items matching the selected category
                data.forEach((elem, index) => {
                    if (elem.category === event.currentTarget.textContent) {
                        const matchingItem = accordionItems[index];
                        if (matchingItem) {
                            matchingItem.style.display = ''; // Show matching item
                        }
                    }
                });
            }
        });
    });
}
