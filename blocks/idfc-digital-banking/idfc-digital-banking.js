/*eslint-disable */

export default function decorate(block){
    const mainBlock = document.querySelector('.idfc-digital-banking.block');

    // Get the first child div inside the block
    const wrapperDiv = mainBlock.querySelector('div');
    wrapperDiv.classList.add('idfc-digital-banking-wrapper');

    // Add classes to each div inside the wrapperDiv
    const innerDivs = wrapperDiv.querySelectorAll(':scope > div');
    innerDivs[0]?.classList.add('db-rte');
    innerDivs[1]?.classList.add('db-video');
    innerDivs[2]?.classList.add('db-img');
}