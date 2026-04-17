export default function carousel(block) {
    const rows = [...block.children];
    const carousel = document.createElement('div');
    carousel.className = 'carousel-container';
    rows.forEach((row)=>{
        const cols =[...row.children];
        
        const item =document.createElement('div');
        item.className = 'carousel-item';
        while(row.firstElementChild) item.append(row.firstElementChild);
        carousel.append(item);
    })
    block.appendChild(carousel);
}