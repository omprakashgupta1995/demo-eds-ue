export function initHeaderNav() {
    !(function () {
    "use strict";
    window.adobeDataLayer;
})();
!(function () {
    "use strict";
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
        let t = document.querySelector("#doaminroot"),
            r = e.replace(".html", "").replace(t.getAttribute("data-contentroot"), t.getAttribute("data-domain"));
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
        return new Promise(function (t, r) {
            var a,
                s,
                n,
                o,
                l = {
                    requestJson:
                        ((a = e),
                        (s = $(".pageRootPaths")
                            .map(function () {
                                return $(this).val().trim();
                            })
                            .get()),
                        (n = $(".pdfRootPaths")
                            .map(function () {
                                return $(this).val().trim();
                            })
                            .get()),
                        (o = $(".cfRootPaths")
                            .map(function () {
                                return $(this).val().trim();
                            })
                            .get()),
                        {
                            data: {
                                requestJson: {
                                    pageRootPaths: (s = [S(s[0])]),
                                    pdfRootPaths: n,
                                    cfRootPaths: o,
                                    searchText: a,
                                },
                            },
                        }),
                };
            let i = apiConfig.searchResult;
            callPostAPI(i, l, "form")
                .then(function (e) {
                    if (200 != e.statusCode || e.responseJson.errorMessage) r(e.responseJson);
                    else {
                        var a = e.responseJson;
                        t(a);
                    }
                })
                .catch(function (e) {
                    console.error(e);
                });
        });
    }
    function T(e, t, r, a) {
        const s = $(".popular_searches_div-popular_searches .searchresultstate");
        s.empty();
        let n = 0;
        for (
            e = P(e, "url"), t = P(t, "url"), r = P(r, "productName");
            a > 0 && (n < e.length || n < t.length || n < r.length);

        )
            n < e.length && a > 0 && null !== e[n] && void 0 !== e[n] && "" !== e[n] && (s.append(A(e[n])), a--),
                n < t.length &&
                    a > 0 &&
                    null !== t[n] &&
                    void 0 !== t[n] &&
                    "" !== t[n] &&
                    (s.append(
                        `<h3><a href="${(o = t[n]).url}.coredownload.inline.pdf" target="_blank">${o.heading}</a></h3>`
                    ),
                    a--),
                n < r.length && a > 0 && null !== r[n] && void 0 !== r[n] && "" !== r[n] && (s.append(E(r[n])), a--),
                n++;
        var o;
        $(".popular_searches_div-popular_searches .searchresultstate h3 a").click(function (e) {
            var t, r, a, s;
            (t = $("#header-search-evt").val()),
                (r = e.currentTarget.innerText),
                (a = "header search"),
                (s = ""),
                window.adobeDataLayer.push({
                    event: "suggestedsearchClick",
                    data: { searchTerm: t, suggestedsearchTerm: r, componentName: a },
                    product: { productId: s },
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
                $(e.target).hasClass("notif_img_evt") || $(e.target).parents().hasClass("notificication_wrapper-evt")
                    ? console.log("")
                    : ($(".notificication_wrapper-evt").addClass("dsp-none"),
                      $(".notificication_wrapper-notification_div.active").length > 0 &&
                          $(".notificication_wrapper-notification_div.active").removeClass("active")),
                $(e.target).hasClass("header-search-open-evt") ||
                $(e.target).parents().hasClass("search-search_wrapper_evt")
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
                    $(".search-search_wrapper_evt").addClass("dsp-none"),
                    (document.body.style.overflow = "auto"),
                    V());
            }
        }),
        document.querySelector(".header-search-open-evt")?.classList.contains("search-active") &&
            (document.querySelector(".header-search-open-evt")?.classList.remove("search-active"),
            $(void 0).addClass("dsp-none"));
    function B(e, t) {
        if (e.length >= 3) {
            var r = $(".resultCount")
                .map(function () {
                    return $(this).val().trim();
                })
                .get();
            q(e)
                .then(function (a) {
                    let s = a?.searchResult || [],
                        n = a?.assetResult || [],
                        o = a?.cfResult || [];
                    return (
                        (s.length > 0 || n.length > 0 || o.length > 0) &&
                        (T(s, n, o, parseInt(r[0])),
                        1 == t &&
                            ((l = e),
                            (i = document.querySelectorAll(".search-search_wrapper .searchresultstate  h3").length),
                            (d = "header search"),
                            (c = ""),
                            window.adobeDataLayer.push({
                                event: "speechtotextSearch",
                                data: { searchTerm: l, noofitemsCaptured: i, componentName: d },
                                product: { productId: c },
                            })),
                        !0)
                    );
                    var l, i, d, c;
                })
                .then(function (e) {
                    if (e)
                        $(".search_result_div-default").removeClass("dsp-none").addClass("dsp-block"),
                            $(".search_result_div-no_results").removeClass("dsp-block").addClass("dsp-none"),
                            $(".popular_searches_div-popular_searches .searchopenstate").toggleClass(
                                "dsp-block dsp-none"
                            ),
                            $(".popular_searches_div-popular_searches .searchresultstate").toggleClass(
                                "dsp-none dsp-block"
                            ),
                            $(".popular_searches_div-popular_searches .searchresultstate").addClass("apiHit"),
                            $(".popular_searches_div-popular_searches .searchresultstate").hasClass("apiHit") &&
                                $(".popular_searches_div-popular_searches .searchresultstate")
                                    .addClass("dsp-block")
                                    .removeClass("dsp-none");
                    else {
                        const e = $("#header-search-evt").val();
                        e.length >= 3 &&
                            ($(".search_result_div-no_results").removeClass("dsp-none").addClass("dsp-block"),
                            $(".search_result_div-no_results .no_results-heading .searchword").text(" " + e)),
                            $(".search_result_div-default").addClass("dsp-none"),
                            $(".popular_searches_div-popular_searches .searchopenstate").addClass("dsp-none"),
                            $(".popular_searches_div-popular_searches .searchresultstate")
                                .removeClass("dsp-block")
                                .addClass("dsp-none"),
                            $(".popular_searches_div-popular_searches .searchresultstate").removeClass("apiHit");
                    }
                })
                .catch(function (e) {
                    console.error(e);
                });
        }
    }
    function O() {
        $("#header-search-evt").length > 0 &&
            ($("#header-search-evt").val(""),
            $(".popular_searches_div-popular_searches .searchresultstate").html(""),
            $(".popular_searches_div-popular_searches .searchopenstate").removeClass("dsp-none").addClass("dsp-block"),
            $(".search_result_div-default").removeClass("dsp-none").addClass("dsp-block"),
            $(".search_result_div-typing_state").addClass("dsp-none"),
            $(".popular_searches_div-popular_searches .searchresultstate")
                .removeClass("dsp-block")
                .addClass("dsp-none"),
            "" === $("#header-search-evt").val().trim()
                ? $(".search_result_div-no_results").addClass("dsp-none").removeClass("dsp-block")
                : $(".search_result_div-no_results").removeClass("dsp-block").addClass("dsp-none"));
    }
    function V() {
        $(".more-submenu_list_toggle_evt").parent().removeClass("active"),
            $(".more-submenu_list").addClass("dsp-none"),
            $(".main-mobile_heading_evt").removeClass("active"),
            $(".submenu-list-inner").removeClass("active"),
            $(".menu-main_plans").addClass("dsp-none"),
            $(".deskhumb-drop-suboption-div").addClass("dsp-none"),
            $(".more-wrapper_list-div.mobile_menu_submenu-evt").addClass("dsp-none"),
            $(".menu_plans-submenu-wrapper.mobile_menu_submenu-evt").addClass("dsp-none");
    }
    document.addEventListener("DOMContentLoaded", function () {
        $(".search_input_div-icon").on("click", function (e) {
            var t = $(this).next().val().trim(),
                r = w($("#resultPagePath").val().trim());
            t && (window.location.href = `${r}?result=${D(t)}`);
        }),
            $("#header-search-evt").on("keyup", function (e) {
                var t,
                    r,
                    a,
                    s = $(this).val().trim();
                if ("" != s)
                    if (($(".search_result_div-typing_state").removeClass("dsp-none"), "Enter" === e.key)) {
                        var n = w($("#resultPagePath").val().trim());
                        s.length >= 3 &&
                            (window.location.href.includes("wcmmode=disabled")
                                ? (window.location.href = `${n}.html?result=${D(s)}`)
                                : (window.location.href = `${n}?result=${s}`)),
                            (t = s),
                            (r = "header search"),
                            (a = ""),
                            window.adobeDataLayer.push({
                                event: "headerinternalSearch",
                                data: { searchTerm: t, componentName: r },
                                product: { productId: a },
                            });
                    } else B(s);
                else O();
            });
        const e = document.querySelectorAll(".hover-trigger"),
            t = document.getElementById("navbar-overlay-evt");
        e.forEach((s) => {
            const n = s.id + "-drop",
                o = document.getElementById(n);
            let l = "";
            s.addEventListener("click", function (n) {
                n.stopPropagation();
                const i = s.classList.contains("active");
                (l = n.target.closest("li")),
                    e.forEach((e) => {
                        const t = e.id + "-drop",
                            r = document.getElementById(t),
                            a = e.closest("li");
                        a && a.classList.remove("active"), e.classList.remove("active"), r.classList.remove("show");
                    }),
                    i
                        ? (s.classList.remove("active"),
                          o.classList.remove("show"),
                          l && l.classList.remove("active"),
                          (document.querySelector("body").style.overflow = "auto"),
                          document.querySelector(".menu-image").classList.contains("turnImg") ||
                              t.classList.add("dsp-none"))
                        : (s.classList.add("active"),
                          o.classList.add("show"),
                          V(),
                          l && l.classList.add("active"),
                          t.classList.remove("dsp-none"),
                          (document.querySelector("body").style.overflow = "hidden"),
                          document
                              .querySelector(".dropdown_section .dropdown_container .login_dropdown")
                              .classList.remove("dsp-block"),
                          document
                              .querySelector(".dropdown_section .dropdown_container .login_dropdown")
                              .classList.add("dsp-none"),
                          document
                              .querySelector(".dropdown_section .dropdown_container")
                              .classList.remove("rotate_img"),
                          document.querySelector(".notificication_wrapper-evt").classList.add("dsp-none"),
                          $(".desktopHumburger").hasClass("hidden") &&
                              (r.classList.remove("turnImg"),
                              t.classList.remove("dsp-none"),
                              (r.src = "/content/dam/ifliwebsite/header/menu.svg"),
                              a.classList.remove("hidden"),
                              (document.querySelector("body").style.overflow = "hidden")));
            }),
                o.addEventListener("mouseover", function () {
                    s.classList.add("active"),
                        o.classList.add("show"),
                        l && l.classList.add("active"),
                        t.classList.remove("dsp-none"),
                        (document.querySelector("body").style.overflow = "hidden");
                }),
                o.addEventListener("mouseout", function () {
                    s.classList.remove("active"),
                        o.classList.remove("show"),
                        l && l.classList.remove("active"),
                        (document.querySelector("body").style.overflow = "auto"),
                        t.classList.add("dsp-none");
                });
        }),
            document.addEventListener("click", function (r) {
                let a = !1;
                e.forEach((e) => {
                    const t = e.id + "-drop",
                        s = document.getElementById(t);
                    (e.contains(r.target) || s.contains(r.target)) && (a = !0);
                }),
                    a ||
                        e.forEach((e) => {
                            const r = e.id + "-drop",
                                a = document.getElementById(r),
                                s = e.closest("li");
                            s && s.classList.remove("active"),
                                e.classList.remove("active"),
                                document.querySelector(".desktopHumburger").classList.contains("hidden")
                                    ? t.classList.remove("dsp-none")
                                    : a.classList.contains("show")
                                      ? (a.classList.remove("show"),
                                        (document.querySelector("body").style.overflow = "auto"),
                                        t.classList.add("dsp-none"))
                                      : document
                                            .querySelector(".header-search-open-evt")
                                            ?.classList.contains("search-active") && t.classList.remove("dsp-none");
                        });
            });
        var r = document.querySelector(".header_desktop .top_header_wrapper .menu_sec .menu_wrap .menu-image"),
            a = document.querySelector(".desktopHumburger");
        null != r &&
            r.addEventListener("click", function () {
                if (r.classList.contains("turnImg"))
                    r.classList.remove("turnImg"),
                        (r.src = "/content/dam/ifliwebsite/header/menu.svg"),
                        a.classList.remove("hidden"),
                        t.classList.add("dsp-none"),
                        (document.querySelector("body").style.overflow = "auto"),
                        V();
                else {
                    r.classList.add("turnImg"),
                        (r.src = "/content/dam/ifliwebsite/header/discard-dark.png"),
                        a.classList.add("hidden"),
                        t.classList.remove("dsp-none"),
                        (document.querySelector("body").style.overflow = "hidden");
                    const e = document.querySelectorAll(".hover-show-content");
                    let s = !1;
                    e.forEach((e) => {
                        e.classList.contains("show") && (e.classList.remove("show"), (s = !0));
                    }),
                        s
                            ? ((document.querySelector("body").style.overflow = "hidden"),
                              t.classList.remove("dsp-none"))
                            : (document.body.style.overflow = "hidden");
                }
            });
        var s = document.getElementById("dropdown-btn"),
            n = document.getElementById("dropdown-content");
        null != s &&
            (s.addEventListener("click", function () {
                n.classList.contains("show")
                    ? (n.classList.remove("show"), (s.innerText = "+"))
                    : (n.classList.add("show"), (s.innerText = "-"));
            }),
            window.addEventListener("click", function (e) {
                e.target.matches("#dropdown-btn") ||
                    (n.classList.contains("show") && (n.classList.remove("show"), (s.innerText = "+")));
            }));
    }),
        $(".submenu-list-evt").length > 0 &&
            $(".submenu-list-evt").on("click", function (e) {
                e.preventDefault();
                var t = $(this).parent().hasClass("active");
                $(".submenu-list-evt").parent().removeClass("active"),
                    $(".deskhumb-drop-suboption-div").addClass("dsp-none"),
                    t ||
                        $(this)
                            .parent()
                            .addClass("active")
                            .next(".deskhumb-drop-suboption-div")
                            .removeClass("dsp-none");
            }),
        $(".login-customer-evt").length > 0 &&
            $(".login-customer-evt").on("click", function (e) {
                e.stopPropagation(),
                    $(this).toggleClass("open"),
                    $(".login-customer-submenu-evt").toggleClass("dsp-none");
            }),
        $(".login-dropdwn-evt li").length > 0 &&
            $(".login-dropdwn-evt li").on("click", function (e) {
                e.stopPropagation();
            }),
        $(".toggle-mob-menu-evt").length > 0 &&
            $(".toggle-mob-menu-evt").on("click", function () {
                $(".mobile_menu_container").removeClass("dsp-none"),
                    $(".sticky-nav-footer-container").addClass("dsp-none"),
                    $("body").css("overflow", "hidden");
            }),
        $(".mobile-menu-close-evt").length > 0 &&
            $(".mobile-menu-close-evt").on("click", function () {
                $(".mobile_menu_container").addClass("dsp-none"),
                    $(".sticky-nav-footer-container").removeClass("dsp-none"),
                    $("body").css("overflow", "auto"),
                    V();
            }),
        $(".mobile-menu-back-evt").length > 0 &&
            $(".mobile-menu-back-evt").on("click", function () {
                $(this).parents(".mobile_menu_submenu-evt").addClass("dsp-none"),
                    $(this).parent(".mobile_menu_submenu-evt").next(".mobile_menu_submenu-evt").find("ul").length > 0 &&
                        ($(this)
                            .parent(".mobile_menu_submenu-evt")
                            .next(".mobile_menu_submenu-evt")
                            .addClass("dsp-none"),
                        $(this)
                            .parent(".mobile_menu_submenu-evt")
                            .next(".mobile_menu_submenu-evt")
                            .find("ul")
                            .ad("dsp-none"));
            }),
        $(".mobile_menu_submenu-toggle-evt").length > 0 &&
            $(".mobile_menu_submenu-toggle-evt").on("click", function (e) {
                e.preventDefault(),
                    $(this).parent(".mobile_menu_submenu-evt").next(".mobile_menu_submenu-evt").find("ul").length > 0
                        ? ($(this)
                              .parent(".mobile_menu_submenu-evt")
                              .next(".mobile_menu_submenu-evt")
                              .toggleClass("dsp-none"),
                          $(this)
                              .parent(".mobile_menu_submenu-evt")
                              .next(".mobile_menu_submenu-evt")
                              .find("ul")
                              .removeClass("dsp-none"))
                        : (window.location.href = $(this).parent(".mobile_menu_submenu-evt")[0].getAttribute("href"));
            }),
        $(".mobile_more_submenu-toggle-evt").length > 0 &&
            $(".mobile_more_submenu-toggle-evt").on("click", function () {
                $(this).next(".mobile_menu_submenu-evt").toggleClass("dsp-none"),
                    $(this).next(".mobile_menu_submenu-evt").children(".menu-main_plans").removeClass("dsp-none");
            }),
        $("#navbar-overlay-evt").length > 0 &&
            $("#navbar-overlay-evt").on("click", function () {
                document.querySelector(".header-search-open-evt")?.classList.contains("search-active")
                    ? (document.querySelector(".header-search-open-evt")?.classList.remove("search-active"),
                      $(this).addClass("dsp-none"),
                      (document.querySelector("body").style.overflow = "auto"),
                      $(".search-search_wrapper_evt").addClass("dsp-none"))
                    : $(this).addClass("dsp-none"),
                    V(),
                    $(".desktopHumburger").removeClass("hidden"),
                    $(".turnImg").hasClass("turnImg") &&
                        ($(".menu-image").attr("src", "/content/dam/ifliwebsite/header/menu.svg"),
                        (document.querySelector("body").style.overflow = "auto"),
                        $(".menu-image").removeClass("turnImg"));
            }),
        $(".notif_img_evt").length > 0 &&
            $(".notif_img_evt").on("click", function () {
                $(".notificication_wrapper-evt").toggleClass("dsp-none"),
                    $("body").css("overflow", "auto"),
                    document.getElementById("navbar-overlay-evt").classList.add("dsp-none"),
                    $(".notificication_wrapper-notification_div.active").length > 0 &&
                        $(".notificication_wrapper-notification_div.active").removeClass("active"),
                    V(),
                    document.querySelector(".desktopHumburger").classList.remove("hidden"),
                    document.querySelector(".menu-image").classList.contains("turnImg") &&
                        ((document.querySelector(".menu-image").src = "/content/dam/ifliwebsite/header/menu.svg"),
                        document.querySelector(".turnImg").classList.remove("turnImg"));
            }),
        $(".header-search-open-evt")?.length > 0 &&
            $(".header-search-open-evt")?.on("click", function () {
                if (
                    ($(".search-search_wrapper_evt").removeClass("dsp-none"),
                    $(".header-search-open-evt")?.addClass("search-active"),
                    document.querySelector(".header-search-open-evt")?.classList.contains("search-active"))
                ) {
                    document.getElementById("navbar-overlay-evt").classList.remove("dsp-none");
                    const e = document.querySelectorAll(".hover-show-content");
                    let t = !1;
                    e.forEach((e) => {
                        e.classList.contains("show") && (e.classList.remove("show"), (t = !0));
                    }),
                        t
                            ? ((document.querySelector("body").style.overflow = "hidden"), "".classList.add("dsp-none"))
                            : (document.body.style.overflow = "hidden"),
                        document.querySelector(".menu-image").classList.contains("turnImg") ||
                            document.getElementById("navbar-overlay-evt").classList.remove("dsp-none");
                }
                $("#header-search-evt").focus(),
                    document.querySelector(".menu-image").classList.contains("turnImg") &&
                        ((document.querySelector(".menu-image").src = "/content/dam/ifliwebsite/header/menu.svg"),
                        document.querySelector(".desktopHumburger").classList.remove("hidden"),
                        document.querySelector(".turnImg").classList.remove("turnImg"),
                        document.getElementById("navbar-overlay-evt").classList.add("dsp-none"));
            }),
        $(".search_input_div-close_evt").length > 0 &&
            $(".search_input_div-close_evt").on("click", function () {
                $(".search-search_wrapper_evt").addClass("dsp-none"),
                    document.querySelector(".header-search-open-evt")?.classList.contains("search-active") &&
                        (document.querySelector(".header-search-open-evt")?.classList.remove("search-active"),
                        document.getElementById("navbar-overlay-evt").classList.add("dsp-none")),
                    V(),
                    (document.querySelector(".menu-image").src = "/content/dam/ifliwebsite/header/menu.svg"),
                    (document.querySelector("body").style.overflow = "auto"),
                    O();
            }),
        $(".main-mobile_heading_toggle_evt").length > 0 &&
            $(".main-mobile_heading_toggle_evt").on("click", function (e) {
                e.preventDefault();
                var t = $(this).parent().hasClass("active");
                $(".main-mobile_heading_toggle_evt").parent().removeClass("active"),
                    $(".menu-main_plans").addClass("dsp-none"),
                    t || $(this).parent().addClass("active").next(".menu-main_plans").removeClass("dsp-none");
            }),
        $(".more-submenu_list_toggle_evt").length > 0 &&
            $(".more-submenu_list_toggle_evt").on("click", function (e) {
                e.preventDefault();
                var t = $(this).parent().hasClass("active");
                $(".more-submenu_list_toggle_evt").parent().removeClass("active"),
                    $(".more-submenu_list").addClass("dsp-none"),
                    t ||
                        $(this)
                            .parent(".more-submenu_list_evt")
                            .addClass("active")
                            .next(".more-submenu_list")
                            .removeClass("dsp-none");
            }),
        $(".search_input_div-speak_evt").length > 0 &&
            $(".search_input_div-speak_evt").click(function () {
                var e, t;
                !(function () {
                    if (window.hasOwnProperty("webkitSpeechRecognition")) {
                        var e,
                            t = new webkitSpeechRecognition();
                        if (((t.continuous = !1), (t.interimResults = !1), window.location.href.indexOf("/hi") > -1)) {
                            t.lang = "hi";
                            for (var r = document.querySelectorAll("#header-search-evt"), a = 0; a < r.length; a++)
                                (e = r[a].placeholder), (r[a].placeholder = "अब बोलें...");
                        } else if (window.location.href.indexOf("/gujarati") > -1)
                            for (
                                t.lang = "gu", r = document.querySelectorAll("#header-search-evt"), a = 0;
                                a < r.length;
                                a++
                            )
                                (e = r[a].placeholder), (r[a].placeholder = "હવે બોલો...");
                        else if (window.location.href.indexOf("/oriya") > -1)
                            for (
                                t.lang = "or", r = document.querySelectorAll("#header-search-evt"), a = 0;
                                a < r.length;
                                a++
                            )
                                (e = r[a].placeholder), (r[a].placeholder = "ଏବେ କୁହନ୍ତୁ...");
                        else if (window.location.href.indexOf("/bengali") > -1)
                            for (
                                t.lang = "bn", r = document.querySelectorAll("#header-search-evt"), a = 0;
                                a < r.length;
                                a++
                            )
                                (e = r[a].placeholder), (r[a].placeholder = "এখন বলো...");
                        else if (window.location.href.indexOf("/tamil") > -1)
                            for (
                                t.lang = "ta", r = document.querySelectorAll("#header-search-evt"), a = 0;
                                a < r.length;
                                a++
                            )
                                (e = r[a].placeholder), (r[a].placeholder = "இப்பொழுது பேசவும்...");
                        else if (window.location.href.indexOf("/telugu") > -1)
                            for (
                                t.lang = "te", r = document.querySelectorAll("#header-search-evt"), a = 0;
                                a < r.length;
                                a++
                            )
                                (e = r[a].placeholder), (r[a].placeholder = "ఇప్పుడు మాట్లాడు...");
                        else if (window.location.href.indexOf("/marathi") > -1)
                            for (
                                t.lang = "mr", r = document.querySelectorAll("#header-search-evt"), a = 0;
                                a < r.length;
                                a++
                            )
                                (e = r[a].placeholder), (r[a].placeholder = "आता बोला...");
                        else if (window.location.href.indexOf("/kannada") > -1)
                            for (
                                t.lang = "kn", r = document.querySelectorAll("#header-search-evt"), a = 0;
                                a < r.length;
                                a++
                            )
                                (e = r[a].placeholder), (r[a].placeholder = "ಈಗ ಮಾತನಾಡಿರಿ...");
                        else if (window.location.href.indexOf("/malayalam") > -1)
                            for (
                                t.lang = "ml", r = document.querySelectorAll("#header-search-evt"), a = 0;
                                a < r.length;
                                a++
                            )
                                (e = r[a].placeholder), (r[a].placeholder = "ഇപ്പോൾ സംസാരിക്കുക...");
                        else
                            for (
                                t.lang = "en-US", r = document.querySelectorAll("#header-search-evt"), a = 0;
                                a < r.length;
                                a++
                            )
                                (e = r[a].placeholder), (r[a].placeholder = "Speak Now...");
                        $(".search_input_div-speak_evt").prev().addClass("pulse-ring"),
                            t.start(),
                            (t.onresult = function (r) {
                                for (var a = document.querySelectorAll("#header-search-evt"), s = 0; s < a.length; s++)
                                    (a[s].value = r.results[0][0].transcript),
                                        (a[s].placeholder = e),
                                        B(a[0].value, !0);
                                $(".search_input_div-speak_evt").prev().removeClass("pulse-ring"),
                                    t.stop(),
                                    console.log("e: ", r);
                            }),
                            (t.onerror = function (e) {
                                $(".search_input_div-speak_evt").prev().removeClass("pulse-ring"), t.stop();
                            });
                    }
                })(),
                    (e = "header search"),
                    (t = ""),
                    window.adobeDataLayer.push({
                        event: "miciconClick",
                        data: { componentName: e },
                        product: { productId: t },
                    });
            }),
        document.addEventListener("DOMContentLoaded", function () {
            const e = document.querySelectorAll(".ask-expert-section"),
                t = document.querySelector(".askexpert-formbg");
            t &&
                e.forEach(function (e) {
                    e.addEventListener("click", function () {
                        let e = $(".prod-detail-leftupper .cmp-teaser__description h1").text();
                        I(e || ""),
                            (t.style.display = "flex"),
                            (document.querySelector("body").style.overflow = "hidden"),
                            (document.querySelector("#nameinput").value = ""),
                            (document.querySelector("#mobileinput").value = ""),
                            document
                                .querySelectorAll(".askexpert-formsection .name-wrapper .error-txt")
                                .forEach(function (e) {
                                    e.value = "";
                                }),
                            document.querySelectorAll(".name-input").forEach(function (e) {
                                e.classList.remove("error-active");
                            }),
                            document
                                .querySelectorAll(".askexpert-formsection .name-wrapper .right-icon-place")
                                .forEach(function (e) {
                                    e.style.display = "none";
                                }),
                            document
                                .querySelectorAll(".askexpert-formsection .name-wrapper span")
                                .forEach(function (e) {
                                    e.textContent = "";
                                }),
                            document.querySelectorAll(".name-input span").forEach(function (e) {
                                e.setAttribute("class", "");
                            });
                    });
                });
            const r = document.querySelectorAll(".notificication_wrapper-notification_div");
            r &&
                r.length > 0 &&
                r.forEach(function (e) {
                    e.addEventListener("click", function (e) {
                        r.forEach(function (e) {
                            e.classList.remove("active");
                        }),
                            this.classList.add("active");
                    });
                });
        }),
        window.addEventListener("appinstalled", () => {
            var e, t, r;
            console.log("PWA installed successfully"),
                (e = "Install"),
                (t = "PWA Icon"),
                (r = ""),
                window.adobeDataLayer.push({
                    event: "pwaiconClick",
                    data: { ctaText: e, componentName: t },
                    product: { productId: r },
                });
        }),
        $(document).ready(function () {
            $("[data-validation]").on("input", function (e) {
                null != document.querySelector(".claim-banner-form__main-container .apierror") &&
                    (document.querySelector(".claim-banner-form__main-container .apierror").innerHTML = "");
                var t = $(this).attr("data-validation");
                $(e.currentTarget).is(":visible") && F[t](e);
            });
        });
    var F = {
        fullname: function (e) {
            var t = H(e),
                r = t.ele,
                a = t.value,
                s = t.fvc;
            (a = t.value.replaceAll(/[^A-Za-z\s]/g, "").replaceAll(/(\..*?)\..*/g, "$1")), (e.currentTarget.value = a);
            let n = /^[a-zA-Z]+ [a-zA-Z]+$/;
            "" !== a && null != a
                ? n.test(a.trimEnd())
                    ? ($(r).find(".error-txt").text(""),
                      $(r).find(".error-txt").removeClass("d-block"),
                      s.querySelector("input").classList.remove("error-active"),
                      s.classList.add("valid"))
                    : ($(r).find(".error-txt").addClass("d-block"),
                      $(r).find(".error-txt").removeClass("d-none"),
                      "name" == $(r).find("input").data("key")?.toLowerCase()
                          ? $(r).find(".error-txt").text("Please enter first name & last name")
                          : $(r).find(".error-txt").text("Please enter valid name"),
                      s.querySelector("input").classList.add("error-active"),
                      s.classList.remove("valid"))
                : ($(r).find(".error-txt").addClass("d-block"),
                  "name" == $(r).find("input").data("key")?.toLowerCase()
                      ? $(r).find(".error-txt").text("Please enter first name & last name")
                      : $(r).find(".error-txt").text("Please enter name"),
                  s.querySelector("input").classList.add("error-active"),
                  s.classList.remove("valid"));
        },
        firstname: function (e) {
            var t = H(e),
                r = t.ele,
                a = t.value,
                s = t.fvc;
            (a = t.value
                .replaceAll(/[^A-Za-z\s]/g, "")
                .replaceAll(/(\..*?)\..*/g, "$1")
                .replaceAll(/\s+/g, " ")),
                (e.currentTarget.value = a),
                " " == a && (e.currentTarget.value = "");
            "" !== a && null != a
                ? /^[a-zA-Z\s]+$/.test(a)
                    ? ($(r).find(".error-txt").text(""),
                      $(r).find(".error-txt").removeClass("d-block"),
                      s.querySelector("input").classList.remove("error-active"),
                      s.classList.add("valid"))
                    : ($(r).find(".error-txt").addClass("d-block"),
                      $(r).find(".error-txt").removeClass("d-none"),
                      $(r).find(".error-txt").text("Please enter valid first name"),
                      s.querySelector("input").classList.add("error-active"),
                      s.classList.remove("valid"))
                : ($(r).find(".error-txt").addClass("d-block"),
                  $(r).find(".error-txt").text("Please enter first name"),
                  s.querySelector("input").classList.add("error-active"),
                  s.classList.remove("valid"));
        },
        lastname: function (e) {
            var t = H(e),
                r = t.ele,
                a = t.value,
                s = t.fvc;
            (a = t.value
                .replaceAll(/[^A-Za-z\s]/g, "")
                .replaceAll(/(\..*?)\..*/g, "$1")
                .replaceAll(/\s+/g, " ")),
                (e.currentTarget.value = a),
                " " == a && (e.currentTarget.value = "");
            "" !== a && null != a
                ? /^[a-zA-Z\s]+$/.test(a)
                    ? ($(r).find(".error-txt").text(""),
                      $(r).find(".error-txt").removeClass("d-block"),
                      s.querySelector("input").classList.remove("error-active"),
                      s.classList.add("valid"))
                    : ($(r).find(".error-txt").addClass("d-block"),
                      $(r).find(".error-txt").removeClass("d-none"),
                      $(r).find(".error-txt").text("Please enter valid last name"),
                      s.querySelector("input").classList.add("error-active"),
                      s.classList.remove("valid"))
                : ($(r).find(".error-txt").addClass("d-block"),
                  $(r).find(".error-txt").text("Please enter last name"),
                  s.querySelector("input").classList.add("error-active"),
                  s.classList.remove("valid"));
        },
        notEmpty: function (e) {
            var t = H(e),
                r = t.ele,
                a = t.value;
            (a = a.replace(/\s/g, "")), (e.currentTarget.value = a);
            var s = t.fvc;
            a
                ? ($(r).find(".error-txt").text(""),
                  $(r).find(".error-txt").removeClass("d-block"),
                  s.querySelector("input").classList.remove("error-active"),
                  s.classList.add("valid"))
                : ($(r).find(".error-txt").addClass("d-block"),
                  $(r).find(".error-txt").text("This field is required!"),
                  s.querySelector("input").classList.add("error-active"),
                  s.classList.remove("valid"));
        },
        mobileNo: function (e) {
            var t = H(e),
                r = t.ele,
                a = t.value,
                s = t.fvc,
                n = a.replaceAll(/[^0-9]/g, "").replaceAll(/(\..*?)\..*/g, "$1");
            e.currentTarget.value = n;
            "" !== n &&
                (10 == n.length && /^[0]?[6789]\d{9}$/.test(n)
                    ? "mobnumber" == e.target.id
                        ? ($(r).parent().find(".error-txt").text(""),
                          $(r).parent().find(".error-txt").removeClass("d-block"),
                          s.classList.remove("error-active"),
                          s.classList.add("valid"))
                        : ($(r).find(".error-txt").text(""),
                          $(r).find(".error-txt").removeClass("d-block"),
                          s.querySelector("input").classList.remove("error-active"),
                          s.classList.add("valid"))
                    : "mobnumber" == e.target.id
                      ? ($(r).parent().find(".error-txt").addClass("d-block"),
                        $(r).parent().find(".error-txt").text("Please enter a valid 10-digit mobile number"),
                        s.classList.remove("valid"),
                        s.classList.add("error-active"))
                      : ($(r).find(".error-txt").addClass("d-block"),
                        $(r).find(".error-txt").text("Please enter a valid 10-digit mobile number"),
                        s.classList.remove("valid"),
                        s.querySelector("input").classList.add("error-active")));
            "" == n &&
                "" == a &&
                ($(r).find(".error-txt").addClass("d-block"),
                $(r).find(".error-txt").text("Please enter mobile number"),
                s.classList.remove("valid"),
                s.querySelector("input").classList.add("error-active"));
        },
        policyNumber: function (e) {
            var t = H(e),
                r = t.ele,
                a = t.value,
                s = t.fvc,
                n = a.replaceAll(/[^0-9]/g, "").replaceAll(/(\..*?)\..*/g, "$1");
            e.currentTarget.value = n;
            "" !== a && null != a
                ? 8 != a.length
                    ? ($(r).find(".error-txt").addClass("d-block"),
                      $(r).find(".error-txt").removeClass("d-none"),
                      $(r).find(".error-txt").text("Field should contain 8 Numeric Characters"),
                      s.querySelector("input").classList.add("error-active"),
                      s.classList.remove("valid"))
                    : /^[0-9]{8,}$/.test(a)
                      ? ($(r).find(".error-txt").text(""),
                        $(r).find(".error-txt").removeClass("d-block"),
                        s.querySelector("input").classList.remove("error-active"),
                        s.classList.add("valid"))
                      : ($(r).find(".error-txt").addClass("d-block"),
                        $(r).find(".error-txt").removeClass("d-none"),
                        $(r).find(".error-txt").text("Field should contain 8 Numeric Characters"),
                        s.querySelector("input").classList.add("error-active"),
                        s.classList.remove("valid"))
                : ($(r).find(".error-txt").addClass("d-block"),
                  $(r).find(".error-txt").text("Please enter valid policy number"),
                  s.querySelector("input").classList.add("error-active"),
                  s.classList.remove("valid"));
        },
        groupPolicyNumber: function (e) {
            var t = H(e),
                r = t.ele,
                a = t.value,
                s = t.fvc;
            (a = a.replaceAll(/[^A-Za-z0-9]/g, "").replaceAll(/(\..*?)\..*/g, "$1")), (e.currentTarget.value = a);
            "" !== a && null != a
                ? 8 != a.length
                    ? ($(r).find(".error-txt").addClass("d-block"),
                      $(r).find(".error-txt").removeClass("d-none"),
                      $(r).find(".error-txt").text("Please enter valid policy number"),
                      s.querySelector("input").classList.add("error-active"),
                      s.classList.remove("valid"))
                    : /^[a-zA-Z]{1}/.test(a)
                      ? /^[A-Z]{1}[0-9]{7,}$/.test(a)
                          ? ($(r).find(".error-txt").text(""),
                            $(r).find(".error-txt").removeClass("d-block"),
                            s.querySelector("input").classList.remove("error-active"),
                            s.classList.add("valid"))
                          : ($(r).find(".error-txt").addClass("d-block"),
                            $(r).find(".error-txt").removeClass("d-none"),
                            $(r).find(".error-txt").text("Please enter valid policy number"),
                            s.querySelector("input").classList.add("error-active"),
                            s.classList.remove("valid"))
                      : ($(r).find(".error-txt").addClass("d-block"),
                        $(r).find(".error-txt").removeClass("d-none"),
                        $(r).find(".error-txt").text("First letter should be alphabet"),
                        s.querySelector("input").classList.add("error-active"),
                        s.classList.remove("valid"))
                : ($(r).find(".error-txt").addClass("d-block"),
                  $(r).find(".error-txt").text("Please enter valid policy number"),
                  s.querySelector("input").classList.add("error-active"),
                  s.classList.remove("valid"));
        },
        notificationNumber: function (e) {
            var t = H(e),
                r = t.ele,
                a = t.value,
                s = t.fvc;
            "" !== a && null != a
                ? /^[a-zA-Z]{1}/.test(a)
                    ? 13 != a.length
                        ? ($(r).find(".error-txt").addClass("d-block"),
                          $(r).find(".error-txt").removeClass("d-none"),
                          $(r).find(".error-txt").text("Please enter valid Notification number"),
                          s.querySelector("input").classList.add("error-active"),
                          s.classList.remove("valid"))
                        : /^[a-zA-Z]{1}[0-9]{12,}$/.test(a)
                          ? ($(r).find(".error-txt").text(""),
                            $(r).find(".error-txt").removeClass("d-block"),
                            s.querySelector("input").classList.remove("error-active"),
                            s.classList.add("valid"))
                          : ($(r).find(".error-txt").addClass("d-block"),
                            $(r).find(".error-txt").removeClass("d-none"),
                            $(r).find(".error-txt").text("Please enter valid Notification number"),
                            s.querySelector("input").classList.add("error-active"),
                            s.classList.remove("valid"))
                    : ($(r).find(".error-txt").addClass("d-block"),
                      $(r).find(".error-txt").removeClass("d-none"),
                      $(r).find(".error-txt").text("First letter should be alphabet"),
                      s.querySelector("input").classList.add("error-active"),
                      s.classList.remove("valid"))
                : ($(r).find(".error-txt").addClass("d-block"),
                  $(r).find(".error-txt").text("Please enter valid Notification number"),
                  s.querySelector("input").classList.add("error-active"),
                  s.classList.remove("valid"));
        },
        claimNumber: function (e) {
            var t = H(e),
                r = t.ele,
                a = t.value,
                s = t.fvc;
            "" !== a && null != a
                ? 15 != a.length
                    ? ($(r).find(".error-txt").addClass("d-block"),
                      $(r).find(".error-txt").removeClass("d-none"),
                      $(r).find(".error-txt").text("Please enter valid claim reference number"),
                      s.querySelector("input").classList.add("error-active"),
                      s.classList.remove("valid"))
                    : /^[a-zA-Z]{2}/.test(a)
                      ? /^[A-Z]{2}[0-9]{13,}$/.test(a)
                          ? ($(r).find(".error-txt").text(""),
                            $(r).find(".error-txt").removeClass("d-block"),
                            s.querySelector("input").classList.remove("error-active"),
                            s.classList.add("valid"))
                          : ($(r).find(".error-txt").addClass("d-block"),
                            $(r).find(".error-txt").removeClass("d-none"),
                            $(r).find(".error-txt").text("Please enter valid claim reference number"),
                            s.querySelector("input").classList.add("error-active"),
                            s.classList.remove("valid"))
                      : ($(r).find(".error-txt").addClass("d-block"),
                        $(r).find(".error-txt").removeClass("d-none"),
                        $(r).find(".error-txt").text("First two letter should be alphabet"),
                        s.querySelector("input").classList.add("error-active"),
                        s.classList.remove("valid"))
                : ($(r).find(".error-txt").addClass("d-block"),
                  $(r).find(".error-txt").text("Please enter valid claim reference number"),
                  s.querySelector("input").classList.add("error-active"),
                  s.classList.remove("valid"));
        },
        applicationNumber: function (e) {
            var t = H(e),
                r = t.ele,
                a = t.value,
                s = t.fvc;
            "" !== a && null != a
                ? 9 != a.length
                    ? ($(r).find(".error-txt").addClass("d-block"),
                      $(r).find(".error-txt").removeClass("d-none"),
                      $(r).find(".error-txt").text("Please enter valid application number"),
                      s.querySelector("input").classList.add("error-active"),
                      s.classList.remove("valid"))
                    : /^[a-zA-Z]{1}/.test(a)
                      ? /^[A-Z]{1}[0-9]{8,}$/.test(a)
                          ? ($(r).find(".error-txt").text(""),
                            $(r).find(".error-txt").removeClass("d-block"),
                            s.querySelector("input").classList.remove("error-active"),
                            s.classList.add("valid"))
                          : ($(r).find(".error-txt").addClass("d-block"),
                            $(r).find(".error-txt").removeClass("d-none"),
                            $(r).find(".error-txt").text("Please enter valid application number"),
                            s.querySelector("input").classList.add("error-active"),
                            s.classList.remove("valid"))
                      : ($(r).find(".error-txt").addClass("d-block"),
                        $(r).find(".error-txt").removeClass("d-none"),
                        $(r).find(".error-txt").text("First letter should be alphabet"),
                        s.querySelector("input").classList.add("error-active"),
                        s.classList.remove("valid"))
                : ($(r).find(".error-txt").addClass("d-block"),
                  $(r).find(".error-txt").text("Please enter valid application number"),
                  s.querySelector("input").classList.add("error-active"),
                  s.classList.remove("valid"));
        },
        clientID: function (e) {
            var t = H(e),
                r = t.ele,
                a = t.value,
                s = t.fvc;
            "" !== a && null != a
                ? 8 != a.length
                    ? ($(r).find(".error-txt").addClass("d-block"),
                      $(r).find(".error-txt").removeClass("d-none"),
                      $(r).find(".error-txt").text("Field should contain 8 Numeric Characters"),
                      s.querySelector("input").classList.add("error-active"),
                      s.classList.remove("valid"))
                    : /^[0-9]{8,}$/.test(a)
                      ? ($(r).find(".error-txt").text(""),
                        $(r).find(".error-txt").removeClass("d-block"),
                        s.querySelector("input").classList.remove("error-active"),
                        s.classList.add("valid"))
                      : ($(r).find(".error-txt").addClass("d-block"),
                        $(r).find(".error-txt").removeClass("d-none"),
                        $(r).find(".error-txt").text("Please enter valid Client ID"),
                        s.querySelector("input").classList.add("error-active"),
                        s.classList.remove("valid"))
                : ($(r).find(".error-txt").addClass("d-block"),
                  $(r).find(".error-txt").text("Please enter valid Client ID"),
                  s.querySelector("input").classList.add("error-active"),
                  s.classList.remove("valid"));
        },
        onlyAlpha: function (e) {
            var t = H(e),
                r = t.ele,
                a = t.value,
                s = t.fvc;
            (a = a
                .trimStart()
                .replaceAll(/[^A-Za-z\s]/g, "")
                .replaceAll(/(\..*?)\..*/g, "$1")),
                (e.currentTarget.value = a);
            "" !== a && null != a
                ? /^[a-z\d\-_\s]+$/i.test(a)
                    ? ($(r).find(".error-txt").text(""),
                      $(r).find(".error-txt").removeClass("d-block"),
                      s.querySelector("input").classList.remove("error-active"),
                      s.classList.add("valid"))
                    : ($(r).find(".error-txt").addClass("d-block"),
                      $(r).find(".error-txt").removeClass("d-none"),
                      $(r).find(".error-txt").text("This field is required!"),
                      s.classList.remove("valid"),
                      s.querySelector("input").classList.add("error-active"))
                : ($(r).find(".error-txt").addClass("d-block"),
                  $(r).find(".error-txt").text("This field is required!"),
                  s.querySelector("input").classList.add("error-active"),
                  s.classList.remove("valid"));
        },
        alphanumberic: function (e) {
            var t = H(e),
                r = t.ele,
                a = t.value,
                s = t.fvc;
            "" !== a && null != a
                ? /^[0-9a-zA-Z]+$/.test(a)
                    ? ($(r).find(".error-txt").text(""),
                      $(r).find(".error-txt").removeClass("d-block"),
                      s.querySelector("input").classList.remove("error-active"),
                      s.classList.add("valid"))
                    : ($(r).find(".error-txt").addClass("d-block"),
                      $(r).find(".error-txt").removeClass("d-none"),
                      $(r).find(".error-txt").text("Please enter valid alphanumeric values"),
                      s.classList.remove("valid"),
                      s.querySelector("input").classList.add("error-active"))
                : ($(r).find(".error-txt").addClass("d-block"),
                  $(r).find(".error-txt").text("Please enter valid alphanumeric values"),
                  s.querySelector("input").classList.add("error-active"),
                  s.classList.remove("valid"));
        },
        emailaddressValidation: function (e) {
            var t = H(e),
                r = t.ele,
                a = t.value,
                s = t.fvc;
            if ("" !== a) {
                /^[\w-\.]+@([A-Za-z-]+\.)+[A-Za-z-]{2,4}$/g.test(a)
                    ? ($(r).find(".error-txt").text(""),
                      $(r).find(".error-txt").removeClass("d-block"),
                      s.classList.add("valid"),
                      e.currentTarget.classList.remove("error-active"))
                    : ($(r).find(".error-txt").addClass("d-block"),
                      $(r).find(".error-txt").text("Please enter valid e-mail id"),
                      s.classList.remove("valid"),
                      e.currentTarget.classList.add("error-active"));
            } else
                $(r).find(".error-txt").addClass("d-block"),
                    $(r).find(".error-txt").text("Please enter e-mail id"),
                    e.currentTarget.classList.add("error-active"),
                    s.classList.remove("valid");
        },
        panNumber: function (e) {
            var t = H(e),
                r = t.ele,
                a = t.value,
                s = t.fvc;
            (a = a
                .trimStart()
                .replaceAll(/[^A-Za-z\s0-9]/g, "")
                .replaceAll(/(\..*?)\..*/g, "$1")),
                (e.currentTarget.value = a);
            "" != a && null != a && /[a-zA-z]{5}\d{4}[a-zA-Z]{1}/.test(a)
                ? ($(r).find(".error-txt").removeClass("d-block"),
                  $(r).find(".error-txt").text(""),
                  s.classList.add("valid"),
                  e.currentTarget.classList.remove("error-active"))
                : ($(r).find(".error-txt").addClass("d-block"),
                  $(r).find(".error-txt").removeClass("d-none"),
                  $(r).find(".error-txt").text("Please Enter Valid PAN number"),
                  s.classList.remove("valid"),
                  e.currentTarget.classList.add("error-active"));
        },
        bankaccountNumber: function (e) {
            var t = H(e),
                r = t.ele,
                a = t.value,
                s = t.fvc,
                n = a.replaceAll(/[^0-9]/g, "").replaceAll(/(\..*?)\..*/g, "$1");
            e.currentTarget.value = n;
            "" !== a && null != a
                ? /^\d{9,18}$/.test(a)
                    ? ($(r).find(".error-txt").text(""),
                      $(r).find(".error-txt").removeClass("d-block"),
                      s.classList.add("valid"))
                    : ($(r).find(".error-txt").addClass("d-block"),
                      $(r).find(".error-txt").removeClass("d-none"),
                      $(r).find(".error-txt").text("Please enter valid Bank Account Number"),
                      s.classList.remove("valid"))
                : ($(r).find(".error-txt").addClass("d-block"),
                  $(r).find(".error-txt").text("Please enter valid Bank Account Number"),
                  s.classList.remove("valid"));
        },
        numericValidation: function (e) {
            var t = H(e),
                r = t.ele,
                a = t.value,
                s = t.fvc,
                n = a.replaceAll(/[^0-9]/g, "").replaceAll(/(\..*?)\..*/g, "$1");
            e.currentTarget.value = n;
            "" !== a && null != a
                ? 14 != a.length
                    ? ($(r).find(".error-txt").addClass("d-block"),
                      $(r).find(".error-txt").removeClass("d-none"),
                      $(r).find(".error-txt").text("Field should contain 14 Numeric Characters"),
                      s.querySelector("input").classList.add("error-active"),
                      s.classList.remove("valid"))
                    : /^[0-9]{8,}$/.test(a)
                      ? ($(r).find(".error-txt").text(""),
                        $(r).find(".error-txt").removeClass("d-block"),
                        s.querySelector("input").classList.remove("error-active"),
                        s.classList.add("valid"))
                      : ($(r).find(".error-txt").addClass("d-block"),
                        $(r).find(".error-txt").removeClass("d-none"),
                        $(r).find(".error-txt").text("Field should contain 14 Numeric Characters"),
                        s.querySelector("input").classList.add("error-active"),
                        s.classList.remove("valid"))
                : ($(r).find(".error-txt").addClass("d-block"),
                  $(r).find(".error-txt").text("Please enter valid register number"),
                  s.querySelector("input").classList.add("error-active"),
                  s.classList.remove("valid"));
        },
        ageValidation: function (e) {
            var t = H(e),
                r = t.ele,
                a = t.value,
                s = t.fvc,
                n = a.replace(/[^0-9]/g, "");
            (n = n.substring(0, 2)),
                (e.currentTarget.value = n),
                "" === n
                    ? ($(r).find(".error-txt").removeClass("d-none").addClass("d-block").text("Please enter your age"),
                      s.querySelector("input").classList.add("error-active"),
                      s.classList.remove("valid"))
                    : parseInt(n, 10) > 99
                      ? ($(r)
                            .find(".error-txt")
                            .removeClass("d-none")
                            .addClass("d-block")
                            .text("Age must be between 0 and 99"),
                        s.querySelector("input").classList.add("error-active"),
                        s.classList.remove("valid"))
                      : ($(r).find(".error-txt").removeClass("d-block").addClass("d-none").text(""),
                        s.querySelector("input").classList.remove("error-active"),
                        s.classList.add("valid"));
        },
        coialphanumberic: function (e) {
            var t = H(e),
                r = t.ele,
                a = t.value,
                s = t.fvc,
                n = a.replace(/[^a-zA-Z0-9]/g, "");
            e.currentTarget.value = n;
            "" !== a && null != a
                ? 11 != a.length
                    ? ($(r).find(".error-txt").addClass("d-block"),
                      $(r).find(".error-txt").removeClass("d-none"),
                      $(r).find(".error-txt").text("Field should contain 11 Alpha Numeric Characters"),
                      s.querySelector(".coi-input").classList.add("error-active"),
                      s.classList.remove("valid"))
                    : /^[0-9a-zA-Z]+$/.test(a)
                      ? ($(r).find(".error-txt").text(""),
                        $(r).find(".error-txt").removeClass("d-block"),
                        s.querySelector(".coi-input").classList.remove("error-active"),
                        s.classList.add("valid"))
                      : ($(r).find(".error-txt").addClass("d-block"),
                        $(r).find(".error-txt").removeClass("d-none"),
                        $(r).find(".error-txt").text("Field should contain 11 Alpha Numeric Characters"),
                        s.querySelector(".coi-input").classList.add("error-active"),
                        s.classList.remove("valid"))
                : ($(r).find(".error-txt").addClass("d-block"),
                  $(r).find(".error-txt").text("Please enter valid COI number"),
                  s.querySelector(".coi-input").classList.add("error-active"),
                  s.classList.remove("valid"));
        },
        onlynumeric: function (e) {
            var t = H(e),
                r = t.ele,
                a = t.value,
                s = t.fvc,
                n = a.replaceAll(/[^0-9,]/g, "");
            e.currentTarget.value = n;
            "" !== n && void 0 !== n
                ? /^[0-9,]+$/.test(n)
                    ? ($(r).find(".error-txt").removeClass("d-block").text(""),
                      s.querySelector("input").classList.remove("error-active"),
                      s.classList.add("valid"))
                    : ($(r).find(".error-txt").addClass("d-block").text("Please enter a valid amount"),
                      s.querySelector("input").classList.add("error-active"),
                      s.classList.remove("valid"))
                : ($(r).find(".error-txt").addClass("d-block").text("Please enter an amount"),
                  s.querySelector("input").classList.add("error-active"),
                  s.classList.remove("valid"));
        },
        otpValidation: M,
        dobValidation: function (e) {
            var t = H(e),
                r = t.ele,
                a = t.value,
                s = t.fvc;
            (a = a.trim()), (e.currentTarget.value = a);
            if ("" != a && null != a) {
                if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(a)) {
                    var n = a.split("/"),
                        o = parseInt(n[0], 10),
                        l = parseInt(n[1], 10),
                        i = parseInt(n[2], 10),
                        d = new Date(i, l - 1, o);
                    isNaN(d.getTime()) || d > new Date()
                        ? ($(r).find(".error-txt").addClass("d-block"),
                          $(r).find(".error-txt").css("display", "block"),
                          $(r).find(".error-txt").removeClass("d-none"),
                          "fromDate" == $(r).find("input").attr("id") || "toDate" == $(r).find("input").attr("id")
                              ? $(r).find(".error-txt").text("Please Enter Valid Date")
                              : $(r).find(".error-txt").text("Please Enter Valid Date of Birth"),
                          s.classList.remove("valid"),
                          e.currentTarget.classList.add("error-active"))
                        : ($(r).find(".error-txt").removeClass("d-block"),
                          $(r).find(".error-txt").text(""),
                          s.classList.add("valid"),
                          e.currentTarget.classList.remove("error-active"));
                } else
                    $(r).find(".error-txt").addClass("d-block"),
                        $(r).find(".error-txt").css("display", "block"),
                        $(r).find(".error-txt").removeClass("d-none"),
                        "fromDate" == $(r).find("input").attr("id") || "toDate" == $(r).find("input").attr("id")
                            ? $(r).find(".error-txt").text("Please enter date")
                            : $(r).find(".error-txt").text("Please Enter Valid Date of Birth (dd/mm/yyyy)"),
                        s.classList.remove("valid"),
                        e.currentTarget.classList.add("error-active");
                "childValidation" == $(r).find("input").data("key") &&
                    (!(function (e) {
                        var t = e.split("/"),
                            r = parseInt(t[0], 10),
                            a = parseInt(t[1], 10),
                            s = parseInt(t[2], 10),
                            n = new Date(s, a - 1, r),
                            o = new Date();
                        return o.setFullYear(o.getFullYear() - 18), n <= o;
                    })(a)
                        ? ($(r).find(".error-txt").addClass("d-block"),
                          $(r).find(".error-txt").css("display", "block"),
                          $(r).find(".error-txt").removeClass("d-none"),
                          $(r).find(".error-txt").text("DOB Should be 18 Above"),
                          e.currentTarget.classList.add("error-active"))
                        : ($(r).find(".error-txt").removeClass("d-block"),
                          $(r).find(".error-txt").css("display", "none"),
                          $(r).find(".error-txt").addClass("d-none"),
                          $(r).find(".error-txt").text(""),
                          e.currentTarget.classList.remove("error-active")));
            } else
                $(r).find(".error-txt").addClass("d-block"),
                    $(r).find(".error-txt").css("display", "block"),
                    $(r).find(".error-txt").removeClass("d-none"),
                    "fromDate" == $(r).find("input").attr("id") || "toDate" == $(r).find("input").attr("id")
                        ? $(r).find(".error-txt").text("Please enter date")
                        : $(r).find(".error-txt").text("Please enter date of birth"),
                    s.classList.remove("valid"),
                    e.currentTarget.classList.add("error-active");
        },
        onlynumericMobile: function (e) {
            var t = H(e),
                r = t.ele,
                a = t.value,
                s = t.fvc,
                n = a.replaceAll(/[^0-9]/g, "").replaceAll(/(\..*?)\..*/g, "$1");
            (e.currentTarget.value = n),
                "" !== a && null != a
                    ? a.length < 3
                        ? "mobnumber" == e.target.id
                            ? ($(r).parent().find(".error-txt").addClass("d-block"),
                              $(r).parent().find(".error-txt").removeClass("d-none"),
                              $(r).parent().find(".error-txt").text("Please enter valid mobile number"),
                              s.classList.add("error-active"),
                              s.classList.remove("valid"))
                            : ($(r).find(".error-txt").addClass("d-block"),
                              $(r).find(".error-txt").removeClass("d-none"),
                              $(r).find(".error-txt").text("Please enter valid mobile number"),
                              s.querySelector("input").classList.add("error-active"),
                              s.classList.remove("valid"))
                        : "mobnumber" == e.target.id
                          ? ($(r).parent().find(".error-txt").text(""),
                            $(r).parent().find(".error-txt").removeClass("d-block"),
                            s.classList.remove("error-active"),
                            s.classList.add("valid"))
                          : ($(r).find(".error-txt").text(""),
                            $(r).find(".error-txt").removeClass("d-block"),
                            s.querySelector("input").classList.remove("error-active"),
                            s.classList.add("valid"))
                    : "mobnumber" == e.target.id
                      ? ($(r).parent().find(".error-txt").addClass("d-block"),
                        $(r).parent().find(".error-txt").text("Mobile number cannot be blank"),
                        s.classList.add("error-active"),
                        s.classList.remove("valid"))
                      : ($(r).find(".error-txt").addClass("d-block"),
                        $(r).find(".error-txt").text("Mobile number cannot be blank"),
                        s.querySelector("input").classList.add("error-active"),
                        s.classList.remove("valid"));
        },
        pincodeValidation: function (e) {
            var t = H(e),
                r = t.ele,
                a = t.value,
                s = t.fvc;
            (a = a
                .replaceAll(/[^0-9]/g, "")
                .replaceAll(/(\..*?)\..*/g, "$1")
                .trim()),
                (e.currentTarget.value = a);
            "" != a && null != a
                ? /^\d{6}$/.test(a)
                    ? ($(r).find(".error-txt").removeClass("d-block"),
                      $(r).find(".error-txt").text(""),
                      s.classList.add("valid"),
                      e.currentTarget.classList.remove("error-active"))
                    : ($(r).find(".error-txt").addClass("d-block"),
                      $(r).find(".error-txt").css("display", "block"),
                      $(r).find(".error-txt").removeClass("d-none"),
                      $(r).find(".error-txt").text("Please enter a valid 6-digit Pincode"),
                      s.classList.remove("valid"),
                      e.currentTarget.classList.add("error-active"))
                : ($(r).find(".error-txt").addClass("d-block"),
                  $(r).find(".error-txt").css("display", "block"),
                  $(r).find(".error-txt").removeClass("d-none"),
                  $(r).find(".error-txt").text("Please enter Pincode"),
                  s.classList.remove("valid"),
                  e.currentTarget.classList.add("error-active"));
        },
        emailNew: function (e) {
            var t = H(e),
                r = t.ele,
                a = t.value,
                s = t.fvc;
            if ("" !== a) {
                /^[\w-\.]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/g.test(a)
                    ? ($(r).find(".error-txt").text(""),
                      $(r).find(".error-txt").removeClass("d-block"),
                      s.classList.add("valid"),
                      e.currentTarget.classList.remove("error-active"))
                    : ($(r).find(".error-txt").addClass("d-block"),
                      $(r).find(".error-txt").text("Please enter valid e-mail id"),
                      s.classList.remove("valid"),
                      e.currentTarget.classList.add("error-active"));
            } else
                $(r).find(".error-txt").addClass("d-block"),
                    $(r).find(".error-txt").text("Please enter e-mail id"),
                    e.currentTarget.classList.add("error-active"),
                    s.classList.remove("valid");
        },
        dobValidationGoals: function (e) {
            var t = H(e),
                r = t.ele,
                a = t.value,
                s = t.fvc;
            (a = a.trim()), (e.currentTarget.value = a);
            if ("" != a && null != a)
                if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(a)) {
                    var n = a.split("/"),
                        o = parseInt(n[0], 10),
                        l = parseInt(n[1], 10),
                        i = parseInt(n[2], 10),
                        d = new Date(i, l - 1, o);
                    if (isNaN(d.getTime()) || d > new Date())
                        $(r).find(".error-txt").addClass("d-block").css("display", "block").removeClass("d-none"),
                            "fromDate" == $(r).find("input").attr("id") || "toDate" == $(r).find("input").attr("id")
                                ? $(r).find(".error-txt").text("Please Enter Valid Date")
                                : $(r).find(".error-txt").text("Please Enter Valid Date of Birth"),
                            s.classList.remove("valid"),
                            e.currentTarget.classList.add("error-active");
                    else {
                        var c = new Date(),
                            u = c.getFullYear() - d.getFullYear(),
                            v = c.getMonth() - d.getMonth();
                        (v < 0 || (0 === v && c.getDate() < d.getDate())) && u--,
                            u < 18 || u > 65
                                ? ($(r)
                                      .find(".error-txt")
                                      .addClass("d-block")
                                      .css("display", "block")
                                      .removeClass("d-none"),
                                  $(r).find(".error-txt").text("Age should be between 18 and 65 years."),
                                  s.classList.remove("valid"),
                                  e.currentTarget.classList.add("error-active"))
                                : ($(r).find(".error-txt").removeClass("d-block").text(""),
                                  s.classList.add("valid"),
                                  e.currentTarget.classList.remove("error-active"));
                    }
                } else
                    $(r).find(".error-txt").addClass("d-block").css("display", "block").removeClass("d-none"),
                        "fromDate" == $(r).find("input").attr("id") || "toDate" == $(r).find("input").attr("id")
                            ? $(r).find(".error-txt").text("Please enter date")
                            : $(r).find(".error-txt").text("Please Enter Valid Date of Birth (dd/mm/yyyy)"),
                        s.classList.remove("valid"),
                        e.currentTarget.classList.add("error-active");
            else
                $(r).find(".error-txt").addClass("d-block").css("display", "block").removeClass("d-none"),
                    "fromDate" == $(r).find("input").attr("id") || "toDate" == $(r).find("input").attr("id")
                        ? $(r).find(".error-txt").text("Please enter date")
                        : $(r).find(".error-txt").text("Please enter date of birth"),
                    s.classList.remove("valid"),
                    e.currentTarget.classList.add("error-active");
        },
        annualIncomeValidation: function (e) {
            var t = H(e),
                r = t.ele,
                a = t.value.replaceAll(/[^0-9]/g, "").trim(),
                s = t.fvc;
            a
                ? !/^\d+$/.test(a) || Number(a) < 1e5
                    ? ($(r)
                          .find(".error-txt")
                          .addClass("d-block")
                          .removeClass("d-none")
                          .css("display", "block")
                          .text("Enter minimum six figures"),
                      s.classList.remove("valid"),
                      e.currentTarget.classList.add("error-active"))
                    : ($(r).find(".error-txt").removeClass("d-block").text(""),
                      s.classList.add("valid"),
                      e.currentTarget.classList.remove("error-active"))
                : ($(r)
                      .find(".error-txt")
                      .addClass("d-block")
                      .removeClass("d-none")
                      .css("display", "block")
                      .text("Please enter Annual Income"),
                  s.classList.remove("valid"),
                  e.currentTarget.classList.add("error-active"));
        },
        retirementdobValidationGoals: function (e) {
            var t = H(e),
                r = t.ele,
                a = t.value,
                s = t.fvc;
            (a = a.trim()), (e.currentTarget.value = a);
            if ("" != a && null != a)
                if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(a)) {
                    var n = a.split("/"),
                        o = parseInt(n[0], 10),
                        l = parseInt(n[1], 10),
                        i = parseInt(n[2], 10),
                        d = new Date(i, l - 1, o);
                    if (isNaN(d.getTime()) || d > new Date())
                        $(r).find(".error-txt").addClass("d-block").css("display", "block").removeClass("d-none"),
                            "fromDate" == $(r).find("input").attr("id") || "toDate" == $(r).find("input").attr("id")
                                ? $(r).find(".error-txt").text("Please Enter Valid Date")
                                : $(r).find(".error-txt").text("Please Enter Valid Date of Birth"),
                            s.classList.remove("valid"),
                            e.currentTarget.classList.add("error-active");
                    else {
                        var c = new Date(),
                            u = c.getFullYear() - d.getFullYear(),
                            v = c.getMonth() - d.getMonth();
                        (v < 0 || (0 === v && c.getDate() < d.getDate())) && u--,
                            u < 45 || u > 80
                                ? ($(r)
                                      .find(".error-txt")
                                      .addClass("d-block")
                                      .css("display", "block")
                                      .removeClass("d-none"),
                                  $(r)
                                      .find(".error-txt")
                                      .text("Eligible age group for this goal is between 45-80 years"),
                                  s.classList.remove("valid"),
                                  e.currentTarget.classList.add("error-active"))
                                : ($(r).find(".error-txt").removeClass("d-block").text(""),
                                  s.classList.add("valid"),
                                  e.currentTarget.classList.remove("error-active"));
                    }
                } else
                    $(r).find(".error-txt").addClass("d-block").css("display", "block").removeClass("d-none"),
                        "fromDate" == $(r).find("input").attr("id") || "toDate" == $(r).find("input").attr("id")
                            ? $(r).find(".error-txt").text("Please enter date")
                            : $(r).find(".error-txt").text("Please Enter Valid Date of Birth (dd/mm/yyyy)"),
                        s.classList.remove("valid"),
                        e.currentTarget.classList.add("error-active");
            else
                $(r).find(".error-txt").addClass("d-block").css("display", "block").removeClass("d-none"),
                    "fromDate" == $(r).find("input").attr("id") || "toDate" == $(r).find("input").attr("id")
                        ? $(r).find(".error-txt").text("Please enter date")
                        : $(r).find(".error-txt").text("Please enter date of birth"),
                    s.classList.remove("valid"),
                    e.currentTarget.classList.add("error-active");
        },
    };
    function H(e) {
        var t = e.currentTarget.closest(".form-group,.input_wrapper") || e.currentTarget.parentElement;
        return { ele: t, value: e.currentTarget.value, fvc: (e = e.currentTarget.closest(".input_wrapper") || t) };
    }
    function M(e) {
        let t = !0;
        const r = $(e).children("input");
        r.length > 0 &&
            (r.each(function (r, a) {
                "" === $(a).val().trim()
                    ? ((t = !1), $(e).removeClass("valid"), $(a).addClass("error-active"))
                    : ($(e).addClass("valid"), $(a).removeClass("error-active"));
            }),
            t ? e.siblings(".error-txt").text("") : e.siblings(".error-txt").text("Please Enter OTP"));
    }
})();

  console.log("Header Nav Loaded");
}