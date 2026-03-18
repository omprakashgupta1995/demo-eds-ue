export function initFooterNav(block) {

  const isMobile = () => window.innerWidth < 768;

  /* ================= ACCORDION (TOP SECTION) ================= */
  function initTopAccordion() {
    if (!isMobile()) return;

    const headers = block.querySelectorAll(".accordion-header");

    headers.forEach((header, index) => {
      const content = header.nextElementSibling;
      if (!content) return;

      // default state
      if (index === 1) {
        content.style.display = "block";
        header.classList.add("active");
      } else {
        content.style.display = "none";
        header.classList.remove("active");
      }

      header.onclick = () => {
        const isOpen = content.style.display === "block";

        // close all
        headers.forEach(h => {
          h.classList.remove("active");
          if (h.nextElementSibling) {
            h.nextElementSibling.style.display = "none";
          }
        });

        // open current
        if (!isOpen) {
          header.classList.add("active");
          content.style.display = "block";
        }
      };
    });
  }

  /* ================= ACRDN (BOTTOM SECTION) ================= */
  function initBottomAccordion() {
    if (!isMobile()) return;

    const items = block.querySelectorAll(".footer-lv2 .acrdn");

    items.forEach(item => {
      const panel = item.parentElement.querySelector(".panel");

      if (!panel) return;

      panel.style.display = "none";

      item.onclick = (e) => {
        e.stopPropagation();

        const isOpen = panel.style.display === "block";

        // close all
        items.forEach(i => {
          i.classList.remove("active");
          const p = i.parentElement.querySelector(".panel");
          if (p) p.style.display = "none";
        });

        // open current
        if (!isOpen) {
          item.classList.add("active");
          panel.style.display = "block";
        }
      };
    });
  }

  /* ================= FOOTER COLUMN FIX ================= */
  function checkViewportWidth() {

    const columns = block.querySelectorAll(".footer-lv1 .col-sm-3");

    columns.forEach((column) => {
      const fhd = column.querySelector(".fhd");

      if (!fhd) return;

      const text = fhd.textContent.trim();

      if (text !== "") {
        column.style.display = isMobile() ? "flex" : "";
      } else {
        column.style.display = "none";
      }
    });

    // fix last visible column border
    let visibleColumns = [...columns].filter(
      col => col.style.display !== "none"
    );

    if (visibleColumns.length > 0) {
      const last = visibleColumns[visibleColumns.length - 1];
      last.style.borderBottom = "none";
    }
  }

  /* ================= INIT ================= */
  function initAll() {
    initTopAccordion();
    initBottomAccordion();
    checkViewportWidth();
  }

  // run after DOM ready (safe for AEM/Franklin)
  requestAnimationFrame(initAll);

  /* ================= RESIZE ================= */
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      initAll();
    }, 200);
  });
}