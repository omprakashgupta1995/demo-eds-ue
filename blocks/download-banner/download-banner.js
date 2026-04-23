export default function decorate(block) {
  // second column inner wrapper
  const contentInner = block.querySelector(":scope > div:nth-child(2) > div");

  if (!contentInner) return;

  const paragraphs = contentInner.querySelectorAll("p");

  if (paragraphs.length < 3) return;

  const qrImagePara = paragraphs[1]; // second <p> → contains QR picture
  const qrTextPara = paragraphs[2]; // third <p> → QR text

  // Create wrapper
  const qrRow = document.createElement("div");
  qrRow.classList.add("qr-row");

  qrRow.append(qrImagePara, qrTextPara);

  contentInner.append(qrRow);
}
