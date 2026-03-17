export function initHeaderNav() {
  (() => {
    'use strict';
    window.adobeDataLayer;
    function e(e, t, r) {
        window.adobeDataLayer.push({
            event: "headerctaClick",
            data: { ctaText: e, componentName: t },
            product: { productId: r },
        });
    }
    function t(e, t, r, a, s) {
        window.adobeDataLayer.push({
            event: "ctaInteraction",
            data: { ctaText: e, ctaTitle: t, applicationId: a, componentName: r },
            product: { productId: s },
        });
    }
    function r(e, t) {
        window.adobeDataLayer.push({ event: "searchInitiate", data: { componentName: e }, product: { productId: t } });
    }
    function a(e, t, r, a) {
        window.adobeDataLayer.push({
            event: "menuInteraction",
            data: { leveloneMenu: e, leveltwoMenu: t, componentName: r },
            product: { productId: a },
        });
    }
    try {
        var s = document.querySelector(".top_header_wrapper .header-logo"),
            n = document.querySelector(".header_logo_wrapper .header-logo"),
            o = document.querySelector(".top_header_wrapper .menu_sec .search-image"),
            l = document.querySelector(".header_mobile .search_wrapper .search-image"),
            i = document.querySelector(".top_header_wrapper .menu_sec .alert-image"),
            d = document.querySelector(".header_mobile .search_wrapper .alert-image"),
            c = document.querySelector(".top_header_wrapper .menu_sec .orange-btn"),
            u = document.querySelector(".top_header_wrapper .menu_sec .white-btn"),
            v = document.querySelector(".top_header_wrapper .menu_sec .menu_wrap .menu-image"),
            m = document.querySelector(".header_logo_wrapper .menu_wrap .menu-image"),
            p = document.querySelector(".sub_header_container .ask-expert-section"),
            f = document.querySelectorAll(".sub_header_container .sub_header_wrapper .navigation ul li"),
            h = document.querySelectorAll(".top_header_wrapper .menu_sec .lang_dropdown"),
            g = document.querySelectorAll("header .menu_sec .login_dropdown a"),
            x = document.querySelectorAll("header .hover-show-content .navbar-link-section a"),
            b = document.querySelectorAll(
                "header .mobile_menu-main-screen .menu-main_redirection-plans .menu-main_plans a"
            ),
            L = document.querySelectorAll(".desktopHumburger .deskHumbMenu .deskHumbList a"),
            y = document.querySelectorAll(
                ".menu-main_more-wrapper .more-wrapper_list-div.mobile_menu_submenu-evt .menu-main_plans a"
            ),
            _ = document.querySelectorAll(
                "header .hover-show-content .navbar-image-section .navbar-image__quest-div .quest-div__btns a"
            ),
            C = document.querySelectorAll(
                ".search-search_wrapper .search_result_div-default .search_result_div-popular_image_div .popular_image_div-popular_image"
            ),
            k = document.querySelectorAll("header .menu_sec .notificication_wrapper .notificication_wrapper-inner a");
        s &&
            s.addEventListener("click", function () {
                e("header logo", "header", " ");
            }),
            n &&
                n.addEventListener("click", function (t) {
                    e("header logo", "header", " ");
                }),
            o &&
                o.addEventListener("click", function () {
                    r("header", "");
                }),
            l &&
                l.addEventListener("click", function () {
                    r("header", "");
                }),
            i &&
                i.addEventListener("click", function () {
                    e("notification icon", "header", " ");
                }),
            d &&
                d.addEventListener("click", function () {
                    e("notification icon", "header", " ");
                }),
            c &&
                c.addEventListener("click", function (t) {
                    e(t.target.textContent.trim(), "header", "");
                }),
            u &&
                u.addEventListener("click", function (t) {
                    e(t.target.textContent.trim(), "header", "");
                }),
            v &&
                v.addEventListener("click", function () {
                    e("hamburger", "header", "");
                }),
            m &&
                m.addEventListener("click", function () {
                    e("hamburger", "header", "");
                }),
            p &&
                p.addEventListener("click", function (t) {
                    e(t.target.textContent.trim(), "header", " ");
                }),
            f.length > 0 &&
                f.forEach(function (e) {
                    e.addEventListener("click", function (e) {
                        a(e.target.textContent.trim(), "", "header", "");
                    });
                }),
            h.length > 0 &&
                h.forEach(function (e) {
                    e.addEventListener("click", function (e) {
                        var t,
                            r,
                            a,
                            s = e.target.closest("li").getAttribute("data-value");
                        (t = s),
                            (r = "header"),
                            (a = ""),
                            window.adobeDataLayer.push({
                                event: "selectLanguage",
                                data: { selectedLanguage: t, componentName: r },
                                product: { productId: a },
                            });
                    });
                }),
            g.length > 0 &&
                g.forEach(function (t) {
                    t.addEventListener("click", function (t) {
                        e(t.currentTarget.innerText.trim(), "Header", "");
                    });
                }),
            x.length > 0 &&
                x.forEach(function (e) {
                    e.addEventListener("click", function (e) {
                        var t = e.currentTarget.innerText.trim(),
                            r = "";
                        e.currentTarget.closest(".hover-show-content") &&
                            (r = document.querySelector(
                                `#${e.currentTarget.closest(".hover-show-content").getAttribute("id").split("-")[0]}`
                            ).innerText);
                        a(r, t, "header", "");
                    });
                }),
            b.length > 0 &&
                b.forEach(function (e) {
                    e.addEventListener("click", function (e) {
                        var t = e.currentTarget.innerText.trim(),
                            r = "";
                        e.currentTarget.closest(".menu-main_redirection-plans") &&
                            (r = e.currentTarget
                                .closest(".menu-main_redirection-plans")
                                .querySelector(".main-mobile_heading_evt")
                                .innerText.trim());
                        a(r, t, "header", "");
                    });
                }),
            L.length > 0 &&
                L.forEach(function (e) {
                    e.addEventListener("click", function (e) {
                        var t = "",
                            r = "";
                        e.currentTarget.closest(".deskhumb-drop-suboption-div")
                            ? ((t = e.currentTarget.innerText.trim()),
                              (r = e.currentTarget
                                  .closest(".deskhum-drop-option")
                                  .querySelector(".submenu-list-inner")
                                  .innerText.trim()))
                            : (r = e.currentTarget.innerText.trim());
                        a(r, t, "hamburger", "");
                    });
                }),
            y.length > 0 &&
                y.forEach(function (e) {
                    e.addEventListener("click", function (e) {
                        var t = "",
                            r = "";
                        e.currentTarget.closest(".more-submenu_list")
                            ? ((t = e.currentTarget.innerText.trim()),
                              (r = e.currentTarget
                                  .closest(".more-submenu_list")
                                  .previousElementSibling.innerText.trim()))
                            : (r = e.currentTarget.innerText.trim());
                        a(r, t, "hamburger", "");
                    });
                }),
            _.length > 0 &&
                _.forEach(function (e) {
                    e.addEventListener("click", function (e) {
                        t(
                            e.currentTarget.innerText.trim(),
                            e.currentTarget.closest(".navbar-image__quest-div").querySelector("p").innerText.trim(),
                            "header",
                            "",
                            ""
                        );
                    });
                }),
            C.length > 0 &&
                C.forEach(function (e) {
                    e.addEventListener("click", function (e) {
                        !(function (e, t, r, a) {
                            window.adobeDataLayer.push({
                                event: "searchboxbannerClick",
                                data: { bannerTitle: e, bannerPosition: t, componentName: r },
                                product: { productId: a },
                            });
                        })(
                            e.currentTarget.querySelector("span").innerText,
                            e.currentTarget.dataset.analyticsSearchcardcount,
                            "header search",
                            ""
                        );
                    });
                }),
            k.length > 0 &&
                k.forEach(function (e) {
                    e.addEventListener("click", function (e) {
                        t(
                            e.currentTarget.querySelector(".notif_content-description").innerText.trim(),
                            e.currentTarget.querySelector(".notif_content-heading").innerText.trim(),
                            "header notification",
                            "",
                            ""
                        );
                    });
                });
    } catch (e) {
        console.error("analytics failed" + e.message);
    }
    function w(e) {
      let t = document.querySelector("#doaminroot");
      let r = e.replace(".html", "").replace(t.getAttribute("data-contentroot"), t.getAttribute("data-domain"));
      return window.location.href.includes("wcmmode=disabled") && (r += ".html"), r;
    }
    function S(e) {
        (e.includes("/gu") || e.includes("/content/dam/ifliwebsite/")) &&
            (e.includes(location.origin) || (e = location.origin + e));
        let t = e.includes("/hi"),
            r = e.includes("/en"),
            a = e.includes("/gu"),
            s = e.includes("/ta"),
            n = e.includes("/te"),
            o = e.includes("/mr"),
            l = e.includes("/bn"),
            i = e.includes("/nominee-central"),
            d = new URL(e).pathname;
        return (
            t
                ? (d = d.replace("/hi", "/content/ifliwebsite/in/hi"))
                : r
                  ? ((d = d.replace("/en", "/content/ifliwebsite/in/en")),
                    i && (d = "/content/ifliwebsite/in/en/nominee-central"))
                  : a
                    ? (d = d.replace("/gu", "/content/ifliwebsite/in/gu"))
                    : s
                      ? (d = d.replace("/ta", "/content/ifliwebsite/in/ta"))
                      : n
                        ? (d = d.replace("/te", "/content/ifliwebsite/in/te"))
                        : o
                          ? (d = d.replace("/mr", "/content/ifliwebsite/in/mr"))
                          : l
                            ? (d = d.replace("/bn", "/content/ifliwebsite/in/bn"))
                            : ((d = "/content/ifliwebsite/in/en"),
                              i && (d = "/content/ifliwebsite/in/en/nominee-central")),
            d
        );
    }
    function q(e) {
      return new Promise((t, r) => {
        let a, s, n, o;
        
        // Replace jQuery $('.pageRootPaths').map() with vanilla JS
        const pageRootPathsElements = document.querySelectorAll(".pageRootPaths");
        s = Array.from(pageRootPathsElements).map(el => el.value.trim());
        
        const pdfRootPathsElements = document.querySelectorAll(".pdfRootPaths");
        n = Array.from(pdfRootPathsElements).map(el => el.value.trim());
        
        const cfRootPathsElements = document.querySelectorAll(".cfRootPaths");
        o = Array.from(cfRootPathsElements).map(el => el.value.trim());

        let l = {
          requestJson: {
            data: {
              requestJson: {
                pageRootPaths: (s = [S(s[0])]),
                pdfRootPaths: n,
                cfRootPaths: o,
                searchText: e,
              },
            },
          },
        };
        
        let i = apiConfig.searchResult;
        callPostAPI(i, l, "form")
          .then((e) => {
            if (200 != e.statusCode || e.responseJson.errorMessage) {
              r(e.responseJson);
            } else {
              let a = e.responseJson;
              t(a);
            }
          })
          .catch((e) => {
            console.error(e);
          });
      });
    }
    function T(e, t, r, a) {
      const s = document.querySelector(".popular_searches_div-popular_searches .searchresultstate");
      s.innerHTML = '';
      let n = 0;
      
      for (
        e = P(e, "url"), t = P(t, "url"), r = P(r, "productName");
        a > 0 && (n < e.length || n < t.length || n < r.length);
      ) {
        if (n < e.length && a > 0 && e[n] != null && e[n] !== "" && e[n]) {
          s.append(A(e[n]));
          a--;
        }
        
        if (n < t.length && a > 0 && t[n] != null && t[n] !== "" && t[n]) {
          const o = t[n];
          const html = `<h3><a href="${o.url}.coredownload.inline.pdf" target="_blank">${o.heading}</a></h3>`;
          s.insertAdjacentHTML('beforeend', html);
          a--;
        }
        
        if (n < r.length && a > 0 && r[n] != null && r[n] !== "" && r[n]) {
          s.append(E(r[n]));
          a--;
        }
        n++;
      }

      document.querySelectorAll(".popular_searches_div-popular_searches .searchresultstate h3 a").forEach(link => {
        link.addEventListener("click", (e) => {
          let t = document.getElementById("header-search-evt").value;
          let r = e.currentTarget.innerText;
          let a = "header search";
          let s = "";
          window.adobeDataLayer.push({
            event: "suggestedsearchClick",
            data: { searchTerm: t, suggestedsearchTerm: r, componentName: a },
            product: { productId: s },
          });
        });
      });
    }
    function A(e) {
        return `<h3><a href="${w(e.url)}">${e.title}</a></h3>`;
    }
    function E(e) {
        return (
            '<h3><a href="' +
            (function (e) {
                const t = new DOMParser(),
                    r = t.parseFromString(e, "text/html").querySelector("a");
                let a;
                r && (a = r.getAttribute("href"));
                return a;
            })(e.porductDetailPageUrl) +
            `">${e.productName}</a></h3>`
        );
    }
    function P(e, t) {
        return e.reduce((e, r) => (e.find((e) => e[t] === r[t]) ? e : e.concat([r])), []);
    }
    function I(e) {
        e = "";
        return (
            null != document.querySelector(".prod-detail-leftupper h1") &&
                (e = document.querySelector(".prod-detail-leftupper h1").innerText),
            e
        );
    }
    function D(e) {
        return "string" != typeof e
            ? e
            : e
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")
                  .replace(/&/g, "&amp;")
                  .replace(/"/g, "&quot;")
                  .replace(/'/g, "&#39;")
                  .replace(/`/g, "&#96;");
    }
    (window.aesDecrypt = function (e) {
        return JSON.parse(aes.decrypt(secretKey, e));
    }),
        (window.dataAesDecrypt = function (e) {
            return JSON.parse(dataAes.decrypt(e));
        }),
        (window.aesEncrypt = function (e) {
            return aes.encrypt(secretKey, JSON.stringify(e));
        }),
        (window.dataAesEncrypt = function (e) {
            return dataAes.encrypt(JSON.stringify(e));
        });
    var N = document.querySelectorAll(".dropdown_container");
    N.length > 0 &&
        N.forEach(function (e) {
            e.addEventListener("click", function (e) {
                var t = e.target.querySelector(".dropdown-content");
                (t = null != t ? t : e.target.nextElementSibling) &&
                    t.classList.contains("dropdown-content") &&
                    (t.classList.contains("dsp-block")
                        ? (t.classList.add("dsp-none"),
                          t.classList.remove("dsp-block"),
                          e.target.closest(".dropdown_container").classList.remove("rotate_img"),
                          Z(t))
                        : (t.classList.add("dsp-block"),
                          document.querySelector(".desktopHumburger") &&
                              document.querySelector(".desktopHumburger").classList.contains("hidden") &&
                              document.querySelector(".desktopHumburger").classList.remove("hidden"),
                          document.querySelector(".menu-image") &&
                              document.querySelector(".menu-image").classList.contains("turnImg") &&
                              ((document.querySelector(".menu-image").src = "/content/dam/ifliwebsite/header/menu.svg"),
                              document.querySelector(".turnImg").classList.remove("turnImg")),
                          V(),
                          document.getElementById("navbar-overlay-evt") &&
                              document.getElementById("navbar-overlay-evt").length > 0 &&
                              document.getElementById("navbar-overlay-evt").classList.add("dsp-none"),
                          (document.querySelector("body").style.overflow = "auto"),
                          t.classList.remove("dsp-none"),
                          e.target.closest(".dropdown_container").classList.add("rotate_img"),
                          Z(t)));
            });
        });
    var z = document.querySelectorAll(".dropdown-content");
    function Z(e) {
        document.querySelectorAll(".dropdown-content").forEach(function (t) {
            t !== e &&
                (t.classList.remove("dsp-block"),
                t.classList.add("dsp-none"),
                t.closest(".dropdown_container").classList.remove("rotate_img"));
        });
    }
    z.length > 0 &&
        z.forEach(function (e) {
            var t = e;
            e.addEventListener("click", function (e) {
                var r = e.target.textContent;
                t.previousElementSibling.textContent = r;
                try {
                    e.currentTarget.classList.contains("dropdown-content") &&
                        (e.currentTarget.querySelector(".active") &&
                            e.currentTarget.querySelector(".active").classList.remove("active"),
                        "LI" == e.target.tagName
                            ? e.target.classList.add("active")
                            : e.target.parentElement.classList.add("active"));
                } catch (e) {
                    console.log(e);
                }
                "A" == e.target.tagName
                    ? (e.target.parentNode.parentNode.classList.remove("dsp-block"),
                      e.target.parentNode.parentNode.classList.add("dsp-none"))
                    : (e.target.parentNode.classList.remove("dsp-block"),
                      e.target.parentNode.classList.add("dsp-none")),
                    e.target.closest(".dropdown_container").classList.remove("rotate_img");
            });
        }),
        document.addEventListener("click", function (e) {
            e.target.closest(".dropdown_container") || Z(),
                e.target.classList.contains("notif_img_evt") || e.target.closest(".notificication_wrapper-evt")
                    ? console.log("")
                    : (document.querySelector(".notificication_wrapper-evt")?.classList.add("dsp-none"),
                      document.querySelector(".notificication_wrapper-notification_div.active") &&
                          document.querySelector(".notificication_wrapper-notification_div.active").classList.remove("active")),
                e.target.classList.contains("header-search-open-evt") ||
                e.target.closest(".search-search_wrapper_evt")
                    ? console.log("")
                    : O();
        }),
        document.addEventListener("click", function (e) {
            if (e.target && e.target.classList.contains("avaamo__icon")) {
                console.log(e);
                var t = document.querySelector(".header-search-open-evt"),
                    r = document.getElementById("navbar-overlay-evt");
                t?.classList.contains("search-active") &&
                    (t.classList.remove("search-active"),
                    r.classList.add("dsp-none"),
                    document.querySelector(".search-search_wrapper_evt")?.classList.add("dsp-none"),
                    (document.body.style.overflow = "auto"),
                    V());
            }
        }),
        document.querySelector(".header-search-open-evt")?.classList.contains("search-active") &&
            (document.querySelector(".header-search-open-evt")?.classList.remove("search-active"),
            document.querySelector(".search-search_wrapper_evt")?.classList.add("dsp-none"));
    function B(e, t) {
      if (e.length >= 3) {
        const resultCountElements = document.querySelectorAll(".resultCount");
        let r = Array.from(resultCountElements).map(el => el.value.trim());
        
        q(e)
          .then((a) => {
            let s = a?.searchResult || [];
            let n = a?.assetResult || [];
            let o = a?.cfResult || [];
            
            if ((s.length > 0 || n.length > 0 || o.length > 0)) {
              T(s, n, o, parseInt(r[0]));
              
              if (t == 1) {
                let l = e;
                let i = document.querySelectorAll(".search-search_wrapper .searchresultstate h3").length;
                let d = "header search";
                let c = "";
                window.adobeDataLayer.push({
                  event: "speechtotextSearch",
                  data: { searchTerm: l, noofitemsCaptured: i, componentName: d },
                  product: { productId: c },
                });
              }
              return true;
            }
            return false;
          })
          .then((e) => {
            if (e) {
              document.querySelector(".search_result_div-default").classList.remove("dsp-none");
              document.querySelector(".search_result_div-default").classList.add("dsp-block");
              document.querySelector(".search_result_div-no_results").classList.remove("dsp-block");
              document.querySelector(".search_result_div-no_results").classList.add("dsp-none");
              
              document.querySelector(".popular_searches_div-popular_searches .searchopenstate").classList.toggle("dsp-block");
              document.querySelector(".popular_searches_div-popular_searches .searchopenstate").classList.toggle("dsp-none");
              
              document.querySelector(".popular_searches_div-popular_searches .searchresultstate").classList.toggle("dsp-none");
              document.querySelector(".popular_searches_div-popular_searches .searchresultstate").classList.toggle("dsp-block");
              
              document.querySelector(".popular_searches_div-popular_searches .searchresultstate").classList.add("apiHit");
              
              if (document.querySelector(".popular_searches_div-popular_searches .searchresultstate").classList.contains("apiHit")) {
                document.querySelector(".popular_searches_div-popular_searches .searchresultstate").classList.add("dsp-block");
                document.querySelector(".popular_searches_div-popular_searches .searchresultstate").classList.remove("dsp-none");
              }
            } else {
              const searchInput = document.getElementById("header-search-evt").value;
              if (searchInput.length >= 3) {
                document.querySelector(".search_result_div-no_results").classList.remove("dsp-none");
                document.querySelector(".search_result_div-no_results").classList.add("dsp-block");
                document.querySelector(".search_result_div-no_results .no_results-heading .searchword").textContent = " " + searchInput;
              }
              
              document.querySelector(".search_result_div-default").classList.add("dsp-none");
              document.querySelector(".popular_searches_div-popular_searches .searchopenstate").classList.add("dsp-none");
              
              document.querySelector(".popular_searches_div-popular_searches .searchresultstate").classList.remove("dsp-block");
              document.querySelector(".popular_searches_div-popular_searches .searchresultstate").classList.add("dsp-none");
              
              document.querySelector(".popular_searches_div-popular_searches .searchresultstate").classList.remove("apiHit");
            }
          })
          .catch((e) => {
            console.error(e);
          });
      }
    }
    function O() {
      const searchInput = document.getElementById("header-search-evt");
      if (searchInput) {
        searchInput.value = "";
        
        const resultState = document.querySelector(".popular_searches_div-popular_searches .searchresultstate");
        resultState.innerHTML = "";
        
        document.querySelector(".popular_searches_div-popular_searches .searchopenstate").classList.remove("dsp-none");
        document.querySelector(".popular_searches_div-popular_searches .searchopenstate").classList.add("dsp-block");
        
        document.querySelector(".search_result_div-default").classList.remove("dsp-none");
        document.querySelector(".search_result_div-default").classList.add("dsp-block");
        
        document.querySelector(".search_result_div-typing_state").classList.add("dsp-none");
        
        document.querySelector(".popular_searches_div-popular_searches .searchresultstate").classList.remove("dsp-block");
        document.querySelector(".popular_searches_div-popular_searches .searchresultstate").classList.add("dsp-none");
        
        if (searchInput.value.trim() === "") {
          document.querySelector(".search_result_div-no_results").classList.add("dsp-none");
          document.querySelector(".search_result_div-no_results").classList.remove("dsp-block");
        } else {
          document.querySelector(".search_result_div-no_results").classList.remove("dsp-block");
          document.querySelector(".search_result_div-no_results").classList.add("dsp-none");
        }
      }
    }

    function V() {
      document.querySelectorAll(".more-submenu_list_toggle_evt").forEach(el => {
        el.parentElement.classList.remove("active");
      });
      document.querySelectorAll(".more-submenu_list").forEach(el => {
        el.classList.add("dsp-none");
      });
      document.querySelectorAll(".main-mobile_heading_evt").forEach(el => {
        el.classList.remove("active");
      });
      document.querySelectorAll(".submenu-list-inner").forEach(el => {
        el.classList.remove("active");
      });
      document.querySelectorAll(".menu-main_plans").forEach(el => {
        el.classList.add("dsp-none");
      });
      document.querySelectorAll(".deskhumb-drop-suboption-div").forEach(el => {
        el.classList.add("dsp-none");
      });
      document.querySelectorAll(".more-wrapper_list-div.mobile_menu_submenu-evt").forEach(el => {
        el.classList.add("dsp-none");
      });
      document.querySelectorAll(".menu_plans-submenu-wrapper.mobile_menu_submenu-evt").forEach(el => {
        el.classList.add("dsp-none");
      });
    }
    document.addEventListener("DOMContentLoaded", () => {
      // Search input icon click
      const searchIcons = document.querySelectorAll(".search_input_div-icon");
      searchIcons.forEach(icon => {
        icon.addEventListener("click", (e) => {
          const nextInput = icon.nextElementSibling;
          let t = nextInput.value.trim();
          let r = w(document.getElementById("resultPagePath").value.trim());
          if (t) {
            window.location.href = `${r}?result=${D(t)}`;
          }
        });
      });

      // Header search keyup
      const headerSearchInput = document.getElementById("header-search-evt");
      if (headerSearchInput) {
        headerSearchInput.addEventListener("keyup", (e) => {
          const s = headerSearchInput.value.trim();
          if (s !== "") {
            document.querySelector(".search_result_div-typing_state").classList.remove("dsp-none");
            
            if (e.key === "Enter") {
              const n = w(document.getElementById("resultPagePath").value.trim());
              if (s.length >= 3) {
                if (window.location.href.includes("wcmmode=disabled")) {
                  window.location.href = `${n}.html?result=${D(s)}`;
                } else {
                  window.location.href = `${n}?result=${s}`;
                }
              }
              
              let t = s;
              let r = "header search";
              let a = "";
              window.adobeDataLayer.push({
                event: "headerinternalSearch",
                data: { searchTerm: t, componentName: r },
                product: { productId: a },
              });
            } else {
              B(s);
            }
          } else {
            O();
          }
        });
      }
      const e = document.querySelectorAll(".hover-trigger");
      const t = document.getElementById("navbar-overlay-evt");
      
      e.forEach((s) => {
        const n = s.id + "-drop";
        const o = document.getElementById(n);
        let l = "";
        
        s.addEventListener("click", function (n) {
          n.stopPropagation();
          const i = s.classList.contains("active");
          l = n.target.closest("li");
          
          e.forEach((e) => {
            const t = e.id + "-drop";
            const r = document.getElementById(t);
            const a = e.closest("li");
            if (a) a.classList.remove("active");
            e.classList.remove("active");
            r.classList.remove("show");
          });
          
          if (i) {
            s.classList.remove("active");
            o.classList.remove("show");
            if (l) l.classList.remove("active");
            document.querySelector("body").style.overflow = "auto";
            if (!document.querySelector(".menu-image").classList.contains("turnImg")) {
              t.classList.add("dsp-none");
            }
          } else {
            s.classList.add("active");
            o.classList.add("show");
            V();
            if (l) l.classList.add("active");
            t.classList.remove("dsp-none");
            document.querySelector("body").style.overflow = "hidden";
            
            document.querySelector(".dropdown_section .dropdown_container .login_dropdown").classList.remove("dsp-block");
            document.querySelector(".dropdown_section .dropdown_container .login_dropdown").classList.add("dsp-none");
            document.querySelector(".dropdown_section .dropdown_container").classList.remove("rotate_img");
            document.querySelector(".notificication_wrapper-evt").classList.add("dsp-none");
            
            if (document.querySelector(".desktopHumburger").classList.contains("hidden")) {
              const menuImg = document.querySelector(".menu-image");
              menuImg.classList.remove("turnImg");
              t.classList.remove("dsp-none");
              menuImg.src = "/content/dam/ifliwebsite/header/menu.svg";
              const a = s.closest("li");
              a.classList.remove("hidden");
              document.querySelector("body").style.overflow = "hidden";
            }
          }
        });
        
        o.addEventListener("mouseover", function () {
          s.classList.add("active");
          o.classList.add("show");
          if (l) l.classList.add("active");
          t.classList.remove("dsp-none");
          document.querySelector("body").style.overflow = "hidden";
        });
        
        o.addEventListener("mouseout", function () {
          s.classList.remove("active");
          o.classList.remove("show");
          if (l) l.classList.remove("active");
          document.querySelector("body").style.overflow = "auto";
          t.classList.add("dsp-none");
        });
      });
      
      document.addEventListener("click", function (r) {
        let a = false;
        e.forEach((e) => {
          const t = e.id + "-drop";
          const s = document.getElementById(t);
          if (e.contains(r.target) || s.contains(r.target)) {
            a = true;
          }
        });
        
        if (!a) {
          e.forEach((e) => {
            const r = e.id + "-drop";
            const a = document.getElementById(r);
            const s = e.closest("li");
            if (s) s.classList.remove("active");
            e.classList.remove("active");
            
            if (document.querySelector(".desktopHumburger").classList.contains("hidden")) {
              t.classList.remove("dsp-none");
            } else if (a.classList.contains("show")) {
              a.classList.remove("show");
              document.querySelector("body").style.overflow = "auto";
              t.classList.add("dsp-none");
            } else if (document.querySelector(".header-search-open-evt")?.classList.contains("search-active")) {
              t.classList.remove("dsp-none");
            }
          });
        }
      });
      let r = document.querySelector(".header_desktop .top_header_wrapper .menu_sec .menu_wrap .menu-image");
      let a = document.querySelector(".desktopHumburger");
      
      if (r) {
        r.addEventListener("click", function () {
          if (r.classList.contains("turnImg")) {
            r.classList.remove("turnImg");
            r.src = "/content/dam/ifliwebsite/header/menu.svg";
            a.classList.remove("hidden");
            t.classList.add("dsp-none");
            document.querySelector("body").style.overflow = "auto";
            V();
          } else {
            r.classList.add("turnImg");
            r.src = "/content/dam/ifliwebsite/header/discard-dark.png";
            a.classList.add("hidden");
            t.classList.remove("dsp-none");
            document.querySelector("body").style.overflow = "hidden";
            
            const hoverElements = document.querySelectorAll(".hover-show-content");
            let s = false;
            hoverElements.forEach((el) => {
              if (el.classList.contains("show")) {
                el.classList.remove("show");
                s = true;
              }
            });
            
            if (s) {
              document.querySelector("body").style.overflow = "hidden";
              t.classList.remove("dsp-none");
            } else {
              document.body.style.overflow = "hidden";
            }
          }
        });
      }
      
      let s = document.getElementById("dropdown-btn");
      let n = document.getElementById("dropdown-content");
      
      if (s) {
        s.addEventListener("click", function () {
          if (n.classList.contains("show")) {
            n.classList.remove("show");
            s.innerText = "+";
          } else {
            n.classList.add("show");
            s.innerText = "-";
          }
        });
        
        window.addEventListener("click", function (e) {
          if (!e.target.matches("#dropdown-btn")) {
            if (n.classList.contains("show")) {
              n.classList.remove("show");
              s.innerText = "+";
            }
          }
        });
      }
    });
    // Submenu list events
    const submenuListEvts = document.querySelectorAll(".submenu-list-evt");
    if (submenuListEvts.length > 0) {
      submenuListEvts.forEach(el => {
        el.addEventListener("click", (e) => {
          e.preventDefault();
          const t = el.parentElement.classList.contains("active");
          
          document.querySelectorAll(".submenu-list-evt").forEach(elem => {
            elem.parentElement.classList.remove("active");
          });
          document.querySelectorAll(".deskhumb-drop-suboption-div").forEach(elem => {
            elem.classList.add("dsp-none");
          });
          
          if (!t) {
            el.parentElement.classList.add("active");
            el.parentElement.nextElementSibling?.classList.remove("dsp-none");
          }
        });
      });
    }

    // Login customer events
    const loginCustomerEvts = document.querySelectorAll(".login-customer-evt");
    if (loginCustomerEvts.length > 0) {
      loginCustomerEvts.forEach(el => {
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          el.classList.toggle("open");
          document.querySelectorAll(".login-customer-submenu-evt").forEach(elem => {
            elem.classList.toggle("dsp-none");
          });
        });
      });
    }

    // Login dropdown list events
    const loginDropdownLis = document.querySelectorAll(".login-dropdwn-evt li");
    if (loginDropdownLis.length > 0) {
      loginDropdownLis.forEach(el => {
        el.addEventListener("click", (e) => {
          e.stopPropagation();
        });
      });
    }

    // Toggle mobile menu events
    const toggleMobMenuEvts = document.querySelectorAll(".toggle-mob-menu-evt");
    if (toggleMobMenuEvts.length > 0) {
      toggleMobMenuEvts.forEach(el => {
        el.addEventListener("click", () => {
          document.querySelector(".mobile_menu_container").classList.remove("dsp-none");
          document.querySelector(".sticky-nav-footer-container").classList.add("dsp-none");
          document.body.style.overflow = "hidden";
        });
      });
    }

    // Mobile menu close events
    const mobileMenuCloseEvts = document.querySelectorAll(".mobile-menu-close-evt");
    if (mobileMenuCloseEvts.length > 0) {
      mobileMenuCloseEvts.forEach(el => {
        el.addEventListener("click", () => {
          document.querySelector(".mobile_menu_container").classList.add("dsp-none");
          document.querySelector(".sticky-nav-footer-container").classList.remove("dsp-none");
          document.body.style.overflow = "auto";
          V();
        });
      });
    }

    // Mobile menu back events
    const mobileMenuBackEvts = document.querySelectorAll(".mobile-menu-back-evt");
    if (mobileMenuBackEvts.length > 0) {
      mobileMenuBackEvts.forEach(el => {
        el.addEventListener("click", () => {
          el.closest(".mobile_menu_submenu-evt")?.classList.add("dsp-none");
          
          const nextSubmenu = el.parentElement.nextElementSibling?.querySelector(".mobile_menu_submenu-evt");
          if (nextSubmenu?.querySelector("ul")) {
            el.parentElement.nextElementSibling.classList.add("dsp-none");
            el.parentElement.nextElementSibling.querySelector("ul").classList.add("dsp-none");
          }
        });
      });
    }

    // Mobile menu submenu toggle events
    const mobileMenuSubmenuToggleEvts = document.querySelectorAll(".mobile_menu_submenu-toggle-evt");
    if (mobileMenuSubmenuToggleEvts.length > 0) {
      mobileMenuSubmenuToggleEvts.forEach(el => {
        el.addEventListener("click", (e) => {
          e.preventDefault();
          const nextUl = el.closest(".mobile_menu_submenu-evt").nextElementSibling?.querySelector("ul");
          
          if (nextUl) {
            el.closest(".mobile_menu_submenu-evt").nextElementSibling.classList.toggle("dsp-none");
            nextUl.classList.remove("dsp-none");
          } else {
            window.location.href = el.closest(".mobile_menu_submenu-evt").getAttribute("href");
          }
        });
      });
    }

    // Mobile more submenu toggle events
    const mobileMoreSubmenuToggleEvts = document.querySelectorAll(".mobile_more_submenu-toggle-evt");
    if (mobileMoreSubmenuToggleEvts.length > 0) {
      mobileMoreSubmenuToggleEvts.forEach(el => {
        el.addEventListener("click", () => {
          el.nextElementSibling?.classList.toggle("dsp-none");
          el.nextElementSibling?.querySelector(".menu-main_plans")?.classList.remove("dsp-none");
        });
      });
    }

    // Navbar overlay events
    const navbarOverlay = document.getElementById("navbar-overlay-evt");
    if (navbarOverlay) {
      navbarOverlay.addEventListener("click", () => {
        if (document.querySelector(".header-search-open-evt")?.classList.contains("search-active")) {
          document.querySelector(".header-search-open-evt")?.classList.remove("search-active");
          navbarOverlay.classList.add("dsp-none");
          document.body.style.overflow = "auto";
          document.querySelector(".search-search_wrapper_evt")?.classList.add("dsp-none");
        } else {
          navbarOverlay.classList.add("dsp-none");
        }
        V();
        document.querySelector(".desktopHumburger")?.classList.remove("hidden");
        
        if (document.querySelector(".menu-image")?.classList.contains("turnImg")) {
          document.querySelector(".menu-image").src = "/content/dam/ifliwebsite/header/menu.svg";
          document.body.style.overflow = "auto";
          document.querySelector(".menu-image")?.classList.remove("turnImg");
        }
      });
    }

    // Notification image events
    const notifImgEvts = document.querySelectorAll(".notif_img_evt");
    if (notifImgEvts.length > 0) {
      notifImgEvts.forEach(el => {
        el.addEventListener("click", () => {
          document.querySelector(".notificication_wrapper-evt")?.classList.toggle("dsp-none");
          document.body.style.overflow = "auto";
          document.getElementById("navbar-overlay-evt")?.classList.add("dsp-none");
          
          const activeNotif = document.querySelector(".notificication_wrapper-notification_div.active");
          if (activeNotif) {
            activeNotif.classList.remove("active");
          }
          
          V();
          document.querySelector(".desktopHumburger")?.classList.remove("hidden");
          
          if (document.querySelector(".menu-image")?.classList.contains("turnImg")) {
            document.querySelector(".menu-image").src = "/content/dam/ifliwebsite/header/menu.svg";
            document.querySelector(".turnImg")?.classList.remove("turnImg");
          }
        });
      });
    }

    // Header search open events
    const headerSearchOpenEvts = document.querySelectorAll(".header-search-open-evt");
    if (headerSearchOpenEvts.length > 0) {
      headerSearchOpenEvts.forEach(el => {
        el.addEventListener("click", () => {
          document.querySelector(".search-search_wrapper_evt")?.classList.remove("dsp-none");
          el.classList.add("search-active");
          
          if (el.classList.contains("search-active")) {
            document.getElementById("navbar-overlay-evt")?.classList.remove("dsp-none");
            
            const hoverShowContents = document.querySelectorAll(".hover-show-content");
            let hasShow = false;
            hoverShowContents.forEach(elem => {
              if (elem.classList.contains("show")) {
                elem.classList.remove("show");
                hasShow = true;
              }
            });
            
            if (hasShow) {
              document.body.style.overflow = "hidden";
            } else {
              document.body.style.overflow = "hidden";
            }
            
            if (!document.querySelector(".menu-image")?.classList.contains("turnImg")) {
              document.getElementById("navbar-overlay-evt")?.classList.remove("dsp-none");
            }
          }
          
          document.getElementById("header-search-evt")?.focus();
          
          if (document.querySelector(".menu-image")?.classList.contains("turnImg")) {
            document.querySelector(".menu-image").src = "/content/dam/ifliwebsite/header/menu.svg";
            document.querySelector(".desktopHumburger")?.classList.remove("hidden");
            document.querySelector(".turnImg")?.classList.remove("turnImg");
            document.getElementById("navbar-overlay-evt")?.classList.add("dsp-none");
          }
        });
      });
    }

    // Search input close events
    const searchInputCloseEvts = document.querySelectorAll(".search_input_div-close_evt");
    if (searchInputCloseEvts.length > 0) {
      searchInputCloseEvts.forEach(el => {
        el.addEventListener("click", () => {
          document.querySelector(".search-search_wrapper_evt")?.classList.add("dsp-none");
          
          if (document.querySelector(".header-search-open-evt")?.classList.contains("search-active")) {
            document.querySelector(".header-search-open-evt")?.classList.remove("search-active");
            document.getElementById("navbar-overlay-evt")?.classList.add("dsp-none");
          }
          
          V();
          document.querySelector(".menu-image").src = "/content/dam/ifliwebsite/header/menu.svg";
          document.body.style.overflow = "auto";
          O();
        });
      });
    }

    // Main mobile heading toggle events
    const mainMobileHeadingToggleEvts = document.querySelectorAll(".main-mobile_heading_toggle_evt");
    if (mainMobileHeadingToggleEvts.length > 0) {
      mainMobileHeadingToggleEvts.forEach(el => {
        el.addEventListener("click", (e) => {
          e.preventDefault();
          const t = el.parentElement.classList.contains("active");
          
          document.querySelectorAll(".main-mobile_heading_toggle_evt").forEach(elem => {
            elem.parentElement.classList.remove("active");
          });
          document.querySelectorAll(".menu-main_plans").forEach(elem => {
            elem.classList.add("dsp-none");
          });
          
          if (!t) {
            el.parentElement.classList.add("active");
            el.parentElement.nextElementSibling?.classList.remove("dsp-none");
          }
        });
      });
    }

    // More submenu list toggle events
    const moreSubmenuListToggleEvts = document.querySelectorAll(".more-submenu_list_toggle_evt");
    if (moreSubmenuListToggleEvts.length > 0) {
      moreSubmenuListToggleEvts.forEach(el => {
        el.addEventListener("click", (e) => {
          e.preventDefault();
          const t = el.parentElement.classList.contains("active");
          
          document.querySelectorAll(".more-submenu_list_toggle_evt").forEach(elem => {
            elem.parentElement.classList.remove("active");
          });
          document.querySelectorAll(".more-submenu_list").forEach(elem => {
            elem.classList.add("dsp-none");
          });
          
          if (!t) {
            el.closest(".more-submenu_list_evt")?.classList.add("active");
            el.closest(".more-submenu_list_evt")?.nextElementSibling?.classList.remove("dsp-none");
          }
        });
      });
    }
    // Search speak events
    const searchSpeakEvts = document.querySelectorAll(".search_input_div-speak_evt");
    if (searchSpeakEvts.length > 0) {
      searchSpeakEvts.forEach(el => {
        el.addEventListener("click", function () {
          (function () {
            if (window.hasOwnProperty("webkitSpeechRecognition")) {
              let e;
              let t = new webkitSpeechRecognition();
              t.continuous = false;
              t.interimResults = false;
              
              if (window.location.href.indexOf("/hi") > -1) {
                t.lang = "hi";
                document.querySelectorAll("#header-search-evt").forEach(el => {
                  e = el.placeholder;
                  el.placeholder = "अब बोलें...";
                });
              } else if (window.location.href.indexOf("/gujarati") > -1) {
                t.lang = "gu";
                document.querySelectorAll("#header-search-evt").forEach(el => {
                  e = el.placeholder;
                  el.placeholder = "હવે બોલો...";
                });
              } else if (window.location.href.indexOf("/oriya") > -1) {
                t.lang = "or";
                document.querySelectorAll("#header-search-evt").forEach(el => {
                  e = el.placeholder;
                  el.placeholder = "ଏବେ କୁହନ୍ତୁ...";
                });
              } else if (window.location.href.indexOf("/bengali") > -1) {
                t.lang = "bn";
                document.querySelectorAll("#header-search-evt").forEach(el => {
                  e = el.placeholder;
                  el.placeholder = "এখন বলো...";
                });
              } else if (window.location.href.indexOf("/tamil") > -1) {
                t.lang = "ta";
                document.querySelectorAll("#header-search-evt").forEach(el => {
                  e = el.placeholder;
                  el.placeholder = "இப்பொழுது பேசவும்...";
                });
              } else if (window.location.href.indexOf("/telugu") > -1) {
                t.lang = "te";
                document.querySelectorAll("#header-search-evt").forEach(el => {
                  e = el.placeholder;
                  el.placeholder = "ఇప్పుడు మాట్లాడు...";
                });
              } else if (window.location.href.indexOf("/marathi") > -1) {
                t.lang = "mr";
                document.querySelectorAll("#header-search-evt").forEach(el => {
                  e = el.placeholder;
                  el.placeholder = "आता बोला...";
                });
              } else if (window.location.href.indexOf("/kannada") > -1) {
                t.lang = "kn";
                document.querySelectorAll("#header-search-evt").forEach(el => {
                  e = el.placeholder;
                  el.placeholder = "ಈಗ ಮಾತನಾಡಿರಿ...";
                });
              } else if (window.location.href.indexOf("/malayalam") > -1) {
                t.lang = "ml";
                document.querySelectorAll("#header-search-evt").forEach(el => {
                  e = el.placeholder;
                  el.placeholder = "ഇപ്പോൾ സംസാരിക്കുക...";
                });
              } else {
                t.lang = "en-US";
                document.querySelectorAll("#header-search-evt").forEach(el => {
                  e = el.placeholder;
                  el.placeholder = "Speak Now...";
                });
              }
              
              document.querySelector(".search_input_div-speak_evt").previousElementSibling?.classList.add("pulse-ring");
              t.start();
              
              t.onresult = function (r) {
                document.querySelectorAll("#header-search-evt").forEach(a => {
                  a.value = r.results[0][0].transcript;
                  a.placeholder = e;
                  B(a.value, true);
                });
                document.querySelector(".search_input_div-speak_evt").previousElementSibling?.classList.remove("pulse-ring");
                t.stop();
                console.log("e: ", r);
              };
              
              t.onerror = function (e) {
                document.querySelector(".search_input_div-speak_evt").previousElementSibling?.classList.remove("pulse-ring");
                t.stop();
              };
            }
          })();
          
          let e = "header search";
          let t = "";
          window.adobeDataLayer.push({
            event: "miciconClick",
            data: { componentName: e },
            product: { productId: t },
          });
        });
      });
    }

    document.addEventListener("DOMContentLoaded", () => {
      const askExpertSections = document.querySelectorAll(".ask-expert-section");
      const askexpertFormbg = document.querySelector(".askexpert-formbg");
      
      if (askexpertFormbg && askExpertSections.length > 0) {
        askExpertSections.forEach(el => {
          el.addEventListener("click", function () {
            let e = document.querySelector(".prod-detail-leftupper .cmp-teaser__description h1")?.textContent || "";
            I(e || "");
            askexpertFormbg.style.display = "flex";
            document.body.style.overflow = "hidden";
            
            document.getElementById("nameinput").value = "";
            document.getElementById("mobileinput").value = "";
            
            document.querySelectorAll(".askexpert-formsection .name-wrapper .error-txt").forEach(err => {
              err.value = "";
            });
            
            document.querySelectorAll(".name-input").forEach(input => {
              input.classList.remove("error-active");
            });
            
            document.querySelectorAll(".askexpert-formsection .name-wrapper .right-icon-place").forEach(icon => {
              icon.style.display = "none";
            });
            
            document.querySelectorAll(".askexpert-formsection .name-wrapper span").forEach(span => {
              span.textContent = "";
            });
            
            document.querySelectorAll(".name-input span").forEach(span => {
              span.setAttribute("class", "");
            });
          });
        });
      }
      
      const notificIconDivs = document.querySelectorAll(".notificication_wrapper-notification_div");
      if (notificIconDivs && notificIconDivs.length > 0) {
        notificIconDivs.forEach(el => {
          el.addEventListener("click", function () {
            notificIconDivs.forEach(elem => {
              elem.classList.remove("active");
            });
            this.classList.add("active");
          });
        });
      }
    });
    window.addEventListener("appinstalled", () => {
      console.log("PWA installed successfully");
      let e = "Install";
      let t = "PWA Icon";
      let r = "";
      window.adobeDataLayer.push({
        event: "pwaiconClick",
        data: { ctaText: e, componentName: t },
        product: { productId: r },
      });
    });

    document.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll("[data-validation]").forEach(el => {
        el.addEventListener("input", (e) => {
          const apiError = document.querySelector(".claim-banner-form__main-container .apierror");
          if (apiError) {
            apiError.innerHTML = "";
          }
          let t = el.getAttribute("data-validation");
          if (el.offsetParent !== null) {
            F[t](e);
          }
        });
      });
    });
    const F = {
      fullname: function (e) {
        const { ele, value, fvc } = H(e);
        let a = value.replaceAll(/[^A-Za-z\s]/g, "").replaceAll(/(\..*?)\..*/g, "$1");
        e.currentTarget.value = a;
        const n = /^[a-zA-Z]+ [a-zA-Z]+$/;
        
        if (a !== "" && a != null) {
          if (n.test(a.trimEnd())) {
            ele.querySelector(".error-txt").textContent = "";
            ele.querySelector(".error-txt").classList.remove("d-block");
            fvc.querySelector("input").classList.remove("error-active");
            fvc.classList.add("valid");
          } else {
            ele.querySelector(".error-txt").classList.add("d-block");
            ele.querySelector(".error-txt").classList.remove("d-none");
            const msg = ele.querySelector("input")?.getAttribute("data-key")?.toLowerCase() === "name" 
              ? "Please enter first name & last name"
              : "Please enter valid name";
            ele.querySelector(".error-txt").textContent = msg;
            fvc.querySelector("input").classList.add("error-active");
            fvc.classList.remove("valid");
          }
        } else {
          ele.querySelector(".error-txt").classList.add("d-block");
          const msg = ele.querySelector("input")?.getAttribute("data-key")?.toLowerCase() === "name"
            ? "Please enter first name & last name"
            : "Please enter name";
          ele.querySelector(".error-txt").textContent = msg;
          fvc.querySelector("input").classList.add("error-active");
          fvc.classList.remove("valid");
        }
      },

      firstname: function (e) {
        const { ele, value, fvc } = H(e);
        let a = value.replaceAll(/[^A-Za-z\s]/g, "").replaceAll(/(\..*?)\..*/g, "$1").replaceAll(/\s+/g, " ");
        e.currentTarget.value = a;
        if (a === " ") {
          e.currentTarget.value = "";
        }

        if (a !== "" && a != null) {
          if (/^[a-zA-Z\s]+$/.test(a)) {
            ele.querySelector(".error-txt").textContent = "";
            ele.querySelector(".error-txt").classList.remove("d-block");
            fvc.querySelector("input").classList.remove("error-active");
            fvc.classList.add("valid");
          } else {
            ele.querySelector(".error-txt").classList.add("d-block");
            ele.querySelector(".error-txt").classList.remove("d-none");
            ele.querySelector(".error-txt").textContent = "Please enter valid first name";
            fvc.querySelector("input").classList.add("error-active");
            fvc.classList.remove("valid");
          }
        } else {
          ele.querySelector(".error-txt").classList.add("d-block");
          ele.querySelector(".error-txt").textContent = "Please enter first name";
          fvc.querySelector("input").classList.add("error-active");
          fvc.classList.remove("valid");
        }
      },

      lastname: function (e) {
        const { ele, value, fvc } = H(e);
        let a = value.replaceAll(/[^A-Za-z\s]/g, "").replaceAll(/(\..*?)\..*/g, "$1").replaceAll(/\s+/g, " ");
        e.currentTarget.value = a;
        if (a === " ") {
          e.currentTarget.value = "";
        }

        if (a !== "" && a != null) {
          if (/^[a-zA-Z\s]+$/.test(a)) {
            ele.querySelector(".error-txt").textContent = "";
            ele.querySelector(".error-txt").classList.remove("d-block");
            fvc.querySelector("input").classList.remove("error-active");
            fvc.classList.add("valid");
          } else {
            ele.querySelector(".error-txt").classList.add("d-block");
            ele.querySelector(".error-txt").classList.remove("d-none");
            ele.querySelector(".error-txt").textContent = "Please enter valid last name";
            fvc.querySelector("input").classList.add("error-active");
            fvc.classList.remove("valid");
          }
        } else {
          ele.querySelector(".error-txt").classList.add("d-block");
          ele.querySelector(".error-txt").textContent = "Please enter last name";
          fvc.querySelector("input").classList.add("error-active");
          fvc.classList.remove("valid");
        }
      },

      notEmpty: function (e) {
        const { ele, value, fvc } = H(e);
        const a = value.replace(/\s/g, "");
        e.currentTarget.value = a;

        if (a) {
          ele.querySelector(".error-txt").textContent = "";
          ele.querySelector(".error-txt").classList.remove("d-block");
          fvc.querySelector("input").classList.remove("error-active");
          fvc.classList.add("valid");
        } else {
          ele.querySelector(".error-txt").classList.add("d-block");
          ele.querySelector(".error-txt").textContent = "This field is required!";
          fvc.querySelector("input").classList.add("error-active");
          fvc.classList.remove("valid");
        }
      },

      mobileNo: function (e) {
        const { ele, value, fvc } = H(e);
        const n = value.replaceAll(/[^0-9]/g, "").replaceAll(/(\..*?)\..*/g, "$1");
        e.currentTarget.value = n;

        if (n !== "") {
          if (n.length === 10 && /^[0]?[6789]\d{9}$/.test(n)) {
            if (e.target.id === "mobnumber") {
              ele.parentElement.querySelector(".error-txt").textContent = "";
              ele.parentElement.querySelector(".error-txt").classList.remove("d-block");
              fvc.classList.remove("error-active");
              fvc.classList.add("valid");
            } else {
              ele.querySelector(".error-txt").textContent = "";
              ele.querySelector(".error-txt").classList.remove("d-block");
              fvc.querySelector("input").classList.remove("error-active");
              fvc.classList.add("valid");
            }
          } else {
            if (e.target.id === "mobnumber") {
              ele.parentElement.querySelector(".error-txt").classList.add("d-block");
              ele.parentElement.querySelector(".error-txt").textContent = "Please enter a valid 10-digit mobile number";
              fvc.classList.remove("valid");
              fvc.classList.add("error-active");
            } else {
              ele.querySelector(".error-txt").classList.add("d-block");
              ele.querySelector(".error-txt").textContent = "Please enter a valid 10-digit mobile number";
              fvc.classList.remove("valid");
              fvc.querySelector("input").classList.add("error-active");
            }
          }
        }

        if (n === "" && value === "") {
          ele.querySelector(".error-txt").classList.add("d-block");
          ele.querySelector(".error-txt").textContent = "Please enter mobile number";
          fvc.classList.remove("valid");
          fvc.querySelector("input").classList.add("error-active");
        }
      },

      policyNumber: function (e) {
        const { ele, value, fvc } = H(e);
        const n = value.replaceAll(/[^0-9]/g, "").replaceAll(/(\..*?)\..*/g, "$1");
        e.currentTarget.value = n;

        if (value !== "" && value != null) {
          if (value.length !== 8) {
            ele.querySelector(".error-txt").classList.add("d-block");
            ele.querySelector(".error-txt").classList.remove("d-none");
            ele.querySelector(".error-txt").textContent = "Field should contain 8 Numeric Characters";
            fvc.querySelector("input").classList.add("error-active");
            fvc.classList.remove("valid");
          } else if (/^[0-9]{8,}$/.test(value)) {
            ele.querySelector(".error-txt").textContent = "";
            ele.querySelector(".error-txt").classList.remove("d-block");
            fvc.querySelector("input").classList.remove("error-active");
            fvc.classList.add("valid");
          } else {
            ele.querySelector(".error-txt").classList.add("d-block");
            ele.querySelector(".error-txt").classList.remove("d-none");
            ele.querySelector(".error-txt").textContent = "Field should contain 8 Numeric Characters";
            fvc.querySelector("input").classList.add("error-active");
            fvc.classList.remove("valid");
          }
        } else {
          ele.querySelector(".error-txt").classList.add("d-block");
          ele.querySelector(".error-txt").textContent = "Please enter valid policy number";
          fvc.querySelector("input").classList.add("error-active");
          fvc.classList.remove("valid");
        }
      },

      groupPolicyNumber: function (e) {
        const { ele, value, fvc } = H(e);
        let a = value.replaceAll(/[^A-Za-z0-9]/g, "").replaceAll(/(\..*?)\..*/g, "$1");
        e.currentTarget.value = a;

        if (a !== "" && a != null) {
          if (a.length !== 8) {
            ele.querySelector(".error-txt").classList.add("d-block");
            ele.querySelector(".error-txt").classList.remove("d-none");
            ele.querySelector(".error-txt").textContent = "Please enter valid policy number";
            fvc.querySelector("input").classList.add("error-active");
            fvc.classList.remove("valid");
          } else if (/^[a-zA-Z]{1}/.test(a)) {
            if (/^[A-Z]{1}[0-9]{7,}$/.test(a)) {
              ele.querySelector(".error-txt").textContent = "";
              ele.querySelector(".error-txt").classList.remove("d-block");
              fvc.querySelector("input").classList.remove("error-active");
              fvc.classList.add("valid");
            } else {
              ele.querySelector(".error-txt").classList.add("d-block");
              ele.querySelector(".error-txt").classList.remove("d-none");
              ele.querySelector(".error-txt").textContent = "Please enter valid policy number";
              fvc.querySelector("input").classList.add("error-active");
              fvc.classList.remove("valid");
            }
          } else {
            ele.querySelector(".error-txt").classList.add("d-block");
            ele.querySelector(".error-txt").classList.remove("d-none");
            ele.querySelector(".error-txt").textContent = "First letter should be alphabet";
            fvc.querySelector("input").classList.add("error-active");
            fvc.classList.remove("valid");
          }
        } else {
          ele.querySelector(".error-txt").classList.add("d-block");
          ele.querySelector(".error-txt").textContent = "Please enter valid policy number";
          fvc.querySelector("input").classList.add("error-active");
          fvc.classList.remove("valid");
        }
      },

      notificationNumber: function (e) {
        const { ele, value, fvc } = H(e);

        if (value !== "" && value != null) {
          if (/^[a-zA-Z]{1}/.test(value)) {
            if (value.length !== 13) {
              ele.querySelector(".error-txt").classList.add("d-block");
              ele.querySelector(".error-txt").classList.remove("d-none");
              ele.querySelector(".error-txt").textContent = "Please enter valid Notification number";
              fvc.querySelector("input").classList.add("error-active");
              fvc.classList.remove("valid");
            } else if (/^[a-zA-Z]{1}[0-9]{12,}$/.test(value)) {
              ele.querySelector(".error-txt").textContent = "";
              ele.querySelector(".error-txt").classList.remove("d-block");
              fvc.querySelector("input").classList.remove("error-active");
              fvc.classList.add("valid");
            } else {
              ele.querySelector(".error-txt").classList.add("d-block");
              ele.querySelector(".error-txt").classList.remove("d-none");
              ele.querySelector(".error-txt").textContent = "Please enter valid Notification number";
              fvc.querySelector("input").classList.add("error-active");
              fvc.classList.remove("valid");
            }
          } else {
            ele.querySelector(".error-txt").classList.add("d-block");
            ele.querySelector(".error-txt").classList.remove("d-none");
            ele.querySelector(".error-txt").textContent = "First letter should be alphabet";
            fvc.querySelector("input").classList.add("error-active");
            fvc.classList.remove("valid");
          }
        } else {
          ele.querySelector(".error-txt").classList.add("d-block");
          ele.querySelector(".error-txt").textContent = "Please enter valid Notification number";
          fvc.querySelector("input").classList.add("error-active");
          fvc.classList.remove("valid");
        }
      },

      claimNumber: function (e) {
        const { ele, value, fvc } = H(e);

        if (value !== "" && value != null) {
          if (value.length !== 15) {
            ele.querySelector(".error-txt").classList.add("d-block");
            ele.querySelector(".error-txt").classList.remove("d-none");
            ele.querySelector(".error-txt").textContent = "Please enter valid claim reference number";
            fvc.querySelector("input").classList.add("error-active");
            fvc.classList.remove("valid");
          } else if (/^[a-zA-Z]{2}/.test(value)) {
            if (/^[A-Z]{2}[0-9]{13,}$/.test(value)) {
              ele.querySelector(".error-txt").textContent = "";
              ele.querySelector(".error-txt").classList.remove("d-block");
              fvc.querySelector("input").classList.remove("error-active");
              fvc.classList.add("valid");
            } else {
              ele.querySelector(".error-txt").classList.add("d-block");
              ele.querySelector(".error-txt").classList.remove("d-none");
              ele.querySelector(".error-txt").textContent = "Please enter valid claim reference number";
              fvc.querySelector("input").classList.add("error-active");
              fvc.classList.remove("valid");
            }
          } else {
            ele.querySelector(".error-txt").classList.add("d-block");
            ele.querySelector(".error-txt").classList.remove("d-none");
            ele.querySelector(".error-txt").textContent = "First two letter should be alphabet";
            fvc.querySelector("input").classList.add("error-active");
            fvc.classList.remove("valid");
          }
        } else {
          ele.querySelector(".error-txt").classList.add("d-block");
          ele.querySelector(".error-txt").textContent = "Please enter valid claim reference number";
          fvc.querySelector("input").classList.add("error-active");
          fvc.classList.remove("valid");
        }
      },

      applicationNumber: function (e) {
        const { ele, value, fvc } = H(e);

        if (value !== "" && value != null) {
          if (value.length !== 9) {
            ele.querySelector(".error-txt").classList.add("d-block");
            ele.querySelector(".error-txt").classList.remove("d-none");
            ele.querySelector(".error-txt").textContent = "Please enter valid application number";
            fvc.querySelector("input").classList.add("error-active");
            fvc.classList.remove("valid");
          } else if (/^[a-zA-Z]{1}/.test(value)) {
            if (/^[A-Z]{1}[0-9]{8,}$/.test(value)) {
              ele.querySelector(".error-txt").textContent = "";
              ele.querySelector(".error-txt").classList.remove("d-block");
              fvc.querySelector("input").classList.remove("error-active");
              fvc.classList.add("valid");
            } else {
              ele.querySelector(".error-txt").classList.add("d-block");
              ele.querySelector(".error-txt").classList.remove("d-none");
              ele.querySelector(".error-txt").textContent = "Please enter valid application number";
              fvc.querySelector("input").classList.add("error-active");
              fvc.classList.remove("valid");
            }
          } else {
            ele.querySelector(".error-txt").classList.add("d-block");
            ele.querySelector(".error-txt").classList.remove("d-none");
            ele.querySelector(".error-txt").textContent = "First letter should be alphabet";
            fvc.querySelector("input").classList.add("error-active");
            fvc.classList.remove("valid");
          }
        } else {
          ele.querySelector(".error-txt").classList.add("d-block");
          ele.querySelector(".error-txt").textContent = "Please enter valid application number";
          fvc.querySelector("input").classList.add("error-active");
          fvc.classList.remove("valid");
        }
      },

      clientID: function (e) {
        const { ele, value, fvc } = H(e);

        if (value !== "" && value != null) {
          if (value.length !== 8) {
            ele.querySelector(".error-txt").classList.add("d-block");
            ele.querySelector(".error-txt").classList.remove("d-none");
            ele.querySelector(".error-txt").textContent = "Field should contain 8 Numeric Characters";
            fvc.querySelector("input").classList.add("error-active");
            fvc.classList.remove("valid");
          } else if (/^[0-9]{8,}$/.test(value)) {
            ele.querySelector(".error-txt").textContent = "";
            ele.querySelector(".error-txt").classList.remove("d-block");
            fvc.querySelector("input").classList.remove("error-active");
            fvc.classList.add("valid");
          } else {
            ele.querySelector(".error-txt").classList.add("d-block");
            ele.querySelector(".error-txt").classList.remove("d-none");
            ele.querySelector(".error-txt").textContent = "Please enter valid Client ID";
            fvc.querySelector("input").classList.add("error-active");
            fvc.classList.remove("valid");
          }
        } else {
          ele.querySelector(".error-txt").classList.add("d-block");
          ele.querySelector(".error-txt").textContent = "Please enter valid Client ID";
          fvc.querySelector("input").classList.add("error-active");
          fvc.classList.remove("valid");
        }
      },


      onlyAlpha: function (e) {
        const { ele, value, fvc } = H(e);
        let a = value.trimStart().replaceAll(/[^A-Za-z\s]/g, "").replaceAll(/(\..*?)\..*/g, "$1");
        e.currentTarget.value = a;

        if (a !== "" && a != null) {
          if (/^[a-z\d\-_\s]+$/i.test(a)) {
            ele.querySelector(".error-txt").textContent = "";
            ele.querySelector(".error-txt").classList.remove("d-block");
            fvc.querySelector("input").classList.remove("error-active");
            fvc.classList.add("valid");
          } else {
            ele.querySelector(".error-txt").classList.add("d-block");
            ele.querySelector(".error-txt").classList.remove("d-none");
            ele.querySelector(".error-txt").textContent = "This field is required!";
            fvc.classList.remove("valid");
            fvc.querySelector("input").classList.add("error-active");
          }
        } else {
          ele.querySelector(".error-txt").classList.add("d-block");
          ele.querySelector(".error-txt").textContent = "This field is required!";
          fvc.querySelector("input").classList.add("error-active");
          fvc.classList.remove("valid");
        }
      },

      alphanumberic: function (e) {
        const { ele, value, fvc } = H(e);

        if (value !== "" && value != null) {
          if (/^[0-9a-zA-Z]+$/.test(value)) {
            ele.querySelector(".error-txt").textContent = "";
            ele.querySelector(".error-txt").classList.remove("d-block");
            fvc.querySelector("input").classList.remove("error-active");
            fvc.classList.add("valid");
          } else {
            ele.querySelector(".error-txt").classList.add("d-block");
            ele.querySelector(".error-txt").classList.remove("d-none");
            ele.querySelector(".error-txt").textContent = "Please enter valid alphanumeric values";
            fvc.classList.remove("valid");
            fvc.querySelector("input").classList.add("error-active");
          }
        } else {
          ele.querySelector(".error-txt").classList.add("d-block");
          ele.querySelector(".error-txt").textContent = "Please enter valid alphanumeric values";
          fvc.querySelector("input").classList.add("error-active");
          fvc.classList.remove("valid");
        }
      },

      emailaddressValidation: function (e) {
        const { ele, value, fvc } = H(e);

        if (value !== "") {
          if (/^[\w-\.]+@([A-Za-z-]+\.)+[A-Za-z-]{2,4}$/g.test(value)) {
            ele.querySelector(".error-txt").textContent = "";
            ele.querySelector(".error-txt").classList.remove("d-block");
            fvc.classList.add("valid");
            e.currentTarget.classList.remove("error-active");
          } else {
            ele.querySelector(".error-txt").classList.add("d-block");
            ele.querySelector(".error-txt").textContent = "Please enter valid e-mail id";
            fvc.classList.remove("valid");
            e.currentTarget.classList.add("error-active");
          }
        } else {
          ele.querySelector(".error-txt").classList.add("d-block");
          ele.querySelector(".error-txt").textContent = "Please enter e-mail id";
          e.currentTarget.classList.add("error-active");
          fvc.classList.remove("valid");
        }
      },

      panNumber: function (e) {
        const { ele, value, fvc } = H(e);
        let a = value.trimStart().replaceAll(/[^A-Za-z\s0-9]/g, "").replaceAll(/(\..*?)\..*/g, "$1");
        e.currentTarget.value = a;

        if (a != "" && a != null && /[a-zA-z]{5}\d{4}[a-zA-Z]{1}/.test(a)) {
          ele.querySelector(".error-txt").classList.remove("d-block");
          ele.querySelector(".error-txt").textContent = "";
          fvc.classList.add("valid");
          e.currentTarget.classList.remove("error-active");
        } else {
          ele.querySelector(".error-txt").classList.add("d-block");
          ele.querySelector(".error-txt").classList.remove("d-none");
          ele.querySelector(".error-txt").textContent = "Please Enter Valid PAN number";
          fvc.classList.remove("valid");
          e.currentTarget.classList.add("error-active");
        }
      },

      bankaccountNumber: function (e) {
        const { ele, value, fvc } = H(e);
        const n = value.replaceAll(/[^0-9]/g, "").replaceAll(/(\..*?)\..*/g, "$1");
        e.currentTarget.value = n;

        if (value !== "" && value != null) {
          if (/^\d{9,18}$/.test(value)) {
            ele.querySelector(".error-txt").textContent = "";
            ele.querySelector(".error-txt").classList.remove("d-block");
            fvc.classList.add("valid");
          } else {
            ele.querySelector(".error-txt").classList.add("d-block");
            ele.querySelector(".error-txt").classList.remove("d-none");
            ele.querySelector(".error-txt").textContent = "Please enter valid Bank Account Number";
            fvc.classList.remove("valid");
          }
        } else {
          ele.querySelector(".error-txt").classList.add("d-block");
          ele.querySelector(".error-txt").textContent = "Please enter valid Bank Account Number";
          fvc.classList.remove("valid");
        }
      },

      numericValidation: function (e) {
        const { ele, value, fvc } = H(e);
        const n = value.replaceAll(/[^0-9]/g, "").replaceAll(/(\..*?)\..*/g, "$1");
        e.currentTarget.value = n;

        if (value !== "" && value != null) {
          if (value.length !== 14) {
            ele.querySelector(".error-txt").classList.add("d-block");
            ele.querySelector(".error-txt").classList.remove("d-none");
            ele.querySelector(".error-txt").textContent = "Field should contain 14 Numeric Characters";
            fvc.querySelector("input").classList.add("error-active");
            fvc.classList.remove("valid");
          } else if (/^[0-9]{8,}$/.test(value)) {
            ele.querySelector(".error-txt").textContent = "";
            ele.querySelector(".error-txt").classList.remove("d-block");
            fvc.querySelector("input").classList.remove("error-active");
            fvc.classList.add("valid");
          } else {
            ele.querySelector(".error-txt").classList.add("d-block");
            ele.querySelector(".error-txt").classList.remove("d-none");
            ele.querySelector(".error-txt").textContent = "Field should contain 14 Numeric Characters";
            fvc.querySelector("input").classList.add("error-active");
            fvc.classList.remove("valid");
          }
        } else {
          ele.querySelector(".error-txt").classList.add("d-block");
          ele.querySelector(".error-txt").textContent = "Please enter valid register number";
          fvc.querySelector("input").classList.add("error-active");
          fvc.classList.remove("valid");
        }
      },

      ageValidation: function (e) {
        const { ele, value, fvc } = H(e);
        let n = value.replace(/[^0-9]/g, "");
        n = n.substring(0, 2);
        e.currentTarget.value = n;

        if (n === "") {
          ele.querySelector(".error-txt").classList.remove("d-none");
          ele.querySelector(".error-txt").classList.add("d-block");
          ele.querySelector(".error-txt").textContent = "Please enter your age";
          fvc.querySelector("input").classList.add("error-active");
          fvc.classList.remove("valid");
        } else if (parseInt(n, 10) > 99) {
          ele.querySelector(".error-txt").classList.remove("d-none");
          ele.querySelector(".error-txt").classList.add("d-block");
          ele.querySelector(".error-txt").textContent = "Age must be between 0 and 99";
          fvc.querySelector("input").classList.add("error-active");
          fvc.classList.remove("valid");
        } else {
          ele.querySelector(".error-txt").classList.remove("d-block");
          ele.querySelector(".error-txt").classList.add("d-none");
          ele.querySelector(".error-txt").textContent = "";
          fvc.querySelector("input").classList.remove("error-active");
          fvc.classList.add("valid");
        }
      },

      coialphanumberic: function (e) {
        const { ele, value, fvc } = H(e);
        const n = value.replace(/[^a-zA-Z0-9]/g, "");
        e.currentTarget.value = n;

        if (value !== "" && value != null) {
          if (value.length !== 11) {
            ele.querySelector(".error-txt").classList.add("d-block");
            ele.querySelector(".error-txt").classList.remove("d-none");
            ele.querySelector(".error-txt").textContent = "Field should contain 11 Alpha Numeric Characters";
            fvc.querySelector(".coi-input").classList.add("error-active");
            fvc.classList.remove("valid");
          } else if (/^[0-9a-zA-Z]+$/.test(value)) {
            ele.querySelector(".error-txt").textContent = "";
            ele.querySelector(".error-txt").classList.remove("d-block");
            fvc.querySelector(".coi-input").classList.remove("error-active");
            fvc.classList.add("valid");
          } else {
            ele.querySelector(".error-txt").classList.add("d-block");
            ele.querySelector(".error-txt").classList.remove("d-none");
            ele.querySelector(".error-txt").textContent = "Field should contain 11 Alpha Numeric Characters";
            fvc.querySelector(".coi-input").classList.add("error-active");
            fvc.classList.remove("valid");
          }
        } else {
          ele.querySelector(".error-txt").classList.add("d-block");
          ele.querySelector(".error-txt").textContent = "Please enter valid COI number";
          fvc.querySelector(".coi-input").classList.add("error-active");
          fvc.classList.remove("valid");
        }
      },

      onlynumeric: function (e) {
        const { ele, value, fvc } = H(e);
        const n = value.replaceAll(/[^0-9,]/g, "");
        e.currentTarget.value = n;

        if (n !== "" && n !== undefined) {
          if (/^[0-9,]+$/.test(n)) {
            ele.querySelector(".error-txt").classList.remove("d-block");
            ele.querySelector(".error-txt").textContent = "";
            fvc.querySelector("input").classList.remove("error-active");
            fvc.classList.add("valid");
          } else {
            ele.querySelector(".error-txt").classList.add("d-block");
            ele.querySelector(".error-txt").textContent = "Please enter a valid amount";
            fvc.querySelector("input").classList.add("error-active");
            fvc.classList.remove("valid");
          }
        } else {
          ele.querySelector(".error-txt").classList.add("d-block");
          ele.querySelector(".error-txt").textContent = "Please enter an amount";
          fvc.querySelector("input").classList.add("error-active");
          fvc.classList.remove("valid");
        }
      },

      otpValidation: M,
      dobValidation: function (e) {
        const { ele, value, fvc } = H(e);
        const a = value.trim();
        e.currentTarget.value = a;

        if (a != "" && a != null) {
          if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(a)) {
            const n = a.split("/");
            const o = parseInt(n[0], 10);
            const l = parseInt(n[1], 10);
            const i = parseInt(n[2], 10);
            const d = new Date(i, l - 1, o);

            if (isNaN(d.getTime()) || d > new Date()) {
              ele.querySelector(".error-txt").classList.add("d-block");
              ele.querySelector(".error-txt").style.display = "block";
              ele.querySelector(".error-txt").classList.remove("d-none");
              const msg = ele.querySelector("input")?.getAttribute("id") === "fromDate" || ele.querySelector("input")?.getAttribute("id") === "toDate"
                ? "Please Enter Valid Date"
                : "Please Enter Valid Date of Birth";
              ele.querySelector(".error-txt").textContent = msg;
              fvc.classList.remove("valid");
              e.currentTarget.classList.add("error-active");
            } else {
              ele.querySelector(".error-txt").classList.remove("d-block");
              ele.querySelector(".error-txt").textContent = "";
              fvc.classList.add("valid");
              e.currentTarget.classList.remove("error-active");
            }
          } else {
            ele.querySelector(".error-txt").classList.add("d-block");
            ele.querySelector(".error-txt").style.display = "block";
            ele.querySelector(".error-txt").classList.remove("d-none");
            const msg = ele.querySelector("input")?.getAttribute("id") === "fromDate" || ele.querySelector("input")?.getAttribute("id") === "toDate"
              ? "Please enter date"
              : "Please Enter Valid Date of Birth (dd/mm/yyyy)";
            ele.querySelector(".error-txt").textContent = msg;
            fvc.classList.remove("valid");
            e.currentTarget.classList.add("error-active");
          }

          if (ele.querySelector("input")?.getAttribute("data-key") === "childValidation") {
            const isAbove18 = (() => {
              const n = a.split("/");
              const r = parseInt(n[0], 10);
              const t = parseInt(n[1], 10);
              const s = parseInt(n[2], 10);
              const n_date = new Date(s, t - 1, r);
              const o = new Date();
              o.setFullYear(o.getFullYear() - 18);
              return n_date <= o;
            })();

            if (!isAbove18) {
              ele.querySelector(".error-txt").classList.add("d-block");
              ele.querySelector(".error-txt").style.display = "block";
              ele.querySelector(".error-txt").classList.remove("d-none");
              ele.querySelector(".error-txt").textContent = "DOB Should be 18 Above";
              e.currentTarget.classList.add("error-active");
            } else {
              ele.querySelector(".error-txt").classList.remove("d-block");
              ele.querySelector(".error-txt").style.display = "none";
              ele.querySelector(".error-txt").classList.add("d-none");
              ele.querySelector(".error-txt").textContent = "";
              e.currentTarget.classList.remove("error-active");
            }
          }
        } else {
          ele.querySelector(".error-txt").classList.add("d-block");
          ele.querySelector(".error-txt").style.display = "block";
          ele.querySelector(".error-txt").classList.remove("d-none");
          const msg = ele.querySelector("input")?.getAttribute("id") === "fromDate" || ele.querySelector("input")?.getAttribute("id") === "toDate"
            ? "Please enter date"
            : "Please enter date of birth";
          ele.querySelector(".error-txt").textContent = msg;
          fvc.classList.remove("valid");
          e.currentTarget.classList.add("error-active");
        }
      },

      onlynumericMobile: function (e) {
        const { ele, value, fvc } = H(e);
        const n = value.replaceAll(/[^0-9]/g, "").replaceAll(/(\..*?)\..*/g, "$1");
        e.currentTarget.value = n;

        if (value !== "" && value != null) {
          if (value.length < 3) {
            if (e.target.id === "mobnumber") {
              ele.parentElement.querySelector(".error-txt").classList.add("d-block");
              ele.parentElement.querySelector(".error-txt").classList.remove("d-none");
              ele.parentElement.querySelector(".error-txt").textContent = "Please enter valid mobile number";
              fvc.classList.add("error-active");
              fvc.classList.remove("valid");
            } else {
              ele.querySelector(".error-txt").classList.add("d-block");
              ele.querySelector(".error-txt").classList.remove("d-none");
              ele.querySelector(".error-txt").textContent = "Please enter valid mobile number";
              fvc.querySelector("input").classList.add("error-active");
              fvc.classList.remove("valid");
            }
          } else {
            if (e.target.id === "mobnumber") {
              ele.parentElement.querySelector(".error-txt").textContent = "";
              ele.parentElement.querySelector(".error-txt").classList.remove("d-block");
              fvc.classList.remove("error-active");
              fvc.classList.add("valid");
            } else {
              ele.querySelector(".error-txt").textContent = "";
              ele.querySelector(".error-txt").classList.remove("d-block");
              fvc.querySelector("input").classList.remove("error-active");
              fvc.classList.add("valid");
            }
          }
        } else {
          if (e.target.id === "mobnumber") {
            ele.parentElement.querySelector(".error-txt").classList.add("d-block");
            ele.parentElement.querySelector(".error-txt").textContent = "Mobile number cannot be blank";
            fvc.classList.add("error-active");
            fvc.classList.remove("valid");
          } else {
            ele.querySelector(".error-txt").classList.add("d-block");
            ele.querySelector(".error-txt").textContent = "Mobile number cannot be blank";
            fvc.querySelector("input").classList.add("error-active");
            fvc.classList.remove("valid");
          }
        }
      },

      pincodeValidation: function (e) {
        const { ele, value, fvc } = H(e);
        const a = value.replaceAll(/[^0-9]/g, "").replaceAll(/(\..*?)\..*/g, "$1").trim();
        e.currentTarget.value = a;

        if (a != "" && a != null) {
          if (/^\d{6}$/.test(a)) {
            ele.querySelector(".error-txt").classList.remove("d-block");
            ele.querySelector(".error-txt").textContent = "";
            fvc.classList.add("valid");
            e.currentTarget.classList.remove("error-active");
          } else {
            ele.querySelector(".error-txt").classList.add("d-block");
            ele.querySelector(".error-txt").style.display = "block";
            ele.querySelector(".error-txt").classList.remove("d-none");
            ele.querySelector(".error-txt").textContent = "Please enter a valid 6-digit Pincode";
            fvc.classList.remove("valid");
            e.currentTarget.classList.add("error-active");
          }
        } else {
          ele.querySelector(".error-txt").classList.add("d-block");
          ele.querySelector(".error-txt").style.display = "block";
          ele.querySelector(".error-txt").classList.remove("d-none");
          ele.querySelector(".error-txt").textContent = "Please enter Pincode";
          fvc.classList.remove("valid");
          e.currentTarget.classList.add("error-active");
        }
      },

      emailNew: function (e) {
        const { ele, value, fvc } = H(e);

        if (value !== "") {
          if (/^[\w-\.]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/g.test(value)) {
            ele.querySelector(".error-txt").textContent = "";
            ele.querySelector(".error-txt").classList.remove("d-block");
            fvc.classList.add("valid");
            e.currentTarget.classList.remove("error-active");
          } else {
            ele.querySelector(".error-txt").classList.add("d-block");
            ele.querySelector(".error-txt").textContent = "Please enter valid e-mail id";
            fvc.classList.remove("valid");
            e.currentTarget.classList.add("error-active");
          }
        } else {
          ele.querySelector(".error-txt").classList.add("d-block");
          ele.querySelector(".error-txt").textContent = "Please enter e-mail id";
          e.currentTarget.classList.add("error-active");
          fvc.classList.remove("valid");
        }
      },
      dobValidationGoals: function (e) {
        const { ele, value, fvc } = H(e);
        const a = value.trim();
        e.currentTarget.value = a;

        if (a != "" && a != null) {
          if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(a)) {
            const n = a.split("/");
            const o = parseInt(n[0], 10);
            const l = parseInt(n[1], 10);
            const i = parseInt(n[2], 10);
            const d = new Date(i, l - 1, o);

            if (isNaN(d.getTime()) || d > new Date()) {
              ele.querySelector(".error-txt").classList.add("d-block").style.display = "block";
              ele.querySelector(".error-txt").classList.remove("d-none");
              ele.querySelector(".error-txt").textContent = "Please Enter Valid Date of Birth";
              fvc.classList.remove("valid");
              e.currentTarget.classList.add("error-active");
            } else {
              const c = new Date();
              let u = c.getFullYear() - d.getFullYear();
              let v = c.getMonth() - d.getMonth();
              (v < 0 || (v === 0 && c.getDate() < d.getDate())) && u--;

              if (u < 18 || u > 65) {
                ele.querySelector(".error-txt").classList.add("d-block").style.display = "block";
                ele.querySelector(".error-txt").classList.remove("d-none");
                ele.querySelector(".error-txt").textContent = "Age should be between 18 and 65 years.";
                fvc.classList.remove("valid");
                e.currentTarget.classList.add("error-active");
              } else {
                ele.querySelector(".error-txt").classList.remove("d-block");
                ele.querySelector(".error-txt").textContent = "";
                fvc.classList.add("valid");
                e.currentTarget.classList.remove("error-active");
              }
            }
          } else {
            ele.querySelector(".error-txt").classList.add("d-block").style.display = "block";
            ele.querySelector(".error-txt").classList.remove("d-none");
            ele.querySelector(".error-txt").textContent = "Please Enter Valid Date of Birth (dd/mm/yyyy)";
            fvc.classList.remove("valid");
            e.currentTarget.classList.add("error-active");
          }
        } else {
          ele.querySelector(".error-txt").classList.add("d-block").style.display = "block";
          ele.querySelector(".error-txt").classList.remove("d-none");
          ele.querySelector(".error-txt").textContent = "Please enter date of birth";
          fvc.classList.remove("valid");
          e.currentTarget.classList.add("error-active");
        }
      },

      annualIncomeValidation: function (e) {
        const { ele, value, fvc } = H(e);
        const a = value.replaceAll(/[^0-9]/g, "").trim();

        if (a) {
          if (!/^\d+$/.test(a) || Number(a) < 100000) {
            ele.querySelector(".error-txt").classList.add("d-block");
            ele.querySelector(".error-txt").classList.remove("d-none");
            ele.querySelector(".error-txt").style.display = "block";
            ele.querySelector(".error-txt").textContent = "Enter minimum six figures";
            fvc.classList.remove("valid");
            e.currentTarget.classList.add("error-active");
          } else {
            ele.querySelector(".error-txt").classList.remove("d-block");
            ele.querySelector(".error-txt").textContent = "";
            fvc.classList.add("valid");
            e.currentTarget.classList.remove("error-active");
          }
        } else {
          ele.querySelector(".error-txt").classList.add("d-block");
          ele.querySelector(".error-txt").classList.remove("d-none");
          ele.querySelector(".error-txt").style.display = "block";
          ele.querySelector(".error-txt").textContent = "Please enter Annual Income";
          fvc.classList.remove("valid");
          e.currentTarget.classList.add("error-active");
        }
      },

      retirementdobValidationGoals: function (e) {
        const { ele, value, fvc } = H(e);
        const a = value.trim();
        e.currentTarget.value = a;

        if (a != "" && a != null) {
          if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(a)) {
            const n = a.split("/");
            const o = parseInt(n[0], 10);
            const l = parseInt(n[1], 10);
            const i = parseInt(n[2], 10);
            const d = new Date(i, l - 1, o);

            if (isNaN(d.getTime()) || d > new Date()) {
              ele.querySelector(".error-txt").classList.add("d-block").style.display = "block";
              ele.querySelector(".error-txt").classList.remove("d-none");
              ele.querySelector(".error-txt").textContent = "Please Enter Valid Date of Birth";
              fvc.classList.remove("valid");
              e.currentTarget.classList.add("error-active");
            } else {
              const c = new Date();
              let u = c.getFullYear() - d.getFullYear();
              let v = c.getMonth() - d.getMonth();
              (v < 0 || (v === 0 && c.getDate() < d.getDate())) && u--;

              if (u < 45 || u > 80) {
                ele.querySelector(".error-txt").classList.add("d-block").style.display = "block";
                ele.querySelector(".error-txt").classList.remove("d-none");
                ele.querySelector(".error-txt").textContent = "Eligible age group for this goal is between 45-80 years";
                fvc.classList.remove("valid");
                e.currentTarget.classList.add("error-active");
              } else {
                ele.querySelector(".error-txt").classList.remove("d-block");
                ele.querySelector(".error-txt").textContent = "";
                fvc.classList.add("valid");
                e.currentTarget.classList.remove("error-active");
              }
            }
          } else {
            ele.querySelector(".error-txt").classList.add("d-block").style.display = "block";
            ele.querySelector(".error-txt").classList.remove("d-none");
            ele.querySelector(".error-txt").textContent = "Please Enter Valid Date of Birth (dd/mm/yyyy)";
            fvc.classList.remove("valid");
            e.currentTarget.classList.add("error-active");
          }
        } else {
          ele.querySelector(".error-txt").classList.add("d-block").style.display = "block";
          ele.querySelector(".error-txt").classList.remove("d-none");
          ele.querySelector(".error-txt").textContent = "Please enter date of birth";
          fvc.classList.remove("valid");
          e.currentTarget.classList.add("error-active");
        }
      },
    };

    function H(e) {
      const t = e.currentTarget.closest(".form-group,.input_wrapper") || e.currentTarget.parentElement;
      return {
        ele: t,
        value: e.currentTarget.value,
        fvc: e.currentTarget.closest(".input_wrapper") || t,
      };
    }

    function M(e) {
      let t = true;
      const r = e.querySelectorAll("input");
      
      r.forEach((a) => {
        if (a.value.trim() === "") {
          t = false;
          e.classList.remove("valid");
          a.classList.add("error-active");
        } else {
          e.classList.add("valid");
          a.classList.remove("error-active");
        }
      });
      
      if (t) {
        e.nextElementSibling?.querySelector(".error-txt").textContent = "";
      } else {
        e.nextElementSibling?.querySelector(".error-txt").textContent = "Please Enter OTP";
      }
    }
    });
  };
