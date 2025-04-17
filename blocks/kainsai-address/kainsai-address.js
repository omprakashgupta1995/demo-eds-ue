export default function decorate(block) {
  // Get direct child <div>s of the block
  const sections = block.querySelectorAll(":scope > div > div");
  console.log("Top-level content sections:", sections);

  sections.forEach((section, index) => {
    // Add section-specific classes (if needed)
    if (index === 0) {
      section.classList.add("address--Section__Image");

      // Get <p> tags inside the image section
      const pictureParagraphs = section.querySelectorAll("p");

      if (pictureParagraphs[0]) {
        pictureParagraphs[0].classList.add("mobile-image");
      }

      if (pictureParagraphs[1]) {
        pictureParagraphs[1].classList.add("desktop-image");
      }
    } else {
      section.classList.add("address--Section__Content");
    }
  });
}
