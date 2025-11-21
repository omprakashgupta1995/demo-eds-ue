export default function decorate(block) {
    // Append only the contact list, removing wrapper divs
    const contactItemsWrapper = block.querySelector(':scope > div > div > ol');
    if (!contactItemsWrapper) return;

    block.textContent = '';
    block.append(contactItemsWrapper);
}