export default function decorate(block) {
  const rows = [...block.children];

  rows[0].classList.add('banner-text');
  rows[1].classList.add('banner-img');

  const bannertext = rows[0];
  bannertext.children[0].classList.add('banner-text-wrapper');

  const bannerImg = rows[1];
  bannerImg.children[0].classList.add('banner-img-wrapper');
}
