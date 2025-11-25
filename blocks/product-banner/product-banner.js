export default function decorate(block){
    // block.children[1].style.display="none";
    console.log(block.children);
    const contentOverBanner = [];
    const bannerEl = Array.from(block.children).filter((el,ind)=>{
        if(ind==1){
        } else if (ind>1){
            contentOverBanner.push(el);
        } else {
            return el;
        }
    });
    const flexWrapper = document.createElement('div');
    flexWrapper.append(contentOverBanner[0],contentOverBanner[1]);
    block.innerHTML = '';
    block.append(bannerEl[0]);
    block.append(flexWrapper);

}