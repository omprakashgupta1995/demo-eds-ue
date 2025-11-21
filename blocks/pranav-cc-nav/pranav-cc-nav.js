import { div } from "../../scripts/dom-helpers.js";
export default function decorate(block) {
  const parentSection = block.parentNode.parentNode;
  const navContainer = div(
    { class: "cc-nav-container" },
    ...Array.from(parentSection.children)
  );
  parentSection.appendChild(navContainer);

  const topMenuHeight = 150;

  block.querySelectorAll("a").forEach((navLink) => {
    navLink.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = navLink.getAttribute("href").substring(1);
      let targetElement = null;
      document.querySelectorAll(".section").forEach((section) => {
        if (section.getAttribute("data-id") === targetId) {
          targetElement = section;
        }
      });
      if (targetElement) {
        const offsetTop =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          topMenuHeight +
          1;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  let scrollItems = Array.from(document.querySelectorAll(".section")).filter(
    (section) => section.getAttribute("data-id") !== null
  );
  const menuItems = Array.from(block.querySelectorAll("a"));
  let lastId = null;

  window.addEventListener("scroll", () => {
    const fromTop = window.scrollY + topMenuHeight;

    // Find all items whose top is above the current scroll position
    const cur = scrollItems
      .map((el) => {
        const elTop = el.getBoundingClientRect().top + window.pageYOffset;
        return elTop < fromTop ? el : null;
      })
      .filter(Boolean);

    // Last matching section
    const last = cur[cur.length - 1];

    const id = last ? last.getAttribute("data-id") : "";
    if (lastId !== id) {
      lastId = id;

      // Remove active
      menuItems.forEach((item) => item.classList.remove("active"));

      // Add active to the matching link
      menuItems.forEach((item) => {
        if (item.getAttribute("href") === "#" + id) {
          item.classList.add("active");
        }
      });
    }
  });
}
