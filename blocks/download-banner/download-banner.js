export default function decorate(block){
    const rows = [...block.children];
    rows[0].classList.add('banner-image-wrapper')
    rows[1].classList.add('download-content-wrapper')
    
    
    rows[0].children[0].classList.add('download-image')
    rows[1].children[0].classList.add('download-content')
    
}