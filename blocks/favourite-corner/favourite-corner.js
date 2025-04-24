export default async function decorate(block) {
  const favouriteChild = Array.from(block.children);

  favouriteChild.forEach((element) => {
    element.classList.add('favourite-corner-block');

    // Get children of each favourite-corner-block
    const innerChildren = Array.from(element.children);
    innerChildren.forEach((child, childIndex) => {
      child.classList.add(`favourite-inner-${childIndex}`);
      // Example: favourite-inner-0-0, favourite-inner-0-1, etc.
    });
  });
}
