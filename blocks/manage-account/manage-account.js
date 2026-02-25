export default function decorate(block) {
	const rows = [...block.children];

	rows.forEach((row) => {
		row.classList.add('manage-accounts-item');
		const cells = [...row.children];

		const videoCell = cells[0];
		const headingCell = cells[1];
		const subheadingCell = cells[2];
		const linkCell = cells[3];
		const linkTextCell = cells[4];
		const linkTitleCell = cells[5];
		const linkTypeCell = cells[6];

		if (videoCell) {
			videoCell.classList.add('manage-accounts-video');
			const iframe = videoCell.querySelector('iframe');
			if (iframe) {
				const iframeParent = iframe.parentElement;
				const wrapper = document.createElement('div');
				wrapper.className = 'manage-accounts-video-embed';
				wrapper.appendChild(iframe);
				if (iframeParent && iframeParent.tagName === 'P' && iframeParent.childNodes.length === 0) {
					iframeParent.replaceWith(wrapper);
				} else if (iframeParent) {
					iframeParent.insertBefore(wrapper, iframeParent.firstChild);
				} else {
					videoCell.prepend(wrapper);
				}
			}
		}

		if (headingCell) headingCell.classList.add('manage-accounts-heading');
		if (subheadingCell) subheadingCell.classList.add('manage-accounts-subheading');

		if (linkCell) {
			linkCell.classList.add('manage-accounts-link');
			const link = linkCell.querySelector('a');
			if (link) {
				const linkText = linkTextCell?.textContent.trim();
				if (linkText) link.textContent = linkText;

				const linkTitle = linkTitleCell?.textContent.trim();
				if (linkTitle) link.title = linkTitle;

				const linkType = linkTypeCell?.textContent.trim();
				if (linkType) link.classList.add('button', linkType);
			}
		}

		[linkTextCell, linkTitleCell, linkTypeCell].forEach((cell) => {
			if (cell) cell.remove();
		});
	});
}
