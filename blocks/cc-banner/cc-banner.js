import { div } from '../../scripts/dom-helpers.js';

export default function decorate(block) {
    const banner = div(
        { class: 'offer-page' },
        div(
            { class: ' product-banner ' }
        ),
    );

    block.appendChild(banner);
}