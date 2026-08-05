import { loadCSS } from '../../../scripts/aem.js';
import { div } from '../../../scripts/dom-helper.js';
import embedV1 from '../../embed-v1/mf/embed-v1.js';

export default function decorate(block) {
    loadCSS(`${window.hlx.codeBasePath}/blocks/embed-v1/mf/embed-v1.css`);

    const isEmbeddedVideo = block.classList.contains('embedded-video');
    const [content, image, embedLink] = [...block.children];

    content.classList.add('teaser-col1');

    if (isEmbeddedVideo) {
        const picture = image?.querySelector('picture');
        const videoLinkEl = embedLink?.querySelector('a[href]');

        image?.remove();
        embedLink?.remove();

        const videoWrapper = div({ class: 'teaser-video' });
        if (picture) videoWrapper.append(picture);
        if (videoLinkEl) videoWrapper.append(videoLinkEl);

        content.append(videoWrapper);
        embedV1(videoWrapper);
    } else {
        const picture = image?.querySelector('picture');
        image?.remove();
        if (picture) content.append(picture);
    }
}
