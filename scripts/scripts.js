import {
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
} from "./aem.js";

import { fragmentURL } from "../blocks/fragment/fragment.js";

/**
 * Moves all the attributes from a given elmenet to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveAttributes(from, to, attributes) {
  if (!attributes) {
    // eslint-disable-next-line no-param-reassign
    attributes = [...from.attributes].map(({ nodeName }) => nodeName);
  }
  attributes.forEach((attr) => {
    const value = from.getAttribute(attr);
    if (value) {
      to.setAttribute(attr, value);
      from.removeAttribute(attr);
    }
  });
}
/**
 * Wraps images followed by links within a matching <a> tag.
 * @param {Element} container The container element
 */
/* function wrapImgsInLinks(container) {
  const pictureParas = container.querySelectorAll('p picture');
  pictureParas.forEach((pic) => {
    const pictureWrapper = pic.closest('p');
    const nextPara = pictureWrapper?.nextElementSibling;
    if (
      nextPara && nextPara.querySelector('a')
    ) {
      const link = nextPara.querySelector('a');
      // Move the picture into the link
      link.innerHTML = pic.outerHTML;
      // Replace the picture's <p> entirely with the button <p>
      pictureWrapper.replaceWith(nextPara);
    }
  });
} */
/* OPTIMIZED WAY: */
function wrapImgsInLinks(container) {
  const pictureElements = container.querySelectorAll("p picture");
  pictureElements.forEach((picture) => {
    const pictureParagraph = picture.closest("p");
    const nextParagraph = pictureParagraph?.nextElementSibling;
    if (!nextParagraph) return;
    const anchor = nextParagraph.querySelector("a");
    if (!anchor) return;
    // Replace anchor's content with the picture
    anchor.replaceChildren(picture.cloneNode(true));
    // Replace the picture's <p> with the anchor's <p>
    pictureParagraph.replaceWith(nextParagraph);
  });
}
/* function wrapImgsInLinks(container) {
  const pictures = container.querySelectorAll('picture');
  pictures.forEach((pic) => {
    const link = pic.nextElementSibling;
    if (link && link.tagName === 'A' && link.href) {
      link.innerHTML = pic.outerHTML;
      pic.replaceWith(link);
    }
  });
} */
/**
 * Move instrumentation attributes from a given element to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveInstrumentation(from, to) {
  moveAttributes(
    from,
    to,
    [...from.attributes]
      .map(({ nodeName }) => nodeName)
      .filter(
        (attr) =>
          attr.startsWith("data-aue-") || attr.startsWith("data-richtext-")
      )
  );
}
/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes("localhost"))
      sessionStorage.setItem("fonts-loaded", "true");
  } catch (e) {
    // do nothing
  }
}
function autolinkModals(element) {
  element.addEventListener("click", async (e) => {
    const origin = e.target.closest("a");
    if (origin && origin.href && origin.href.includes("/modals/")) {
      e.preventDefault();
      const { openModal } = await import(
        `${window.hlx.codeBasePath}/blocks/modal/modal.js`
      );
      openModal(origin.href);
    }
  });
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks() {
  try {
    // TODO: add auto block, if needed
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Auto Blocking failed", error);
  }
}
/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
}
/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = "en";
  decorateTemplateAndTheme();
  const main = doc.querySelector("main");
  if (main) {
    decorateMain(main);
    document.body.classList.add("appear");
    await loadSection(main.querySelector(".section"), waitForFirstImage);
  }
  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem("fonts-loaded")) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}
/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  autolinkModals(doc);
  autolinkFragments(doc);
  const main = doc.querySelector("main");
  await loadSections(main);
  /* Image with A tag link */
  wrapImgsInLinks(main);
  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();
  loadHeader(doc.querySelector("header"));
  loadFooter(doc.querySelector("footer"));
  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();
}
/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import("./delayed.js"), 3000);
  // load anything that can be postponed to the latest here
}
async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}
loadPage();

// changes for fragment 
async function autolinkFragments(element) {
  element.querySelectorAll("a").forEach((origin) => {
    if (origin && origin.href && origin.href.includes("/fragment/")) {
      const parent = origin.parentElement;
      const div = document.createElement("div");
      div.append(origin);
      parent.append(div);
      fragmentURL(div);
    }
  });
}
