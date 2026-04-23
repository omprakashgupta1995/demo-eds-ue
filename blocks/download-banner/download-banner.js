export default function decorate(block) {
    const rows = [...block.children];
    if (!rows.length) return;

    // Row 1 → Content
    const bannerContentWrapper = rows[0];
    bannerContentWrapper?.classList.add('banner-content-wrapper');

    const bannerContent = bannerContentWrapper?.firstElementChild;
    bannerContent?.classList.add('banner-content');

    if (bannerContent) {
        const elements = [...bannerContent.children];

        const imageWrapper = elements[0];
        const heading = elements[1];
        const description = elements[2];

        imageWrapper?.classList.add('banner-image-wrapper');
        heading?.classList.add('banner-heading');
        description?.classList.add('banner-description');
    }

    // Row 2 → QR
    const qrRow = rows[1];
    qrRow?.classList.add('banner-qr-wrapper');

    const bannerQRContent = qrRow?.firstElementChild;
    bannerQRContent?.classList.add('banner-qr-content');

    if (bannerQRContent) {
        const qrElements = [...bannerQRContent.children];

        const qrImage = qrElements[0];
        const qrText = qrElements[1];

        qrImage?.classList.add('banner-qr-image-wrapper');
        qrText?.classList.add('banner-qr-description');
    }
}