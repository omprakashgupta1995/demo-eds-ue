import { div, iframe } from "../../scripts/dom-helpers.js";

export default function decorate(block) {
  try {
    const link = block.querySelector("a");
    if (!link) {
      console.log("No link found in the block!");
      return;
    }

    const rawUrl = link.href;
    console.log("1. Found URL:", rawUrl);

    // Clean the URL and add /embed
    const cleanUrl = rawUrl.split("?")[0].replace(/\/$/, "");
    const embedUrl = `${cleanUrl}/embed`;
    console.log("2. Converted to embed URL:", embedUrl);

    // Build the iframe
    const embedWrapper = div(
      { class: "instagram-wrapper" },
      iframe({
        src: embedUrl,
        class: "instagram-reel",
        allowtransparency: "true",
        frameborder: "0",
        scrolling: "no",
        allow: "encrypted-media",
        title: "Instagram Reel Embed",
      }),
    );
    console.log("3. Iframe built successfully");

    // Inject it into the page
    block.replaceChildren(embedWrapper);
    console.log("4. Block replaced successfully");
  } catch (error) {
    console.error("CRASH IN REEL EMBED:", error.message);
  }
}
