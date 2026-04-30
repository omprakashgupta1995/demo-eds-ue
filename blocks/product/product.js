document.addEventListener("DOMContentLoaded", () => {
  // Select the 4th, 5th, and 6th div (the image containers)
  const imageCards = document.querySelectorAll(
    ".product.block > div:nth-child(n+4)",
  );

  imageCards.forEach((card) => {
    // Create the arrow element
    const arrowBox = document.createElement("div");
    arrowBox.className = "hover-arrow"; // Assign a class for CSS to target
    arrowBox.innerHTML = "&#x2197;"; // ↗ Unicode character

    // Append it to the container
    card.appendChild(arrowBox);
  });
});
