import { loadScript } from "../../scripts/aem.js";

export default async function decorate(block) {
  const { gsap } = window;
  if (!gsap) return;

  // 1. Select the elements
  const allChildren = Array.from(block.querySelectorAll(":scope > div"));
  const cards = allChildren.filter((div) => div.querySelector("picture"));
  const container = block.closest(".card-1-container") || block;

  const masterTl = gsap.timeline({ paused: true });

  // ==========================================
  // 2. MASTER CHOREOGRAPHY TABLE
  // ==========================================
  const cardSettings = [
    {
      startY: "-1000px",
      startWidth: "328px", // Your added width!
      moveStart: 1,
      moveDuration: 4,
      disappearPhase: 7,
    },
    {
      startY: "-1300px",
      startWidth: "409px", // Your added width!
      moveStart: 2.2,
      moveDuration: 3,
      disappearPhase: 6,
    },
    {
      startY: "-500px",
      startWidth: "196px", // Your added width!
      moveStart: 4,
      moveDuration: 2,
      disappearPhase: 7.4,
    },
    {
      startY: "-1700px",
      startWidth: "244px", // Your added width!
      moveStart: 2.5,
      moveDuration: 2.5,
      disappearPhase: 6,
    },
    {
      startY: "-1100px",
      startWidth: "291px", // Your added width!
      moveStart: 3,
      moveDuration: 2.5,
      disappearPhase: 7.8,
    },
  ];

  const cardTimelines = [];

  // ==========================================
  // BUILD INDIVIDUAL TIMELINES FOR EACH CARD
  // ==========================================
  cards.forEach((card, index) => {
    const picture = card.querySelector("picture");
    const image = card.querySelector("picture img");
    const textGroup = card.querySelector("div:last-child");

    const settings = cardSettings[index];

    let numberElement = textGroup.querySelector("h3");
    if (!numberElement) {
      const pElement = textGroup.querySelector("p");
      if (pElement && pElement.innerHTML.includes("<br>")) {
        const parts = pElement.innerHTML.split("<br>");
        textGroup.innerHTML = `<h3>${parts[0]}</h3><p>${parts[1]}</p>`;
        numberElement = textGroup.querySelector("h3");
      }
    }

    const tl = gsap.timeline({ paused: true });

    // ==========================================
    // PHASE 1: MOVEMENT & SIZING (Your logic perfectly merged)
    // ==========================================

    // 1. Instantly push the cards into the sky and force their exact starting width
    gsap.set(card, {
      y: settings.startY,
      width: settings.startWidth,
    });

    // 2. A single fromTo tween handles both the drop and the shrink simultaneously
    tl.fromTo(
      card,
      {
        y: settings.startY,
        width: settings.startWidth, // Starts at your exact CSS pixel size
      },
      {
        y: 0,
        width: "250px", // Animates perfectly to 250px as you requested
        duration: settings.moveDuration,
        ease: "none",
      },
      settings.moveStart,
    );

    // Create the vertical line
    let line = null;
    if (index !== cards.length - 1) {
      line = document.createElement("div");
      line.style.position = "absolute";
      line.style.right = "-7%";
      line.style.bottom = "0";
      line.style.width = "1px";
      line.style.height = "200vh";
      line.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
      line.style.opacity = "0";
      line.style.pointerEvents = "none";
      line.style.zIndex = "0";
      card.appendChild(line);
    }

    // Run the number counter
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
            duration: settings.moveDuration,
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
          settings.moveStart,
        );
      }
    }

    // ==========================================
    // PHASE 2: DISPLACE & DISAPPEAR
    // ==========================================
    if (line) {
      tl.to(line, { opacity: 1, duration: 0.5 }, settings.disappearPhase);
    }

    if (image && picture) {
      const imageWrapper = picture.parentElement;
      if (imageWrapper) {
        gsap.set(imageWrapper, { overflow: "hidden" });
      }

      // Image slides down
      tl.to(picture, { yPercent: 80, duration: 1 }, settings.disappearPhase);

      // Image crops simultaneously
      tl.to(
        picture,
        {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.8,
          ease: "power2.inOut",
        },
        settings.disappearPhase,
      );

      // Image fades out a half-second after the disappearance starts
      tl.to(
        image,
        { opacity: 0, duration: 0.5, ease: "power2.inOut" },
        settings.disappearPhase + 0.5,
      );
    }

    cardTimelines.push(tl);
  });

  // ==========================================
  // CUSTOM SCROLL TRACKER
  // ==========================================
  const handleScroll = () => {
    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const startPoint = windowHeight * 0.8;
    const endPoint = 0 - rect.height;
    const totalScrollDistance = startPoint - endPoint;
    const currentScroll = startPoint - rect.top;

    let progress = currentScroll / totalScrollDistance;
    progress = Math.max(0, Math.min(1, progress));

    // THE FIX: Smoothly scrub the timeline instead of instantly snapping it!
    cardTimelines.forEach((tl) => {
      gsap.to(tl, {
        progress: progress,
        duration: 0.5, // Feel free to tweak this! (0.2 is faster, 1.0 is slower/smoother)
        ease: "power2.out",
        overwrite: true,
      });
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}
