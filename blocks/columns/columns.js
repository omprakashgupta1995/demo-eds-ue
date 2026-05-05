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
    if(!homePage_ourRange) return;
    homePage_ourRange.classList.add('homepage-our-range');
    const ourRangeTextWrapper = homePage_ourRange?.children?.[0];
    const ourRangeButtonWrpper = homePage_ourRange?.children?.[1];

    if(ourRangeTextWrapper){
       ourRangeTextWrapper.classList.add('ourRange-text-wrapper');
       ourRangeTextWrapper?.children?.[0].classList.add('our-range-title');
       ourRangeTextWrapper?.children?.[1].classList.add('our-range-heading');
    }
   
    if(ourRangeButtonWrpper){
      const hasLink = ourRangeButtonWrpper.querySelector('a');
      if(hasLink){
        ourRangeButtonWrpper.classList.add('ourRange-button-wrapper');
      }
     else{
      ourRangeButtonWrpper.remove();
    } 
    }
    
  }

  if(block && block.classList.contains('our-range-cards')){
    const rangeCardsWrapper = block?.children?.[0];
    if(rangeCardsWrapper){
      rangeCardsWrapper.classList.add('range-cards-wrapper');
      [...rangeCardsWrapper.children].forEach((row)=>{
        row.classList.add('range-card');

        const cardPicture = row.querySelector('picture');
        const cardImage = cardPicture.querySelector('img');
        cardImage.classList.add('range-card-image');
        const imageWrapper = cardPicture.parentElement;
        imageWrapper.classList.add('card-image-wrapper');
        const link = row.querySelector('a');
        const buttonContainer = link.parentElement;
        buttonContainer.classList.add('card-button');
        const ImageText = row.children?.[2];
        ImageText.classList.add('image-text');
      })
    }
  }

}
