export default function decorate(block) {
  // QR image wrapper (currently inside a <p>)
  const qrImage = block
    .querySelector('[data-aue-prop="col2_qr"]')
    ?.closest("p");

  // QR text wrapper (richtext div)
  const qrText = block
    .querySelector('[data-aue-prop="col2_qrtext"]')
    ?.closest("div");

  if (qrImage && qrText) {
    // Create wrapper
    const qrRow = document.createElement("div");
    qrRow.classList.add("qr-row");

    // Move both into wrapper
    qrRow.append(qrImage, qrText);

    // Append at correct place (after main text)
    const contentWrapper = block
      .querySelector('[data-aue-prop="col2_text"]')
      ?.closest("div");

    contentWrapper?.after(qrRow);
  }
}
