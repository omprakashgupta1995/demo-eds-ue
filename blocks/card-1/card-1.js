import { loadScript } from "../../scripts/aem.js";

export default async function decorate(block) {
  await loadScript(
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js",
  );
  await loadScript(
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js",
  );

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  // 2. Select the cards
  const allChildren = Array.from(block.querySelectorAll(":scope > div"));
  const cards = allChildren.filter((div) => div.querySelector("picture"));

  // 3. Create the Timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: block,
      start: "top 80%",
      end: "bottom top",
      scrub: 1,
    },
  });

  // 4. Scattered Starting Positions
  const startYPositions = [
    "-20vh", // 1st card
    "-170vh", // 2nd card
    "-0vh", // 3rd card
    "-140vh", // 4th card
    "-120vh", // 5th card
  ];

  const pictures = Array.from(block.querySelectorAll("picture"));

  const getCounterCompletionTime = (index) => {
    let startTime = 0;
    let moveDuration = 3;

    if (index === 3) {
      startTime = 1;
      moveDuration = 2;
    }

    return startTime + moveDuration;
  };

  const maxCounterCompletionTime = Math.max(
    ...cards.map((_, index) => getCounterCompletionTime(index)),
  );

  cards.forEach((card, index) => {
    const picture = card.querySelector("picture");
    const image = card.querySelector("picture img");
    const textGroup = card.querySelector("div:last-child");

    // HTML Fix for the 2nd Card
    let numberElement = textGroup.querySelector("h3");
    if (!numberElement) {
      const pElement = textGroup.querySelector("p");
      if (pElement && pElement.innerHTML.includes("<br>")) {
        const parts = pElement.innerHTML.split("<br>");
        textGroup.innerHTML = `<h3>${parts[0]}</h3><p>${parts[1]}</p>`;
        numberElement = textGroup.querySelector("h3");
      }
    }

    // ==========================================
    // PHASE 1: MOVEMENT, COUNTING & LINES (Time: 0 to 3)
    // ==========================================
    let startTime = 0;
    let moveDuration = 3;

    // Delay the 4th card (Index 3)
    if (index === 3) {
      startTime = 1;
      moveDuration = 2;
    }

    // Move the card to the bottom row
    tl.from(
      card,
      {
        y: startYPositions[index],
        duration: moveDuration,
        ease: "none",
      },
      startTime,
    );

    // --- CREATE THE PHYSICAL GRID LINES ---
    // We create a physical div for the line on every card EXCEPT the last one
    let line = null;
    if (index !== cards.length - 1) {
      line = document.createElement("div");
      // Inline styles make this foolproof—no CSS file needed!
      line.style.position = "absolute";
      line.style.right = "-7%"; // Pushes it perfectly into the gap between cards
      line.style.bottom = "0";
      line.style.width = "1px";
      line.style.height = "200vh"; // Shoots way up into the dark background
      line.style.backgroundColor = "rgba(255, 255, 255, 0.08)"; // Faint white
      line.style.opacity = "0"; // Hidden initially
      line.style.pointerEvents = "none";
      line.style.zIndex = "0";
      card.appendChild(line);
    }

    // Run the number counter alongside the movement
    if (numberElement) {
      const originalText = numberElement.innerText.trim();
      const match = originalText.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);

      if (match) {
        const prefix = match[1];
        const targetNum = Number(match[2]);
        const suffix = match[3];

        const isOneK = targetNum === 1 && suffix.toUpperCase().includes("K");
        const counter = { val: isOneK ? 0 : 1 };

        tl.to(
          counter,
          {
            val: targetNum,
            duration: moveDuration,
            onUpdate: () => {
              let displayNum;

              if (isOneK) {
                const decimal = Math.floor(counter.val * 10);
                displayNum = decimal >= 10 ? "1" : "." + decimal;
              } else {
                displayNum = Math.floor(counter.val);
                if (counter.val === targetNum) displayNum = targetNum;
              }

              numberElement.innerHTML = `<span class="yellow-plus">${prefix}</span>${displayNum}${suffix}`;
            },
          },
          startTime,
        );
      }
    }

    // ==========================================
    // PHASE 2: DISPLACE BELOW & DISAPPEAR (Time: 3 to 4)
    // ==========================================

    const counterCompleteTime = getCounterCompletionTime(index);
    const imageHideStartTime = counterCompleteTime + 0.1;
    const imageShrinkStartTime = imageHideStartTime - 0.5;
    const imageFadeStartTime = imageShrinkStartTime + 0.5;

    // 1. Fade the physical grid line in precisely after the counter finishes
    if (line) {
      tl.to(
        line,
        {
          opacity: 1,
          duration: 0.5,
        },
        imageHideStartTime,
      );
    }

    // 2. Hide images and slide them down
    if (image && picture) {
      const imageWrapper = picture.parentElement;
      if (imageWrapper) {
        gsap.set(imageWrapper, { overflow: "hidden" });
      }

      tl.to(
        picture,
        {
          yPercent: 80,
          duration: 1,
        },
        imageHideStartTime,
      );

      tl.to(
        picture,
        {
          height: 0,
          duration: 0.8,
          ease: "power2.inOut",
        },
        imageShrinkStartTime,
      );

      tl.to(
        image,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        },
        imageFadeStartTime,
      );
    }
  });
}
