// import { div } from '../../scripts/dom-helpers.js';

// export default function decorate(block) {
//     const contentWrapper = block.querySelector(':scope > div > div');
//     if (!contentWrapper) return;

//     const children = [...contentWrapper.children];
//     const fragment = document.createDocumentFragment();

//     for (let i = 0; i < children.length; i++) {
//         const node = children[i];

//         const isPictureOnly =
//             node.tagName === 'P' &&
//             node.children.length === 1 &&
//             node.firstElementChild?.tagName === 'PICTURE';

//         if (isPictureOnly) {
//             const pictureClone = node.firstElementChild.cloneNode(true);
//             const imageElement = div(
//                 { class: 'idfc-contact-us__item-image' },
//                 pictureClone
//             );

//             const nextNode = children[i + 1];
//             const isTextOnly =
//                 nextNode &&
//                 nextNode.tagName === 'P' &&
//                 nextNode.textContent.trim() &&
//                 !nextNode.querySelector('picture');

//             if (isTextOnly) {
//                 fragment.appendChild(
//                     div(
//                         { class: 'idfc-contact-us__item' },
//                         imageElement,
//                         nextNode.cloneNode(true)
//                     )
//                 );
//                 i++;
//             } else {
//                 fragment.appendChild(imageElement);
//             }
//             continue;
//         }

//         fragment.appendChild(node.cloneNode(true));
//     }

//     block.textContent = '';
//     block.appendChild(fragment);
// }