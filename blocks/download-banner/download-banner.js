export default function decorate(block) {
    let rows = [...block.children];
    rows[0].classList.add('banner-content');
    console.log(rows[0]);
}