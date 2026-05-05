export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });
  // 1. Guard clause: Exit immediately if the block or its parents don't exist
  if (!block || !block.parentElement || !block.parentElement.parentElement) {
    console.error('block parent elements or block does not exist ');
    return;
  }

  const block_wrapper = block.parentElement;
  const block_section = block_wrapper.parentElement;

  if(block_section && block_section.classList.contains('our-range-h')){
    const ourRange_header_wrapper = block_section?.children[0];
    const ourRange_header_block = ourRange_header_wrapper?.children[0];
    console.log(ourRange_header_block);

    const homePage_ourRange = ourRange_header_block?.children?.[0];
    homePage_ourRange.classList.add('homepage-our-range');
    const ourRangeTextWrapper = homePage_ourRange?.children?.[0];
    const ourRangeButtonWrpper = homePage_ourRange?.children?.[1];
    ourRangeTextWrapper.classList.add('ourRange-text-wrapper');
    ourRangeTextWrapper?.children?.[0].classList.add('our-range-title');
    ourRangeTextWrapper?.children?.[1].classList.add('our-range-heading');
    if(ourRangeButtonWrpper && ourRangeButtonWrpper.children.length > 0){
      ourRangeButtonWrpper.classList.add('ourRange-button-wrapper');
    }else{
      ourRangeButtonWrpper.remove();
    }
    
  }

}
