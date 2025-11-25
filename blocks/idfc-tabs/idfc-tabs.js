import { div, nav, p } from '../../scripts/dom-helpers.js';

export default function decorate(block) {
    const list = block.querySelector(':scope > div > div > :is(ul,ol)');
    if (!list) return;

    const OFFSET = 100;
    const links = [...list.querySelectorAll("a")];
    const sections = links
        .map(a => document.querySelector(`[data-id="${a.hash.slice(1)}"]`))
        .filter(Boolean);

    const setActive = (id) =>
        links.forEach(a => a.classList.toggle("active", a.hash === `#${id}`));

    const scrollToSection = (sec) =>
        window.scrollTo({ top: sec.getBoundingClientRect().top + scrollY - OFFSET, behavior: "smooth" });

    links.forEach((a, i) =>
        a.addEventListener("click", e => {
            e.preventDefault();
            scrollToSection(sections[i]);
            setActive(a.hash.slice(1));
        })
    );

    const onScroll = () => {
        const mid = innerHeight * 0.6;
        const active = sections.find(s => {
            const r = s.getBoundingClientRect();
            return r.top <= mid && r.bottom > mid;
        });
        setActive(active?.dataset.id ?? null);
    };

    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    block.textContent = "";
    block.append(nav(list));
}
