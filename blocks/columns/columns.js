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
  

 

  if(block && block.classList.contains('our-range-h')){
    const homePage_ourRange = block?.children?.[0];
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
