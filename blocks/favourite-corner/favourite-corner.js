export default async function decorate(block) {
  const favouriteChild = Array.from(block.children);
  favouriteChild.forEach((element, index) => {
    element.classList.add(`child-${index}`); // Adds class like child-0, child-1, etc.
  });
  const picTag = Array.from(favouriteChild[0].children);

picTag.forEach((el) => {
  el.classList.add("pic");
});

}
