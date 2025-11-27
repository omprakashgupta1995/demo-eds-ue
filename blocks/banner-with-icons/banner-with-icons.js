export default function decorate(block) {
  block.children[0].classList.add('bannerBg');
  block.children[1].classList.add('content_wrapper');

  block
    .querySelector('.content_wrapper')
    .children[0].classList.add('left_content');
  block
    .querySelector('.content_wrapper')
    .children[1].classList.add('right_image');
  block.querySelector('.left_content').children[0].classList.add('heading');

  Array.from(block.querySelector('.left_content').children).forEach(
    (child, i) => {
      if (i > 0 && !child.classList.contains('button-container')) {
        child.classList.add('point_content');
      }
    },
  );

  let pointText = '';
  Array.from(block.querySelectorAll('.point_content')).forEach((point) => {
    pointText += point.outerHTML;
    point.remove();
  });
  const pointDiv = document.createElement('div');
  pointDiv.classList.add('point_container');
  pointDiv.innerHTML = pointText;

  block
    .querySelector('.button-container')
    .parentNode.insertBefore(
      pointDiv,
      block.querySelector('.button-container'),
    );

  Array.from(block.querySelectorAll('.point_content')).forEach((points, i) => {
    if ((i + 1) % 2 === 0) {
      const pointDivList = document.createElement('div');
      pointDivList.classList.add('point_text');
      pointDivList.innerHTML = points.previousElementSibling.outerHTML + points.outerHTML;
      points.previousElementSibling.remove();
      points.remove();
      block.querySelector('.point_container').appendChild(pointDivList);
    }
  });
}
