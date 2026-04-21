export default function decorate(block) {
  let rows = [...block.children];

  rows[0].classList.add("banner-text");
  rows[1].classList.add("banner-img");

  let bannertext = rows[0];
  bannertext.children[0].classList.add("banner-text-wrapper");

  let bannerImg = rows[1];
  bannerImg.children[0].classList.add("banner-img-wrapper");
}
