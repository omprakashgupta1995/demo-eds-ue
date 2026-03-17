export function initHeaderNav(block) {

  const body = document.body;

  /* ---------------- DROPDOWN ---------------- */
  const hoverItems = block.querySelectorAll('.hover-trigger');
  const navbarOverlay = block.querySelector('#navbar-overlay-evt');

  hoverItems.forEach(item => {
    const contentId = item.id + '-drop';
    const content = block.querySelector(`#${contentId}`);
    let addactive = null;

    if (!content) return;

    item.addEventListener('click', function (event) {
      event.stopPropagation();

      const isActive = item.classList.contains('active');
      addactive = event.target.closest('li');

      // reset all
      hoverItems.forEach(otherItem => {
        const otherContent = block.querySelector(`#${otherItem.id}-drop`);
        otherItem.classList.remove('active');
        otherContent?.classList.remove('show');
        otherItem.closest('li')?.classList.remove('active');
      });

      if (isActive) {
        item.classList.remove('active');
        content.classList.remove('show');
        addactive?.classList.remove('active');

        body.style.overflow = "auto";
        navbarOverlay?.classList.add('dsp-none');

      } else {
        item.classList.add('active');
        content.classList.add('show');
        addactive?.classList.add('active');

        navbarOverlay?.classList.remove('dsp-none');
        body.style.overflow = "hidden";

        resetHam?.();
        resetlognoti?.();
      }
    });

    /* -------- HOVER FIX -------- */
    content.addEventListener('mouseenter', () => {
      item.classList.add('active');
      content.classList.add('show');
      addactive?.classList.add('active');
      navbarOverlay?.classList.remove('dsp-none');
      body.style.overflow = "hidden";
    });

    content.addEventListener('mouseleave', () => {
      item.classList.remove('active');
      content.classList.remove('show');
      addactive?.classList.remove('active');
      body.style.overflow = "auto";
      navbarOverlay?.classList.add('dsp-none');
    });
  });

  /* ---------------- OUTSIDE CLICK ---------------- */
  document.addEventListener('click', function (event) {
    if (!block.contains(event.target)) {
      hoverItems.forEach(item => {
        const content = block.querySelector(`#${item.id}-drop`);

        item.classList.remove('active');
        content?.classList.remove('show');
        item.closest('li')?.classList.remove('active');
      });

      navbarOverlay?.classList.add('dsp-none');
      body.style.overflow = "auto";
    }
  });

  /* ---------------- HAMBURGER ---------------- */
  const desktopHamburger = block.querySelector(".menu-image");
  const desktopHumburgerContent = block.querySelector(".desktopHumburger");

  if (desktopHamburger) {
    desktopHamburger.addEventListener('click', function () {

      const isOpen = desktopHamburger.classList.contains("turnImg");

      if (isOpen) {
        desktopHamburger.classList.remove("turnImg");
        desktopHamburger.src = "/content/dam/ifliwebsite/header/menu.svg";
        desktopHumburgerContent?.classList.remove("hidden");
        navbarOverlay?.classList.add('dsp-none');
        body.style.overflow = "auto";

      } else {
        desktopHamburger.classList.add("turnImg");
        desktopHamburger.src = "/content/dam/ifliwebsite/header/discard-dark.png";
        desktopHumburgerContent?.classList.add("hidden");
        navbarOverlay?.classList.remove('dsp-none');
        body.style.overflow = "hidden";

        // close dropdowns
        block.querySelectorAll('.hover-show-content').forEach(c => {
          c.classList.remove('show');
        });
      }
    });
  }

  /* ---------------- MOBILE DROPDOWN ---------------- */
  const dropdownBtn = block.querySelector("#dropdown-btn");
  const dropdownContent = block.querySelector("#dropdown-content");

  if (dropdownBtn && dropdownContent) {
    dropdownBtn.addEventListener("click", function (e) {
      e.stopPropagation();

      const isOpen = dropdownContent.classList.contains("show");

      dropdownContent.classList.toggle("show", !isOpen);
      dropdownBtn.innerText = isOpen ? "+" : "-";
    });

    document.addEventListener("click", function (event) {
      if (!dropdownBtn.contains(event.target)) {
        dropdownContent.classList.remove("show");
        dropdownBtn.innerText = "+";
      }
    });
  }

//   mobile menu click outside
/* ---------------- SUBMENU CLICK ---------------- */
  const submenuItems = block.querySelectorAll('.submenu-list-evt');

  submenuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();

      const parent = item.parentElement;
      const isActive = parent.classList.contains('active');

      // reset all
      submenuItems.forEach(el => el.parentElement.classList.remove('active'));
      block.querySelectorAll('.deskhumb-drop-suboption-div')
        .forEach(el => el.classList.add('dsp-none'));

      if (!isActive) {
        parent.classList.add('active');
        parent.nextElementSibling?.classList.remove('dsp-none');
      }
    });
  });

  /* ---------------- LOGIN DROPDOWN ---------------- */
  const loginBtn = block.querySelector('.login-customer-evt');
  const loginMenu = block.querySelector('.login-customer-submenu-evt');

  loginBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    loginBtn.classList.toggle('open');
    loginMenu?.classList.toggle('dsp-none');
  });

  block.querySelectorAll('.login-dropdwn-evt li').forEach(li => {
    li.addEventListener('click', (e) => e.stopPropagation());
  });

  /* ---------------- MOBILE MENU OPEN ---------------- */
  const openMenuBtn = block.querySelector('.toggle-mob-menu-evt');

  openMenuBtn?.addEventListener('click', () => {
    block.querySelector('.mobile_menu_container')?.classList.remove('dsp-none');
    block.querySelector('.sticky-nav-footer-container')?.classList.add('dsp-none');
    body.style.overflow = "hidden";
  });

  /* ---------------- MOBILE MENU CLOSE ---------------- */
  const closeMenuBtn = block.querySelector('.mobile-menu-close-evt');

  closeMenuBtn?.addEventListener('click', () => {
    block.querySelector('.mobile_menu_container')?.classList.add('dsp-none');
    block.querySelector('.sticky-nav-footer-container')?.classList.remove('dsp-none');
    body.style.overflow = "auto";
    resetHam?.();
  });

  /* ---------------- MOBILE BACK ---------------- */
  block.querySelectorAll('.mobile-menu-back-evt').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.mobile_menu_submenu-evt');
      parent?.classList.add('dsp-none');

      const next = parent?.nextElementSibling;
      if (next?.querySelector('ul')) {
        next.classList.add('dsp-none');
        next.querySelector('ul')?.classList.add('dsp-none');
      }
    });
  });

  /* ---------------- MOBILE SUBMENU TOGGLE ---------------- */
  block.querySelectorAll('.mobile_menu_submenu-toggle-evt').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      const parent = btn.closest('.mobile_menu_submenu-evt');
      const next = parent?.nextElementSibling;

      if (next?.querySelector('ul')) {
        next.classList.toggle('dsp-none');
        next.querySelector('ul')?.classList.remove('dsp-none');
      } else {
        window.location.href = parent?.getAttribute('href');
      }
    });
  });

  /* ---------------- MORE SUBMENU ---------------- */
  block.querySelectorAll('.mobile_more_submenu-toggle-evt').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = btn.nextElementSibling;
      next?.classList.toggle('dsp-none');
      next?.querySelector('.menu-main_plans')?.classList.remove('dsp-none');
    });
  });

  /* ---------------- OVERLAY CLICK ---------------- */
  const overlay = block.querySelector('#navbar-overlay-evt');

  overlay?.addEventListener('click', () => {
    const searchOpen = block.querySelector('.header-search-open-evt');

    if (searchOpen?.classList.contains('search-active')) {
      searchOpen.classList.remove('search-active');
      overlay.classList.add('dsp-none');
      body.style.overflow = "auto";

      block.querySelector('.search-search_wrapper_evt')
        ?.classList.add('dsp-none');
    } else {
      overlay.classList.add('dsp-none');
    }

    resetHam?.();

    block.querySelector('.desktopHumburger')?.classList.remove('hidden');

    const menuImg = block.querySelector('.menu-image');
    if (menuImg?.classList.contains('turnImg')) {
      menuImg.src = '/content/dam/ifliwebsite/header/menu.svg';
      menuImg.classList.remove('turnImg');
      body.style.overflow = "auto";
    }
  });

  /* ---------------- NOTIFICATION ---------------- */
  block.querySelectorAll('.notif_img_evt').forEach(btn => {
    btn.addEventListener('click', () => {
      block.querySelector('.notificication_wrapper-evt')
        ?.classList.toggle('dsp-none');

      body.style.overflow = "auto";
      overlay?.classList.add('dsp-none');

      block.querySelectorAll('.notificication_wrapper-notification_div.active')
        .forEach(el => el.classList.remove('active'));

      resetHam?.();
      block.querySelector('.desktopHumburger')?.classList.remove('hidden');

      const menuImg = block.querySelector('.menu-image');
      if (menuImg?.classList.contains('turnImg')) {
        menuImg.src = '/content/dam/ifliwebsite/header/menu.svg';
        menuImg.classList.remove('turnImg');
      }
    });
  });

  /* ---------------- SEARCH OPEN ---------------- */
  const searchBtn = block.querySelector('.header-search-open-evt');

  searchBtn?.addEventListener('click', () => {
    block.querySelector('.search-search_wrapper_evt')
      ?.classList.remove('dsp-none');

    searchBtn.classList.add('search-active');
    overlay?.classList.remove('dsp-none');
    body.style.overflow = "hidden";

    block.querySelector('#header-search-evt')?.focus();

    const menuImg = block.querySelector('.menu-image');
    if (menuImg?.classList.contains('turnImg')) {
      menuImg.src = '/content/dam/ifliwebsite/header/menu.svg';
      menuImg.classList.remove('turnImg');
      block.querySelector('.desktopHumburger')?.classList.remove('hidden');
      overlay?.classList.add('dsp-none');
    }
  });

  /* ---------------- SEARCH CLOSE ---------------- */
  block.querySelectorAll('.search_input_div-close_evt').forEach(btn => {
    btn.addEventListener('click', () => {
      block.querySelector('.search-search_wrapper_evt')
        ?.classList.add('dsp-none');

      const searchOpen = block.querySelector('.header-search-open-evt');
      searchOpen?.classList.remove('search-active');

      overlay?.classList.add('dsp-none');
      body.style.overflow = "auto";

      resetHam?.();
      block.querySelector('.menu-image').src = '/content/dam/ifliwebsite/header/menu.svg';

      clearSearchResult?.();
    });
  });

  /* ---------------- MOBILE HEADING ---------------- */
  block.querySelectorAll('.main-mobile_heading_toggle_evt').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      const parent = btn.parentElement;
      const isActive = parent.classList.contains('active');

      block.querySelectorAll('.main-mobile_heading_toggle_evt')
        .forEach(el => el.parentElement.classList.remove('active'));

      block.querySelectorAll('.menu-main_plans')
        .forEach(el => el.classList.add('dsp-none'));

      if (!isActive) {
        parent.classList.add('active');
        parent.nextElementSibling?.classList.remove('dsp-none');
      }
    });
  });

  /* ---------------- MORE SUBMENU LIST ---------------- */
  block.querySelectorAll('.more-submenu_list_toggle_evt').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      const parent = btn.closest('.more-submenu_list_evt');
      const isActive = parent?.classList.contains('active');

      block.querySelectorAll('.more-submenu_list_evt')
        .forEach(el => el.classList.remove('active'));

      block.querySelectorAll('.more-submenu_list')
        .forEach(el => el.classList.add('dsp-none'));

      if (!isActive) {
        parent?.classList.add('active');
        parent?.nextElementSibling?.classList.remove('dsp-none');
      }
    });
  });
}